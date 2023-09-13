import { ComparisonConditionOperator, IAbsoluteDateFilter, IAttributeElements, IMeasureValueFilter, INegativeAttributeFilter, IPositiveAttributeFilter, IRelativeDateFilter, RangeConditionOperator, IRankingFilter, RankingFilterOperator } from "./index.js";
import { IAttribute } from "../attribute/index.js";
import { Identifier, LocalIdRef, ObjRef, ObjRefInScope } from "../../objRef/index.js";
import { IMeasure } from "../measure/index.js";
import { DateAttributeGranularity } from "../../base/dateGranularities.js";
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
export declare function newPositiveAttributeFilter(attributeOrRef: IAttribute | ObjRef | Identifier, inValues: IAttributeElements | string[]): IPositiveAttributeFilter;
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
export declare function newNegativeAttributeFilter(attributeOrRef: IAttribute | ObjRef | Identifier, notInValues: IAttributeElements | string[]): INegativeAttributeFilter;
/**
 * Creates a new absolute date filter.
 *
 * @param dateDataSet - ref or identifier of the date data set to filter on
 * @param from - start of the interval in ISO-8601 calendar date format
 * @param to - end of the interval in ISO-8601 calendar date format
 * @public
 */
export declare function newAbsoluteDateFilter(dateDataSet: ObjRef | Identifier, from: string, to: string): IAbsoluteDateFilter;
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
export declare function newRelativeDateFilter(dateDataSet: ObjRef | Identifier, granularity: DateAttributeGranularity, from: number, to: number): IRelativeDateFilter;
/**
 * Creates a new all time date filter. This filter is used to indicate that there should be no filtering on the given date data set.
 *
 * @param dateDataSet - ref or identifier of the date data set to filter on
 * @public
 */
export declare function newAllTimeFilter(dateDataSet: ObjRef | Identifier): IRelativeDateFilter;
/**
 * Creates a new measure value filter.
 *
 * @param measureOrRef - instance of measure to filter, or reference of the measure object; if instance of measure is
 *   provided, then it is assumed this measure is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @param operator - comparison or range operator to use in the filter
 * @param value - the value to compare to
 * @param treatNullValuesAs - value to use instead of null values
 * @public
 */
export declare function newMeasureValueFilter(measureOrRef: IMeasure | ObjRefInScope | string, operator: ComparisonConditionOperator, value: number, treatNullValuesAs?: number): IMeasureValueFilter;
/**
 * Creates a new measure value filter.
 *
 * @param measureOrRef - instance of measure to filter, or reference of the measure object; if instance of measure is
 *   provided, then it is assumed this measure is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @param operator - range operator to use in the filter
 * @param from - the start of the range
 * @param to - the end of the range
 * @param treatNullValuesAs - value to use instead of null values
 * @public
 */
export declare function newMeasureValueFilter(measureOrRef: IMeasure | ObjRefInScope | LocalIdRef | string, operator: RangeConditionOperator, from: number, to: number, treatNullValuesAs?: number): IMeasureValueFilter;
/**
 * Creates a new ranking filter.
 *
 * @param measureOrRef - instance of measure to filter, or reference of the measure object; if instance of measure is
 *   provided, then it is assumed this measure is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @param operator - TOP or BOTTOM operator to use in the filter
 * @param value - Number of values to use in filter
 * @param attributesOrRefs - Array of attributes used in filter, or reference of the attribute object. If instance of attribute is
 *   provided, then it is assumed this attribute is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @public
 */
export declare function newRankingFilter(measureOrRef: IMeasure | ObjRefInScope | string, attributesOrRefs: Array<IAttribute | ObjRefInScope | string>, operator: RankingFilterOperator, value: number): IRankingFilter;
/**
 * Creates a new ranking filter.
 *
 * @param measureOrRef - instance of measure to filter, or reference of the measure object; if instance of measure is
 *   provided, then it is assumed this measure is in scope of execution and will be referenced by the filter by
 *   its local identifier
 * @param operator - TOP or BOTTOM operator to use in the filter
 * @param value - Number of values to use in filter
 * @public
 */
export declare function newRankingFilter(measureOrRef: IMeasure | ObjRefInScope | string, operator: RankingFilterOperator, value: number): IRankingFilter;
//# sourceMappingURL=factory.d.ts.map