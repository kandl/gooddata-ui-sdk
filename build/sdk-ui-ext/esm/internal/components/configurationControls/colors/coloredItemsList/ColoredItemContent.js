// (C) 2019-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { IconPosition } from "../colorDropdown/ColorDropdown.js";
export default class ColoredItemContent extends React.PureComponent {
    render() {
        return (React.createElement("div", { className: this.getClassName() },
            React.createElement("div", { className: this.getIconStyle(), style: { backgroundColor: this.getBackgroundColor() } }),
            React.createElement("span", null, this.props.text)));
    }
    getIconStyle() {
        const { r, g, b } = this.props.color;
        const iconStyle = this.props.position === IconPosition.Right ? "gd-icon-navigateright" : "gd-icon-navigatedown";
        const iconSelector = `s-color-${r}-${g}-${b}`;
        return `gd-color-config-item-sample ${iconStyle} ${iconSelector}`;
    }
    getClassName() {
        const { isSelected, disabled } = this.props;
        return cx("gd-list-item gd-color-config-list-item s-colored-items-list-item", {
            "is-active": isSelected && !disabled,
            "is-disabled": disabled,
            "s-is-disabled": disabled,
        });
    }
    getBackgroundColor() {
        const { r, g, b } = this.props.color;
        return `rgba(${r},${g},${b},1)`;
    }
}
//# sourceMappingURL=ColoredItemContent.js.map