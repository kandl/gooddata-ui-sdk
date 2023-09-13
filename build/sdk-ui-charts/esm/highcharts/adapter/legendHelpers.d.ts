import { IntlShape } from "react-intl";
import { ISeriesItem, IChartOptions } from "../typings/unsafe.js";
export declare const RESPONSIVE_ITEM_MIN_WIDTH = 200;
export declare const RESPONSIVE_VISIBLE_ROWS = 2;
export declare const FLUID_PAGING_WIDTH = 30;
export declare const LEGEND_PADDING = 12;
export declare const ITEM_HEIGHT = 20;
export declare const SKIPPED_LABEL_TEXT = "...";
export declare const UTF_NON_BREAKING_SPACE = "\u00A0";
export declare function calculateFluidLegend(seriesCount: number, containerWidth: number): {
    hasPaging: boolean;
    itemWidth: number;
    visibleItemsCount: number;
};
export declare function calculateStaticLegend(seriesCount: number, containerHeight: number): {
    hasPaging: boolean;
    visibleItemsCount: number;
};
export declare const LEGEND_AXIS_INDICATOR = "legendAxisIndicator";
export declare const LEGEND_SEPARATOR = "legendSeparator";
export declare function groupSeriesItemsByType(series: ISeriesItem[]): {
    [key: string]: ISeriesItem[];
};
export declare function getComboChartSeries(series: any[]): any[];
export declare function createDualAxesSeriesMapper(chartType: string): (series: any[]) => any[];
export declare function transformToDualAxesSeries(series: any[], chartType: string): any[];
export declare function isStackedChart(chartOptions: IChartOptions): boolean;
export declare function createWaterfallLegendItems(chartOptions: IChartOptions, intl: IntlShape): {
    name: string;
    color: string;
    legendIndex: number;
}[];
//# sourceMappingURL=legendHelpers.d.ts.map