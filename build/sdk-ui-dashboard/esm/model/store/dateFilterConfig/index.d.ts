export declare const dateFilterConfigSliceReducer: import("@reduxjs/toolkit").Reducer<import("./dateFilterConfigState.js").DateFilterConfigState>;
export declare const dateFilterConfigActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setDateFilterConfig: (state: import("immer/dist/internal.js").WritableDraft<import("./dateFilterConfigState.js").DateFilterConfigState>, action: {
        payload: {
            dateFilterConfig?: import("@gooddata/sdk-model").IDashboardDateFilterConfig | undefined;
            effectiveDateFilterConfig: import("@gooddata/sdk-model").IDateFilterConfig;
            isUsingDashboardOverrides: boolean;
        };
        type: string;
    }) => void | import("./dateFilterConfigState.js").DateFilterConfigState | import("immer/dist/internal.js").WritableDraft<import("./dateFilterConfigState.js").DateFilterConfigState>;
    addDateFilterConfigValidationWarning: (state: import("immer/dist/internal.js").WritableDraft<import("./dateFilterConfigState.js").DateFilterConfigState>, action: {
        payload: import("../../../types.js").DateFilterValidationResult;
        type: string;
    }) => void | import("./dateFilterConfigState.js").DateFilterConfigState | import("immer/dist/internal.js").WritableDraft<import("./dateFilterConfigState.js").DateFilterConfigState>;
    clearDateFilterConfigValidationWarning: (state: import("immer/dist/internal.js").WritableDraft<import("./dateFilterConfigState.js").DateFilterConfigState>, action: {
        payload: void;
        type: string;
    }) => void | import("./dateFilterConfigState.js").DateFilterConfigState | import("immer/dist/internal.js").WritableDraft<import("./dateFilterConfigState.js").DateFilterConfigState>;
}, "dateFilterConfig">;
