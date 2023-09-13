import { AnalyticalWidgetType, IDashboardLayoutSize, IInsight, IInsightDefinition, IKpi, ISettings, IWidget } from "@gooddata/sdk-model";
import { IVisualizationSizeInfo } from "@gooddata/sdk-ui-ext";
import { ObjRefMap } from "../metadata/objRefMap.js";
import { ExtendedDashboardWidget } from "../../model/types/layoutTypes.js";
/**
 * @internal
 */
export type MeasurableWidgetContent = IInsightDefinition | IKpi;
/**
 * @internal
 */
export declare function getSizeInfo(settings: ISettings, widgetType: AnalyticalWidgetType, widgetContent?: MeasurableWidgetContent): IVisualizationSizeInfo;
/**
 * @internal
 */
export declare function getInsightPlaceholderSizeInfo(settings: ISettings): IVisualizationSizeInfo;
/**
 * @internal
 */
export declare function getDashboardLayoutWidgetDefaultHeight(settings: ISettings, widgetType: AnalyticalWidgetType, widgetContent?: MeasurableWidgetContent): number;
/**
 * @internal
 */
export declare function getDashboardLayoutWidgetMinGridHeight(settings: ISettings, widgetType: AnalyticalWidgetType, widgetContent?: MeasurableWidgetContent): number;
/**
 * @internal
 */
export declare function getDashboardLayoutWidgetMaxGridHeight(settings: ISettings, widgetType: AnalyticalWidgetType, widgetContent?: MeasurableWidgetContent): number;
/**
 * @internal
 */
export declare function getMinHeight(widgets: IWidget[], insightMap: ObjRefMap<IInsight>, defaultMin?: number): number;
/**
 * @internal
 */
export declare function getMaxHeight(widgets: IWidget[], insightMap: ObjRefMap<IInsight>): number;
/**
 * @internal
 */
export declare function getDashboardLayoutWidgetMinGridWidth(settings: ISettings, widgetType: AnalyticalWidgetType, widgetContent?: MeasurableWidgetContent): number;
/**
 * @internal
 */
export declare function getMinWidth(widget: IWidget, insightMap: ObjRefMap<IInsight>): number;
/**
 * @internal
 */
export declare function calculateWidgetMinHeight(widget: ExtendedDashboardWidget, currentSize: IDashboardLayoutSize | undefined, insightMap: ObjRefMap<IInsight>, settings: ISettings): number | undefined;
export declare const getDashboardLayoutItemHeight: (size: IDashboardLayoutSize) => number | undefined;
export declare const getDashboardLayoutItemHeightForGrid: (gridHeight: number) => number;
