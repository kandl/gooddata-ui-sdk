export declare const alertsSliceReducer: import("@reduxjs/toolkit").Reducer<import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>>;
export declare const alertsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setAlerts: {
        <S extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>, S>, entities: Record<import("@reduxjs/toolkit").EntityId, import("@gooddata/sdk-model").IWidgetAlert> | readonly import("@gooddata/sdk-model").IWidgetAlert[]): S;
        <S_1 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_1, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>, S_1>, entities: {
            payload: Record<import("@reduxjs/toolkit").EntityId, import("@gooddata/sdk-model").IWidgetAlert> | readonly import("@gooddata/sdk-model").IWidgetAlert[];
            type: string;
        }): S_1;
    };
    addAlert: {
        <S_2 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_2, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>, S_2>, entity: import("@gooddata/sdk-model").IWidgetAlert): S_2;
        <S_3 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_3, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>, S_3>, action: {
            payload: import("@gooddata/sdk-model").IWidgetAlert;
            type: string;
        }): S_3;
    };
    updateAlert: {
        <S_4 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_4, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>, S_4>, update: import("@reduxjs/toolkit").Update<import("@gooddata/sdk-model").IWidgetAlert>): S_4;
        <S_5 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_5, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>, S_5>, update: {
            payload: import("@reduxjs/toolkit").Update<import("@gooddata/sdk-model").IWidgetAlert>;
            type: string;
        }): S_5;
    };
    removeAlert: {
        <S_6 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_6, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>, S_6>, key: import("@reduxjs/toolkit").EntityId): S_6;
        <S_7 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_7, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>, S_7>, key: {
            payload: import("@reduxjs/toolkit").EntityId;
            type: string;
        }): S_7;
    };
    removeAlerts: {
        <S_8 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_8, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>, S_8>, keys: readonly import("@reduxjs/toolkit").EntityId[]): S_8;
        <S_9 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_9, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IWidgetAlert>, S_9>, keys: {
            payload: readonly import("@reduxjs/toolkit").EntityId[];
            type: string;
        }): S_9;
    };
}, "alerts">;
