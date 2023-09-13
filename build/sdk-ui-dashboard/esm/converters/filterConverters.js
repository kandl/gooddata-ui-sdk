// (C) 2020-2022 GoodData Corporation
import { newNegativeAttributeFilter, newPositiveAttributeFilter, newRelativeDateFilter, newAbsoluteDateFilter, isDashboardAttributeFilter, } from "@gooddata/sdk-model";
import isString from "lodash/isString.js";
/**
 * Gets {@link IDashboardFilter} items for filters specified in given filterContext in relation to the given widget.
 *
 * @param filterContext - filter context to get filters for
 * @param widget - widget to use to get dateDataSet for date filters
 * @public
 */
export function filterContextToDashboardFiltersByWidget(filterContext, widget) {
    if (!filterContext) {
        return [];
    }
    return filterContextItemsToDashboardFiltersByWidget(filterContext.filters, widget);
}
/**
 * Gets {@link IDashboardFilter} items for filters specified in given filterContext in relation to the
 * given dateDataSet.
 *
 * @param filterContext - filter context to get filters for
 * @param dateDataSet - widget to use to get dateDataSet for date filters
 * @public
 */
export function filterContextToDashboardFiltersByDateDataSet(filterContext, dateDataSet) {
    if (!filterContext) {
        return [];
    }
    return filterContextItemsToDashboardFiltersByDateDataSet(filterContext.filters, dateDataSet);
}
/**
 * Converts {@link @gooddata/sdk-backend-spi#IDashboardAttributeFilter} to {@link @gooddata/sdk-model#IAttributeFilter} instance.
 *
 * @param filter - filter context attribute filter to convert
 * @public
 */
export function dashboardAttributeFilterToAttributeFilter(filter) {
    if (filter.attributeFilter.negativeSelection) {
        return newNegativeAttributeFilter(filter.attributeFilter.displayForm, filter.attributeFilter.attributeElements);
    }
    return newPositiveAttributeFilter(filter.attributeFilter.displayForm, filter.attributeFilter.attributeElements);
}
/**
 * Converts {@link @gooddata/sdk-backend-spi#IDashboardDateFilter} to {@link @gooddata/sdk-model#IDateFilter} instance.
 *
 * @param filter - filter context attribute filter to convert
 * @param widget - widget to use to get dateDataSet for date filters
 * @public
 */
export function dashboardDateFilterToDateFilterByWidget(filter, widget) {
    if (filter.dateFilter.type === "relative") {
        return newRelativeDateFilter(widget.dateDataSet, filter.dateFilter.granularity, numberOrStringToNumber(filter.dateFilter.from), numberOrStringToNumber(filter.dateFilter.to));
    }
    else {
        return newAbsoluteDateFilter(widget.dateDataSet, filter.dateFilter.from.toString(), filter.dateFilter.to.toString());
    }
}
/**
 * Converts {@link @gooddata/sdk-backend-spi#IDashboardDateFilter} to {@link @gooddata/sdk-model#IDateFilter} instance.
 *
 * @param filter - filter context attribute filter to convert
 * @param dateDataSet - date data set to define {@link @gooddata/sdk-model#IDateFilter}
 * @public
 */
export function dashboardDateFilterToDateFilterByDateDataSet(filter, dateDataSet) {
    if (filter.dateFilter.type === "relative") {
        return newRelativeDateFilter(dateDataSet, filter.dateFilter.granularity, numberOrStringToNumber(filter.dateFilter.from), numberOrStringToNumber(filter.dateFilter.to));
    }
    else {
        return newAbsoluteDateFilter(dateDataSet, filter.dateFilter.from.toString(), filter.dateFilter.to.toString());
    }
}
/**
 * Gets {@link IDashboardFilter} items for filters specified as {@link @gooddata/sdk-backend-spi#FilterContextItem} instances.
 *
 * @param filterContextItems - filter context items to get filters for
 * @param widget - widget to use to get dateDataSet for date filters
 * @public
 */
export function filterContextItemsToDashboardFiltersByWidget(filterContextItems, widget) {
    return filterContextItems.map((filter) => {
        if (isDashboardAttributeFilter(filter)) {
            return dashboardAttributeFilterToAttributeFilter(filter);
        }
        else {
            return dashboardDateFilterToDateFilterByWidget(filter, widget);
        }
    });
}
/**
 * Gets {@link IDashboardFilter} items for filters specified as {@link @gooddata/sdk-backend-spi#FilterContextItem} instances.
 *
 * @param filterContextItems - filter context items to get filters for
 * @param dateDataSet - date data set to define {@link @gooddata/sdk-model#IDateFilter}
 * @public
 */
export function filterContextItemsToDashboardFiltersByDateDataSet(filterContextItems, dateDataSet) {
    return filterContextItems.map((filter) => {
        if (isDashboardAttributeFilter(filter)) {
            return dashboardAttributeFilterToAttributeFilter(filter);
        }
        else {
            return dashboardDateFilterToDateFilterByDateDataSet(filter, dateDataSet);
        }
    });
}
function numberOrStringToNumber(input) {
    return isString(input) ? Number.parseInt(input) : input;
}
//# sourceMappingURL=filterConverters.js.map