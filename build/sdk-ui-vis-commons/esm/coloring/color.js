// (C) 2007-2023 GoodData Corporation
import { isAttributeDescriptor, isColorDescriptor, isResultAttributeHeader, } from "@gooddata/sdk-model";
import { DefaultColorPalette, getMappingHeaderLocalIdentifier, } from "@gooddata/sdk-ui";
import isEqual from "lodash/isEqual.js";
import isEmpty from "lodash/isEmpty.js";
/**
 * @internal
 */
function lighter(color, percent) {
    const t = percent < 0 ? 0 : 255;
    const p = Math.abs(percent);
    return Math.round((t - color) * p) + color;
}
/**
 * @internal
 */
function formatColor(red, green, blue) {
    return `rgb(${red},${green},${blue})`;
}
/**
 * @internal
 */
export function parseRGBColorCode(color) {
    const f = color.split(",");
    const R = parseInt(f[0].slice(4), 10);
    const G = parseInt(f[1], 10);
    const B = parseInt(f[2], 10);
    return { R, G, B };
}
/**
 * Source:
 *     http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @internal
 */
export function getLighterColor(color, percent) {
    const { R, G, B } = parseRGBColorCode(color);
    return formatColor(lighter(R, percent), lighter(G, percent), lighter(B, percent));
}
/**
 * @internal
 */
export function getLighterColorFromRGB(color, percent) {
    const { r, g, b } = color;
    return {
        r: lighter(r, percent),
        g: lighter(g, percent),
        b: lighter(b, percent),
    };
}
/**
 * Takes short or long format of HEX color and returns long format.
 * @param color - short `#123` or long `#112233` format
 * @returns long hex format `#112233`
 */
function convertToLongHexFormat(color) {
    if (color.length === 4) {
        const [r, g, b] = color.split("").slice(1);
        return "#" + r + r + g + g + b + b;
    }
    return color;
}
/**
 * @internal
 */
export function normalizeColorToRGB(color) {
    if (typeof color !== "string") {
        return color;
    }
    if (color.slice(0, 3) === "rgb") {
        return color.replace(/\s/g, "");
    }
    const hexPattern = /#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/i;
    return convertToLongHexFormat(color).replace(hexPattern, (_prefix, r, g, b) => {
        return `rgb(${[r, g, b].map((value) => parseInt(value, 16).toString(10)).join(",")})`;
    });
}
/**
 * @internal
 */
export function getColorPaletteFromColors(colors) {
    try {
        return colors.map((color, index) => {
            const { R, G, B } = parseRGBColorCode(normalizeColorToRGB(color));
            if (isNaN(R) || isNaN(G) || isNaN(B)) {
                throw Error;
            }
            return {
                guid: String(index),
                fill: {
                    r: R,
                    g: G,
                    b: B,
                },
            };
        });
    }
    catch (_ignored) {
        return DefaultColorPalette;
    }
}
/**
 * @internal
 */
export function getRgbString(color) {
    return `rgb(${color.fill.r},${color.fill.g},${color.fill.b})`;
}
/**
 * @internal
 */
export function isCustomPalette(palette) {
    return !isEqual(palette, DefaultColorPalette);
}
/**
 * @internal
 */
export function getColorFromMapping(mappingHeader, colorMapping, dv) {
    if (!colorMapping) {
        return undefined;
    }
    const mapping = colorMapping.find((item) => item.predicate(mappingHeader, { dv }));
    return mapping?.color;
}
/**
 * @internal
 */
export function getColorByGuid(colorPalette, guid, index) {
    const inPalette = colorPalette.find((item) => item.guid === guid);
    return inPalette ? inPalette.fill : colorPalette[index % colorPalette.length].fill;
}
/**
 * @internal
 */
export function getRgbStringFromRGB(color) {
    return `rgb(${color.r},${color.g},${color.b})`;
}
/**
 * @internal
 */
export function parseRGBString(color) {
    const normalizedColor = normalizeColorToRGB(color);
    const result = /rgb\((.*)\)/.exec(normalizedColor);
    if (result === null) {
        return null;
    }
    const values = result[1];
    const [r, g, b] = values.split(",").map((i) => parseInt(i));
    return { r, g, b };
}
/**
 * Creates new predicate for mapping colors to chart entities:
 *
 * -  if attribute header, URI is expected to match testValue
 * -  otherwise (attr or measure descriptor) expecting local identifier match
 *
 * @param testValue - right hand side to test against
 * @public
 */
export function getColorMappingPredicate(testValue) {
    return (header) => {
        if (isResultAttributeHeader(header)) {
            return testValue || testValue === null || testValue === ""
                ? testValue === header.attributeHeaderItem.uri
                : false;
        }
        if (isAttributeDescriptor(header)) {
            // check both to support ref by uri and ref by identifier
            return testValue
                ? testValue === header.attributeHeader.uri || testValue === header.attributeHeader.identifier
                : false;
        }
        if (isColorDescriptor(header)) {
            return testValue ? testValue === header.colorHeaderItem.id : false;
        }
        const headerLocalIdentifier = getMappingHeaderLocalIdentifier(header);
        return headerLocalIdentifier ? headerLocalIdentifier === testValue : false;
    };
}
/**
 * Applies color properties preferences. If palette is specified and non-empty, it is returned. Otherwise
 * non-empty colors are transformed into a palette and returned. If all else fails, default color palette
 * is returned
 *
 * @internal
 */
export function getValidColorPalette(colors, colorPalette) {
    if (colorPalette && !isEmpty(colorPalette)) {
        return colorPalette;
    }
    if (colors && !isEmpty(colors)) {
        return getColorPaletteFromColors(colors);
    }
    return DefaultColorPalette;
}
// For re-exporting in index.ts
// Create object here since TSC can't reexport external types used by getColorMappingPredicate
/**
 * @internal
 */
export const ColorUtils = {
    getColorByGuid,
    getColorMappingPredicate,
};
//# sourceMappingURL=color.js.map