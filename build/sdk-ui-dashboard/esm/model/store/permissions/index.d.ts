export declare const permissionsSliceReducer: import("@reduxjs/toolkit").Reducer<import("./permissionsState.js").PermissionsState>;
export declare const permissionsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setPermissions: (state: import("immer/dist/internal.js").WritableDraft<import("./permissionsState.js").PermissionsState>, action: {
        payload: import("@gooddata/sdk-model").IWorkspacePermissions;
        type: string;
    }) => void | import("./permissionsState.js").PermissionsState | import("immer/dist/internal.js").WritableDraft<import("./permissionsState.js").PermissionsState>;
}, "permissions">;
