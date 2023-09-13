// (C) 2019-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import ColorPaletteItem from "./ColorPaletteItem";
const MAX_SMALL_PALETTE_SIZE = 20;
export default class ColorPalette extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onColorSelected = (color) => {
            this.props.onColorSelected(color);
        };
    }
    render() {
        return (React.createElement("div", { "aria-label": "Color palette", className: this.getClassNames() }, this.renderItems()));
    }
    getClassNames() {
        const isColorPaletteLarge = this.isColorPaletteLarge();
        return cx({
            "gd-color-drop-down-list-large": isColorPaletteLarge,
            "gd-color-drop-down-list": !isColorPaletteLarge,
        }, "s-color-drop-down-list");
    }
    renderItems() {
        return this.props.colorPalette.map((item) => {
            return (React.createElement(ColorPaletteItem, { selected: this.isItemSelected(item.guid), key: item.guid, paletteItem: item, onColorSelected: this.onColorSelected }));
        });
    }
    isColorPaletteLarge() {
        return this.props.colorPalette.length > MAX_SMALL_PALETTE_SIZE;
    }
    isItemSelected(guid) {
        return this.props.selectedColorGuid === guid;
    }
}
//# sourceMappingURL=ColorPalette.js.map