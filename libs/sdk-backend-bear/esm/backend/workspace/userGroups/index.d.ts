import { IWorkspaceUserGroupsQuery, IWorkspaceUserGroupsQueryOptions, IWorkspaceUserGroupsQueryResult } from "@gooddata/sdk-backend-spi";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearWorkspaceUserGroupsQuery implements IWorkspaceUserGroupsQuery {
    private readonly authCall;
    private readonly workspace;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    private queryAllPages;
    query(options: IWorkspaceUserGroupsQueryOptions): Promise<IWorkspaceUserGroupsQueryResult>;
}
//# sourceMappingURL=index.d.ts.map