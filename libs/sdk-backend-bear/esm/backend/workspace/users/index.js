import { convertWorkspaceUser } from "../../../convertors/fromBackend/UsersConverter.js";
import { ServerPaging } from "@gooddata/sdk-backend-base";
export class BearWorkspaceUsersQuery {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.options = {};
    }
    withOptions(options) {
        this.options = options;
        return this;
    }
    async queryAll() {
        const usersQuery = await this.query();
        return usersQuery.all();
    }
    async queryWorker(options) {
        var _a;
        const { search } = options;
        return ServerPaging.for(async ({ limit, offset }) => {
            const data = await this.authCall((sdk) => sdk.project.getUserListWithPaging(this.workspace, {
                prefixSearch: search,
                userState: "ACTIVE",
                offset,
                limit,
            }));
            const { items, paging: { totalCount }, } = data.userList;
            return {
                items: items.map(convertWorkspaceUser),
                totalCount,
            };
        }, (_a = this.options.limit) !== null && _a !== void 0 ? _a : 1000, this.options.offset);
    }
    async query() {
        return this.queryWorker(this.options);
    }
}
//# sourceMappingURL=index.js.map