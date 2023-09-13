export declare const drillTargetsReducer: import("@reduxjs/toolkit").Reducer<import("@reduxjs/toolkit").EntityState<import("./drillTargetsTypes.js").IDrillTargets>>;
export declare const drillTargetsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    addDrillTargets: {
        <S extends import("@reduxjs/toolkit").EntityState<import("./drillTargetsTypes.js").IDrillTargets>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S, import("@reduxjs/toolkit").EntityState<import("./drillTargetsTypes.js").IDrillTargets>, S>, entity: import("./drillTargetsTypes.js").IDrillTargets): S;
        <S_1 extends import("@reduxjs/toolkit").EntityState<import("./drillTargetsTypes.js").IDrillTargets>>(state: import("@reduxjs/toolkit/dist/tsHelpers.js").IsAny<S_1, import("@reduxjs/toolkit").EntityState<import("./drillTargetsTypes.js").IDrillTargets>, S_1>, entity: {
            payload: import("./drillTargetsTypes.js").IDrillTargets;
            type: string;
        }): S_1;
    };
}, "drillTargets">;
