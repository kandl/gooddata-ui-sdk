import { IWorkspacesQueryFactory, IWorkspacesQuery } from "@gooddata/sdk-backend-spi";
import { BearAuthenticatedCallGuard } from "../../types/auth.js";
export declare class BearWorkspaceQueryFactory implements IWorkspacesQueryFactory {
    private readonly authCall;
    constructor(authCall: BearAuthenticatedCallGuard);
    forUser(userId: string): IWorkspacesQuery;
    forCurrentUser(): IWorkspacesQuery;
}
//# sourceMappingURL=index.d.ts.map