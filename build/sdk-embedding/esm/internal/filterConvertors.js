// (C) 2020-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import isNumber from "lodash/isNumber.js";
import isString from "lodash/isString.js";
import { isLocalIdentifierQualifier } from "@gooddata/api-model-bear";
import { isAbsoluteDateFilter, isAttributeFilter, isDateFilter, isObjIdentifierQualifier, isObjectUriQualifier, isPositiveAttributeFilter, isRankingFilter, isRemoveAttributeFilter, isRemoveDateFilter, isRemoveRankingFilter, } from "../iframe/EmbeddedGdc.js";
export const EXTERNAL_DATE_FILTER_FORMAT = "YYYY-MM-DD";
const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const DATE_FORMAT_REGEX_TIME_SUPPORT = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?$/;
export const ALL_TIME_GRANULARITY = "ALL_TIME_GRANULARITY";
function validateDataSet(dataSet) {
    if (!dataSet) {
        return false;
    }
    const { uri, identifier } = getObjectUriIdentifier(dataSet);
    return isString(uri) || isString(identifier);
}
export function isValidDateFilterFormat(filterItem, shouldValidateDataSet = true, isTimeSupported = false) {
    if (isAbsoluteDateFilter(filterItem)) {
        const { absoluteDateFilter: { from, to, dataSet }, } = filterItem;
        const isValidDataSet = shouldValidateDataSet ? validateDataSet(dataSet) : true;
        const valueFormatRegex = isTimeSupported ? DATE_FORMAT_REGEX_TIME_SUPPORT : DATE_FORMAT_REGEX;
        return (isValidDataSet &&
            isString(from) &&
            isString(to) &&
            valueFormatRegex.test(from) &&
            valueFormatRegex.test(to));
    }
    else {
        const { relativeDateFilter: { from, to, dataSet }, } = filterItem;
        const isValidDataSet = shouldValidateDataSet ? validateDataSet(dataSet) : true;
        return isValidDataSet && isNumber(from) && isNumber(to);
    }
}
function isValidAttributeFilterFormat(filterItem) {
    if (!isAttributeFilter(filterItem)) {
        return false;
    }
    if (isPositiveAttributeFilter(filterItem)) {
        const { positiveAttributeFilter: { displayForm, in: attributeElements, selectionMode = "multi" }, } = filterItem;
        // because of untyped postMessages
        if (selectionMode !== "single" && selectionMode !== "multi") {
            return false;
        }
        const { uri, identifier } = getObjectUriIdentifier(displayForm);
        const validElementsForSelectionMode = selectionMode === "single" ? attributeElements.length <= 1 : attributeElements.length !== 0;
        return ((isString(uri) || isString(identifier)) &&
            Array.isArray(attributeElements) &&
            validElementsForSelectionMode);
    }
    else {
        const { negativeAttributeFilter: { displayForm, notIn: attributeElements, selectionMode = "multi" }, } = filterItem;
        const { uri, identifier } = getObjectUriIdentifier(displayForm);
        const validSelectionMode = selectionMode !== "multi" ? false : true;
        // attributeElements could be empty in case of setting All Value
        return ((isString(uri) || isString(identifier)) && Array.isArray(attributeElements) && validSelectionMode);
    }
}
function isValidRankingFilterOperator(operator) {
    return operator === "TOP" || operator === "BOTTOM";
}
function isValidRankingFilterValue(value) {
    return typeof value === "number" && value > 0 && value <= 99999 && value % 1 === 0;
}
function isValidLocalIdentifier(localIdentifier) {
    return isLocalIdentifierQualifier(localIdentifier) && typeof localIdentifier.localIdentifier === "string";
}
function isValidRankingFilterAttributes(attributes) {
    return (!attributes ||
        (Array.isArray(attributes) && attributes.length > 0 && attributes.every(isValidLocalIdentifier)));
}
function isValidRankingFilterFormat(rankingFilterItem) {
    const { measure, attributes, value, operator } = rankingFilterItem.rankingFilter;
    return (isValidLocalIdentifier(measure) &&
        isValidRankingFilterAttributes(attributes) &&
        isValidRankingFilterOperator(operator) &&
        isValidRankingFilterValue(value));
}
// `dataSet` is required in AD only.
// In AD, we call this function with `shouldValidateDataSet = true`
// In KD, we call this function with `shouldValidateDataSet = false`
export function isValidFilterItemFormat(filterItem, shouldValidateDataSet = true, isTimeSupported = false) {
    if (isDateFilter(filterItem)) {
        return isValidDateFilterFormat(filterItem, shouldValidateDataSet, isTimeSupported);
    }
    else if (isAttributeFilter(filterItem)) {
        return isValidAttributeFilterFormat(filterItem);
    }
    else if (isRankingFilter(filterItem)) {
        return isValidRankingFilterFormat(filterItem);
    }
    return false;
}
export function isValidRemoveFilterItemFormat(filterItem) {
    if (isRemoveDateFilter(filterItem)) {
        const { dataSet } = filterItem;
        const { uri, identifier } = getObjectUriIdentifier(dataSet);
        return isString(uri) || isString(identifier);
    }
    else if (isRemoveAttributeFilter(filterItem)) {
        const { displayForm } = filterItem;
        const { uri, identifier } = getObjectUriIdentifier(displayForm);
        return isString(uri) || isString(identifier);
    }
    else if (isRemoveRankingFilter(filterItem)) {
        return true;
    }
    return false;
}
export function isValidRemoveFiltersFormat(filters) {
    return !isEmpty(filters) && filters.every(isValidRemoveFilterItemFormat);
}
export function isValidFiltersFormat(filters, shouldValidateDataSet = true, isTimeSupported = false) {
    return (!isEmpty(filters) &&
        filters.every((filter) => isValidFilterItemFormat(filter, shouldValidateDataSet, isTimeSupported)));
}
export function getObjectUriIdentifier(obj) {
    if (!obj) {
        return {};
    }
    return {
        uri: isObjectUriQualifier(obj) ? obj.uri : undefined,
        identifier: isObjIdentifierQualifier(obj) ? obj.identifier : undefined,
    };
}
function transformDateFilterItem(dateFilterItem) {
    if (isAbsoluteDateFilter(dateFilterItem)) {
        const { absoluteDateFilter: { dataSet, from, to }, } = dateFilterItem;
        const { uri: datasetUri, identifier: datasetIdentifier } = getObjectUriIdentifier(dataSet);
        return {
            to,
            from,
            datasetUri,
            datasetIdentifier,
        };
    }
    else {
        const { relativeDateFilter: { granularity, dataSet, from, to }, } = dateFilterItem;
        const { uri: datasetUri, identifier: datasetIdentifier } = getObjectUriIdentifier(dataSet);
        return {
            to,
            from,
            granularity,
            datasetUri,
            datasetIdentifier,
        };
    }
}
function transformAttributeFilterItem(attributeFilterItem) {
    if (isPositiveAttributeFilter(attributeFilterItem)) {
        const { positiveAttributeFilter: { in: attributeElements, displayForm }, } = attributeFilterItem;
        const { uri: dfUri, identifier: dfIdentifier } = getObjectUriIdentifier(displayForm);
        return {
            negativeSelection: false,
            attributeElements,
            dfIdentifier,
            dfUri,
        };
    }
    else {
        const { negativeAttributeFilter: { notIn: attributeElements, displayForm }, } = attributeFilterItem;
        const { uri: dfUri, identifier: dfIdentifier } = getObjectUriIdentifier(displayForm);
        return {
            negativeSelection: true,
            attributeElements,
            dfIdentifier,
            dfUri,
        };
    }
}
function transformRankingFilterItem(rankingFilterItem) {
    const { measure, attributes, value, operator } = rankingFilterItem.rankingFilter;
    const attributesProp = attributes
        ? { attributeLocalIdentifiers: attributes.map((attribute) => attribute.localIdentifier) }
        : {};
    return Object.assign(Object.assign({ measureLocalIdentifier: measure.localIdentifier }, attributesProp), { value,
        operator });
}
export function transformFilterContext(filters) {
    const defaultFiltersObject = {
        attributeFilters: [],
        dateFilters: [],
    };
    if (isEmpty(filters)) {
        return defaultFiltersObject;
    }
    return filters.reduce((externalFilters, filterItem) => {
        if (isDateFilter(filterItem)) {
            const dateFilter = transformDateFilterItem(filterItem);
            externalFilters.dateFilters.push(dateFilter);
        }
        else if (isAttributeFilter(filterItem)) {
            const attributeFilter = transformAttributeFilterItem(filterItem);
            externalFilters.attributeFilters.push(attributeFilter);
        }
        else if (isRankingFilter(filterItem)) {
            const rankingFilter = transformRankingFilterItem(filterItem);
            externalFilters.rankingFilter = rankingFilter;
        }
        return externalFilters;
    }, defaultFiltersObject);
}
export function isTransformedDateFilterItem(filterItem) {
    const { from, to } = filterItem;
    return !isEmpty(filterItem) && from !== undefined && to !== undefined;
}
export function isTransformedAttributeFilterItem(filterItem) {
    const { attributeElements } = filterItem;
    return !isEmpty(filterItem) && attributeElements !== undefined;
}
export function isAllTimeDateFilterItem(filterItem) {
    return (!isEmpty(filterItem) &&
        filterItem.granularity === ALL_TIME_GRANULARITY);
}
export function isAllValueAttributeFilterItem(filterItem) {
    return (!isEmpty(filterItem) &&
        isTransformedAttributeFilterItem(filterItem) &&
        !filterItem.attributeElements.length);
}
//# sourceMappingURL=filterConvertors.js.map