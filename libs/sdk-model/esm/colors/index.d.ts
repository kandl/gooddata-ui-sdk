import { IMetadataObject } from "../ldm/metadata/index.js";
/**
 * RGB Color value specification.
 *
 * @public
 */
export interface IRgbColorValue {
    r: number;
    g: number;
    b: number;
}
/**
 * An item in user-defined color palette. Item is essentially mapping of user-assigned
 * color identifier to an RGB Color value.
 *
 * @public
 */
export interface IColorPaletteItem {
    guid: string;
    fill: IRgbColorValue;
}
/**
 * Type guard checking whether the provided object is a {@link IColorPaletteItem}
 *
 * @public
 */
export declare function isColorPaletteItem(obj: unknown): obj is IColorPaletteItem;
/**
 * User-defined color palette. Colors from the palette can be used as input to charts and naturally
 * influence the coloring strategy for the chart.
 *
 * @public
 */
export type IColorPalette = IColorPaletteItem[];
/**
 * @public
 */
export type GuidType = "guid";
/**
 * @public
 */
export type RgbType = "rgb";
/**
 * Color defined by referencing an item in the user-defined color palette.
 *
 * @public
 */
export interface IColorFromPalette {
    type: GuidType;
    value: string;
}
/**
 * Color defined used RGB values.
 *
 * @public
 */
export interface IRgbColor {
    type: RgbType;
    value: IRgbColorValue;
}
/**
 * A color. It can be specified by referencing an item from from user-defined color palette or by RGB Value.
 *
 * @public
 */
export type IColor = IColorFromPalette | IRgbColor;
/**
 * Color palette metadata object
 *
 * @alpha
 */
export interface IColorPaletteMetadataObject extends IMetadataObject {
    readonly type: "colorPalette";
    readonly colorPalette: IColorPalette;
}
/**
 * Color palette definition represents modified or created theme
 *
 * @alpha
 */
export interface IColorPaletteDefinition extends Partial<IMetadataObject> {
    readonly type: "colorPalette";
    readonly colorPalette: IColorPalette;
}
/**
 * Type guard checking whether the provided object is a {@link IColorFromPalette}
 *
 * @public
 */
export declare function isColorFromPalette(obj: unknown): obj is IColorFromPalette;
/**
 * Type guard checking whether the provided object is a {@link IRgbColor}
 *
 * @public
 */
export declare function isRgbColor(obj: unknown): obj is IRgbColor;
/**
 * Returns RGB code representing the color in the provided color palette items.
 *
 * @param item - color palette item
 * @returns an `rgb(red#,green#,blue#)` code
 * @public
 */
export declare function colorPaletteItemToRgb(item: IColorPaletteItem): string;
/**
 * Returns a list of RGB color codes for all items in the provided color palette.
 *
 * @param palette - color palette
 * @returns list with the same cardinality as the color palette. RGB colors appear in the same order in which
 * they appear in the palette
 * @public
 */
export declare function colorPaletteToColors(palette: IColorPalette): string[];
//# sourceMappingURL=index.d.ts.map