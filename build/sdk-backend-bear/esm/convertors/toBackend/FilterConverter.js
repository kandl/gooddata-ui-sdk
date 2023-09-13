import { isPositiveAttributeFilter, filterAttributeElements, isAttributeElementsByRef, filterObjRef, isNegativeAttributeFilter, isAbsoluteDateFilter, isMeasureValueFilter, measureValueFilterMeasure, measureValueFilterCondition, isIdentifierRef, relativeDateFilterValues, absoluteDateFilterValues, isRankingFilter, } from "@gooddata/sdk-model";
import { toBearRef } from "./ObjRefConverter.js";
import { assertNoNulls } from "./utils.js";
const convertObjRefInScopeToRefWithoutIdentifier = (ref) => {
    if (isIdentifierRef(ref)) {
        throw new Error("Cannot convert ref specified by identifier");
    }
    return ref;
};
const convertMeasureValueFilter = (filter) => {
    const measureObjQualifier = measureValueFilterMeasure(filter);
    if (isIdentifierRef(measureObjQualifier)) {
        throw new Error("Cannot convert measure value filter for measure specified by identifier");
    }
    return {
        measureValueFilter: {
            measure: measureObjQualifier,
            condition: measureValueFilterCondition(filter),
        },
    };
};
const convertRankingFilter = (filter) => {
    const { measure, attributes, operator, value } = filter.rankingFilter;
    return {
        rankingFilter: {
            measures: [convertObjRefInScopeToRefWithoutIdentifier(measure)],
            attributes: attributes === null || attributes === void 0 ? void 0 : attributes.map(convertObjRefInScopeToRefWithoutIdentifier),
            operator,
            value,
        },
    };
};
const convertRelativeDateFilter = (filter) => {
    return {
        relativeDateFilter: Object.assign({ dataSet: toBearRef(filterObjRef(filter)) }, relativeDateFilterValues(filter)),
    };
};
const convertAbsoluteDateFilter = (filter) => {
    return {
        absoluteDateFilter: Object.assign({ dataSet: toBearRef(filterObjRef(filter)) }, absoluteDateFilterValues(filter)),
    };
};
const convertNegativeAttributeFilter = (filter) => {
    const elements = filterAttributeElements(filter);
    assertNoNulls(elements);
    return {
        negativeAttributeFilter: {
            displayForm: toBearRef(filterObjRef(filter)),
            notIn: (isAttributeElementsByRef(elements) ? elements.uris : elements.values), // checked above so the cast is ok
        },
    };
};
const convertPositiveAttributeFilter = (filter) => {
    const elements = filterAttributeElements(filter);
    assertNoNulls(elements);
    return {
        positiveAttributeFilter: {
            displayForm: toBearRef(filterObjRef(filter)),
            in: (isAttributeElementsByRef(elements) ? elements.uris : elements.values), // checked above so the cast is ok
        },
    };
};
export const convertExtendedFilter = (filter) => {
    if (isMeasureValueFilter(filter)) {
        return convertMeasureValueFilter(filter);
    }
    else if (isRankingFilter(filter)) {
        return convertRankingFilter(filter);
    }
    else {
        return convertFilter(filter);
    }
};
export const convertFilter = (filter) => {
    if (isPositiveAttributeFilter(filter)) {
        return convertPositiveAttributeFilter(filter);
    }
    else if (isNegativeAttributeFilter(filter)) {
        return convertNegativeAttributeFilter(filter);
    }
    else if (isAbsoluteDateFilter(filter)) {
        return convertAbsoluteDateFilter(filter);
    }
    else {
        return convertRelativeDateFilter(filter);
    }
};
//# sourceMappingURL=FilterConverter.js.map