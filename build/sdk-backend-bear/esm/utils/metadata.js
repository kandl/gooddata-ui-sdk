// (C) 2021 GoodData Corporation
import compact from "lodash/compact.js";
import uniq from "lodash/uniq.js";
/**
 * @internal
 * TODO consider making this a generic method in api-model-bear that can handle any metadata object and wrapped metadata object
 */
export function getVisualizationUserUris(visualization) {
    return uniq(compact([
        visualization.visualizationObject.meta.author,
        visualization.visualizationObject.meta.contributor,
    ]));
}
/**
 * @internal
 * TODO consider making this a generic method in api-model-bear that can handle any metadata object and wrapped metadata object
 */
export function getAnalyticalDashboardUserUris(dashboard) {
    return uniq(compact([dashboard.analyticalDashboard.meta.author, dashboard.analyticalDashboard.meta.contributor]));
}
/**
 * @internal
 * TODO consider making this a generic method in api-model-bear that can handle any metadata object and wrapped metadata object
 */
export function getDashboardPluginUserUris(dashboard) {
    return uniq(compact([dashboard.dashboardPlugin.meta.author, dashboard.dashboardPlugin.meta.contributor]));
}
//# sourceMappingURL=metadata.js.map