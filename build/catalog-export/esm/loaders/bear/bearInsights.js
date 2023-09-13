// (C) 2007-2021 GoodData Corporation
import gooddata from "@gooddata/api-client-bear";
/**
 * Loads information about insights defined in the workspace. Only descriptive information about
 * each insight is returned.
 *
 * @param workspaceId - workspace to get insights from
 * @returns array of insight metadata
 */
export async function loadInsights(workspaceId) {
    const visualizations = await gooddata.md.getVisualizations(workspaceId);
    return visualizations.map((vis) => {
        return {
            identifier: vis.identifier,
            tags: vis.tags,
            title: vis.title,
        };
    });
}
