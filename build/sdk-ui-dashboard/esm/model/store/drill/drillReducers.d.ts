import { Action, CaseReducer } from "@reduxjs/toolkit";
import { ExplicitDrill } from "@gooddata/sdk-ui";
import { DrillState } from "./drillState.js";
type DrillReducer<A extends Action> = CaseReducer<DrillState, A>;
export declare const drillReducers: {
    setDrillableItems: DrillReducer<{
        payload: ExplicitDrill[];
        type: string;
    }>;
};
export {};
