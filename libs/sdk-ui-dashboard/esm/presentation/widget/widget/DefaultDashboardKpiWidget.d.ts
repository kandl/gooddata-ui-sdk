import { FilterContextItem, IKpiWidget, ScreenSize } from "@gooddata/sdk-model";
import { OnError } from "@gooddata/sdk-ui";
import React from "react";
import { IDashboardFilter } from "../../../types.js";
interface IDefaultDashboardKpiWidgetProps {
    kpiWidget: IKpiWidget;
    screen: ScreenSize;
    dashboardItemClasses: string;
    onError?: OnError;
    onFiltersChange?: (filters: (IDashboardFilter | FilterContextItem)[], resetOthers?: boolean) => void;
}
export declare const DefaultDashboardKpiWidget: React.FC<IDefaultDashboardKpiWidgetProps>;
export {};
