// (C) 2021-2022 GoodData Corporation
import { uriRef } from "@gooddata/sdk-model";
export function convertDashboardPlugin(plugin, userMap) {
    var _a;
    const { dashboardPlugin: { content: { url }, meta: { title, summary, uri, identifier, updated, created, tags, author, contributor }, }, } = plugin;
    return {
        type: "IDashboardPlugin",
        name: title,
        description: summary !== null && summary !== void 0 ? summary : "",
        uri: uri,
        identifier: identifier,
        updated: updated,
        created: created,
        createdBy: author ? userMap === null || userMap === void 0 ? void 0 : userMap.get(author) : undefined,
        updatedBy: contributor ? userMap === null || userMap === void 0 ? void 0 : userMap.get(contributor) : undefined,
        tags: (_a = tags === null || tags === void 0 ? void 0 : tags.split(" ").filter((t) => t)) !== null && _a !== void 0 ? _a : [],
        ref: uriRef(uri),
        url: url,
    };
}
//# sourceMappingURL=plugin.js.map