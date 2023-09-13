// (C) 2019-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Tests whether the provided object is an instance of {@link IDashboard}.
 *
 * @param obj - object to test
 * @alpha
 */
export function isDashboard(obj) {
    const asDash = obj;
    return !isEmpty(asDash) && asDash.type === "IDashboard" && asDash.ref !== undefined;
}
/**
 * Tests whether the provided object is an instance of {@link IDashboardDefinition}.
 *
 * @param obj - object to test
 * @alpha
 */
export function isDashboardDefinition(obj) {
    const asDash = obj;
    return !isEmpty(asDash) && asDash.type === "IDashboard";
}
//# sourceMappingURL=dashboard.js.map