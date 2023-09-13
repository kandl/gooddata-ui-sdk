// (C) 2020-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isAnalyticalDashboard(dashboard) {
    return !isEmpty(dashboard) && !!dashboard.analyticalDashboard;
}
/**
 * @public
 */
export function isFilterContext(filterContext) {
    return !isEmpty(filterContext) && !!filterContext.filterContext;
}
//# sourceMappingURL=AnalyticalDashboardModelV1.js.map