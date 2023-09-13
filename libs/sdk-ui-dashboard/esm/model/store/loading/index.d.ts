export declare const loadingSliceReducer: import("@reduxjs/toolkit").Reducer<import("./loadingState.js").LoadingState>;
export declare const loadingActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setLoadingStart: (state: import("immer/dist/internal.js").WritableDraft<import("./loadingState.js").LoadingState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./loadingState.js").LoadingState | import("immer/dist/internal.js").WritableDraft<import("./loadingState.js").LoadingState>;
    setLoadingSuccess: (state: import("immer/dist/internal.js").WritableDraft<import("./loadingState.js").LoadingState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./loadingState.js").LoadingState | import("immer/dist/internal.js").WritableDraft<import("./loadingState.js").LoadingState>;
    setLoadingError: (state: import("immer/dist/internal.js").WritableDraft<import("./loadingState.js").LoadingState>, action: {
        payload: Error;
        type: string;
    }) => void | import("./loadingState.js").LoadingState | import("immer/dist/internal.js").WritableDraft<import("./loadingState.js").LoadingState>;
}, "loadingSlice">;
