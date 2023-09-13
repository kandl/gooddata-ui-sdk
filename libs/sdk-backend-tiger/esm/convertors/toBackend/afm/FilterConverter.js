import { filterIsEmpty, isAbsoluteDateFilter, isAttributeElementsByValue, isAttributeFilter, isComparisonCondition, isFilter, isMeasureValueFilter, isNegativeAttributeFilter, isPositiveAttributeFilter, isRangeCondition, isRankingFilter, isRelativeDateFilter, } from "@gooddata/sdk-model";
import { toTigerGranularity } from "../../fromBackend/dateGranularityConversions.js";
import { toLabelQualifier, toAfmIdentifier, toDateDataSetQualifier } from "../ObjRefConverter.js";
export function newFilterWithApplyOnResult(filter, applyOnResult) {
    return { filter, applyOnResult };
}
function extractValuesFromAttributeElements(attributeElements) {
    if (isAttributeElementsByValue(attributeElements)) {
        return attributeElements.values;
    }
    // XXX: there is no other way now then to be lenient. the KD does not support text filters and always works
    //  primarily with URIs. Changing / refactoring KD in this area is out of question. So this code is now
    //  more lenient and if it finds attribute elements to be URIs, it will use them in the filter.
    //
    //  Furthermore.. this is not 100% wrong anyway as tiger elements have URIs which are in the end
    //  text values as well :)
    return attributeElements.uris;
}
function convertPositiveFilter(filter, applyOnResultProp) {
    const labelRef = filter.positiveAttributeFilter.displayForm;
    const attributeElements = filter.positiveAttributeFilter.in;
    return {
        positiveAttributeFilter: Object.assign({ label: toLabelQualifier(labelRef), in: {
                values: extractValuesFromAttributeElements(attributeElements),
            } }, applyOnResultProp),
    };
}
function convertNegativeFilter(filter, applyOnResultProp) {
    const labelRef = filter.negativeAttributeFilter.displayForm;
    const attributeElements = filter.negativeAttributeFilter.notIn;
    return {
        negativeAttributeFilter: Object.assign({ label: toLabelQualifier(labelRef), notIn: {
                values: extractValuesFromAttributeElements(attributeElements),
            } }, applyOnResultProp),
    };
}
function convertAttributeFilter(filter, applyOnResultProp) {
    if (isNegativeAttributeFilter(filter) && filterIsEmpty(filter)) {
        return null;
    }
    if (isPositiveAttributeFilter(filter)) {
        return convertPositiveFilter(filter, applyOnResultProp);
    }
    return convertNegativeFilter(filter, applyOnResultProp);
}
function convertAbsoluteDateFilter(filter, applyOnResultProp) {
    const { absoluteDateFilter } = filter;
    if (absoluteDateFilter.from === undefined || absoluteDateFilter.to === undefined) {
        return null;
    }
    const datasetRef = absoluteDateFilter.dataSet;
    return {
        absoluteDateFilter: Object.assign({ dataset: toDateDataSetQualifier(datasetRef), from: String(absoluteDateFilter.from), to: String(absoluteDateFilter.to) }, applyOnResultProp),
    };
}
function convertRelativeDateFilter(filter, applyOnResultProp) {
    const { relativeDateFilter } = filter;
    if (relativeDateFilter.from === undefined || !relativeDateFilter.to === undefined) {
        return null;
    }
    const datasetRef = relativeDateFilter.dataSet;
    return {
        relativeDateFilter: Object.assign({ dataset: toDateDataSetQualifier(datasetRef), granularity: toTigerGranularity(relativeDateFilter.granularity), from: Number(relativeDateFilter.from), to: Number(relativeDateFilter.to) }, applyOnResultProp),
    };
}
function convertMeasureValueFilter(filter, applyOnResultProp) {
    const { measureValueFilter } = filter;
    const condition = measureValueFilter.condition;
    if (isComparisonCondition(condition)) {
        const { operator, value, treatNullValuesAs } = condition.comparison;
        return {
            comparisonMeasureValueFilter: Object.assign({ measure: toAfmIdentifier(measureValueFilter.measure), 
                // Operator has same values, we only need type assertion
                operator,
                value,
                treatNullValuesAs }, applyOnResultProp),
        };
    }
    if (isRangeCondition(condition)) {
        const { operator, from: originalFrom, to: originalTo, treatNullValuesAs } = condition.range;
        return {
            rangeMeasureValueFilter: Object.assign({ measure: toAfmIdentifier(measureValueFilter.measure), 
                // Operator has same values, we only need type assertion
                operator, 
                // make sure the boundaries are always from <= to, because tiger backend cannot handle from > to in a user friendly way
                // this is effectively the same behavior as in bear
                from: Math.min(originalFrom, originalTo), to: Math.max(originalFrom, originalTo), treatNullValuesAs }, applyOnResultProp),
        };
    }
    return null;
}
function convertRankingFilter(filter, applyOnResultProp) {
    const { measure, attributes, operator, value } = filter.rankingFilter;
    const dimensionalityProp = attributes ? { dimensionality: attributes.map(toAfmIdentifier) } : {};
    return {
        rankingFilter: Object.assign(Object.assign(Object.assign({ measures: [toAfmIdentifier(measure)] }, dimensionalityProp), { operator,
            value }), applyOnResultProp),
    };
}
export function convertFilter(filter0) {
    const [filter, applyOnResult] = isFilter(filter0)
        ? [filter0, undefined]
        : [filter0.filter, filter0.applyOnResult];
    const applyOnResultProp = applyOnResult === undefined ? {} : { applyOnResult };
    if (isAttributeFilter(filter)) {
        return convertAttributeFilter(filter, applyOnResultProp);
    }
    else if (isAbsoluteDateFilter(filter)) {
        return convertAbsoluteDateFilter(filter, applyOnResultProp);
    }
    else if (isRelativeDateFilter(filter)) {
        return convertRelativeDateFilter(filter, applyOnResultProp);
    }
    else if (isMeasureValueFilter(filter)) {
        return convertMeasureValueFilter(filter, applyOnResultProp);
    }
    else if (isRankingFilter(filter)) {
        return convertRankingFilter(filter, applyOnResultProp);
    }
    else {
        console.warn("Tiger does not support this filter. The filter will be ignored");
        return null;
    }
}
//# sourceMappingURL=FilterConverter.js.map