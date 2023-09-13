import { VisType } from "@gooddata/sdk-ui";
import { IChartConfig, ChartAlignTypes } from "../../../interfaces/index.js";
import Highcharts from "../../lib/index.js";
import { ISeriesItem, IChartOptions } from "../../typings/unsafe.js";
export interface IRectByPoints {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export interface IRectBySize {
    x: number;
    y: number;
    width: number;
    height: number;
    show?: () => void;
    hide?: () => void;
}
export declare const rectanglesAreOverlapping: (r1: IRectByPoints, r2: IRectByPoints, padding?: number) => boolean;
export declare const isIntersecting: (r1: IRectBySize, r2: IRectBySize) => boolean;
export declare const toNeighbors: (array: any[]) => any[];
export declare const getVisibleSeries: (chart: Highcharts.Chart) => Highcharts.Series[];
export declare const getHiddenSeries: (chart: Highcharts.Chart) => Highcharts.Series[];
export declare const getDataPoints: (series: Highcharts.Series[]) => Highcharts.Point[];
export declare const getDataPointsOfVisibleSeries: (chart: Highcharts.Chart) => Highcharts.Point[];
export declare const getChartType: (chart: Highcharts.Chart) => string | undefined;
export declare const isStacked: (chart: Highcharts.Chart) => boolean;
export declare function getChartProperties(config: IChartConfig, type: VisType): any;
export declare const getPointPositions: (point: any) => {
    shape: DOMRect;
    label: DOMRect;
    labelPadding: any;
    show: () => void;
    hide: () => void;
};
export declare function getShapeAttributes(point: any): IRectBySize;
export declare function shouldFollowPointerForDualAxes(chartOptions: IChartOptions): boolean;
export declare function shouldFollowPointer(chartOptions: IChartOptions): boolean;
export declare function getStackedMaxValue(series: ISeriesItem[]): number;
export declare function getStackedMinValue(series: ISeriesItem[]): number;
export declare function shouldStartOnTick(chartOptions: IChartOptions, axisPropsKey?: "yAxisProps" | "secondary_yAxisProps"): boolean;
export declare function shouldEndOnTick(chartOptions: IChartOptions, axisPropsKey?: "yAxisProps" | "secondary_yAxisProps"): boolean;
export declare function shouldXAxisStartOnTickOnBubbleScatter(chartOptions: IChartOptions): boolean;
export declare function shouldYAxisStartOnTickOnBubbleScatter(chartOptions: IChartOptions): boolean;
export interface IAxisRange {
    minAxisValue: number;
    maxAxisValue: number;
}
export interface IAxisRangeForAxes {
    first?: IAxisRange;
    second?: IAxisRange;
}
export declare function getAxisRangeForAxes(chart: Highcharts.Chart): IAxisRangeForAxes;
export declare function pointInRange(pointValue: number, axisRange: IAxisRange): boolean;
export declare function alignChart(chart: Highcharts.Chart, verticalAlign?: ChartAlignTypes): void;
//# sourceMappingURL=helpers.d.ts.map