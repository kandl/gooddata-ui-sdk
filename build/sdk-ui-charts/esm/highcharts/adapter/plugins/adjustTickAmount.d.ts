/**
 * Highcharts extension that overwrites 'axis.adjustTickAmount' of Highcharts
 * Original code snippet
 *      https://github.com/highcharts/highcharts/blob/b54fe33d91c0d1fd7da009aaa84af694f15cffad/js/parts/Axis.js#L4214
 *
 * Modified by `binh.nguyen@gooddata.com` to support zero alignment
 *
 * Relying on undocumented internal properties of Highcharts.Axis
 *  - visible
 *  - tickAmount
 *  - tickInterval
 *  - transA
 *  - opposite
 */
import Highcharts from "../../lib/index.js";
export declare const ALIGNED = 0;
export declare const MOVE_ZERO_LEFT = -1;
export declare const MOVE_ZERO_RIGHT = 1;
export declare const Y_AXIS_SCORE: {
    NO_DATA: number;
    ONLY_NEGATIVE_OR_POSITIVE_DATA: number;
    NEGATIVE_AND_POSITIVE_DATA: number;
};
/**
 * Get direction to make secondary axis align to primary axis
 * @returns
 *     -1: move zero index to left
 *      0: it aligns
 *      1: move zero index to right
 */
export declare function getDirection(primaryAxis: Highcharts.Axis, secondaryAxis: Highcharts.Axis): number;
/**
 * Add or reduce ticks
 */
export declare function adjustTicks(axis: Highcharts.Axis): void;
export declare function getSelectionRange(axis: Highcharts.Axis): number[];
/**
 * Get axis score that increase 1 for data having positive and negative values
 */
export declare function getYAxisScore(axis: Highcharts.Axis): number;
export declare function alignToBaseAxis(yAxis: Highcharts.Axis, baseYAxis: Highcharts.Axis): void;
/**
 * Prevent data is cut off by increasing tick interval to zoom out axis
 * Only apply to chart without user-input min/max
 */
export declare function preventDataCutOff(axis: Highcharts.Axis): void;
/**
 * Copy and modify Highcharts behavior
 */
export declare function customAdjustTickAmount(): void;
/**
 * Decide whether run default or custom behavior
 *
 * @returns true as leaving to HC, otherwise false as running custom behavior
 */
export declare function shouldBeHandledByHighcharts(axis: Highcharts.Axis): boolean;
export declare const adjustTickAmount: (HighchartsInstance: any) => void;
//# sourceMappingURL=adjustTickAmount.d.ts.map