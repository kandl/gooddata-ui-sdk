import { Action, CaseReducer } from "@reduxjs/toolkit";
import { LegacyDashboardsState } from "./legacyDashboardsState.js";
import { ILegacyDashboard } from "../../../types.js";
type LegacyDashboardsReducers<A extends Action> = CaseReducer<LegacyDashboardsState, A>;
export declare const legacyDashboardsReducers: {
    setLegacyDashboards: LegacyDashboardsReducers<{
        payload: ILegacyDashboard[];
        type: string;
    }>;
};
export {};
