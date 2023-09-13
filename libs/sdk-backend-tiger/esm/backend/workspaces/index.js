import { OrganizationUtilities } from "@gooddata/api-client-tiger";
import { workspaceConverter } from "../../convertors/fromBackend/WorkspaceConverter.js";
import { InMemoryPaging } from "@gooddata/sdk-backend-base";
import { TigerWorkspace } from "../workspace/index.js";
export class TigerWorkspaceQueryFactory {
    constructor(authCall, dateFormatter) {
        this.authCall = authCall;
        this.dateFormatter = dateFormatter;
    }
    forUser(userId) {
        return new TigerWorkspaceQuery(this.authCall, this.dateFormatter, userId);
    }
    forCurrentUser() {
        return new TigerWorkspaceQuery(this.authCall, this.dateFormatter);
    }
}
class TigerWorkspaceQuery {
    constructor(authCall, dateFormatter, 
    // @ts-expect-error Keeping this for now for future use
    userId) {
        this.authCall = authCall;
        this.dateFormatter = dateFormatter;
        this.userId = userId;
        this.limit = 100;
        this.offset = 0;
        this.search = undefined;
        this.parentWorkspaceId = undefined;
        this.resultToWorkspaceDescriptors = (result) => {
            return result.data.map((item) => workspaceConverter(item, []));
        };
        this.searchWorkspaceDescriptors = (search) => (results) => {
            if (search) {
                const lowercaseSearch = search.toLocaleLowerCase();
                return results.filter((workspace) => {
                    const { title } = workspace;
                    return (title === null || title === void 0 ? void 0 : title.toLowerCase().indexOf(lowercaseSearch)) > -1;
                });
            }
            return results;
        };
        this.descriptorToAnalyticalWorkspace = (descriptor) => new TigerWorkspace(this.authCall, descriptor.id, this.dateFormatter, descriptor);
        this.descriptorsToAnalyticalWorkspaces = (descriptors) => descriptors.map(this.descriptorToAnalyticalWorkspace);
    }
    withLimit(limit) {
        this.limit = limit;
        return this;
    }
    withOffset(offset) {
        this.offset = offset;
        return this;
    }
    withParent(workspaceId) {
        this.parentWorkspaceId = workspaceId;
        return this;
    }
    withSearch(search) {
        this.search = search;
        return this;
    }
    query() {
        return this.queryWorker(this.offset, this.limit, this.search);
    }
    async queryWorker(offset, limit, search) {
        const allWorkspaces = await this.authCall((client) => {
            const filterParam = this.parentWorkspaceId ? `parent.id==${this.parentWorkspaceId}` : undefined;
            return OrganizationUtilities.getAllPagesOf(client, client.entities.getAllEntitiesWorkspaces, {
                sort: ["name"],
                include: ["workspaces"],
                filter: filterParam,
            })
                .then(OrganizationUtilities.mergeEntitiesResults)
                .then(this.resultToWorkspaceDescriptors)
                .then(this.searchWorkspaceDescriptors(search))
                .then(this.descriptorsToAnalyticalWorkspaces);
        });
        return new WorkspacesInMemoryPaging(allWorkspaces, limit !== null && limit !== void 0 ? limit : 50, offset !== null && offset !== void 0 ? offset : 0, search);
    }
}
class WorkspacesInMemoryPaging extends InMemoryPaging {
    constructor(allItems, limit = 50, offset = 0, search = undefined) {
        super(allItems, limit, offset);
        this.search = search;
    }
    async next() {
        if (this.items.length === 0) {
            return this;
        }
        return new WorkspacesInMemoryPaging(this.allItems, this.limit, this.offset + this.items.length, this.search);
    }
}
//# sourceMappingURL=index.js.map