import { IPushpinColor } from "../../GeoChart.js";
import { IColorLegendItem, IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
export declare function getColorIndexInPalette(value: number | null, min: number, max: number): number;
type ColorPaletteMapping = {
    [itemName: string]: string[];
};
export declare function getColorPaletteMapping(colorStrategy: IColorStrategy): ColorPaletteMapping;
/**
 * Return RGB border and background colors base on color and segment values
 *
 * Example:
 * ```
 *  [any-number] => [{
 *       border: "rgb(127,224,198)",
 *       background: "rgb(215,242,250)",
 *  }]
 * ```
 */
export declare function getPushpinColors(colorValues: Array<number | null>, segmentValues: string[] | undefined, colorStrategy: IColorStrategy): IPushpinColor[];
export declare function generateLegendColorData(colorSeries: number[], colorString: string): IColorLegendItem[];
export {};
//# sourceMappingURL=geoChartColor.d.ts.map