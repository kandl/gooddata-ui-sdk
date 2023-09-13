import { IChartLimits } from "../../../interfaces/index.js";
import { IChartOptions, ISeriesItem } from "../../typings/unsafe.js";
export interface IValidationResult {
    dataTooLarge: boolean;
    hasNegativeValue: boolean;
}
export declare function isNegativeValueIncluded(series: ISeriesItem[]): boolean;
export declare function cannotShowNegativeValues(type: string): boolean;
export declare function validateData(limits: IChartLimits, chartOptions: IChartOptions): IValidationResult;
/**
 * Creates a message for onDataTooLarge error, which contains the limits which were exceeded.
 */
export declare function getDataTooLargeErrorMessage(limits: IChartLimits, chartOptions: IChartOptions): string;
//# sourceMappingURL=chartLimits.d.ts.map