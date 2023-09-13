export declare const metaSliceReducer: import("@reduxjs/toolkit").Reducer<import("./metaState.js").DashboardMetaState>;
export declare const metaActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setMeta: (state: import("immer/dist/internal.js").WritableDraft<import("./metaState.js").DashboardMetaState>, action: {
        payload: {
            dashboard?: import("@gooddata/sdk-model").IDashboard<import("@gooddata/sdk-model").IDashboardWidget> | undefined;
        };
        type: string;
    }) => void | import("./metaState.js").DashboardMetaState | import("immer/dist/internal.js").WritableDraft<import("./metaState.js").DashboardMetaState>;
    setDashboardTitle: (state: import("immer/dist/internal.js").WritableDraft<import("./metaState.js").DashboardMetaState>, action: {
        payload: string;
        type: string;
    }) => void | import("./metaState.js").DashboardMetaState | import("immer/dist/internal.js").WritableDraft<import("./metaState.js").DashboardMetaState>;
}, "meta">;
