import { IWorkspacesQueryFactory, IWorkspacesQuery } from "@gooddata/sdk-backend-spi";
import { TigerAuthenticatedCallGuard } from "../../types/index.js";
import { DateFormatter } from "../../convertors/fromBackend/dateFormatting/types.js";
export declare class TigerWorkspaceQueryFactory implements IWorkspacesQueryFactory {
    private readonly authCall;
    private readonly dateFormatter;
    constructor(authCall: TigerAuthenticatedCallGuard, dateFormatter: DateFormatter);
    forUser(userId: string): IWorkspacesQuery;
    forCurrentUser(): IWorkspacesQuery;
}
//# sourceMappingURL=index.d.ts.map