// (C) 2019-2022 GoodData Corporation
import { ServerPaging } from "@gooddata/sdk-backend-base";
import { NotSupported, } from "@gooddata/sdk-backend-spi";
import { convertUserProject } from "../../convertors/toBackend/WorkspaceConverter.js";
import { userLoginMd5FromAuthenticatedPrincipal } from "../../utils/api.js";
import { BearWorkspace } from "../workspace/index.js";
export class BearWorkspaceQueryFactory {
    constructor(authCall) {
        this.authCall = authCall;
    }
    forUser(userId) {
        return new BearWorkspaceQuery(this.authCall, userId);
    }
    forCurrentUser() {
        return new BearWorkspaceQuery(this.authCall);
    }
}
class BearWorkspaceQuery {
    constructor(authCall, userId) {
        this.authCall = authCall;
        this.userId = userId;
        this.limit = 100;
        this.offset = 0;
        this.search = undefined;
    }
    withLimit(limit) {
        this.limit = limit;
        return this;
    }
    withOffset(offset) {
        this.offset = offset;
        return this;
    }
    withParent() {
        throw new NotSupported("not supported");
    }
    withSearch(search) {
        this.search = search;
        return this;
    }
    query() {
        return this.queryWorker();
    }
    async queryWorker() {
        return ServerPaging.for(async ({ limit, offset }) => {
            const data = await this.authCall(async (sdk, { getPrincipal }) => {
                const userId = this.userId || (await userLoginMd5FromAuthenticatedPrincipal(getPrincipal));
                return sdk.project.getProjectsWithPaging(userId, offset, limit, this.search);
            });
            const { items, paging: { totalCount }, } = data.userProjects;
            return {
                items: items.map((item) => {
                    const descriptor = convertUserProject(item);
                    return new BearWorkspace(this.authCall, descriptor.id, descriptor);
                }),
                totalCount,
            };
        }, this.limit, this.offset);
    }
}
//# sourceMappingURL=index.js.map