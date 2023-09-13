// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import isNil from "lodash/isNil.js";
import { attributeDisplayFormRef, isAttribute, attributeLocalId } from "../attribute/index.js";
import { isObjRef } from "../../objRef/index.js";
import { isMeasure, measureLocalId } from "../measure/index.js";
import { idRef, localIdRef } from "../../objRef/factory.js";
/**
 * Creates a new positive attribute filter.
 *
 * @remarks
 * NOTE: when specifying attribute element using URIs (primary keys), please keep in mind that they MAY NOT be transferable
 * across workspaces. On some backends (such as bear) same element WILL have different URI in each workspace.
 * In general we recommend using URIs only if your code retrieves them at runtime from backend using elements query
 * or from the data view's headers. Hardcoding URIs is never a good idea, if you find yourself doing that,
 * please consider specifying attribute elements by value
 *
 * @param attributeOrRef - either instance of attribute to create filter for or ref or identifier of attribute's display form
 * @param inValues - values to filter for; these can be either specified as AttributeElements object or as an array
 *  of attribute element _values_; if you specify empty array, then the filter will be noop and will be ignored
 * @public
 */
export function newPositiveAttributeFilter(attributeOrRef, inValues) {
    const objRef = isObjRef(attributeOrRef)
        ? attributeOrRef
        : typeof attributeOrRef === "string"
            ? idRef(attributeOrRef)
            : attributeDisplayFormRef(attributeOrRef);
    const inObject = Array.isArray(inValues) ? { values: inValues } : inValues;
    return {
        positiveAttributeFilter: {
            displayForm: objRef,
            in: inObject,
        },
    };
}
/**
 * Creates a new negative attribute filter.
 *
 * @remarks
 * NOTE: when specifying attribute element using URIs (primary keys), please keep in mind that they MAY NOT be transferable
 * across workspaces. On some backends (such as bear) same element WILL have different URI in each workspace.
 * In general we recommend using URIs only if your code retrieves them at runtime from backend using elements query
 * or from the data view's headers. Hardcoding URIs is never a good idea, if you find yourself doing that,
 * please consider specifying attribute elements by value
 *
 * @param attributeOrRef - either instance of attribute to create filter for or ref or identifier of attribute's display form
 * @param notInValues - values to filter out; these can be either specified as AttributeElements object or as an array
 *  of attribute element _values_; if you specify empty array, then the filter will be noop and will be ignored
 * @public
 */
export function newNegativeAttributeFilter(attributeOrRef, notInValues) {
    const objRef = isObjRef(attributeOrRef)
        ? attributeOrRef
        : typeof attributeOrRef === "string"
            ? idRef(attributeOrRef)
            : attributeDisplayFormRef(attributeOrRef);
    const notInObject = Array.isArray(notInValues)
        ? { values: notInValues }
        : notInValues;
    return {
        negativeAttributeFilter: {
            displayForm: objRef,
            notIn: notInObject,
        },
    };
}
/**
 * Creates a new absolute date filter.
 *
 * @param dateDataSet - ref or identifier of the date data set to filter on
 * @param from - start of the interval in ISO-8601 calendar date format
 * @param to - end of the interval in ISO-8601 calendar date format
 * @public
 */
export function newAbsoluteDateFilter(dateDataSet, from, to) {
    const dataSet = isObjRef(dateDataSet) ? dateDataSet : idRef(dateDataSet);
    return {
        absoluteDateFilter: {
            dataSet,
            from,
            to,
        },
    };
}
/**
 * Creates a new relative date filter.
 *
 * @param dateDataSet - ref or identifier of the date data set to filter on
 * @param granularity - granularity of the filters (month, year, etc.)
 * @param from - start of the interval – negative numbers mean the past, zero means today, positive numbers mean the future
 * @param to - end of the interval – negative numbers mean the past, zero means today, positive numbers mean the future
 *
 * See also {@link DateAttributeGranularity} and {@link DateGranularity}
 * @public
 */
export function newRelativeDateFilter(dateDataSet, granularity, from, to) {
    const dataSet = isObjRef(dateDataSet) ? dateDataSet : idRef(dateDataSet);
    return {
        relativeDateFilter: {
            dataSet,
            granularity,
            from,
            to,
        },
    };
}
/**
 * Creates a new all time date filter. This filter is used to indicate that there should be no filtering on the given date data set.
 *
 * @param dateDataSet - ref or identifier of the date data set to filter on
 * @public
 */
export function newAllTimeFilter(dateDataSet) {
    const dataSet = isObjRef(dateDataSet) ? dateDataSet : idRef(dateDataSet);
    return {
        relativeDateFilter: {
            dataSet,
            granularity: "ALL_TIME_GRANULARITY",
            from: 0,
            to: 0,
        },
    };
}
function convertMeasureOrRefToObjRefInScope(measureOrRef) {
    return isMeasure(measureOrRef)
        ? localIdRef(measureLocalId(measureOrRef))
        : typeof measureOrRef === "string"
            ? localIdRef(measureOrRef)
            : measureOrRef;
}
function convertAttributeOrRefToObjRefInScope(attributeOrRef) {
    return isAttribute(attributeOrRef)
        ? localIdRef(attributeLocalId(attributeOrRef))
        : typeof attributeOrRef === "string"
            ? localIdRef(attributeOrRef)
            : attributeOrRef;
}
/**
 * Creates a new measure value filter.
 *
 * @param measureOrRef - instance of measure to filter, or reference of the measure object; if instance of measure is
 *   provided, then it is assumed this measure is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @param operator - comparison or range operator to use in the filter
 * @param val1 - first numeric value, used as value in comparison or as 'from' value in range operators
 * @param val2OrTreatNullValuesAsInComparison - second numeric value, required in range operators and used in 'to' value; optional in comparison operators used as 'treatNullValuesAs' value
 * @param treatNullValuesAsInRange - third numeric value, optional in range operators and used as 'treatNullValuesAs' value; optional and ignored in comparison operators
 * @public
 */
export function newMeasureValueFilter(measureOrRef, operator, val1, val2OrTreatNullValuesAsInComparison, treatNullValuesAsInRange) {
    const ref = convertMeasureOrRefToObjRefInScope(measureOrRef);
    if (operator === "BETWEEN" || operator === "NOT_BETWEEN") {
        invariant(val2OrTreatNullValuesAsInComparison !== undefined, "measure value filter with range operator requires two numeric values");
        const nullValuesProp = !isNil(treatNullValuesAsInRange)
            ? { treatNullValuesAs: treatNullValuesAsInRange }
            : {};
        return {
            measureValueFilter: {
                measure: ref,
                condition: {
                    range: Object.assign({ operator, from: val1, to: val2OrTreatNullValuesAsInComparison }, nullValuesProp),
                },
            },
        };
    }
    else {
        const nullValuesProp = !isNil(val2OrTreatNullValuesAsInComparison)
            ? { treatNullValuesAs: val2OrTreatNullValuesAsInComparison }
            : {};
        return {
            measureValueFilter: {
                measure: ref,
                condition: {
                    comparison: Object.assign({ operator, value: val1 }, nullValuesProp),
                },
            },
        };
    }
}
/**
 * Creates a new ranking filter.
 *
 * @param measureOrRef - instance of measure to filter, or reference of the measure object; if instance of measure is
 *   provided, then it is assumed this measure is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @param attributesOrRefsOrOperator - Array of attributes used in filter, or reference of the attribute object. If instance of attribute is
 *   provided, then it is assumed this attribute is in scope of execution and will be referenced by the filter by
 *   its local identifier. If attributes are not specified it's TOP or BOTTOM operator to use in the filter
 * @param operatorOrValue - Number of values to use in filter or operator if attributes are not speciied
 * @param valueOrNothing - Value or nothing if attributes are not specified
 * @public
 */
export function newRankingFilter(measureOrRef, attributesOrRefsOrOperator, operatorOrValue, valueOrNothing) {
    if (typeof attributesOrRefsOrOperator === "string" && typeof operatorOrValue === "number") {
        const measureRef = convertMeasureOrRefToObjRefInScope(measureOrRef);
        return {
            rankingFilter: {
                measure: measureRef,
                operator: attributesOrRefsOrOperator,
                value: operatorOrValue,
            },
        };
    }
    else if (typeof operatorOrValue === "string" && valueOrNothing) {
        const measureRef = convertMeasureOrRefToObjRefInScope(measureOrRef);
        const attributeRefs = attributesOrRefsOrOperator.map(convertAttributeOrRefToObjRefInScope);
        const attributesProp = attributeRefs.length ? { attributes: attributeRefs } : {};
        return {
            rankingFilter: Object.assign({ measure: measureRef, operator: operatorOrValue, value: valueOrNothing }, attributesProp),
        };
    }
    throw new Error("Ranking filter requires measure, operator and value");
}
//# sourceMappingURL=factory.js.map