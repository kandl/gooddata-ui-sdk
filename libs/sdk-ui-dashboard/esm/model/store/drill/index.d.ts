export declare const drillSliceReducer: import("@reduxjs/toolkit").Reducer<import("./drillState.js").DrillState>;
export declare const drillActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setDrillableItems: (state: import("immer/dist/internal.js").WritableDraft<import("./drillState.js").DrillState>, action: {
        payload: import("@gooddata/sdk-ui").ExplicitDrill[];
        type: string;
    }) => void | import("./drillState.js").DrillState | import("immer/dist/internal.js").WritableDraft<import("./drillState.js").DrillState>;
}, "meta">;
