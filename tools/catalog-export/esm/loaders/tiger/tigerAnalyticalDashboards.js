// (C) 2007-2022 GoodData Corporation
import { MetadataUtilities } from "@gooddata/api-client-tiger";
/**
 * Load analytical dashboards that are stored in workspace metadata so that their links can be included
 * in the generated output for easy embedding access.
 *
 * @param client - tiger client to use for communication
 * @param workspaceId - workspace id
 */
export async function loadAnalyticalDashboards(client, workspaceId) {
    const result = await MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesAnalyticalDashboards, { workspaceId })
        .then(MetadataUtilities.mergeEntitiesResults)
        .then(MetadataUtilities.filterValidEntities);
    return result.data.map((dashboard) => {
        var _a, _b, _c, _d, _e;
        return {
            title: (_b = (_a = dashboard.attributes) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : dashboard.id,
            identifier: dashboard.id,
            tags: (_e = (_d = (_c = dashboard.attributes) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d.join(",")) !== null && _e !== void 0 ? _e : "",
        };
    });
}
