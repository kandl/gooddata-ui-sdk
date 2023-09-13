import { SagaIterator } from "redux-saga";
import { IDateFilterConfig, IDashboardDateFilterConfig } from "@gooddata/sdk-model";
import { InitializeDashboard } from "../../../commands/dashboard.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export interface DateFilterMergeResult {
    config: IDateFilterConfig;
    source: "workspace" | "dashboard";
}
export declare function mergeDateFilterConfigWithOverrides(ctx: DashboardContext, cmd: InitializeDashboard, config: IDateFilterConfig, dashboardOverrides?: IDashboardDateFilterConfig): SagaIterator<DateFilterMergeResult>;
