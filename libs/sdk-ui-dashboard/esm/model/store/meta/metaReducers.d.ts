import { Action, CaseReducer } from "@reduxjs/toolkit";
import { DashboardMetaState } from "./metaState.js";
import { IDashboard } from "@gooddata/sdk-model";
type MetaReducer<A extends Action> = CaseReducer<DashboardMetaState, A>;
type SetMetaPayload = {
    dashboard?: IDashboard;
};
export declare const metaReducers: {
    setMeta: MetaReducer<{
        payload: SetMetaPayload;
        type: string;
    }>;
    setDashboardTitle: MetaReducer<{
        payload: string;
        type: string;
    }>;
};
export {};
