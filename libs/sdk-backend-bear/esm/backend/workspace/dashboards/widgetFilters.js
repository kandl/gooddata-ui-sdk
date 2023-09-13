// (C) 2020-2022 GoodData Corporation
import { filterObjRef, isAllTimeDateFilter, isAttributeFilter, isDateFilter, dashboardFilterReferenceObjRef, } from "@gooddata/sdk-model";
import last from "lodash/last.js";
import zip from "lodash/zip.js";
/**
 * Performs widget filter resolution:
 * - removes all attribute filters hit by ignoreDashboardFilters
 * - removes all date filters for date dimension different than dateDataSet
 * - picks the last date filter for the dateDataSet dimension
 *   - if it is all time, removes all date filters
 *   - otherwise returns the last date filter specified
 *
 * @param widget - widget to resolve filters for
 * @param filters - filters to try
 * @param objRefsToUris - function providing conversion of any ObjRef to URI
 * @internal
 */
export async function resolveWidgetFilters(filters, ignoreDashboardFilters, dateDataSet, objRefsToUris) {
    const dateFilters = filters.filter(isDateFilter);
    const attributeFilters = filters.filter(isAttributeFilter);
    const isIgnorableFilter = (obj) => isDateFilter(obj) || isAttributeFilter(obj);
    if (!dateFilters.length && !attributeFilters.length) {
        return filters;
    }
    const [dateFiltersToKeep, attributeFiltersToKeep] = await Promise.all([
        getRelevantDateFiltersForWidget(dateFilters, dateDataSet, objRefsToUris),
        getRelevantAttributeFiltersForWidget(attributeFilters, ignoreDashboardFilters, objRefsToUris),
    ]);
    const filtersToKeep = [...dateFiltersToKeep, ...attributeFiltersToKeep];
    // filter the original filter array to maintain order of the items
    return filters.filter((filter) => !isIgnorableFilter(filter) || filtersToKeep.includes(filter));
}
async function getRelevantDateFiltersForWidget(filters, dateDataSet, objRefsToUris) {
    if (!dateDataSet || !filters.length || filters.every(isAllTimeDateFilter)) {
        return [];
    }
    const [dateDatasetUri, ...filterUris] = await objRefsToUris([
        dateDataSet,
        ...filters.map((filter) => filterObjRef(filter)),
    ]);
    const withRelevantDimension = zip(filters, filterUris)
        .filter(([, uri]) => dateDatasetUri === uri)
        .map(([filter]) => filter);
    const candidate = last(withRelevantDimension);
    return !candidate || isAllTimeDateFilter(candidate) ? [] : [candidate];
}
async function getRelevantAttributeFiltersForWidget(filters, ignoreDashboardFilters, objRefsToUris) {
    if (!ignoreDashboardFilters.length) {
        return filters;
    }
    if (!filters.length) {
        return [];
    }
    // get all the necessary uris in one call by concatenating both arrays
    const uris = await objRefsToUris([
        ...ignoreDashboardFilters.map(dashboardFilterReferenceObjRef),
        ...filters.map((filter) => filterObjRef(filter)),
    ]);
    // re-split the uris array to the two parts corresponding to the original arrays
    const divide = ignoreDashboardFilters.length;
    const ignoredUris = uris.slice(0, divide);
    const filterUris = uris.slice(divide);
    return zip(filters, filterUris)
        .filter(([, uri]) => !ignoredUris.includes(uri))
        .map(([filter]) => filter);
}
//# sourceMappingURL=widgetFilters.js.map