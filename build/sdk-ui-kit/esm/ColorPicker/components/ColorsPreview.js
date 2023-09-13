// (C) 2007-2022 GoodData Corporation
import React, { PureComponent } from "react";
import { getColorStyle } from "../utils.js";
class ColorsPreview extends PureComponent {
    render() {
        return (React.createElement("div", { className: "color-picker-preview" },
            React.createElement(ColorItem, { id: "current-color", hslColor: this.props.currentHslColor, textLabel: this.props.currentTextLabel }),
            React.createElement(ColorItem, { id: "new-color", hslColor: this.props.draftHslColor, textLabel: this.props.draftTextLabel })));
    }
}
ColorsPreview.defaultProps = {
    currentTextLabel: "current",
    draftTextLabel: "new",
};
export { ColorsPreview };
class ColorItem extends PureComponent {
    render() {
        return (React.createElement("div", { className: "color-picker-value-wrapper" },
            React.createElement("div", { "aria-label": this.props.id, className: `color-value s-${this.props.id}`, style: getColorStyle(this.props.hslColor) }),
            React.createElement("span", null, this.props.textLabel)));
    }
}
//# sourceMappingURL=ColorsPreview.js.map