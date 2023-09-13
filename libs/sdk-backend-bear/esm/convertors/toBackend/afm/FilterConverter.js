import { filterIsEmpty, isAbsoluteDateFilter, isAttributeFilter, isComparisonCondition, isMeasureValueFilter, isRankingFilter, isNegativeAttributeFilter, } from "@gooddata/sdk-model";
import isNil from "lodash/isNil.js";
import { toBearRef, toScopedBearRef } from "../ObjRefConverter.js";
import compact from "lodash/compact.js";
import { assertNoNulls } from "../utils.js";
function convertAttributeFilter(filter) {
    /*
     * When sending either positive or negative filter and the in/notIn is empty, backend will bomb
     * with "Cannot parse MAQL expression(s): %s". Previously code was only throwing away empty negative
     * filters.
     * Skip `All` filters represented by negative filter with empty selection, have no effect on execution now.
     * Pass by positive empty filters `None` as they are handled later in execution by NO DATA error
     */
    if (isNegativeAttributeFilter(filter) && filterIsEmpty(filter)) {
        return null;
    }
    if (isNegativeAttributeFilter(filter)) {
        assertNoNulls(filter.negativeAttributeFilter.notIn);
        return {
            negativeAttributeFilter: {
                displayForm: toBearRef(filter.negativeAttributeFilter.displayForm),
                notIn: filter.negativeAttributeFilter.notIn, // checked above so the cast is ok
            },
        };
    }
    assertNoNulls(filter.positiveAttributeFilter.in);
    return {
        positiveAttributeFilter: {
            displayForm: toBearRef(filter.positiveAttributeFilter.displayForm),
            in: filter.positiveAttributeFilter.in, // checked above so the cast is ok
        },
    };
}
export function convertAbsoluteDateFilter(filter) {
    const { absoluteDateFilter } = filter;
    if (absoluteDateFilter.from === undefined || absoluteDateFilter.to === undefined) {
        return null;
    }
    return {
        absoluteDateFilter: {
            dataSet: toBearRef(absoluteDateFilter.dataSet),
            from: String(absoluteDateFilter.from),
            to: String(absoluteDateFilter.to),
        },
    };
}
export function convertRelativeDateFilter(filter) {
    const { relativeDateFilter } = filter;
    if (relativeDateFilter.from === undefined || !relativeDateFilter.to === undefined) {
        return null;
    }
    return {
        relativeDateFilter: {
            dataSet: toBearRef(relativeDateFilter.dataSet),
            granularity: relativeDateFilter.granularity,
            from: Number(relativeDateFilter.from),
            to: Number(relativeDateFilter.to),
        },
    };
}
// Bear supports up to 6 decimal places
const MAX_DECIMAL_PLACES = 6;
function trimNumberToSupportedPrecision(num) {
    return parseFloat(num.toFixed(MAX_DECIMAL_PLACES));
}
function trimConditionToSupportedPrecision(condition) {
    if (isComparisonCondition(condition)) {
        const nullValuesProp = !isNil(condition.comparison.treatNullValuesAs)
            ? { treatNullValuesAs: condition.comparison.treatNullValuesAs }
            : {};
        return {
            comparison: Object.assign({ operator: condition.comparison.operator, value: trimNumberToSupportedPrecision(condition.comparison.value) }, nullValuesProp),
        };
    }
    else {
        const nullValuesProp = !isNil(condition.range.treatNullValuesAs)
            ? { treatNullValuesAs: condition.range.treatNullValuesAs }
            : {};
        return {
            range: Object.assign({ operator: condition.range.operator, from: trimNumberToSupportedPrecision(condition.range.from), to: trimNumberToSupportedPrecision(condition.range.to) }, nullValuesProp),
        };
    }
}
export function convertMeasureValueFilter(filter) {
    if (filter.measureValueFilter.condition === undefined) {
        return null;
    }
    return {
        measureValueFilter: {
            measure: toScopedBearRef(filter.measureValueFilter.measure),
            condition: trimConditionToSupportedPrecision(filter.measureValueFilter.condition),
        },
    };
}
export function convertRankingFilter(filter) {
    const { measure, attributes, operator, value } = filter.rankingFilter;
    return {
        rankingFilter: {
            measures: [toScopedBearRef(measure)],
            attributes: attributes === null || attributes === void 0 ? void 0 : attributes.map(toScopedBearRef),
            operator,
            value,
        },
    };
}
export function convertFilter(filter) {
    if (isMeasureValueFilter(filter)) {
        return convertMeasureValueFilter(filter);
    }
    if (isRankingFilter(filter)) {
        return convertRankingFilter(filter);
    }
    return convertMeasureFilter(filter);
}
export function convertMeasureFilter(filter) {
    if (isAttributeFilter(filter)) {
        return convertAttributeFilter(filter);
    }
    else if (isAbsoluteDateFilter(filter)) {
        return convertAbsoluteDateFilter(filter);
    }
    else {
        return convertRelativeDateFilter(filter);
    }
}
export function convertFilters(filters) {
    return filters ? compact(filters.map(convertFilter)) : [];
}
//# sourceMappingURL=FilterConverter.js.map