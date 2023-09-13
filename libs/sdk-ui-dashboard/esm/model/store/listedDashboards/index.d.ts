export declare const listedDashboardsSliceReducer: import("@reduxjs/toolkit").Reducer<import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IListedDashboard>>;
export declare const listedDashboardsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setListedDashboards: {
        <S extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IListedDashboard>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IListedDashboard>, S>, entities: Record<import("@reduxjs/toolkit").EntityId, import("@gooddata/sdk-model").IListedDashboard> | readonly import("@gooddata/sdk-model").IListedDashboard[]): S;
        <S_1 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IListedDashboard>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_1, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IListedDashboard>, S_1>, entities: {
            payload: Record<import("@reduxjs/toolkit").EntityId, import("@gooddata/sdk-model").IListedDashboard> | readonly import("@gooddata/sdk-model").IListedDashboard[];
            type: string;
        }): S_1;
    };
    addListedDashboard: {
        <S_2 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IListedDashboard>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_2, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IListedDashboard>, S_2>, entity: import("@gooddata/sdk-model").IListedDashboard): S_2;
        <S_3 extends import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IListedDashboard>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_3, import("@reduxjs/toolkit").EntityState<import("@gooddata/sdk-model").IListedDashboard>, S_3>, entity: {
            payload: import("@gooddata/sdk-model").IListedDashboard;
            type: string;
        }): S_3;
    };
}, "listedDashboards">;
