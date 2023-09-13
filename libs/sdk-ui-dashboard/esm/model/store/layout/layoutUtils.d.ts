import { IDashboardLayoutSize, IDashboardLayout, ObjRef, IDashboardLayoutItem, IWidget } from "@gooddata/sdk-model";
import { IVisualizationSizeInfo } from "@gooddata/sdk-ui-ext";
import { ExtendedDashboardWidget } from "../../types/layoutTypes.js";
import { ILayoutCoordinates } from "../../../types.js";
export declare function getWidgetCoordinates(layout: IDashboardLayout<ExtendedDashboardWidget>, ref: ObjRef): ILayoutCoordinates | undefined;
export declare function getWidgetCoordinatesAndItem(layout: IDashboardLayout<ExtendedDashboardWidget>, ref: ObjRef): {
    sectionIndex: number;
    itemIndex: number;
    item: IDashboardLayoutItem<ExtendedDashboardWidget>;
} | undefined;
export declare function isItemWithBaseWidget(obj: IDashboardLayoutItem<ExtendedDashboardWidget>): obj is IDashboardLayoutItem<IWidget>;
export declare function resizeInsightWidget(size: IDashboardLayoutSize, sizeInfo: IVisualizationSizeInfo): IDashboardLayoutSize;
