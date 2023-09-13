import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { IWidgetAlert, IKpiWidget } from "@gooddata/sdk-model";
import { IBrokenAlertFilterBasicInfo, QueryProcessingStatus } from "../../../model/index.js";
export declare const useWidgetBrokenAlertsQuery: (widget: IKpiWidget, alert: IWidgetAlert | undefined) => {
    result?: IBrokenAlertFilterBasicInfo<import("@gooddata/sdk-model").FilterContextItem>[] | undefined;
    status?: "error" | "running" | "pending" | "success" | "rejected" | undefined;
    error?: GoodDataSdkError | undefined;
};
