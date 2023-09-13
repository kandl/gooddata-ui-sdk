export declare const entitlementsSliceReducer: import("@reduxjs/toolkit").Reducer<import("./entitlementsState.js").EntitlementsState>;
export declare const entitlementsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setEntitlements: (state: import("immer/dist/internal.js").WritableDraft<import("./entitlementsState.js").EntitlementsState>, action: {
        payload: import("../../index.js").ResolvedEntitlements;
        type: string;
    }) => void | import("./entitlementsState.js").EntitlementsState | import("immer/dist/internal.js").WritableDraft<import("./entitlementsState.js").EntitlementsState>;
}, "entitlements">;
