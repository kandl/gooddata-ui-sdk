/// <reference types="react" />
import { ScreenSize } from "@gooddata/sdk-model";
import { IDashboardLayoutItemRenderer, IDashboardLayoutWidgetRenderer } from "./interfaces.js";
import { IDashboardLayoutItemFacade } from "../../../_staging/dashboard/fluidLayout/facade/interfaces.js";
/**
 * @alpha
 */
export interface IDashboardLayoutItemProps<TWidget> {
    item: IDashboardLayoutItemFacade<TWidget>;
    screen: ScreenSize;
    itemRenderer?: IDashboardLayoutItemRenderer<TWidget>;
    widgetRenderer: IDashboardLayoutWidgetRenderer<TWidget>;
}
export declare function DashboardLayoutItem<TWidget>(props: IDashboardLayoutItemProps<TWidget>): JSX.Element;
