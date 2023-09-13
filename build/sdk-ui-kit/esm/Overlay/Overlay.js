// (C) 2020-2023 GoodData Corporation
import React, { createRef } from "react";
import cx from "classnames";
import { Portal } from "react-portal";
import bindAll from "lodash/bindAll.js";
import pick from "lodash/pick.js";
import isEqual from "lodash/isEqual.js";
import isReactEqual from "react-fast-compare";
import findIndex from "lodash/findIndex.js";
import debounce from "lodash/debounce.js";
import noop from "lodash/noop.js";
import { v4 as uuid } from "uuid";
import { DEFAULT_ALIGN_POINTS, getOptimalAlignment, getOverlayStyles } from "../utils/overlay.js";
import { elementRegion, isFixedPosition } from "../utils/domUtilities.js";
import { ENUM_KEY_CODE } from "../typings/utilities.js";
import { OverlayContext } from "./OverlayContext.js";
const events = [
    { name: "click", handler: "closeOnOutsideClick", target: document },
    {
        name: "mousedown",
        handler: "onDocumentMouseDown",
        target: document,
        requiredProp: "closeOnOutsideClick",
    },
    { name: "goodstrap.scrolled", handler: "closeOnParentScroll" },
    { name: "goodstrap.drag", handler: "closeOnMouseDrag" },
    { name: "keydown", handler: "closeOnEscape" },
];
const eventProps = events.map((event) => event.handler);
const ALIGN_TIMEOUT_MS = 10;
const INIT_STATE_ALIGN = -500;
export const POSITION_SAME_AS_TARGET = "sameAsTarget";
const OVERLAY_CONTENT_CLASS = "gd-overlay-content";
function exceedsThreshold(firstNumber, secondNumber) {
    return Math.abs(firstNumber - secondNumber) > 2;
}
function alignExceedsThreshold(firstAlignment, secondAlignment) {
    return (exceedsThreshold(firstAlignment.top, secondAlignment.top) ||
        exceedsThreshold(firstAlignment.left, secondAlignment.left) ||
        exceedsThreshold(firstAlignment.right, secondAlignment.right));
}
const stopPropagation = (e) => {
    var _a;
    e.stopPropagation();
    const reactMajorVersion = parseInt((_a = React.version) === null || _a === void 0 ? void 0 : _a.split(".")[0], 10);
    // Propagate events to `document` for react 17
    // (We need to get them for other overlays to close and the events did not get there due to changes
    // introduced in https://reactjs.org/blog/2020/08/10/react-v17-rc.html#changes-to-event-delegation)
    if (reactMajorVersion >= 17) {
        const evt = new MouseEvent(e.nativeEvent.type, e.nativeEvent);
        Object.defineProperty(evt, "target", { value: e.nativeEvent.target, enumerable: true });
        document.dispatchEvent(evt);
    }
};
/**
 * @internal
 */
class Overlay extends React.Component {
    constructor(props) {
        super(props);
        this.overlayRef = createRef();
        this.containerRef = createRef();
        this.resizeHandler = debounce(() => this.align(), 100);
        this.portalNode = null;
        this.id = uuid();
        this.align = () => {
            const { alignPoints, alignTo, positionType } = this.props;
            const overlay = this.overlayRef.current;
            if (!alignPoints || !overlay) {
                return;
            }
            const isSameAsTarget = this.isSameAsTargetPosition(positionType);
            const optimalAlign = getOptimalAlignment({
                targetRegion: elementRegion(alignTo, isSameAsTarget),
                selfRegion: elementRegion(overlay),
                alignPoints,
                ignoreScrollOffsets: isSameAsTarget,
            });
            if (alignExceedsThreshold(this.state.alignment, optimalAlign.alignment)) {
                this.setState({
                    alignment: optimalAlign.alignment,
                }, () => {
                    this.props.onAlign(optimalAlign.alignment);
                });
            }
            else {
                this.props.onAlign(optimalAlign.alignment);
            }
        };
        this.clearAlignmentTimeout = () => {
            if (this.alignmentTimeoutId) {
                window.clearTimeout(this.alignmentTimeoutId);
            }
        };
        this.alignWithTimeout = () => {
            this.clearAlignmentTimeout();
            this.alignmentTimeoutId = window.setTimeout(() => {
                this.align();
            }, ALIGN_TIMEOUT_MS);
        };
        this.onMaskClick = (e) => {
            if (!this.props.closeOnOutsideClick) {
                e.stopPropagation();
            }
        };
        this.getOverlayStyles = () => {
            const { alignTo, positionType } = this.props;
            const { alignment } = this.state;
            const position = this.isSameAsTargetPosition(positionType)
                ? isFixedPosition(alignTo)
                    ? "fixed"
                    : "absolute"
                : positionType;
            return {
                position,
                left: alignment.left,
                top: alignment.top,
                zIndex: this.getZIndex(),
                visibility: this.isAligned() ? undefined : "hidden",
            };
        };
        this.getOverlayClasses = () => {
            return cx(this.props.className, this.getAlignClasses(), {
                "overlay-wrapper": true,
            });
        };
        /**
         * Add CSS classes to overlay wrapper, so they can be used
         * for position of arrows and stuff
         */
        this.getAlignClasses = () => {
            const align = this.state.alignment.align.split(" ");
            return `target-${align[0]} self-${align[1]}`;
        };
        this.isSameAsTargetPosition = (positionType) => {
            return positionType === POSITION_SAME_AS_TARGET;
        };
        this.isEventOnParent = (event) => {
            var _a;
            const node = this.containerRef.current;
            const eventNode = ((_a = event.detail) === null || _a === void 0 ? void 0 : _a.node) || event.target;
            return eventNode.contains(node);
        };
        this.shouldCloseOnClick = (e) => {
            if (!this.isComponentMounted) {
                return false;
            }
            if (!this.isAligned()) {
                return false;
            }
            // an ignored node has been clicked, always keep the overlay open
            if (this.hasClickedOnIgnoredNode(e)) {
                return false;
            }
            // non-ignored node clicked, give shouldCloseOnClick the chance
            // to override closing the dialog
            return this.props.shouldCloseOnClick(e);
        };
        this.hasClickedOnIgnoredNode = (e) => {
            if (e.defaultPrevented) {
                // Ignore event if it should be prevented (e.q. by click in child component)
                return true;
            }
            const clickedElement = e.target;
            if (this.isElementInChildOverlay(clickedElement) || this.clickedInside) {
                return true;
            }
            const ignoredRefElements = [this.overlayRef.current, ...this.props.ignoreClicksOn];
            const clickInsideIgnoredRefElement = ignoredRefElements.some((ref) => {
                return ref === null || ref === void 0 ? void 0 : ref.contains(clickedElement);
            });
            if (clickInsideIgnoredRefElement) {
                return true;
            }
            return this.props.ignoreClicksOnByClass.some((selector) => clickedElement.closest(selector));
        };
        this.isAligned = () => {
            return this.state.alignment.left !== INIT_STATE_ALIGN && this.state.alignment.top != INIT_STATE_ALIGN;
        };
        // makes assumption that overlays later in the DOM are child overlays
        this.isElementInChildOverlay = (element) => {
            const overlays = Array.from(document.querySelectorAll(".overlay-wrapper"));
            const thisOverlayIndex = findIndex(overlays, (overlay) => overlay === this.overlayRef.current);
            return overlays.slice(thisOverlayIndex + 1).some((overlay) => overlay.contains(element));
        };
        this.closeOnMouseDrag = () => {
            if (!this.isComponentMounted) {
                return;
            }
            this.props.onClose();
        };
        this.updateListeners = (method, props) => {
            events.forEach((event) => {
                if (props[event.handler] || props[event.requiredProp]) {
                    const handler = this[event.handler];
                    if (handler) {
                        (event.target || window)[`${method}EventListener`](event.name, handler);
                    }
                }
            });
        };
        this.addListeners = (props) => {
            this.updateListeners("add", props);
        };
        this.removeListeners = (props) => {
            this.updateListeners("remove", props);
        };
        this.renderMask = () => {
            const styles = {
                zIndex: this.context ? this.context.getZIndex(this.id) : null,
            };
            return this.props.isModal ? (React.createElement("div", { className: "modalityPlugin-mask modalityPlugin-mask-visible", onClick: this.onMaskClick, style: styles })) : (false);
        };
        this.state = {
            alignment: {
                align: props.alignPoints[0].align,
                left: INIT_STATE_ALIGN,
                top: INIT_STATE_ALIGN,
                right: 0,
            },
        };
        this.isComponentMounted = false;
        this.clickedInside = false;
        this.alignmentTimeoutId = 0;
        bindAll(this, events.map((event) => event.handler));
        this.createPortalNode();
    }
    UNSAFE_componentWillMount() {
        var _a;
        // reserve the zIndex via the context as soon as possible so that Overlays in the children get higher zIndex
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.addOverlay(this.id);
    }
    componentDidMount() {
        this.isComponentMounted = true;
        afterOverlayOpened();
        window.addEventListener("resize", this.resizeHandler);
        this.addListeners(this.props);
        this.alignWithTimeout();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!isEqual(pick(this.props, eventProps), pick(nextProps, eventProps))) {
            this.removeListeners(this.props);
            this.addListeners(nextProps);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const propsChanged = !isReactEqual(this.props, nextProps);
        const positionChanged = !isEqual(this.state.alignment, nextState.alignment);
        return propsChanged || positionChanged;
    }
    componentDidUpdate() {
        this.alignWithTimeout();
    }
    componentWillUnmount() {
        var _a;
        this.isComponentMounted = false;
        this.clearAlignmentTimeout();
        window.removeEventListener("resize", this.resizeHandler);
        this.removeListeners(this.props);
        this.removePortalNodeAfterAllTreeUnmount();
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.removeOverlay(this.id);
        afterOverlayClosed();
    }
    render() {
        // Need stop propagation of events from Portal thats new behavior of react 16
        // https://github.com/facebook/react/issues/11387
        return (React.createElement("span", { "aria-label": "portal-scroll-anchor", className: "s-portal-scroll-anchor", ref: this.containerRef },
            React.createElement(Portal, { node: this.portalNode },
                React.createElement("div", { className: cx(this.props.containerClassName, OVERLAY_CONTENT_CLASS), onClick: this.props.onClick, onMouseOver: this.props.onMouseOver, onMouseUp: this.props.onMouseUp },
                    this.renderMask(),
                    React.createElement("div", { ref: this.overlayRef, style: this.getOverlayStyles(), className: this.getOverlayClasses() }, this.props.children)))));
    }
    getZIndex() {
        return this.context ? this.context.getZIndex(this.id) : this.props.zIndex;
    }
    createPortalNode() {
        this.portalNode = document.createElement("div");
        document.body.appendChild(this.portalNode);
    }
    removePortalNodeAfterAllTreeUnmount() {
        setTimeout(() => {
            if (this.portalNode && document.body.contains(this.portalNode)) {
                document.body.removeChild(this.portalNode);
            }
            this.portalNode = null;
        });
    }
    onDocumentMouseDown(e) {
        this.clickedInside = this.overlayRef.current.contains(e.target);
        if (this.clickedInside) {
            e.stopPropagation();
        }
    }
    closeOnParentScroll(e) {
        if (!this.isComponentMounted) {
            return;
        }
        if (this.isEventOnParent(e)) {
            this.props.onClose();
        }
    }
    closeOnOutsideClick(e) {
        if (this.shouldCloseOnClick(e)) {
            this.props.onClose();
        }
    }
    closeOnEscape(e) {
        if (this.isComponentMounted &&
            this.props.closeOnEscape &&
            e.keyCode === ENUM_KEY_CODE.KEY_CODE_ESCAPE) {
            this.props.onClose();
        }
    }
}
Overlay.defaultProps = {
    alignPoints: DEFAULT_ALIGN_POINTS,
    alignTo: "body",
    children: false,
    className: "",
    containerClassName: "",
    positionType: "absolute",
    ignoreClicksOn: [],
    ignoreClicksOnByClass: [],
    shouldCloseOnClick: () => true,
    onClick: stopPropagation,
    onMouseOver: stopPropagation,
    onMouseUp: stopPropagation,
    onAlign: noop,
    onClose: noop,
};
Overlay.contextType = OverlayContext;
export { Overlay };
const overlayState = {
    opened: 0,
    body: {},
    html: {},
};
function afterOverlayOpened() {
    if (overlayState.opened === 0) {
        const styles = getOverlayStyles();
        overlayState.html = applyStyles(document.documentElement, styles.html);
        overlayState.body = applyStyles(document.body, styles.body);
    }
    overlayState.opened++;
}
function afterOverlayClosed() {
    overlayState.opened--;
    if (overlayState.opened === 0) {
        applyStyles(document.documentElement, overlayState.html);
        applyStyles(document.body, overlayState.body);
    }
}
function applyStyles(el, newStyles) {
    return Object.keys(newStyles).reduce((prev, key) => {
        const style = el.style;
        const oldValue = style[key];
        style[key] = newStyles[key];
        return Object.assign(Object.assign({}, prev), { [key]: oldValue });
    }, {});
}
//# sourceMappingURL=Overlay.js.map