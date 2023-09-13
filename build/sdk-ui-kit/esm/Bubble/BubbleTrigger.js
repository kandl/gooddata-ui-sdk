import { __rest } from "tslib";
// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { v4 as uuid } from "uuid";
import pickBy from "lodash/pickBy.js";
/**
 * @internal
 */
class BubbleTrigger extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            bubbleId: `bubble-${uuid()}`,
            isBubbleVisible: false,
        };
        this.onClose = () => {
            this.changeBubbleVisibility(false);
        };
    }
    eventListeners() {
        return {};
    }
    changeBubbleVisibility(active) {
        const { onBubbleOpen, onBubbleClose } = this.props;
        const { isBubbleVisible } = this.state;
        if (active && isBubbleVisible !== active && onBubbleOpen) {
            onBubbleOpen();
        }
        if (!active && onBubbleClose) {
            onBubbleClose();
        }
        this.setState({ isBubbleVisible: active });
    }
    render() {
        const _a = this.props, { children, eventsOnBubble, className, tagName } = _a, others = __rest(_a, ["children", "eventsOnBubble", "className", "tagName"]);
        const dataAttributes = pickBy(others, (_, key) => key.startsWith("data-"));
        const classNames = cx("gd-bubble-trigger", className, {
            [this.state.bubbleId]: true,
        });
        const TagName = tagName;
        let BubbleElement;
        let WrappedTrigger;
        React.Children.map(children, (child) => {
            var _a;
            if (child) {
                if (((_a = child.type) === null || _a === void 0 ? void 0 : _a.identifier) === "Bubble") {
                    BubbleElement = child;
                }
                else {
                    WrappedTrigger = child;
                }
            }
        });
        const bubbleProps = Object.assign(Object.assign({}, (eventsOnBubble ? this.eventListeners() : {})), { alignTo: `.${this.state.bubbleId}`, onClose: this.onClose });
        const BubbleOverlay = this.state.isBubbleVisible && BubbleElement ? React.cloneElement(BubbleElement, bubbleProps) : "";
        return (React.createElement(React.Fragment, null,
            React.createElement(TagName, Object.assign({}, dataAttributes, this.eventListeners(), { className: classNames }), WrappedTrigger),
            BubbleOverlay));
    }
}
BubbleTrigger.defaultProps = {
    className: "",
    children: false,
    eventsOnBubble: false,
    tagName: "span",
};
export { BubbleTrigger };
//# sourceMappingURL=BubbleTrigger.js.map