/**
 * Calculate new min/max to make Y axes aligned, and insert them to Highcharts config
 *
 * Inspired by
 *      Author:  Christos Koumenides
 *      Page:    https://www.highcharts.com/products/plugin-registry/single/42/Zero-align%20y-axes
 *      Github:  https://github.com/chriskmnds/highcharts-zero-align-y-axes
 *
 * Modified by `binh.nguyen@gooddata.com` to support min/max configuration
 */
import { StackingType } from "../../constants/stacking.js";
import { IChartOptions } from "../../typings/unsafe.js";
export interface ICanon {
    min?: number;
    max?: number;
}
export type IMinMax = ICanon;
export interface IMinMaxInfo extends ICanon {
    id: number;
    isSetMin: boolean;
    isSetMax: boolean;
}
export interface IMinMaxLookup {
    [key: number]: IMinMaxInfo;
}
export declare function getMinMax(axisIndex: number, min: number, max: number, minmax: IMinMaxInfo[]): IMinMax;
export declare function getMinMaxInfo(config: any, stacking: StackingType, type: string): IMinMaxInfo[];
/**
 * Convert number to percent base on total of column
 * From
 *  [
 *      [1, [3, [4, [null,  [20,
 *       4]  7] -6]  null],  null]
 *  ]
 * to
 *  [
 *      [20, [30, [40, [  , [100
 *       80]  70] -60]  ]      ]
 *  ]
 */
export declare function convertNumberToPercent(yData: number[][]): number[][];
/**
 * Calculate new min/max to make Y axes aligned
 */
export declare function getZeroAlignConfiguration(chartOptions: IChartOptions, config: any): any;
//# sourceMappingURL=getZeroAlignConfiguration.d.ts.map