// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
function isRgbChannel(c) {
    return c !== undefined && typeof c === "number" && c >= 0 && c < 256;
}
function isRgbColorValue(obj) {
    if (!isEmpty(obj)) {
        const { r, g, b } = obj;
        return isRgbChannel(r) && isRgbChannel(g) && isRgbChannel(b);
    }
    return false;
}
/**
 * Type guard checking whether the provided object is a {@link IColorPaletteItem}
 *
 * @public
 */
export function isColorPaletteItem(obj) {
    if (!isEmpty(obj)) {
        const { guid, fill } = obj;
        return typeof guid === "string" && guid !== undefined && isRgbColorValue(fill);
    }
    return false;
}
//
// Type guards
//
/**
 * Type guard checking whether the provided object is a {@link IColorFromPalette}
 *
 * @public
 */
export function isColorFromPalette(obj) {
    return !isEmpty(obj) && obj.type === "guid";
}
/**
 * Type guard checking whether the provided object is a {@link IRgbColor}
 *
 * @public
 */
export function isRgbColor(obj) {
    return !isEmpty(obj) && obj.type === "rgb";
}
/**
 * Returns RGB code representing the color in the provided color palette items.
 *
 * @param item - color palette item
 * @returns an `rgb(red#,green#,blue#)` code
 * @public
 */
export function colorPaletteItemToRgb(item) {
    const { r, g, b } = item.fill;
    return `rgb(${r},${g},${b})`;
}
/**
 * Returns a list of RGB color codes for all items in the provided color palette.
 *
 * @param palette - color palette
 * @returns list with the same cardinality as the color palette. RGB colors appear in the same order in which
 * they appear in the palette
 * @public
 */
export function colorPaletteToColors(palette) {
    return palette.map(colorPaletteItemToRgb);
}
//# sourceMappingURL=index.js.map