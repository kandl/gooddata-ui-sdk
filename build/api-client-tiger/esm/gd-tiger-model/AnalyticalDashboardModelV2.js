// (C) 2020-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isAnalyticalDashboard(dashboard) {
    return !isEmpty(dashboard) && dashboard.version === "2";
}
/**
 * @public
 */
export function isFilterContext(filterContext) {
    return !isEmpty(filterContext) && filterContext.version === "2";
}
/**
 * @public
 */
export function isDashboardPlugin(plugin) {
    return !isEmpty(plugin) && plugin.version === "2";
}
/**
 * @public
 */
export function isDashboardPluginLink(pluginLink) {
    return !isEmpty(pluginLink) && pluginLink.version === "2";
}
//# sourceMappingURL=AnalyticalDashboardModelV2.js.map