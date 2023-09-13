import { Action, CaseReducer } from "@reduxjs/toolkit";
import { PermissionsState } from "./permissionsState.js";
import { IWorkspacePermissions } from "@gooddata/sdk-model";
type PermissionsReducers<A extends Action> = CaseReducer<PermissionsState, A>;
export declare const permissionsReducers: {
    setPermissions: PermissionsReducers<{
        payload: IWorkspacePermissions;
        type: string;
    }>;
};
export {};
