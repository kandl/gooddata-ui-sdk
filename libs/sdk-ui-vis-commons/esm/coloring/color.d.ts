import { IColor, IColorPalette, IColorPaletteItem, IRgbColorValue } from "@gooddata/sdk-model";
import { DataViewFacade, IHeaderPredicate, IMappingHeader } from "@gooddata/sdk-ui";
import { IColorMapping } from "./types.js";
/**
 * @internal
 */
export declare function parseRGBColorCode(color: string): {
    R: number;
    G: number;
    B: number;
};
/**
 * Source:
 *     http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @internal
 */
export declare function getLighterColor(color: string, percent: number): string;
/**
 * @internal
 */
export declare function getLighterColorFromRGB(color: IRgbColorValue, percent: number): IRgbColorValue;
/**
 * @internal
 */
export declare function normalizeColorToRGB(color: string): string;
/**
 * @internal
 */
export declare function getColorPaletteFromColors(colors: string[]): IColorPalette;
/**
 * @internal
 */
export declare function getRgbString(color: IColorPaletteItem): string;
/**
 * @internal
 */
export declare function isCustomPalette(palette: IColorPalette): boolean;
/**
 * @internal
 */
export declare function getColorFromMapping(mappingHeader: IMappingHeader, colorMapping: IColorMapping[], dv: DataViewFacade): IColor | undefined;
/**
 * @internal
 */
export declare function getColorByGuid(colorPalette: IColorPalette, guid: string, index: number): IRgbColorValue;
/**
 * @internal
 */
export declare function getRgbStringFromRGB(color: IRgbColorValue): string;
/**
 * @internal
 */
export declare function parseRGBString(color: string): IRgbColorValue | null;
/**
 * Creates new predicate for mapping colors to chart entities:
 *
 * -  if attribute header, URI is expected to match testValue
 * -  otherwise (attr or measure descriptor) expecting local identifier match
 *
 * @param testValue - right hand side to test against
 * @public
 */
export declare function getColorMappingPredicate(testValue: string): IHeaderPredicate;
/**
 * Applies color properties preferences. If palette is specified and non-empty, it is returned. Otherwise
 * non-empty colors are transformed into a palette and returned. If all else fails, default color palette
 * is returned
 *
 * @internal
 */
export declare function getValidColorPalette(colors?: string[], colorPalette?: IColorPalette): IColorPalette;
/**
 * @internal
 */
export declare const ColorUtils: {
    getColorByGuid: typeof getColorByGuid;
    getColorMappingPredicate: typeof getColorMappingPredicate;
};
//# sourceMappingURL=color.d.ts.map