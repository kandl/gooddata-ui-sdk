import { convertWorkspaceUserGroup } from "../../../convertors/fromBackend/UserGroupsConverter.js";
import { InMemoryPaging } from "@gooddata/sdk-backend-base";
export class BearWorkspaceUserGroupsQuery {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    async queryAllPages(limit) {
        const data = await this.authCall((sdk) => sdk.project.getUserGroups(this.workspace, { limit }));
        const { items, paging } = data.userGroups;
        const getNextPage = async (nextUri, result = []) => {
            if (!nextUri) {
                return result;
            }
            const data = await this.authCall((sdk) => sdk.xhr.getParsed(nextUri));
            const { items, paging } = data.userGroups;
            const updatedResult = [...result, ...items];
            nextUri = paging.next;
            return getNextPage(paging.next, updatedResult);
        };
        return getNextPage(paging.next, items);
    }
    async query(options) {
        const { offset = 0, limit = 100, search } = options;
        let userGroups = await this.queryAllPages(limit);
        if (search) {
            const lowercaseSearch = search.toLocaleLowerCase();
            userGroups = userGroups.filter((userGroup) => {
                const { name } = userGroup.userGroup.content;
                return (name === null || name === void 0 ? void 0 : name.toLowerCase().indexOf(lowercaseSearch)) > -1;
            });
        }
        const convertedUserGroups = userGroups.map((userGroup) => convertWorkspaceUserGroup(userGroup.userGroup));
        return new InMemoryPaging(convertedUserGroups, limit, offset);
    }
}
//# sourceMappingURL=index.js.map