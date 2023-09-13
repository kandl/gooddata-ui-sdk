import Highcharts from "../../lib/index.js";
import { IRectBySize, IAxisRangeForAxes } from "./helpers.js";
import { IDataLabelsVisible, IChartConfig } from "../../../interfaces/index.js";
import { StackingType } from "../../constants/stacking.js";
export declare function isLabelOverlappingItsShape(point: any): boolean;
export declare const getDataLabelsGdcVisible: (chart: Highcharts.Chart) => boolean | string;
export declare const getDataLabelsGdcTotalsVisible: (chart: Highcharts.Chart) => boolean | string;
export declare const areLabelsStacked: (chart: Highcharts.Chart) => boolean;
export declare const hasDataLabel: (point: any) => boolean;
export declare const hasShape: (point: any) => boolean;
export declare const hasLabelInside: (point: any) => boolean;
export declare const minimizeDataLabel: (point: any) => void;
export declare const hideDataLabel: (point: any) => void;
export declare const showDataLabel: (point: any) => void;
export declare const hideDataLabels: (points: any[]) => void;
export declare const showDataLabels: (points: any[]) => void;
export interface IInsideResult {
    vertically: boolean;
    horizontally: boolean;
}
export declare function showDataLabelInAxisRange(point: any, value: number, axisRangeForAxes: IAxisRangeForAxes): void;
export declare function showStackLabelInAxisRange(point: any, axisRangeForAxes: IAxisRangeForAxes): void;
export declare const hideAllLabels: ({ series }: {
    series: Highcharts.Series[];
}) => void;
export declare const showAllLabels: ({ series }: {
    series: Highcharts.Series[];
}) => void;
export declare function setStackVisibilityByOpacity(stackTotalGroup: Highcharts.SVGAttributes, visible: boolean): void;
export declare function getDataLabelAttributes(point: any): IRectBySize;
export declare function intersectsParentLabel(point: any, points: any[]): boolean;
export declare function getShapeVisiblePart(shape: any, chart: any, wholeSize: number): number;
export declare function getLabelStyle(type: string, stacking: StackingType): Highcharts.CSSObject;
/**
 * A callback function to format data label and `this` is required by Highchart
 * Ref: https://api.highcharts.com/highcharts/yAxis.labels.formatter
 */
export declare function formatAsPercent(unit?: number): string;
export declare function isInPercent(format?: string): boolean;
export declare function getTotalsVisibility(chartConfig: IChartConfig): IDataLabelsVisible;
export declare function getTotalsVisibilityConfig(type: string, chartConfig?: IChartConfig): Highcharts.DataLabelsOptions;
export declare function getLabelsVisibilityConfig(visible: IDataLabelsVisible): Highcharts.DataLabelsOptions;
//# sourceMappingURL=dataLabelsHelpers.d.ts.map