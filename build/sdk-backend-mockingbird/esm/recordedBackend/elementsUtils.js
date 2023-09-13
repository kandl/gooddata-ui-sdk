// (C) 2022-2023 GoodData Corporation
import { NotImplemented, isElementsQueryOptionsElementsByPrimaryDisplayFormValue, isElementsQueryOptionsElementsByValue, } from "@gooddata/sdk-backend-spi";
import { filterObjRef, isUriRef, measureItem, objRefToString, } from "@gooddata/sdk-model";
import compact from "lodash/compact.js";
import intersectionBy from "lodash/intersectionBy.js";
const limiterFilteringPredicateAbstractFactory = (refGetter, name) => (specs) => (limitingItem) => {
    const ref = refGetter(limitingItem);
    if (isUriRef(ref)) {
        throw new NotImplemented(`Identifying ${name} by uri is not supported yet`);
    }
    const id = ref === null || ref === void 0 ? void 0 : ref.identifier;
    const spec = id && (specs === null || specs === void 0 ? void 0 : specs[id]);
    if (!spec) {
        console.warn(`No ${name} limiting config found for id: ${id}. Ignoring...`);
        return undefined;
    }
    return (item, index) => spec(item, index, limitingItem);
};
const attributeFilterPredicateFactory = limiterFilteringPredicateAbstractFactory(filterObjRef, "attribute filter");
const dateFilterPredicateFactory = limiterFilteringPredicateAbstractFactory(filterObjRef, "date filter");
const measurePredicateFactory = limiterFilteringPredicateAbstractFactory(measureItem, "measure");
export const resolveLimitingItems = (attributeElementsFiltering, attributeFilters, dateFilters, measures) => (elements) => {
    if (!attributeElementsFiltering) {
        return elements;
    }
    const measureLimiters = measures.map(measurePredicateFactory(attributeElementsFiltering.measures));
    const attributeFilterLimiters = attributeFilters
        .map((item) => item.attributeFilter) // ignoring the joining attribute for now
        .map(attributeFilterPredicateFactory(attributeElementsFiltering.attributeFilters));
    const dateFilterLimiters = dateFilters.map(dateFilterPredicateFactory(attributeElementsFiltering.dateFilters));
    const allLimiters = compact([...measureLimiters, ...attributeFilterLimiters, ...dateFilterLimiters]);
    // filter by all the limiters separately so that they can make use of the index
    // independently of each other
    const filteredIndividually = allLimiters.map((limiter) => elements.filter(limiter));
    // and then intersect the results by uris, this effectively ANDs the filters
    return filteredIndividually.length
        ? intersectionBy(...filteredIndividually, (element) => element.uri)
        : elements;
};
export const resolveSelectedElements = (selectedElements) => (elements) => {
    if (!selectedElements) {
        return elements;
    }
    if (isElementsQueryOptionsElementsByPrimaryDisplayFormValue(selectedElements)) {
        throw new NotImplemented("Elements by primary display form value are not supported yet");
    }
    if (isElementsQueryOptionsElementsByValue(selectedElements)) {
        return elements.filter((element) => selectedElements.values.some((value) => element.title === value));
    }
    return elements.filter((element) => selectedElements.uris.some((uri) => element.uri === uri));
};
export const resolveStringFilter = (filter) => (elements) => {
    return filter
        ? elements.filter((item) => { var _a; return (_a = item.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(filter.toLowerCase()); })
        : elements;
};
/**
 * @internal
 */
export function newAttributeFilterLimitingItem(attributeFilter, predicate) {
    return {
        [objRefToString(filterObjRef(attributeFilter))]: predicate,
    };
}
/**
 * @internal
 */
export function newDateFilterLimitingItem(dateFilter, predicate) {
    return {
        [objRefToString(filterObjRef(dateFilter))]: predicate,
    };
}
/**
 * @internal
 */
export function newMeasureLimitingItem(measure, predicate) {
    return {
        [objRefToString(measureItem(measure))]: predicate,
    };
}
//# sourceMappingURL=elementsUtils.js.map