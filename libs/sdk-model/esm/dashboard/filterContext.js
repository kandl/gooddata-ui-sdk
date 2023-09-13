// (C) 2019-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import isNil from "lodash/isNil.js";
import { isAttributeElementsByRef } from "../execution/filter/index.js";
import { isObjRef } from "../objRef/index.js";
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardAttributeFilter}.
 * @alpha
 */
export function isDashboardAttributeFilter(obj) {
    return !isEmpty(obj) && !!obj.attributeFilter;
}
/**
 * Returns true when given filter has selection mode set to single
 * @alpha
 */
export function isSingleSelectionFilter(filter) {
    return filter.attributeFilter.selectionMode === "single";
}
/**
 * Returns true when given filter has negative selection
 * @alpha
 */
export function isNegativeAttributeFilter(filter) {
    return !!filter.attributeFilter.negativeSelection;
}
/**
 * Returns count of selected elements
 * @alpha
 */
export function getSelectedElementsCount(filter) {
    return isAttributeElementsByRef(filter.attributeFilter.attributeElements)
        ? filter.attributeFilter.attributeElements.uris.length
        : filter.attributeFilter.attributeElements.values.length;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardDateFilter}.
 * @alpha
 */
export function isDashboardDateFilter(obj) {
    return !isEmpty(obj) && !!obj.dateFilter;
}
/**
 * Returns true when given date filter has type set to relative.
 * @alpha
 */
export function isRelativeDashboardDateFilter(dateFilter) {
    return dateFilter.dateFilter.type === "relative";
}
/**
 * Returns true when given date filter has type set to absolute.
 * @alpha
 */
export function isAbsoluteDashboardDateFilter(dateFilter) {
    return dateFilter.dateFilter.type === "absolute";
}
/**
 * Creates a new relative dashboard date filter.
 *
 * @param granularity - granularity of the filters (month, year, etc.)
 * @param from - start of the interval – negative numbers mean the past, zero means today, positive numbers mean the future
 * @param to - end of the interval – negative numbers mean the past, zero means today, positive numbers mean the future
 * @alpha
 */
export function newRelativeDashboardDateFilter(granularity, from, to) {
    return {
        dateFilter: {
            type: "relative",
            granularity,
            from,
            to,
        },
    };
}
/**
 * Creates a new absolute dashboard date filter.
 *
 * @param from - start of the interval in ISO-8601 calendar date format
 * @param to - end of the interval in ISO-8601 calendar date format
 * @alpha
 */
export function newAbsoluteDashboardDateFilter(from, to) {
    return {
        dateFilter: {
            type: "absolute",
            granularity: "GDC.time.date",
            from,
            to,
        },
    };
}
/**
 * Creates a new all time date filter. This filter is used to indicate that there should be no filtering on the dates.
 *
 * @alpha
 */
export function newAllTimeDashboardDateFilter() {
    return {
        dateFilter: {
            type: "relative",
            granularity: "GDC.time.date",
        },
    };
}
/**
 * Type-guard testing whether the provided object is an All time dashboard date filter.
 * @alpha
 */
export function isAllTimeDashboardDateFilter(obj) {
    return isDashboardDateFilter(obj) && isNil(obj.dateFilter.from) && isNil(obj.dateFilter.to);
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IFilterContextDefinition}.
 * @alpha
 */
export function isFilterContextDefinition(obj) {
    // Currently, we have no better way to distinguish between IFilterContext and ITempFilterContext
    return hasFilterContextBaseProps(obj) && !isObjRef(obj.ref);
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IFilterContext}.
 * @alpha
 */
export function isFilterContext(obj) {
    // Currently, we have no better way to distinguish between IFilterContext and ITempFilterContext
    return hasFilterContextBaseProps(obj) && isObjRef(obj.ref);
}
/**
 * Type-guard testing whether the provided object is an instance of {@link ITempFilterContext}.
 * @alpha
 */
export function isTempFilterContext(obj) {
    // Currently, we have no better way to distinguish between IFilterContext and ITempFilterContext
    return (hasFilterContextBaseProps(obj) &&
        isObjRef(obj.ref) &&
        !obj.identifier &&
        !obj.title);
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardDateFilterReference}.
 * @alpha
 */
export function isDashboardDateFilterReference(obj) {
    return !isEmpty(obj) && obj.type === "dateFilterReference";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardAttributeFilterReference}.
 * @alpha
 */
export function isDashboardAttributeFilterReference(obj) {
    return !isEmpty(obj) && obj.type === "attributeFilterReference";
}
/**
 * Gets reference to object being used for filtering. For attribute filters, this will be reference to the display
 * form. For date filters this will be reference to the data set.
 *
 * @alpha
 */
export function dashboardFilterReferenceObjRef(ref) {
    return isDashboardAttributeFilterReference(ref) ? ref.displayForm : ref.dataSet;
}
/**
 * @internal
 */
function hasFilterContextBaseProps(obj) {
    return !isEmpty(obj) && !!obj.filters;
}
//# sourceMappingURL=filterContext.js.map