export declare const insightsSliceReducer: import("@reduxjs/toolkit").Reducer<import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>>;
export declare const insightsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setInsights: {
        <S extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>, S>, entities: readonly import("@gooddata/sdk-model").IInsight[] | Record<import("@reduxjs/toolkit").EntityId, import("@gooddata/sdk-model").IInsight>): S;
        <S_1 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_1, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>, S_1>, entities: {
            payload: readonly import("@gooddata/sdk-model").IInsight[] | Record<import("@reduxjs/toolkit").EntityId, import("@gooddata/sdk-model").IInsight>;
            type: string;
        }): S_1;
    };
    addInsights: {
        <S_2 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_2, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>, S_2>, entities: readonly import("@gooddata/sdk-model").IInsight[] | Record<import("@reduxjs/toolkit").EntityId, import("@gooddata/sdk-model").IInsight>): S_2;
        <S_3 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_3, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>, S_3>, entities: {
            payload: readonly import("@gooddata/sdk-model").IInsight[] | Record<import("@reduxjs/toolkit").EntityId, import("@gooddata/sdk-model").IInsight>;
            type: string;
        }): S_3;
    };
    upsertInsight: {
        <S_4 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_4, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>, S_4>, entity: import("@gooddata/sdk-model").IInsight): S_4;
        <S_5 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_5, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IInsight>, S_5>, entity: {
            payload: import("@gooddata/sdk-model").IInsight;
            type: string;
        }): S_5;
    };
}, "insights">;
