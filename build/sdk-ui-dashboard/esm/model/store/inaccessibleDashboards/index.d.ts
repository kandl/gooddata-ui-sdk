export declare const inaccessibleDashboardsSliceReducer: import("@reduxjs/toolkit").Reducer<import("@reduxjs/toolkit").EntityState<import("../../index.js").IInaccessibleDashboard>>;
export declare const inaccessibleDashboardsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    addInaccessibleDashboards: {
        <S extends import("@reduxjs/toolkit").EntityState<import("../../index.js").IInaccessibleDashboard>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S, import("@reduxjs/toolkit").EntityState<import("../../index.js").IInaccessibleDashboard>, S>, entities: Record<import("@reduxjs/toolkit").EntityId, import("../../index.js").IInaccessibleDashboard> | readonly import("../../index.js").IInaccessibleDashboard[]): S;
        <S_1 extends import("@reduxjs/toolkit").EntityState<import("../../index.js").IInaccessibleDashboard>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_1, import("@reduxjs/toolkit").EntityState<import("../../index.js").IInaccessibleDashboard>, S_1>, entities: {
            payload: Record<import("@reduxjs/toolkit").EntityId, import("../../index.js").IInaccessibleDashboard> | readonly import("../../index.js").IInaccessibleDashboard[];
            type: string;
        }): S_1;
    };
}, "inaccessibleDashboards">;
