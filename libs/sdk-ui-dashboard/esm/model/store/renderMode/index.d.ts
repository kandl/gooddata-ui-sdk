export declare const renderModeSliceReducer: import("@reduxjs/toolkit").Reducer<import("./renderModeState.js").RenderModeState>;
/**
 * Actions to control renderMode state of the dashboard.
 *
 * @internal
 */
export declare const renderModeActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setRenderMode: (state: import("immer/dist/internal.js").WritableDraft<import("./renderModeState.js").RenderModeState>, action: {
        payload: import("../../../types.js").RenderMode;
        type: string;
    }) => void | import("./renderModeState.js").RenderModeState | import("immer/dist/internal.js").WritableDraft<import("./renderModeState.js").RenderModeState>;
    setEditRenderMode: (state: import("immer/dist/internal.js").WritableDraft<import("./renderModeState.js").RenderModeState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./renderModeState.js").RenderModeState | import("immer/dist/internal.js").WritableDraft<import("./renderModeState.js").RenderModeState>;
    setViewRenderMode: (state: import("immer/dist/internal.js").WritableDraft<import("./renderModeState.js").RenderModeState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./renderModeState.js").RenderModeState | import("immer/dist/internal.js").WritableDraft<import("./renderModeState.js").RenderModeState>;
}, "renderModeSlice">;
