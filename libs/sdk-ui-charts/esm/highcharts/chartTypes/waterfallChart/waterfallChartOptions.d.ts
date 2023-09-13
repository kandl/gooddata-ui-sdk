import { IColorAssignment } from "@gooddata/sdk-ui";
import { IColorPalette, IMeasureGroupDescriptor } from "@gooddata/sdk-model";
import { IChartConfig } from "../../../interfaces/index.js";
import { ISeriesItem } from "../../typings/unsafe.js";
export declare function getTotalColumnColor(colorAssignment: IColorAssignment, colorPalette: IColorPalette): string;
export declare function buildWaterfallChartSeries(measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], series: ISeriesItem[], chartConfig: IChartConfig, colorAssignment: IColorAssignment, colorPalette: IColorPalette, emptyHeaderTitle: string): ISeriesItem[];
export declare function getWaterfallChartCategories(categories: string[], chartConfig: IChartConfig, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], emptyHeaderTitle: string): any[];
export declare function getColorAssignment(colorAssignments: IColorAssignment[], chartConfig: IChartConfig, series: ISeriesItem[]): IColorAssignment[];
//# sourceMappingURL=waterfallChartOptions.d.ts.map