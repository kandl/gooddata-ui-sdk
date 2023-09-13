import { IMeasureGroupDescriptor } from "@gooddata/sdk-model";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { IChartConfig } from "../../../interfaces/index.js";
import { StackingType } from "../../constants/stacking.js";
import { ISeriesItem } from "../../typings/unsafe.js";
export declare const CHART_ORDER: Record<string, number>;
/**
 * @internal
 */
export declare const COMBO_SUPPORTED_CHARTS: ("area" | "line" | "column")[];
export declare function getComboChartSeries(config: IChartConfig, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], series: ISeriesItem[], dv: DataViewFacade): ISeriesItem[];
export declare function canComboChartBeStackedInPercent(series: ISeriesItem[]): boolean;
export declare function getComboChartStackingConfig(config: IChartConfig, series: ISeriesItem[], defaultStacking: StackingType): StackingType;
//# sourceMappingURL=comboChartOptions.d.ts.map