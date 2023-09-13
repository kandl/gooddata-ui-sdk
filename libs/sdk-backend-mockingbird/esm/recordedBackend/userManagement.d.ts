import { IWorkspaceAccessControlService, IWorkspaceUserGroupsQuery, IWorkspaceUsersQuery, IWorkspaceUsersQueryOptions, IWorkspaceUsersQueryResult } from "@gooddata/sdk-backend-spi";
import { RecordedBackendConfig } from "./types.js";
import { IWorkspaceUser } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare function recordedUserGroupsQuery(implConfig: RecordedBackendConfig): IWorkspaceUserGroupsQuery;
/**
 * @internal
 */
export declare function recordedAccessControlFactory(implConfig: RecordedBackendConfig): IWorkspaceAccessControlService;
/**
 * @internal
 */
export declare class RecordedWorkspaceUsersQuery implements IWorkspaceUsersQuery {
    private config;
    constructor(config: RecordedBackendConfig);
    withOptions(_options: IWorkspaceUsersQueryOptions): IWorkspaceUsersQuery;
    queryAll(): Promise<IWorkspaceUser[]>;
    query(): Promise<IWorkspaceUsersQueryResult>;
}
//# sourceMappingURL=userManagement.d.ts.map