import { invariant } from "ts-invariant";
import { convertDateFilterConfig } from "../../../convertors/fromBackend/DateFilterConfigConverter.js";
import { ServerPaging } from "@gooddata/sdk-backend-base";
export class BearWorkspaceDateFilterConfigsQuery {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    withLimit(limit) {
        invariant(limit > 0, `limit must be a positive number, got: ${limit}`);
        this.limit = limit;
        return this;
    }
    withOffset(offset) {
        this.offset = offset;
        return this;
    }
    async query() {
        return this.queryWorker();
    }
    async queryWorker() {
        return ServerPaging.for(async ({ limit, offset }) => {
            const data = await this.authCall((sdk) => sdk.md.getObjectsByQueryWithPaging(this.workspace, {
                offset,
                limit,
                category: "dateFilterConfig",
                getTotalCount: true,
            }));
            const { items, paging: { totalCount }, } = data;
            return {
                items: items.map(convertDateFilterConfig),
                totalCount: totalCount,
            };
        }, this.limit, this.offset);
    }
}
//# sourceMappingURL=index.js.map