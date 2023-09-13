// (C) 2007-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { isAttributeFilter, isDateFilter, } from "@gooddata/sdk-model";
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardFilter}.
 *
 * @alpha
 */
export function isDashboardFilter(obj) {
    return isAttributeFilter(obj) || isDateFilter(obj);
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillDownDefinition}.
 * @beta
 */
export function isDrillDownDefinition(obj) {
    return !isEmpty(obj) && obj.type === "drillDown";
}
//# sourceMappingURL=types.js.map