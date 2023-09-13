import { IDashboardPermissions } from "@gooddata/sdk-model";
import { Action, CaseReducer } from "@reduxjs/toolkit";
import { DashboardPermissionsState } from "./dashboardPermissionsState.js";
type PermissionsReducers<A extends Action> = CaseReducer<DashboardPermissionsState, A>;
export declare const dashboardPermissionsReducers: {
    setDashboardPermissions: PermissionsReducers<{
        payload: IDashboardPermissions;
        type: string;
    }>;
};
export {};
