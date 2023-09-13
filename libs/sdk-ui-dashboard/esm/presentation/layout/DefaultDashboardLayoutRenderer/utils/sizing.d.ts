import { AnalyticalWidgetType, IDashboardLayout, IDashboardLayoutItem, IDashboardLayoutSize, ISettings, ScreenSize } from "@gooddata/sdk-model";
import { IDashboardLayoutItemFacade } from "../../../../_staging/dashboard/fluidLayout/facade/interfaces.js";
import { MeasurableWidgetContent } from "../../../../_staging/layout/sizing.js";
/**
 * Unify dashboard layout items height for all screens.
 *
 * @param items - dashboard layout items
 */
export declare function unifyDashboardLayoutItemHeights<TWidget>(layout: IDashboardLayout<TWidget>): IDashboardLayout<TWidget>;
export declare function unifyDashboardLayoutItemHeights<TWidget>(items: IDashboardLayoutItem<TWidget>[]): IDashboardLayoutItem<TWidget>[];
/**
 * Divide the items into a list representing the future rows of the grid.
 * This is useful for performing item transformations, depending on how they really appear in the grid.
 *
 * @param items - dashboard layout items
 * @param screen - responsive screen class
 */
export declare function splitDashboardLayoutItemsAsRenderedGridRows<TWidget>(items: IDashboardLayoutItem<TWidget>[], screen: ScreenSize): IDashboardLayoutItem<TWidget>[][];
/**
 * Tuple that represents a item position in the layout
 * [sectionIndex, itemIndex]
 *
 * @internal
 */
type ItemPosition = [number, number];
/**
 *
 * @internal
 */
export declare const getResizedItemPositions: <TWidget>(originalLayout: IDashboardLayout<TWidget>, resizedLayout: IDashboardLayout<TWidget>, positions?: ItemPosition[]) => ItemPosition[];
export declare const getDashboardLayoutItemHeightForRatioAndScreen: (size: IDashboardLayoutSize, screen: ScreenSize) => number;
export declare function getDashboardLayoutItemMaxGridWidth(item: IDashboardLayoutItemFacade<any>, screen: ScreenSize): number;
export declare function getDashboardLayoutWidgetDefaultGridWidth(settings: ISettings, widgetType: AnalyticalWidgetType, widgetContent?: MeasurableWidgetContent): number;
export declare function getLayoutWithoutGridHeights<TWidget>(layout: IDashboardLayout<TWidget>): IDashboardLayout<TWidget>;
/**
 * @internal
 */
export declare function validateDashboardLayoutWidgetSize(currentWidth: number, currentHeight: number | undefined, widgetType: AnalyticalWidgetType, widgetContent: MeasurableWidgetContent, settings: ISettings): {
    validWidth: number;
    validHeight?: number;
};
export {};
