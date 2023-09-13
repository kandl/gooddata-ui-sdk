import Highcharts from "../../../lib/index.js";
import { UnsafeInternals, IUnsafeDataLabels, IStackItem } from "../../../typings/unsafe.js";
export declare function isOverlappingWidth(visiblePoints: Highcharts.Point[]): boolean;
export declare function areNeighborsOverlapping(neighbors: IUnsafeDataLabels[][]): boolean;
export declare function areLabelsOverlappingColumns(labels: Highcharts.Point[], visiblePoints: Highcharts.Point[]): boolean;
/**
 * Merge stack label points from axes to one
 * Primary axis:    [pointP1, pointP2, pointP3]
 * Secondary axis:  [pointS1, pointS2, pointS3]
 * @returns [pointP1, pointS1, pointP2, pointS2, pointP3, pointS3]
 */
export declare function getStackLabelPointsForDualAxis(stacks: UnsafeInternals[]): Highcharts.Point[];
export declare function getStackTotalGroups(yAxis: Highcharts.Axis[]): Highcharts.SVGAttributes[];
export declare const autohideColumnTotalLabels: (chart: Highcharts.Chart) => void;
export declare const autohideColumnLabels: (chart: Highcharts.Chart) => void;
export declare const handleColumnLabelsOutsideChart: (chart: Highcharts.Chart) => void;
export declare function getLabelOrDataLabelForPoints(points: Highcharts.Point[]): Highcharts.Point[];
export declare function getStackItems(yAxis: Highcharts.Axis[]): IStackItem[];
//# sourceMappingURL=autohideColumnLabels.d.ts.map