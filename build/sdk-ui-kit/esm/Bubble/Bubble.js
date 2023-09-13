// (C) 2020-2022 GoodData Corporation
import React from "react";
import keys from "lodash/keys.js";
import cloneDeep from "lodash/cloneDeep.js";
import isEqual from "lodash/isEqual.js";
import isReactEqual from "react-fast-compare";
import result from "lodash/result.js";
import noop from "lodash/noop.js";
import cx from "classnames";
import { Overlay } from "../Overlay/index.js";
const ARROW_DIRECTIONS = {
    ".. cc": "none",
    ".r .l|.. cl": "left",
    ".l .r|.. cr": "right",
    ".. t.": "top",
    ".. b.": "bottom",
    ".. .l": "left",
    ".. .r": "right",
};
// FIXME: hardcoded offsets for Indigo style
export const X_SHIFT = 7;
export const Y_SHIFT = 11;
// FIXME: constants are bad, we know :(
const ARROW_OFFSETS = {
    ".. cc": [0, 0],
    ".. tc": [0, X_SHIFT],
    ".. bc": [0, -X_SHIFT],
    ".. cl": [X_SHIFT, 0],
    ".. cr": [-X_SHIFT, 0],
    ".r tl": [X_SHIFT, -Y_SHIFT],
    ".l tr": [-X_SHIFT, -Y_SHIFT],
    ".r bl": [X_SHIFT, Y_SHIFT],
    ".l br": [-X_SHIFT, Y_SHIFT],
    ".. tl": [-Y_SHIFT, X_SHIFT],
    ".. tr": [Y_SHIFT, X_SHIFT],
    ".. bl": [-Y_SHIFT, -X_SHIFT],
    ".. br": [Y_SHIFT, -X_SHIFT],
};
/**
 * @internal
 */
class Bubble extends React.Component {
    constructor(props) {
        super(props);
        this.onAlign = (alignment) => {
            this.setState({ optimalAlignPoints: alignment.align });
        };
        this.arrowOffsets = Object.assign(Object.assign({}, props.arrowOffsets), ARROW_OFFSETS);
        this.arrowDirections = Object.assign(Object.assign({}, props.arrowDirections), ARROW_DIRECTIONS);
        const alignPoints = this.addOffsetToAlignPoints(cloneDeep(props.alignPoints));
        this.state = {
            alignPoints,
            optimalAlignPoints: props.alignPoints[0].align,
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        const propsChanged = !isReactEqual(this.props, nextProps);
        const alignmentChanged = !isEqual(this.state.optimalAlignPoints, nextState.optimalAlignPoints);
        return propsChanged || alignmentChanged;
    }
    getClassnames() {
        return cx({
            [this.props.className]: !!this.props.className,
            [this.getArrowsClassname(this.state.optimalAlignPoints)]: true,
            "gd-bubble": true,
            bubble: true,
        });
    }
    getArrowsClassname(alignPoints) {
        const myAlignPoint = alignPoints.split(" ")[1];
        const direction = this.getArrowDirection(alignPoints);
        return `arrow-${direction}-direction arrow-${myAlignPoint}`;
    }
    getArrowDirection(alignPoints) {
        const key = keys(this.arrowDirections).find((arrowDirection) => alignPoints.match(arrowDirection));
        return this.arrowDirections[key] || "none";
    }
    addOffsetToAlignPoints(alignPoints) {
        const { arrowOffsets } = this;
        const arrowOffsetsKeys = keys(arrowOffsets);
        const getKey = (align, re) => {
            return align.match(re) !== null;
        };
        return alignPoints.map((item) => {
            const key = arrowOffsetsKeys.find(getKey.bind(this, item.align));
            item.offset = item.offset || { x: 0, y: 0 };
            item.offset.x += arrowOffsets[key][0];
            item.offset.y += arrowOffsets[key][1];
            return item;
        }, this);
    }
    render() {
        const arrowStyle = result(this.props, "arrowStyle", {});
        return (React.createElement(Overlay, { className: this.props.overlayClassName, alignTo: this.props.alignTo, onAlign: this.onAlign, alignPoints: this.state.alignPoints, closeOnParentScroll: this.props.closeOnParentScroll, closeOnMouseDrag: true, closeOnOutsideClick: this.props.closeOnOutsideClick, ignoreClicksOn: this.props.ignoreClicksOn, ignoreClicksOnByClass: this.props.ignoreClicksOnByClass, onClose: this.props.onClose },
            React.createElement("div", { onMouseEnter: this.props.onMouseEnter, onMouseLeave: this.props.onMouseLeave, onKeyDown: this.props.onKeyDown, className: this.getClassnames() },
                React.createElement("div", { className: "bubble-content" },
                    React.createElement("div", { className: "helper" }),
                    React.createElement("div", { className: "arrow-position", style: arrowStyle },
                        React.createElement("div", { className: "arrow-border" }),
                        React.createElement("div", { className: "arrow" })),
                    React.createElement("div", { className: "content" }, this.props.children)))));
    }
}
Bubble.defaultProps = {
    alignPoints: [
        {
            align: "bl tl",
        },
    ],
    alignTo: "body",
    arrowOffsets: {},
    arrowDirections: {},
    arrowStyle: {},
    className: "bubble-primary",
    closeOnOutsideClick: false,
    closeOnParentScroll: true,
    onClose: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
    overlayClassName: "",
};
// identifier for BubbleTrigger
Bubble.identifier = "Bubble";
export { Bubble };
//# sourceMappingURL=Bubble.js.map