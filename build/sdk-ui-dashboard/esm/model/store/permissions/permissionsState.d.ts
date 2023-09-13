import { IWorkspacePermissions } from "@gooddata/sdk-model";
/**
 * @public
 */
export interface PermissionsState {
    permissions?: IWorkspacePermissions;
}
export declare const permissionsInitialState: PermissionsState;
