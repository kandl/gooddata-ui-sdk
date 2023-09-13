/// <reference types="react" />
import { ScreenSize } from "@gooddata/sdk-model";
import { RenderMode } from "../../../types.js";
import { IDashboardLayoutItemFacade, IDashboardLayoutSectionFacade } from "../../../_staging/dashboard/fluidLayout/facade/interfaces.js";
import { IDashboardLayoutGridRowRenderer, IDashboardLayoutItemKeyGetter, IDashboardLayoutItemRenderer, IDashboardLayoutWidgetRenderer } from "./interfaces.js";
/**
 * @alpha
 */
export interface DashboardLayoutGridRowProps<TWidget> {
    screen: ScreenSize;
    section: IDashboardLayoutSectionFacade<TWidget>;
    itemKeyGetter?: IDashboardLayoutItemKeyGetter<TWidget>;
    itemRenderer?: IDashboardLayoutItemRenderer<TWidget>;
    widgetRenderer: IDashboardLayoutWidgetRenderer<TWidget>;
    gridRowRenderer?: IDashboardLayoutGridRowRenderer<TWidget>;
    getLayoutDimensions: () => DOMRect;
    items: IDashboardLayoutItemFacade<TWidget>[];
    renderMode: RenderMode;
}
export declare function DashboardLayoutGridRow<TWidget>(props: DashboardLayoutGridRowProps<TWidget>): JSX.Element;
