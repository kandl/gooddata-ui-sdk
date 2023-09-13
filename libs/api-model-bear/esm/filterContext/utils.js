// (C) 2019-2023 GoodData Corporation
import omitBy from "lodash/omitBy.js";
import isUndefined from "lodash/isUndefined.js";
import { isFilterContextAttributeFilter, isFilterContextDateFilter, } from "./GdcFilterContext.js";
function sanitizeDateFilter(filter) {
    const { dateFilter: { from, to, type, granularity }, dateFilter, } = filter;
    const sanitizedProperties = omitBy(dateFilter, isUndefined);
    return {
        dateFilter: Object.assign(Object.assign(Object.assign({ type,
            granularity }, sanitizedProperties), (from === undefined ? {} : { from: String(from) })), (to === undefined ? {} : { to: String(to) })),
    };
}
function sanitizeAttributeFilter(filter) {
    const { attributeFilter: { displayForm, negativeSelection, attributeElements }, } = filter;
    return {
        attributeFilter: {
            displayForm,
            negativeSelection,
            attributeElements,
        },
    };
}
/**
 * @public
 */
export function sanitizeFiltersForExport(filters) {
    return filters.map((filter) => {
        if (isFilterContextDateFilter(filter)) {
            return sanitizeDateFilter(filter);
        }
        if (isFilterContextAttributeFilter(filter)) {
            return sanitizeAttributeFilter(filter);
        }
        return filter;
    });
}
//# sourceMappingURL=utils.js.map