// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import noop from "lodash/noop.js";
/**
 * @internal
 */
class Button extends React.Component {
    constructor() {
        super(...arguments);
        this._onClick = (e) => {
            if (!this.props.disabled) {
                this.props.onClick(e);
            }
        };
    }
    render() {
        const { id, tagName, title, value, tabIndex, type, iconLeft, iconRight } = this.props;
        const TagName = tagName;
        return (React.createElement(TagName, { id: id, ref: (ref) => {
                this.buttonNode = ref;
            }, title: title, className: this.getClassnames(), type: type, onClick: this._onClick, tabIndex: tabIndex },
            this.renderIcon(iconLeft),
            value ? React.createElement("span", { className: "gd-button-text" }, value) : null,
            this.renderIcon(iconRight)));
    }
    getClassnames() {
        const { value } = this.props;
        const generatedSeleniumClass = value && typeof value === "string" ? `s-${stringUtils.simplifyText(value)}` : "";
        return cx({
            [this.props.className]: !!this.props.className,
            [generatedSeleniumClass]: true,
            ["gd-button"]: true,
            disabled: this.props.disabled,
        });
    }
    renderIcon(icon) {
        if (!icon) {
            return null;
        }
        return React.createElement("span", { className: cx("gd-button-icon", icon), role: "button-icon" });
    }
}
Button.defaultProps = {
    className: "",
    disabled: false,
    onClick: noop,
    tabIndex: -1,
    tagName: "button",
    title: "",
    type: "button",
    value: "",
    iconLeft: null,
    iconRight: null,
};
export { Button };
//# sourceMappingURL=Button.js.map