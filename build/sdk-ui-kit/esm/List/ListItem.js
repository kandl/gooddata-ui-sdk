// (C) 2007-2022 GoodData Corporation
import React, { Component, createRef } from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import { Bubble, BubbleHoverTrigger } from "../Bubble/index.js";
const BUBBLE_OFFSET_X = 16;
/**
 * @internal
 */
export class SingleSelectListItem extends Component {
    constructor(props) {
        super(props);
        this.titleRef = createRef();
        this.getClassNames = () => {
            const { title, isSelected, className } = this.props;
            const generatedSeleniumClass = `s-${stringUtils.simplifyText(title)}`;
            return cx("gd-list-item", className, generatedSeleniumClass, { "is-selected": isSelected });
        };
        this.renderTitle = () => {
            const { title } = this.props;
            const titleElement = React.createElement("span", { ref: this.titleRef }, title);
            if (this.state.isOverflowed) {
                return (React.createElement(BubbleHoverTrigger, null,
                    titleElement,
                    React.createElement(Bubble, { className: "bubble-primary", alignPoints: [{ align: "cr cl" }, { align: "cl cr" }], arrowOffsets: {
                            "cr cl": [BUBBLE_OFFSET_X, 0],
                            "cl cr": [-BUBBLE_OFFSET_X, 0],
                        } }, title)));
            }
            return titleElement;
        };
        this.renderIcon = (icon) => {
            if (icon) {
                const iconClasses = cx("gd-list-icon", icon);
                return React.createElement("span", { role: "icon", className: iconClasses });
            }
            return null;
        };
        this.renderSeparatorItem = () => {
            return (React.createElement("div", { role: "item-separator", className: cx("gd-list-item", "gd-list-item-separator", "s-list-separator", this.props.className) }));
        };
        this.renderHeaderItem = () => {
            return (React.createElement("div", { role: "item-header", className: cx("gd-list-item", "gd-list-item-header", "s-list-header", this.props.className) }, this.props.title));
        };
        this.renderInfo = () => {
            if (!this.props.info) {
                return null;
            }
            return (React.createElement("div", { role: "item-info", className: "gd-list-item-bubble s-list-item-info" },
                React.createElement(BubbleHoverTrigger, { tagName: "div", showDelay: 200, hideDelay: 0 },
                    React.createElement("div", { className: "inlineBubbleHelp" }),
                    React.createElement(Bubble, { className: "bubble-primary", alignPoints: [{ align: "cr cl" }], arrowOffsets: { "cr cl": [15, 0] } }, this.props.info))));
        };
        this.state = { isOverflowed: false };
    }
    componentDidMount() {
        this.checkOverflow();
    }
    componentDidUpdate() {
        this.checkOverflow();
    }
    checkOverflow() {
        if (this.titleRef.current) {
            // Checks if ellipsis has been applied on title span
            const isOverflowed = this.titleRef.current.offsetWidth < this.titleRef.current.scrollWidth;
            if (isOverflowed !== this.state.isOverflowed) {
                // eslint-disable-next-line react/no-did-mount-set-state
                this.setState({
                    isOverflowed,
                });
            }
        }
    }
    render() {
        const { icon, onClick, onMouseOver, onMouseOut, type } = this.props;
        if (type === "separator") {
            return this.renderSeparatorItem();
        }
        if (type === "header") {
            return this.renderHeaderItem();
        }
        return (React.createElement("div", { className: this.getClassNames(), onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut },
            this.renderIcon(icon),
            this.renderTitle(),
            this.renderInfo()));
    }
}
//# sourceMappingURL=ListItem.js.map