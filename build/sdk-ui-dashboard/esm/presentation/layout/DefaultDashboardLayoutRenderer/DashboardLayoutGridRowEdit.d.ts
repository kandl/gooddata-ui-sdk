/// <reference types="react" />
import { DashboardLayoutGridRowProps } from "./DashboardLayoutGridRow.js";
import { IDashboardLayoutItemFacade } from "../../../_staging/dashboard/fluidLayout/facade/interfaces.js";
export declare function DashboardLayoutGridRowEdit<TWidget>(props: DashboardLayoutGridRowProps<TWidget> & {
    itemsInRowsByIndex: [number, IDashboardLayoutItemFacade<TWidget>[]][];
}): JSX.Element;
