// (C) 2007-2022 GoodData Corporation
import { MetadataUtilities, ValidateRelationsHeader } from "@gooddata/api-client-tiger";
/**
 * Load insights that are stored in workspace metadata so that their links can be included
 * in the generated output for easy embedding access.
 *
 * @param client - tiger client to use for communication
 * @param workspaceId - workspace id
 */
export async function loadInsights(client, workspaceId) {
    const result = await MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesVisualizationObjects, { workspaceId }, { headers: ValidateRelationsHeader })
        .then(MetadataUtilities.mergeEntitiesResults)
        .then(MetadataUtilities.filterValidEntities);
    return result.data.map((vis) => {
        var _a, _b, _c, _d, _e;
        return {
            title: (_b = (_a = vis.attributes) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : vis.id,
            identifier: vis.id,
            tags: (_e = (_d = (_c = vis.attributes) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d.join(",")) !== null && _e !== void 0 ? _e : "",
        };
    });
}
