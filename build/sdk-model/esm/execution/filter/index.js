// (C) 2019-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { invariant } from "ts-invariant";
//
// Type guards
//
/**
 * Type guard checking whether the provided object is a positive attribute filter.
 *
 * @public
 */
export function isPositiveAttributeFilter(obj) {
    return !isEmpty(obj) && obj.positiveAttributeFilter !== undefined;
}
/**
 * Type guard checking whether the provided object is a negative attribute filter.
 *
 * @public
 */
export function isNegativeAttributeFilter(obj) {
    return !isEmpty(obj) && obj.negativeAttributeFilter !== undefined;
}
/**
 * Type guard checking whether the provided object is an absolute date filter.
 *
 * @public
 */
export function isAbsoluteDateFilter(obj) {
    return !isEmpty(obj) && obj.absoluteDateFilter !== undefined;
}
/**
 * Type guard checking whether the provided object is a relative date filter.
 *
 * @public
 */
export function isRelativeDateFilter(obj) {
    return !isEmpty(obj) && obj.relativeDateFilter !== undefined;
}
/**
 * Type guard checking whether the provided object is an all time date filter.
 *
 * @public
 */
export function isAllTimeDateFilter(obj) {
    var _a;
    return (!isEmpty(obj) &&
        ((_a = obj.relativeDateFilter) === null || _a === void 0 ? void 0 : _a.granularity) === "ALL_TIME_GRANULARITY");
}
/**
 * Type guard checking whether the provided object is an attribute filter.
 *
 * @public
 */
export function isAttributeFilter(obj) {
    return isPositiveAttributeFilter(obj) || isNegativeAttributeFilter(obj);
}
/**
 * Type guard checking whether the provided object is a date filter.
 *
 * @public
 */
export function isDateFilter(obj) {
    return isRelativeDateFilter(obj) || isAbsoluteDateFilter(obj);
}
/**
 * Type guard checking whether the provided object is a measure value filter.
 *
 * @public
 */
export function isMeasureValueFilter(obj) {
    return !isEmpty(obj) && obj.measureValueFilter !== undefined;
}
/**
 * Type guard checking whether the provided object is a ranking filter.
 *
 * @public
 */
export function isRankingFilter(obj) {
    return !isEmpty(obj) && obj.rankingFilter !== undefined;
}
/**
 * Type guard checking whether the provided object is a filter.
 *
 * @public
 */
export function isFilter(obj) {
    return isDateFilter(obj) || isAttributeFilter(obj) || isMeasureValueFilter(obj) || isRankingFilter(obj);
}
/**
 * Type guard checking whether the provided object is a measure value filter's comparison condition.
 *
 * @public
 */
export function isComparisonCondition(obj) {
    return !isEmpty(obj) && obj.comparison !== undefined;
}
/**
 * Type guard checking whether the provided operator is a measure value filter's comparison operator.
 *
 * @public
 */
export function isComparisonConditionOperator(obj) {
    return (obj === "GREATER_THAN" ||
        obj === "GREATER_THAN_OR_EQUAL_TO" ||
        obj === "LESS_THAN" ||
        obj === "LESS_THAN_OR_EQUAL_TO" ||
        obj === "EQUAL_TO" ||
        obj === "NOT_EQUAL_TO");
}
/**
 * Type guard checking whether the provided object is a measure value filter's range condition.
 *
 * @public
 */
export function isRangeCondition(obj) {
    return !isEmpty(obj) && obj.range !== undefined;
}
/**
 * Type guard checking whether the provided object is a measure value filter's range condition operator.
 *
 * @public
 */
export function isRangeConditionOperator(obj) {
    return obj === "BETWEEN" || obj === "NOT_BETWEEN";
}
/**
 * Type guard checking whether the provided object is list of attribute elements specified by URI reference.
 *
 * @public
 */
export function isAttributeElementsByRef(obj) {
    return !isEmpty(obj) && obj.uris !== undefined;
}
/**
 * Type guard checking whether the provided object is list of attribute elements specified by their text value.
 *
 * @public
 */
export function isAttributeElementsByValue(obj) {
    return !isEmpty(obj) && obj.values !== undefined;
}
//
// Functions
//
/**
 * Tests whether the provided attribute element does not specify any attribute elements.
 *
 * @param filter - attribute filter to test
 * @returns true if empty = no attribute elements
 * @public
 */
export function filterIsEmpty(filter) {
    invariant(filter, "filter must be specified");
    if (isPositiveAttributeFilter(filter)) {
        return attributeElementsIsEmpty(filter.positiveAttributeFilter.in);
    }
    return attributeElementsIsEmpty(filter.negativeAttributeFilter.notIn);
}
/**
 * Tests whether the attribute elements object is empty.
 *
 * @param attributeElements - object to test
 * @returns true if empty = attribute elements not specified in any way (URI or value)
 * @internal
 */
export function attributeElementsIsEmpty(attributeElements) {
    invariant(attributeElements, "attribute elements must be specified");
    if (isAttributeElementsByRef(attributeElements)) {
        return isEmpty(attributeElements.uris);
    }
    return isEmpty(attributeElements.values);
}
/**
 * Gets the number of items in the {@link IAttributeElements}.
 *
 * @param attributeElements - object to test
 * @returns the number of items
 * @internal
 */
export function attributeElementsCount(attributeElements) {
    invariant(attributeElements, "attribute elements must be specified");
    if (isAttributeElementsByRef(attributeElements)) {
        return attributeElements.uris.length;
    }
    return attributeElements.values.length;
}
/**
 * Gets the items from the {@link IAttributeElements}.
 *
 * @param attributeElements - object to get items from
 * @returns the array of items
 * @internal
 */
export function getAttributeElementsItems(attributeElements) {
    invariant(attributeElements, "attribute elements must be specified");
    if (isAttributeElementsByRef(attributeElements)) {
        return attributeElements.uris;
    }
    return attributeElements.values;
}
/**
 * Updates the items in the {@link IAttributeElements}.
 *
 * @param attributeElements - object to update items in
 * @param newItems - new items to put into attributeElements
 * @returns updated attributeElements object with new item values
 * @internal
 */
export function updateAttributeElementsItems(attributeElements, newItems) {
    invariant(attributeElements, "attribute elements must be specified");
    if (isAttributeElementsByRef(attributeElements)) {
        return Object.assign(Object.assign({}, attributeElements), { uris: newItems });
    }
    return Object.assign(Object.assign({}, attributeElements), { values: newItems });
}
export function filterAttributeElements(filter) {
    invariant(filter, "attribute elements must be specified");
    if (!isAttributeFilter(filter)) {
        return undefined;
    }
    return isPositiveAttributeFilter(filter)
        ? filter.positiveAttributeFilter.in
        : filter.negativeAttributeFilter.notIn;
}
export function filterObjRef(filter) {
    invariant(filter, "filter must be specified");
    if (isPositiveAttributeFilter(filter)) {
        return filter.positiveAttributeFilter.displayForm;
    }
    if (isNegativeAttributeFilter(filter)) {
        return filter.negativeAttributeFilter.displayForm;
    }
    if (isAbsoluteDateFilter(filter)) {
        return filter.absoluteDateFilter.dataSet;
    }
    if (isRelativeDateFilter(filter)) {
        return filter.relativeDateFilter.dataSet;
    }
    return undefined;
}
/**
 * Gets reference to a measure being used for filtering if the provided filter is measure based. For other filters return undefined.
 *
 * @public
 */
export function filterMeasureRef(filter) {
    return isRankingFilter(filter)
        ? filter.rankingFilter.measure
        : isMeasureValueFilter(filter)
            ? filter.measureValueFilter.measure
            : undefined;
}
/**
 * Gets effective values of an absolute date filter.
 *
 * @param filter - date filter to work with
 * @returns filter values
 * @public
 */
export function absoluteDateFilterValues(filter) {
    invariant(filter, "filter must be specified");
    return {
        from: filter.absoluteDateFilter.from,
        to: filter.absoluteDateFilter.to,
    };
}
/**
 * Gets effective values of a relative date filter.
 *
 * @param filter - date filter to work with
 * @returns filter values
 * @public
 */
export function relativeDateFilterValues(filter) {
    invariant(filter, "filter must be specified");
    return {
        from: filter.relativeDateFilter.from,
        to: filter.relativeDateFilter.to,
        granularity: filter.relativeDateFilter.granularity,
    };
}
/**
 * Gets measure value filter measure.
 * @param filter - measure value filter to work with
 * @returns filter measure
 * @public
 */
export function measureValueFilterMeasure(filter) {
    invariant(filter, "filter must be specified");
    return filter.measureValueFilter.measure;
}
/**
 * Gets measure value filter condition.
 * @param filter - measure value filter to work with
 * @returns filter condition
 * @public
 */
export function measureValueFilterCondition(filter) {
    invariant(filter, "filter must be specified");
    return filter.measureValueFilter.condition;
}
/**
 * Gets operator used in measure value filter condition.
 *
 * @param filter - filter to get operator from
 * @returns undefined if no condition in the filter
 * @public
 */
export function measureValueFilterOperator(filter) {
    invariant(filter, "filter must be specified");
    if (isComparisonCondition(filter.measureValueFilter.condition)) {
        return filter.measureValueFilter.condition.comparison.operator;
    }
    else if (isRangeCondition(filter.measureValueFilter.condition)) {
        return filter.measureValueFilter.condition.range.operator;
    }
    return undefined;
}
//# sourceMappingURL=index.js.map