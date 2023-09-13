export declare const catalogSliceReducer: import("@reduxjs/toolkit").Reducer<import("./catalogState.js").CatalogState>;
export declare const catalogActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setCatalogItems: (state: import("immer/dist/internal.js").WritableDraft<import("./catalogState.js").CatalogState>, action: {
        payload: import("./catalogReducers.js").SetCatalogItemsPayload;
        type: string;
    }) => void | import("./catalogState.js").CatalogState | import("immer/dist/internal.js").WritableDraft<import("./catalogState.js").CatalogState>;
}, "catalog">;
