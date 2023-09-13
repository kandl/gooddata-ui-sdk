export declare const configSliceReducer: import("@reduxjs/toolkit").Reducer<import("./configState.js").ConfigState>;
export declare const configActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setConfig: (state: import("immer/dist/internal.js").WritableDraft<import("./configState.js").ConfigState>, action: {
        payload: import("../../index.js").ResolvedDashboardConfig;
        type: string;
    }) => void | import("./configState.js").ConfigState | import("immer/dist/internal.js").WritableDraft<import("./configState.js").ConfigState>;
}, "config">;
