import { ObjRef, IAttribute } from "@gooddata/sdk-model";
export declare const MinAmount: import("@gooddata/sdk-model").IMeasure<import("@gooddata/sdk-model").IMeasureDefinition>;
export declare const MedianAmount: import("@gooddata/sdk-model").IMeasure<import("@gooddata/sdk-model").IMeasureDefinition>;
export declare const MaxAmount: import("@gooddata/sdk-model").IMeasure<import("@gooddata/sdk-model").IMeasureDefinition>;
/**
 * Arithmetic measure doing difference of Amount and Won measures
 */
export declare const CalculatedLost: import("@gooddata/sdk-model").IMeasure<import("@gooddata/sdk-model").IArithmeticMeasureDefinition>;
/**
 * Arithmetic measure calculating ratio of calculated 'Lost' and
 * MAQL 'Won' measure
 */
export declare const CalculatedWonLostRatio: import("@gooddata/sdk-model").IMeasure<import("@gooddata/sdk-model").IArithmeticMeasureDefinition>;
/**
 * A PoP measure derived from 'Won' measure, comparing same period previous year
 */
export declare const WonPopClosedYear: import("@gooddata/sdk-model").IMeasure<import("@gooddata/sdk-model").IPoPMeasureDefinition>;
/**
 * A previous period measure derived from 'Won' measure
 */
export declare const WonPreviousPeriod: import("@gooddata/sdk-model").IMeasure<import("@gooddata/sdk-model").IPreviousPeriodMeasureDefinition>;
/**
 * Measure that computes ratio
 */
export declare const AmountWithRatio: import("@gooddata/sdk-model").IMeasure<import("@gooddata/sdk-model").IMeasureDefinition>;
/**
 * A reference to Stage History Attribute
 */
export declare const StageHistoryAttributeRef: ObjRef;
/**
 * Copy of ClosedYear attribute
 */
export declare const ModifiedClosedYear: IAttribute;
//# sourceMappingURL=ext.d.ts.map