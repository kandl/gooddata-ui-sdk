import { IWidgetAlertBase } from "@gooddata/sdk-model";
export declare function thresholdFromDecimalToPercent(threshold: number): number;
export declare function thresholdFromPercentToDecimal(threshold: number): number;
export declare function evaluateAlertTriggered(kpiMeasureResult: number, threshold: number, when: IWidgetAlertBase["whenTriggered"]): boolean;
