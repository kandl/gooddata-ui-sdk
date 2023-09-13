import { isColorFromPalette, } from "@gooddata/sdk-model";
import { getColorByGuid, getColorFromMapping, getRgbStringFromRGB } from "./color.js";
import uniqBy from "lodash/uniqBy.js";
/**
 * @internal
 */
export class ColorStrategy {
    palette;
    fullColorAssignment;
    outputColorAssignment;
    theme;
    constructor(colorPalette, colorMapping, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    viewByAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    stackByAttribute, dv, theme) {
        this.theme = theme;
        const { fullColorAssignment, outputColorAssignment } = this.createColorAssignment(colorPalette, colorMapping, viewByAttribute, stackByAttribute, dv);
        this.fullColorAssignment = fullColorAssignment;
        this.outputColorAssignment = outputColorAssignment ? outputColorAssignment : fullColorAssignment;
        this.palette = this.createPalette(colorPalette, this.fullColorAssignment, viewByAttribute, stackByAttribute);
    }
    getColorByIndex(index) {
        return this.palette[index];
    }
    getColorAssignment() {
        return this.outputColorAssignment;
    }
    getFullColorAssignment() {
        return this.fullColorAssignment;
    }
    createPalette(colorPalette, colorAssignment, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _viewByAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _stackByAttribute) {
        return colorAssignment.map((map, index) => {
            const color = isColorFromPalette(map.color)
                ? getColorByGuid(colorPalette, map.color.value, index)
                : map.color.value;
            return getRgbStringFromRGB(color);
        });
    }
}
//
// These functions are often used when constructing custom strategies
//
/**
 * @internal
 */
export function isValidMappedColor(colorItem, colorPalette) {
    if (!colorItem) {
        return false;
    }
    if (colorItem.type === "guid") {
        return isColorItemInPalette(colorItem, colorPalette);
    }
    return true;
}
/**
 * @internal
 */
function isColorItemInPalette(colorItem, colorPalette) {
    return colorPalette.some((paletteItem) => {
        return colorItem.type === "guid" && colorItem.value === paletteItem.guid;
    });
}
/**
 * @internal
 */
export function getAttributeColorAssignment(
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
attribute, colorPalette, colorMapping, dv) {
    let currentColorPaletteIndex = 0;
    const uniqItems = uniqBy(attribute.items, "attributeHeaderItem.uri");
    return uniqItems.map((headerItem) => {
        const mappedColor = getColorFromMapping(headerItem, colorMapping, dv);
        const color = mappedColor && isValidMappedColor(mappedColor, colorPalette)
            ? mappedColor
            : {
                type: "guid",
                value: colorPalette[currentColorPaletteIndex % colorPalette.length].guid,
            };
        currentColorPaletteIndex++;
        return {
            headerItem,
            color,
        };
    });
}
//# sourceMappingURL=base.js.map