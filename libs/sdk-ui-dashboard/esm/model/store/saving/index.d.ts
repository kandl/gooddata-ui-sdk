export declare const savingSliceReducer: import("@reduxjs/toolkit").Reducer<import("./savingState.js").SavingState>;
export declare const savingActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setSavingStart: (state: import("immer/dist/internal.js").WritableDraft<import("./savingState.js").SavingState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./savingState.js").SavingState | import("immer/dist/internal.js").WritableDraft<import("./savingState.js").SavingState>;
    setSavingSuccess: (state: import("immer/dist/internal.js").WritableDraft<import("./savingState.js").SavingState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./savingState.js").SavingState | import("immer/dist/internal.js").WritableDraft<import("./savingState.js").SavingState>;
    setSavingError: (state: import("immer/dist/internal.js").WritableDraft<import("./savingState.js").SavingState>, action: {
        payload: Error;
        type: string;
    }) => void | import("./savingState.js").SavingState | import("immer/dist/internal.js").WritableDraft<import("./savingState.js").SavingState>;
}, "savingSlice">;
