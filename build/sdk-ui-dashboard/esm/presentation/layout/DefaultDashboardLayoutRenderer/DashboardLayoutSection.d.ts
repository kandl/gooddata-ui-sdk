/// <reference types="react" />
import { ScreenSize } from "@gooddata/sdk-model";
import { RenderMode } from "../../../types.js";
import { IDashboardLayoutSectionFacade } from "../../../_staging/dashboard/fluidLayout/facade/interfaces.js";
import { IDashboardLayoutGridRowRenderer, IDashboardLayoutItemKeyGetter, IDashboardLayoutItemRenderer, IDashboardLayoutSectionHeaderRenderer, IDashboardLayoutSectionKeyGetter, IDashboardLayoutSectionRenderer, IDashboardLayoutWidgetRenderer } from "./interfaces.js";
/**
 * @alpha
 */
export interface IDashboardLayoutSectionProps<TWidget> {
    section: IDashboardLayoutSectionFacade<TWidget>;
    sectionKeyGetter?: IDashboardLayoutSectionKeyGetter<TWidget>;
    sectionRenderer?: IDashboardLayoutSectionRenderer<TWidget>;
    sectionHeaderRenderer?: IDashboardLayoutSectionHeaderRenderer<TWidget>;
    itemKeyGetter?: IDashboardLayoutItemKeyGetter<TWidget>;
    itemRenderer?: IDashboardLayoutItemRenderer<TWidget>;
    widgetRenderer: IDashboardLayoutWidgetRenderer<TWidget>;
    gridRowRenderer?: IDashboardLayoutGridRowRenderer<TWidget>;
    getLayoutDimensions: () => DOMRect;
    screen: ScreenSize;
    renderMode: RenderMode;
    isDraggingWidget?: boolean;
}
export declare function DashboardLayoutSection<TWidget>(props: IDashboardLayoutSectionProps<TWidget>): JSX.Element;
