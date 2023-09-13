// (C) 2019-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isFilterContextDateFilter(filter) {
    return !isEmpty(filter) && !!filter.dateFilter;
}
/**
 * @public
 */
export function isFilterContextAttributeFilter(filter) {
    return !isEmpty(filter) && !!filter.attributeFilter;
}
/**
 * @public
 */
export function isFilterContext(obj) {
    return !isEmpty(obj) && obj.meta.category === "filterContext";
}
/**
 * @public
 */
export function isWrappedFilterContext(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return !isEmpty(obj) && obj.hasOwnProperty("filterContext");
}
/**
 * @public
 */
export function isTempFilterContext(obj) {
    return !!(!isEmpty(obj) &&
        obj.created &&
        obj.uri &&
        obj.filters.every((x) => isFilterContextDateFilter(x) || isFilterContextAttributeFilter(x)));
}
/**
 * @public
 */
export function isWrappedTempFilterContext(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return !isEmpty(obj) && obj.hasOwnProperty("tempFilterContext");
}
//# sourceMappingURL=GdcFilterContext.js.map