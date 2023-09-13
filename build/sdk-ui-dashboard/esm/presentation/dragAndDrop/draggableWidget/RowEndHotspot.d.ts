/// <reference types="react" />
import { IDashboardWidget, ScreenSize } from "@gooddata/sdk-model";
import { IDashboardLayoutItemFacade } from "../../../_staging/dashboard/fluidLayout/facade/interfaces.js";
export type RowEndHotspotProps<TWidget = IDashboardWidget> = {
    item: IDashboardLayoutItemFacade<TWidget>;
    screen: ScreenSize;
};
export declare const RowEndHotspot: (props: RowEndHotspotProps<unknown>) => JSX.Element | null;
