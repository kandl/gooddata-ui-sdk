import React from "react";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IBrokenAlertFilterBasicInfo } from "../../../../model/index.js";
import { IKpiAlertDialogProps } from "./KpiAlerts/index.js";
interface IKpiAlertDialogWrapperProps extends Omit<IKpiAlertDialogProps, "brokenAlertFilters" | "intl"> {
    brokenAlertFiltersBasicInfo: IBrokenAlertFilterBasicInfo[];
    backend: IAnalyticalBackend;
    workspace: string;
}
export declare const KpiAlertDialogWrapper: React.FC<IKpiAlertDialogWrapperProps>;
export {};
