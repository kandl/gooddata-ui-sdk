import React from "react";
import { IDateFilter, IDashboardDateFilter } from "@gooddata/sdk-model";
interface IKpiAlertDialogDateRangeProps {
    filter: IDateFilter | IDashboardDateFilter | undefined;
    dateFormat: string;
}
export declare const KpiAlertDialogDateRange: React.FC<IKpiAlertDialogDateRangeProps>;
export {};
