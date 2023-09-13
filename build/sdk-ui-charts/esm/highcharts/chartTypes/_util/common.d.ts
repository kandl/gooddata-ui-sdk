import setWith from "lodash/setWith.js";
import { IChartOptions } from "../../typings/unsafe.js";
import { ChartOrientationType, IChartConfig } from "../../../interfaces/index.js";
export declare function parseValue(value: string): number | null;
export declare const immutableSet: <T extends object, U>(dataSet: T, path: Parameters<typeof setWith>[1], newValue: U) => T;
export declare const repeatItemsNTimes: <T>(array: T[], n: number) => T[];
export declare const unEscapeAngleBrackets: (str: string) => string;
export declare function isRotationInRange(rotation: number, min: number, max: number): boolean;
/**
 * @internal
 */
export declare const isColumnChart: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isBarChart: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isBulletChart: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isLineChart: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isScatterPlot: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isPieChart: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isDonutChart: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isPieOrDonutChart: (type: string) => boolean;
/**
 * @internal
 */
export declare const isAreaChart: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isBubbleChart: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isComboChart: (type: string) => boolean;
/**
 * @internal
 */
export declare const isTreemap: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isHeatmap: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isFunnel: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isPyramid: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isSankey: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isDependencyWheel: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isSankeyOrDependencyWheel: (type: string) => boolean;
/**
 * @internal
 */
export declare const isWaterfall: import("lodash/fp.js").LodashIsEqual1x1;
/**
 * @internal
 */
export declare const isSupportingJoinedAttributeAxisName: (type: string) => boolean;
/**
 * @internal
 */
export declare const isInvertedChartType: (type: string, orientationPosition?: ChartOrientationType) => boolean;
export declare const isChartSupported: (type: string) => boolean;
export declare const isOneOfTypes: (type: string, types: string[]) => boolean;
export declare const stringifyChartTypes: () => string;
export declare function formatLegendLabel(value: number, format: string, diff: number, numericSymbols: string[]): string;
export declare const getPrimaryChartType: (chartOptions: IChartOptions) => string;
export declare const unwrap: (wrappedObject: any) => any;
export declare function percentFormatter(value: number, format?: string): string;
export declare const isCssMultiLineTruncationSupported: () => boolean;
export declare const customEscape: (str: string) => string;
export declare const getAxesCounts: (config: IChartConfig) => [number, number];
//# sourceMappingURL=common.d.ts.map