import { IWorkspaceUsersQuery, IWorkspaceUsersQueryOptions, IWorkspaceUsersQueryResult } from "@gooddata/sdk-backend-spi";
import { IWorkspaceUser } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearWorkspaceUsersQuery implements IWorkspaceUsersQuery {
    private readonly authCall;
    private readonly workspace;
    private options;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    withOptions(options: IWorkspaceUsersQueryOptions): IWorkspaceUsersQuery;
    queryAll(): Promise<IWorkspaceUser[]>;
    private queryWorker;
    query(): Promise<IWorkspaceUsersQueryResult>;
}
//# sourceMappingURL=index.d.ts.map