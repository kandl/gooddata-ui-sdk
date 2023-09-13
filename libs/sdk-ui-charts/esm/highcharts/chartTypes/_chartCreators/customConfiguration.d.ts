import { IDrillConfig } from "@gooddata/sdk-ui";
import { IChartConfig } from "../../../interfaces/index.js";
import { IUnsafeTooltipPositionerPointObject, IChartOptions } from "../../typings/unsafe.js";
import { IntlShape } from "react-intl";
import { HighchartsOptions } from "../../lib/index.js";
import { AxisLabelsFormatterCallbackFunction } from "highcharts";
import { ITheme } from "@gooddata/sdk-model";
export declare const TOOLTIP_PADDING = 24;
export declare const TOOLTIP_VIEWPORT_MARGIN_TOP = 20;
export declare function formatOverlappingForParentAttribute(category: any): string;
export declare function formatOverlapping(): string;
export declare function getTooltipPositionInChartContainer(chartType: string, stacking: string, labelWidth: number, labelHeight: number, point: IUnsafeTooltipPositionerPointObject): {
    x: number;
    y: number;
};
export declare function getTooltipPositionInViewPort(chartType: string, stacking: string, labelWidth: number, labelHeight: number, point: IUnsafeTooltipPositionerPointObject): {
    x: number;
    y: number;
};
export declare function percentageDataLabelFormatter(config?: IChartConfig): string;
export declare function firstValuePercentageLabelFormatter(config?: IChartConfig): string;
export declare function escapeCategories(dataCategories: any): any;
export declare function areAxisLabelsEnabled(chartOptions: IChartOptions, axisPropsName: keyof IChartOptions, shouldCheckForEmptyCategories: boolean): {
    enabled: boolean;
};
export declare const getFormatterProperty: (chartOptions: IChartOptions, axisPropsKey: "yAxisProps" | "xAxisProps" | "secondary_yAxisProps" | "secondary_xAxisProps", chartConfig: IChartConfig, axisFormat: string) => {
    formatter?: AxisLabelsFormatterCallbackFunction;
};
export declare function getCustomizedConfiguration(chartOptions: IChartOptions, chartConfig?: IChartConfig, drillConfig?: IDrillConfig, intl?: IntlShape, theme?: ITheme): HighchartsOptions;
//# sourceMappingURL=customConfiguration.d.ts.map