import { Action, CaseReducer } from "@reduxjs/toolkit";
import { ResolvedDashboardConfig } from "../../types/commonTypes.js";
import { ConfigState } from "./configState.js";
type ConfigReducer<A extends Action> = CaseReducer<ConfigState, A>;
export declare const configReducers: {
    setConfig: ConfigReducer<{
        payload: ResolvedDashboardConfig;
        type: string;
    }>;
};
export {};
