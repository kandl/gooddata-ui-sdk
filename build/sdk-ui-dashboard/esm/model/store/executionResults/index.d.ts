export declare const executionResultsSliceReducer: import("@reduxjs/toolkit").Reducer<import("@reduxjs/toolkit").EntityState<import("./types.js").IExecutionResultEnvelope>>;
export declare const executionResultsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    upsertExecutionResult: {
        <S extends import("@reduxjs/toolkit").EntityState<import("./types.js").IExecutionResultEnvelope>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S, import("@reduxjs/toolkit").EntityState<import("./types.js").IExecutionResultEnvelope>, S>, entity: import("./types.js").IExecutionResultEnvelope): S;
        <S_1 extends import("@reduxjs/toolkit").EntityState<import("./types.js").IExecutionResultEnvelope>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_1, import("@reduxjs/toolkit").EntityState<import("./types.js").IExecutionResultEnvelope>, S_1>, entity: {
            payload: import("./types.js").IExecutionResultEnvelope;
            type: string;
        }): S_1;
    };
    clearAllExecutionResults: <S_2 extends import("@reduxjs/toolkit").EntityState<import("./types.js").IExecutionResultEnvelope>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_2, import("@reduxjs/toolkit").EntityState<import("./types.js").IExecutionResultEnvelope>, S_2>) => S_2;
}, "executionResults">;
