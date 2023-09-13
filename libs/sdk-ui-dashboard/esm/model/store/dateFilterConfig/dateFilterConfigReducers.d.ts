import { Action, CaseReducer } from "@reduxjs/toolkit";
import { DateFilterConfigState } from "./dateFilterConfigState.js";
import { IDateFilterConfig, IDashboardDateFilterConfig } from "@gooddata/sdk-model";
import { DateFilterValidationResult } from "../../../types.js";
type DateFilterConfigReducer<A extends Action> = CaseReducer<DateFilterConfigState, A>;
type SetDateFilterConfigPayload = {
    /**
     * Contains current dashboard's overrides of the date filter config.
     *
     * This may be undefined as the dashboard may not contain any overrides.
     */
    dateFilterConfig?: IDashboardDateFilterConfig;
    /**
     * Contains effective date filter config that is a result of merging workspace-level config with the
     * dashboard-level overrides.
     */
    effectiveDateFilterConfig: IDateFilterConfig;
    /**
     * Indicates whether the effective date filter config is using the dashboard overrides.
     */
    isUsingDashboardOverrides: boolean;
};
export declare const dateFilterConfigReducers: {
    setDateFilterConfig: DateFilterConfigReducer<{
        payload: SetDateFilterConfigPayload;
        type: string;
    }>;
    addDateFilterConfigValidationWarning: DateFilterConfigReducer<{
        payload: DateFilterValidationResult;
        type: string;
    }>;
    clearDateFilterConfigValidationWarning: DateFilterConfigReducer<{
        payload: void;
        type: string;
    }>;
};
export {};
