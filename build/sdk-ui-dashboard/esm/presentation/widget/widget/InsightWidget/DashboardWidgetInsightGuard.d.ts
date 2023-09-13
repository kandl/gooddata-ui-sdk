import React from "react";
import { IDefaultDashboardInsightWidgetProps } from "./types.js";
interface IDashboardWidgetInsightGuardProps extends Omit<IDefaultDashboardInsightWidgetProps, "insight"> {
    Component: React.ComponentType<IDefaultDashboardInsightWidgetProps>;
}
export declare const DashboardWidgetInsightGuard: React.FC<IDashboardWidgetInsightGuardProps>;
export {};
