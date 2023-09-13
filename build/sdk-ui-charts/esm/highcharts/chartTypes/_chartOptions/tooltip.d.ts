import { ISeparators } from "@gooddata/sdk-model";
import { IUnsafeHighchartsTooltipPoint } from "../../typings/unsafe.js";
export declare function formatValueForTooltip(value: string | number, format: string, separators?: ISeparators): string;
export declare function getFormattedValueForTooltip(isDualChartWithRightAxis: boolean, stackMeasuresToPercent: boolean, point: IUnsafeHighchartsTooltipPoint, separators?: ISeparators, percentageValue?: number): string;
//# sourceMappingURL=tooltip.d.ts.map