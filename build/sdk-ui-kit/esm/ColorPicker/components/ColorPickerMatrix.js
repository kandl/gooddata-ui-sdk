// (C) 2007-2022 GoodData Corporation
import React, { PureComponent } from "react";
import cx from "classnames";
import { getColorStyle, SATURATION_ARRAY } from "../utils.js";
export class ColorPickerMatrix extends PureComponent {
    render() {
        return (React.createElement("div", { className: "color-picker-component" },
            React.createElement(ColorPickerRow, { lightness: 0.7, initColor: this.props.initColor, onColorSelected: this.props.onColorSelected }),
            React.createElement(ColorPickerRow, { lightness: 0.5, initColor: this.props.initColor, onColorSelected: this.props.onColorSelected }),
            React.createElement(ColorPickerRow, { lightness: 0.3, initColor: this.props.initColor, onColorSelected: this.props.onColorSelected })));
    }
}
class ColorPickerRow extends PureComponent {
    getCellClassNames(hslColor) {
        return cx("color-picker-cell", `s-color-${Math.floor(hslColor.h + (hslColor.s + hslColor.l) * 100)}`);
    }
    render() {
        return (React.createElement("div", { className: "color-picker-row" }, SATURATION_ARRAY.map((saturation) => {
            const newColor = {
                h: this.props.initColor.h,
                s: saturation,
                l: this.props.lightness,
            };
            return (React.createElement("div", { role: "color", tabIndex: -1, key: this.props.lightness + saturation, className: this.getCellClassNames(newColor), style: getColorStyle(newColor), onClick: () => this.props.onColorSelected(newColor) }));
        })));
    }
}
//# sourceMappingURL=ColorPickerMatrix.js.map