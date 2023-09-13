export declare const dashboardPermissionsSliceReducer: import("@reduxjs/toolkit").Reducer<import("./dashboardPermissionsState.js").DashboardPermissionsState>;
export declare const dashboardPermissionsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setDashboardPermissions: (state: import("immer/dist/internal.js").WritableDraft<import("./dashboardPermissionsState.js").DashboardPermissionsState>, action: {
        payload: import("@gooddata/sdk-model").IDashboardPermissions;
        type: string;
    }) => void | import("./dashboardPermissionsState.js").DashboardPermissionsState | import("immer/dist/internal.js").WritableDraft<import("./dashboardPermissionsState.js").DashboardPermissionsState>;
}, "dashboardPermissions">;
