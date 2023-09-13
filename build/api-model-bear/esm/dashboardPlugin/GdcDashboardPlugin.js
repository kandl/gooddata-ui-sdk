// (C) 2021 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isDashboardPlugin(obj) {
    return !isEmpty(obj) && obj.dashboardPlugin !== undefined;
}
//# sourceMappingURL=GdcDashboardPlugin.js.map