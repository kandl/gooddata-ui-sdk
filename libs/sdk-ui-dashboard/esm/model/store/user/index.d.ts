export declare const userSliceReducer: import("@reduxjs/toolkit").Reducer<import("./userState.js").UserState>;
export declare const userActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setUser: (state: import("immer/dist/internal.js").WritableDraft<import("./userState.js").UserState>, action: {
        payload: import("@gooddata/sdk-model").IUser;
        type: string;
    }) => void | import("./userState.js").UserState | import("immer/dist/internal.js").WritableDraft<import("./userState.js").UserState>;
}, "user">;
