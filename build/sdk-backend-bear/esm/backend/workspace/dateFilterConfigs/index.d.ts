import { IDateFilterConfigsQuery, IDateFilterConfigsQueryResult } from "@gooddata/sdk-backend-spi";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearWorkspaceDateFilterConfigsQuery implements IDateFilterConfigsQuery {
    private readonly authCall;
    private readonly workspace;
    private limit;
    private offset;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    withLimit(limit: number): IDateFilterConfigsQuery;
    withOffset(offset: number): IDateFilterConfigsQuery;
    query(): Promise<IDateFilterConfigsQueryResult>;
    private queryWorker;
}
//# sourceMappingURL=index.d.ts.map