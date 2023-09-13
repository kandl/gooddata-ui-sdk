export declare const legacyDashboardsSliceReducer: import("@reduxjs/toolkit").Reducer<import("./legacyDashboardsState.js").LegacyDashboardsState>;
export declare const legacyDashboardsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setLegacyDashboards: (state: import("immer/dist/internal.js").WritableDraft<import("./legacyDashboardsState.js").LegacyDashboardsState>, action: {
        payload: import("../../../types.js").ILegacyDashboard[];
        type: string;
    }) => void | import("./legacyDashboardsState.js").LegacyDashboardsState | import("immer/dist/internal.js").WritableDraft<import("./legacyDashboardsState.js").LegacyDashboardsState>;
}, "legacyDashboards">;
