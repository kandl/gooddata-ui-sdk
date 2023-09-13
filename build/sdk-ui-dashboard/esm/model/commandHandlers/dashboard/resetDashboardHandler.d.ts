import { DashboardContext } from "../../types/commonTypes.js";
import { ResetDashboard } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardWasReset } from "../../events/index.js";
export declare function resetDashboardHandler(ctx: DashboardContext, cmd: ResetDashboard): SagaIterator<DashboardWasReset>;
export declare function resetDashboardRuntime(ctx: DashboardContext, cmd: ResetDashboard): Generator<import("redux-saga/effects").CallEffect<{
    batch: {
        payload: any;
        type: string;
    }[];
    persistedDashboard: import("@gooddata/sdk-model").IDashboard<import("@gooddata/sdk-model").IDashboardWidget> | undefined;
}>, {
    batch: import("redux-batched-actions").BatchAction;
    reset: DashboardWasReset;
}, {
    batch: {
        payload: any;
        type: string;
    }[];
    persistedDashboard: import("@gooddata/sdk-model").IDashboard<import("@gooddata/sdk-model").IDashboardWidget> | undefined;
}>;
