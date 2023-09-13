// (C) 2021-2023 GoodData Corporation
import { invariant } from "ts-invariant";
import isEmpty from "lodash/isEmpty.js";
import { attributeElementsCount, filterAttributeElements, filterObjRef, isAbsoluteDateFilter, isDateFilter, objRefToString, isAttributeFilter, isObjRef, } from "@gooddata/sdk-model";
const MAX_ELEMENTS_COUNT_PER_REQUEST = 500; // should cover all attribute filters created by UI where we have 500 elements limit
/**
 * Resolves filter values
 *
 * @param filters - Filters with resolvable values
 *  = all selected elements of attribute filter
 *  + from/to limits of relative date filter
 *  + from/to limits of absolute date filter
 *  @param backend - Analytical backend instance
 *  @param workspace - Workspace id
 * @returns Map of resolved filter values per filter's identifier (date dimension ref or attribute DF ref)
 * @alpha
 */
export async function resolveFilterValues(filters, backend, workspace) {
    const promises = filters.map((filter) => {
        if (isAbsoluteDateFilter(filter)) {
            const resolved = {
                from: filter.absoluteDateFilter.from,
                to: filter.absoluteDateFilter.to,
            };
            return Promise.resolve(resolved);
        }
        invariant(backend, `backend needs to be provided for this type of filter: ${filter}`);
        invariant(workspace, `workspace needs to be provided for this type of filter: ${filter}`);
        if (isAttributeFilter(filter)) {
            return resolveAttributeFilterValues(filter, backend, workspace);
        }
        else {
            return resolveRelativeDateFilterValues(filter, backend, workspace);
        }
    });
    return Promise.all(promises).then((resolvedValues) => {
        const resolvedValuesMap = {
            dateFilters: [],
            attributeFilters: {},
        };
        return resolvedValues.reduce((result, _resolvedValue, index) => {
            const filter = filters[index];
            const ref = filterObjRef(filter);
            invariant(ref, `filter without reference not supported: ${filter}`);
            if (isDateFilter(filter)) {
                const value = getResolvedFilterValues(resolvedValues, filter, index);
                value && result.dateFilters.push(value);
            }
            if (isAttributeFilter(filter)) {
                const refString = objRefToString(ref);
                const value = getResolvedFilterValues(resolvedValues, filter, index);
                if (value) {
                    result.attributeFilters[refString] = value;
                }
            }
            return result;
        }, resolvedValuesMap);
    });
}
async function resolveRelativeDateFilterValues(filter, backend, workspace) {
    let foundDayDisplayForm;
    if (isObjRef(filter.relativeDateFilter.dataSet)) {
        const dataSet = await backend
            .workspace(workspace)
            .catalog()
            .forDataset(filter.relativeDateFilter.dataSet)
            .withGroups(false)
            .load();
        if (dataSet.dateDatasets()[0]) {
            const dateDataSetAttributes = dataSet.dateDatasets()[0].dateAttributes;
            const foundDayAttribute = dateDataSetAttributes.find((dateDataSetAttr) => dateDataSetAttr.granularity === "GDC.time.date");
            foundDayDisplayForm = foundDayAttribute === null || foundDayAttribute === void 0 ? void 0 : foundDayAttribute.defaultDisplayForm;
        }
    }
    const attributesService = backend.workspace(workspace).attributes();
    const elementsQuery = attributesService.elements().forFilter(filter, foundDayDisplayForm === null || foundDayDisplayForm === void 0 ? void 0 : foundDayDisplayForm.ref);
    const elements = await elementsQuery.query();
    // check for next page to see if we need to use skipped response
    const hasNextPage = elements.limit + elements.offset < elements.totalCount;
    // last page of the response to get last element
    const result = hasNextPage
        ? await elements.goTo(Math.ceil(elements.totalCount / elements.limit) - 1)
        : elements;
    return {
        from: elements.items[0].title,
        to: getLastTitle(result.items),
    };
}
async function resolveAttributeFilterValues(filter, backend, workspace) {
    const result = {};
    const attributesService = backend.workspace(workspace).attributes();
    const elementsQuery = attributesService.elements().forFilter(filter);
    const selectedElements = filterAttributeElements(filter);
    const selectedElementsCount = attributeElementsCount(selectedElements);
    // nothing to resolve at all (eg. ALL filter)
    if (selectedElementsCount === 0) {
        return result;
    }
    const requestLimit = Math.min(selectedElementsCount, MAX_ELEMENTS_COUNT_PER_REQUEST);
    let elementsPage = await elementsQuery.withLimit(requestLimit).query();
    const elements = [];
    while (!isEmpty(elementsPage.items)) {
        elements.push(...elementsPage.items);
        elementsPage = await elementsPage.next();
    }
    return elements.reduce((map, element) => {
        //Object keys in JavaScript are, always strings
        //console.log(map["null"]===map[null]); // true
        const key = element.uri === null ? "null" : element.uri;
        map[key] = element.title;
        return map;
    }, result);
}
function getResolvedFilterValues(array, filter, index) {
    if (isDateFilter(filter)) {
        return array[index];
    }
    return array[index];
}
function getLastTitle(items) {
    return items[items.length - 1].title;
}
//# sourceMappingURL=filterValuesResolver.js.map