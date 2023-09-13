// (C) 2007-2020 GoodData Corporation
import React, { Component } from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import noop from "lodash/noop.js";
import { BubbleHoverTrigger } from "../Bubble/BubbleHoverTrigger.js";
import { Bubble } from "../Bubble/Bubble.js";
const BUBBLE_OFFSET_X = 16;
/**
 * @internal
 * @deprecated This component is deprecated use SingleSelectListItem instead
 */
class LegacySingleSelectListItem extends Component {
    constructor() {
        super(...arguments);
        this.state = { isOverflowed: false };
        this.node = null;
        this.handleSelect = () => {
            this.props.onSelect(this.props.source);
        };
        this.handleMouseOver = () => {
            this.props.onMouseOver(this.props.source);
        };
        this.handleMouseOut = () => {
            this.props.onMouseOut(this.props.source);
        };
    }
    componentDidMount() {
        this.checkOverflow();
    }
    componentDidUpdate() {
        this.checkOverflow();
    }
    getClassNames() {
        const { source, selected } = this.props;
        const generatedSeleniumClass = `s-${stringUtils.simplifyText(source.title)}`;
        return cx("gd-list-item", generatedSeleniumClass, { "is-selected": selected });
    }
    checkOverflow() {
        if (this.node) {
            // Checks if ellipsis has been applicated on title span
            const isOverflowed = this.node.offsetWidth < this.node.scrollWidth;
            if (isOverflowed !== this.state.isOverflowed) {
                // eslint-disable-next-line react/no-did-mount-set-state
                this.setState({
                    isOverflowed,
                });
            }
        }
    }
    renderTitle() {
        const { title } = this.props.source;
        const titleElement = (React.createElement("span", { ref: (node) => {
                this.node = node;
            } }, title));
        if (this.state.isOverflowed) {
            return (React.createElement(BubbleHoverTrigger, null,
                titleElement,
                React.createElement(Bubble, { className: "bubble-primary", alignPoints: [{ align: "cr cl" }, { align: "cl cr" }], arrowOffsets: {
                        "cr cl": [BUBBLE_OFFSET_X, 0],
                        "cl cr": [-BUBBLE_OFFSET_X, 0],
                    } }, title)));
        }
        return titleElement;
    }
    renderIcon(icon) {
        if (icon) {
            const iconClasses = cx("gd-list-icon", icon);
            return React.createElement("span", { className: iconClasses });
        }
        return null;
    }
    render() {
        var _a;
        const icon = (_a = this.props.source) === null || _a === void 0 ? void 0 : _a.icon;
        return (React.createElement("div", { className: this.getClassNames(), onClick: this.handleSelect, onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut },
            this.renderIcon(icon),
            this.renderTitle()));
    }
}
LegacySingleSelectListItem.defaultProps = {
    onMouseOver: noop,
    onMouseOut: noop,
};
export { LegacySingleSelectListItem };
//# sourceMappingURL=LegacySingleSelectListItem.js.map