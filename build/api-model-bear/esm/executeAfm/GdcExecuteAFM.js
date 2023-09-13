// (C) 2019-2020 GoodData Corporation
import isArray from "lodash/isArray.js";
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isSimpleMeasureDefinition(definition) {
    return !isEmpty(definition) && definition.measure !== undefined;
}
/**
 * @public
 */
export function isArithmeticMeasureDefinition(definition) {
    return (!isEmpty(definition) && definition.arithmeticMeasure !== undefined);
}
/**
 * @public
 */
export function isPopMeasureDefinition(definition) {
    return !isEmpty(definition) && definition.popMeasure !== undefined;
}
/**
 * @public
 */
export function isPreviousPeriodMeasureDefinition(definition) {
    return (!isEmpty(definition) &&
        definition.previousPeriodMeasure !== undefined);
}
/**
 * @public
 */
export function isAttributeSortItem(sortItem) {
    return !isEmpty(sortItem) && sortItem.attributeSortItem !== undefined;
}
/**
 * @public
 */
export function isMeasureSortItem(sortItem) {
    return !isEmpty(sortItem) && sortItem.measureSortItem !== undefined;
}
/**
 * @public
 */
export function isAttributeLocatorItem(locator) {
    return !isEmpty(locator) && locator.attributeLocatorItem !== undefined;
}
/**
 * @public
 */
export function isMeasureLocatorItem(locator) {
    return !isEmpty(locator) && locator.measureLocatorItem !== undefined;
}
/**
 * @public
 */
export function isDateFilter(filter) {
    return !isEmpty(filter) && (isRelativeDateFilter(filter) || isAbsoluteDateFilter(filter));
}
/**
 * @public
 */
export function isRelativeDateFilter(filter) {
    return !isEmpty(filter) && filter.relativeDateFilter !== undefined;
}
/**
 * @public
 */
export function isAbsoluteDateFilter(filter) {
    return !isEmpty(filter) && filter.absoluteDateFilter !== undefined;
}
/**
 * @public
 */
export function isAttributeFilter(filter) {
    return !isEmpty(filter) && (isPositiveAttributeFilter(filter) || isNegativeAttributeFilter(filter));
}
/**
 * @public
 */
export function isPositiveAttributeFilter(filter) {
    return !isEmpty(filter) && filter.positiveAttributeFilter !== undefined;
}
/**
 * @public
 */
export function isNegativeAttributeFilter(filter) {
    return !isEmpty(filter) && filter.negativeAttributeFilter !== undefined;
}
/**
 * @public
 */
export function isMeasureValueFilter(filter) {
    return !isEmpty(filter) && filter.measureValueFilter !== undefined;
}
/**
 * @public
 */
export function isRankingFilter(filter) {
    return !isEmpty(filter) && filter.rankingFilter !== undefined;
}
/**
 * @public
 */
export function isExpressionFilter(filter) {
    return !isEmpty(filter) && filter.expression !== undefined;
}
/**
 * @public
 */
export function isAttributeElementsArray(attributeElements) {
    return attributeElements !== undefined && attributeElements instanceof Array;
}
/**
 * @public
 */
export function isAttributeElementsByRef(attributeElements) {
    return !isEmpty(attributeElements) && attributeElements.uris !== undefined;
}
/**
 * @public
 */
export function isAttributeElementsByValue(attributeElements) {
    return (!isEmpty(attributeElements) &&
        !isArray(attributeElements) &&
        attributeElements.values !== undefined);
}
//# sourceMappingURL=GdcExecuteAFM.js.map