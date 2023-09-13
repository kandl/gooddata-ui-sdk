// (C) 2021-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Tests whether object is an instance of {@link IDashboardEvent}.
 *
 * @param obj - object to test
 * @public
 */
export function isDashboardEvent(obj) {
    var _a;
    return !isEmpty(obj) && ((_a = obj.type) === null || _a === void 0 ? void 0 : _a.startsWith("GDC.DASH/EVT"));
}
/**
 * Tests whether object is an instance of {@link ICustomDashboardEvent}.
 *
 * @param obj - object to test
 * @public
 */
export function isCustomDashboardEvent(obj) {
    var _a;
    return !isEmpty(obj) && ((_a = obj.type) === null || _a === void 0 ? void 0 : _a.startsWith("CUSTOM/EVT"));
}
/**
 * Tests whether object is an instance of {@link IDashboardEvent} or {@link ICustomDashboardEvent}.
 *
 * @param obj - object to test
 * @public
 */
export function isDashboardEventOrCustomDashboardEvent(obj) {
    return isDashboardEvent(obj) || isCustomDashboardEvent(obj);
}
//# sourceMappingURL=base.js.map