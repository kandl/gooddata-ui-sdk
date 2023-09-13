/**
 * @public
 */
export type DateString = string;
/**
 * @public
 */
export type Timestamp = string;
/**
 * @public
 */
export type TimeIso8601 = string;
/**
 * @public
 */
export type Email = string;
/**
 * @public
 */
export type NumberAsString = string;
/**
 * @public
 */
export type Uri = string;
/**
 * @public
 */
export type MaqlExpression = string;
/**
 * @public
 */
export type BooleanAsString = "1" | "0";
/**
 * CSS color in hex format (f.g. #14b2e2)
 * @public
 */
export type ThemeColor = string;
/**
 * @public
 */
export type ThemeFontUri = string;
/**
 * @public
 */
export type SortDirection = "asc" | "desc";
/**
 * @public
 */
export type Identifier = string;
/**
 * @public
 */
export type MeasureAggregation = "sum" | "count" | "avg" | "min" | "max" | "median" | "runsum";
/**
 * @public
 */
export type TotalType = "sum" | "avg" | "max" | "min" | "nat" | "med";
/**
 * @public
 */
export type ArithmeticMeasureOperator = "sum" | "difference" | "multiplication" | "ratio" | "change";
/**
 * @public
 */
export type ComparisonConditionOperator = "GREATER_THAN" | "GREATER_THAN_OR_EQUAL_TO" | "LESS_THAN" | "LESS_THAN_OR_EQUAL_TO" | "EQUAL_TO" | "NOT_EQUAL_TO";
/**
 * @public
 */
export type RangeConditionOperator = "BETWEEN" | "NOT_BETWEEN";
/**
 * @public
 */
export type RankingFilterOperator = "TOP" | "BOTTOM";
/**
 * @public
 */
export interface ILocalIdentifierQualifier {
    localIdentifier: string;
}
/**
 * @public
 */
export interface IObjUriQualifier {
    uri: string;
}
/**
 * @public
 */
export interface IObjIdentifierQualifier {
    identifier: string;
}
/**
 * @public
 */
export type ObjQualifier = IObjUriQualifier | IObjIdentifierQualifier;
/**
 * @public
 */
export type Qualifier = ObjQualifier | ILocalIdentifierQualifier;
/**
 * @public
 */
export interface IComparisonCondition {
    comparison: {
        operator: ComparisonConditionOperator;
        value: number;
        treatNullValuesAs?: number;
    };
}
/**
 * @public
 */
export interface IRangeCondition {
    range: {
        operator: RangeConditionOperator;
        from: number;
        to: number;
        treatNullValuesAs?: number;
    };
}
/**
 * @public
 */
export type MeasureValueFilterCondition = IComparisonCondition | IRangeCondition;
/**
 * @public
 */
export interface IPreviousPeriodDateDataSet {
    dataSet: ObjQualifier;
    periodsAgo: number;
}
/**
 * @public
 */
export declare function isObjectUriQualifier(qualifier: ObjQualifier): qualifier is IObjUriQualifier;
/**
 * @public
 */
export declare function isObjIdentifierQualifier(qualifier: ObjQualifier): qualifier is IObjIdentifierQualifier;
/**
 * @public
 */
export declare function isLocalIdentifierQualifier(qualifier: unknown): qualifier is ILocalIdentifierQualifier;
/**
 * @public
 */
export declare function isComparisonCondition(condition: MeasureValueFilterCondition): condition is IComparisonCondition;
/**
 * @public
 */
export declare function isRangeCondition(condition: MeasureValueFilterCondition): condition is IRangeCondition;
//# sourceMappingURL=GdcTypes.d.ts.map