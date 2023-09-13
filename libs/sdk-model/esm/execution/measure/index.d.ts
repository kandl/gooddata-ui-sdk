import { Identifier, ObjRef } from "../../objRef/index.js";
import { IMeasureFilter } from "../filter/index.js";
/**
 * Available measure definitions; this is union of simple measure, arithmetic measure, PoP measure and
 * previous period measure.
 *
 * @remarks
 * See the respective definitions for more information on what can be achieved using them.
 *
 * @public
 */
export type IMeasureDefinitionType = IInlineMeasureDefinition | IMeasureDefinition | IArithmeticMeasureDefinition | IPoPMeasureDefinition | IPreviousPeriodMeasureDefinition;
/**
 * Object defining the {@link IMeasure} object structure.
 *
 * @public
 */
export interface IMeasureBody<T extends IMeasureDefinitionType = IMeasureDefinitionType> {
    localIdentifier: Identifier;
    definition: T;
    alias?: string;
    title?: string;
    format?: string;
}
/**
 * All types of measures have a set of common properties; those are defined here.
 *
 * @remarks
 * The measure-type-specific information is stored in the measure definition.
 *
 * @public
 */
export interface IMeasure<T extends IMeasureDefinitionType = IMeasureDefinitionType> extends IMeasureTitle {
    measure: IMeasureBody<T>;
}
/**
 * Specification of measure either by value or by local id reference.
 *
 * @remarks
 * It is a common convenience that functions which require measure reference accept both value and reference.
 *
 * @public
 */
export type MeasureOrLocalId = IMeasure | Identifier;
/**
 * Object defining the {@link IMeasureTitle} object body.
 *
 * @public
 */
export interface IMeasureTitleBody {
    localIdentifier: string;
    title?: string;
    alias?: string;
}
/**
 * Subset of IMeasure interface which defines properties that MAY be used to provide human readable
 * description of the measure.
 *
 * @public
 */
export interface IMeasureTitle {
    measure: IMeasureTitleBody;
}
/**
 * Simple measures created from facts can use these types of aggregations.
 *
 * @remarks
 * Note the special approximate_count aggregation. It translates to corresponding SQL function on backend if the
 * underlying data source supports it. Otherwise the backend should fall back to classic exact count. Some backends
 * are oblivious to this functionality completely - for them it's ok to perform the fallback already in SDK backend.
 *
 * @public
 */
export type MeasureAggregation = "sum" | "count" | "approximate_count" | "avg" | "min" | "max" | "median" | "runsum";
/**
 * Object defining the {@link IMeasureDefinition} object structure.
 *
 * @public
 */
export interface IMeasureDefinitionBody {
    /**
     * Reference to MAQL metric or LDM fact object.
     */
    item: ObjRef;
    /**
     * Aggregation to apply when calculating from LDM facts. If aggregation is provided for MAQL measures,
     * it will be ignored.
     */
    aggregation?: MeasureAggregation;
    /**
     * Filters to apply in scope of this measure's calculation.
     */
    filters?: IMeasureFilter[];
    /**
     * Indicates whether the measure should be calculated as % of total instead of actual values.
     */
    computeRatio?: boolean;
}
/**
 * Simple measures are defined from existing MAQL measures or logical data model facts.
 *
 * @remarks
 * Measures created from facts MAY specify aggregation function to apply during execution.
 *
 * @public
 */
export interface IMeasureDefinition {
    measureDefinition: IMeasureDefinitionBody;
}
/**
 * Inline measures are defined as MAQL measures inline string.
 *
 * @remarks
 * Measures created from facts MAY specify aggregation function to apply during execution.
 *
 * @public
 */
export interface IInlineMeasureDefinition {
    inlineDefinition: {
        maql: string;
    };
}
/**
 * Simple math operators for arithmetic measure construction.
 *
 * @public
 */
export type ArithmeticMeasureOperator = "sum" | "difference" | "multiplication" | "ratio" | "change";
/**
 * Arithmetic measures are created by composing two or more other measures and defining arithmetic
 * to apply on their values.
 *
 * @public
 */
export interface IArithmeticMeasureDefinition {
    arithmeticMeasure: {
        measureIdentifiers: Identifier[];
        operator: ArithmeticMeasureOperator;
    };
}
/**
 * Virtual arithmetic measures are the same arithmetic measure and include flag virtual
 *
 * @remarks
 * In fact, the 'virtual' property should ideally be introduced within the 'IArithmeticMeasureDefinition' interface.
 * However, since 'IArithmeticMeasureDefinition' is a public interface and the 'virtual' property is intended for internal use,
 * we are hesitant to expose this property publicly.
 * Publicizing this property could raise concerns among users about whether the arithmetic measure is virtual or not.
 *
 * @internal
 */
export interface IVirtualArithmeticMeasureDefinition extends IArithmeticMeasureDefinition {
    virtual?: boolean;
}
/**
 * Object defining the {@link IPoPMeasureDefinition} object body.
 *
 * @public
 */
export interface IPoPMeasureDefinitionBody {
    measureIdentifier: Identifier;
    popAttribute: ObjRef;
}
/**
 * Defines Period-Over-Period measure (or Time-over-Time).
 *
 * @remarks
 * This is a derived measure that calculates value of a measure referenced by measureIdentifier in previous period.
 * The period to calculate value for will be determined from the specified date data set's attribute - popAttribute.
 *
 * @privateRemarks
 * TODO: enhance, add examples
 * @public
 */
export interface IPoPMeasureDefinition {
    popMeasureDefinition: IPoPMeasureDefinitionBody;
}
/**
 * Object defining the {@link IPreviousPeriodMeasureDefinition} object body.
 *
 * @public
 */
export interface IPreviousPeriodMeasureDefinitionBody {
    measureIdentifier: Identifier;
    dateDataSets: IPreviousPeriodDateDataSet[];
}
/**
 * This is a derived measure that calculates value of a measure referenced by measureIdentifier for previous
 * period.
 *
 * @remarks
 * Period is determined from filter setting of the specified date data sets. The time period for
 * this derived measure will be shifted forward or backward according to the specified periodAgo number
 *
 * @privateRemarks
 * TODO: enhance, add examples
 *
 * @public
 */
export interface IPreviousPeriodMeasureDefinition {
    previousPeriodMeasure: IPreviousPeriodMeasureDefinitionBody;
}
/**
 * This is used to specify previous period.
 *
 * @remarks
 * Previous period is current time period shifted forward or backward
 * one or more times. The current time period is calculated from filter setting for the provided date data set.
 *
 * @public
 */
export interface IPreviousPeriodDateDataSet {
    dataSet: ObjRef;
    periodsAgo: number;
}
/**
 * Defines function signature for measure predicates.
 *
 * @public
 */
export type MeasurePredicate = (measure: IMeasure) => boolean;
/**
 * Implementation of measure predicate which always returns true.
 *
 * @public
 */
export declare const anyMeasure: MeasurePredicate;
/**
 * Factory function for measure predicate which evaluates true for measures that match particular ID.
 *
 * @public
 */
export declare const idMatchMeasure: (id: string) => MeasurePredicate;
/**
 * Type guard for checking whether object is any type of measure.
 *
 * @public
 */
export declare function isMeasure(obj: unknown): obj is IMeasure;
/**
 * Type guard for checking whether object is a simple measure.
 *
 * @public
 */
export declare function isSimpleMeasure(obj: unknown): obj is IMeasure<IMeasureDefinition>;
/**
 * Type guard for checking whether object is a inline measure.
 *
 * @public
 */
export declare function isInlineMeasure(obj: unknown): obj is IMeasure<IInlineMeasureDefinition>;
/**
 * Type guard for checking whether object is an adhoc measure.
 *
 * @remarks
 * An adhoc measure is a measure having an aggregation, one or some filters or a computeRatio of true
 *
 * @public
 */
export declare function isAdhocMeasure(obj: unknown): obj is IMeasure<IMeasureDefinition>;
/**
 * Type guard for checking whether object is a period-over-period measure.
 *
 * @public
 */
export declare function isPoPMeasure(obj: unknown): obj is IMeasure<IPoPMeasureDefinition>;
/**
 * Type guard for checking whether object is a previous-period measure.
 *
 * @public
 */
export declare function isPreviousPeriodMeasure(obj: unknown): obj is IMeasure<IPreviousPeriodMeasureDefinition>;
/**
 * Type guard for checking whether object is an arithmetic measure.
 *
 * @public
 */
export declare function isArithmeticMeasure(obj: unknown): obj is IMeasure<IArithmeticMeasureDefinition>;
/**
 * Type guard for checking whether an object is a virtual arithmetic measure.
 *
 * @internal
 *
 * @param obj - The object to be checked for being a virtual arithmetic measure.
 * @returns Returns true if the object is a virtual arithmetic measure, false otherwise.
 */
export declare function isVirtualArithmeticMeasure(obj: unknown): obj is IMeasure<IVirtualArithmeticMeasureDefinition>;
/**
 * Type guard for checking whether object is a measure definition.
 *
 * @public
 */
export declare function isMeasureDefinition(obj: unknown): obj is IMeasureDefinition;
/**
 * Type guard for checking whether object is a inline measure definition.
 *
 * @public
 */
export declare function isInlineMeasureDefinition(obj: unknown): obj is IInlineMeasureDefinition;
/**
 * Type guard for checking whether object is a period-over-period measure definition.
 *
 * @public
 */
export declare function isPoPMeasureDefinition(obj: unknown): obj is IPoPMeasureDefinition;
/**
 * Type guard for checking whether object is a previous period measure definition.
 *
 * @public
 */
export declare function isPreviousPeriodMeasureDefinition(obj: unknown): obj is IPreviousPeriodMeasureDefinition;
/**
 * Type guard for checking whether object is an arithmetic measure definition.
 *
 * @public
 */
export declare function isArithmeticMeasureDefinition(obj: unknown): obj is IArithmeticMeasureDefinition;
/**
 * Type guard for checking whether object is a virtual arithmetic measure definition.
 *
 * @internal
 */
export declare function isVirtualArithmeticMeasureDefinition(obj: unknown): obj is IVirtualArithmeticMeasureDefinition;
/**
 * Gets measure's local identifier. For convenience and fluency, this function accepts both measure object and identifier
 * object.
 *
 * @param measureOrLocalId - measure object or measure localId; if localId provided, it is returned as is
 * @returns string identifier
 * @public
 */
export declare function measureLocalId(measureOrLocalId: MeasureOrLocalId): string;
/**
 * Gets URI of persistent measure.
 *
 * @remarks
 * Undefined is returned if the measure definition is not for a persistent
 * measure (arithmetic or derived). Undefined is returned if the measure is not specified by URI.
 *
 * @param measure - measure to get URI for
 * @returns URI or undefined
 * @public
 */
export declare function measureUri(measure: IMeasure): string | undefined;
/**
 * Gets identifier of persistent measure.
 *
 * @remarks
 * Undefined is returned if the measure definition is not for a persistent
 * measure (arithmetic or derived). Undefined is returned if the measure is not specified by identifier.
 *
 * @param measure - measure to get URI for
 * @returns identifier or undefined
 * @public
 */
export declare function measureIdentifier(measure: IMeasure): string | undefined;
/**
 * Gets reference of LDM object from which the measure is calculated (fact or MAQL metric).
 *
 * @param measure - measure to get LDM object reference from
 * @returns object reference
 * @public
 */
export declare function measureItem(measure: IMeasure<IMeasureDefinition>): ObjRef;
/**
 * Gets reference of LDM object from which the measure is calculated (fact or MAQL metric).
 *
 * @param measure - measure to get LDM object reference from
 * @returns object reference or undefined if not simple measure
 * @public
 */
export declare function measureItem(measure: IMeasure): ObjRef | undefined;
/**
 * Tests whether the measure is set to compute ratio.
 *
 * @param measure - measure to to test
 * @returns true if computes ratio, false otherwise
 * @public
 */
export declare function measureDoesComputeRatio(measure: IMeasure): measure is IMeasure<IMeasureDefinition>;
/**
 * Gets identifier of master measure for the provided PoP measure or Previous Period measure.
 *
 * @param measure - derived measure
 * @returns master measure identifier
 * @public
 */
export declare function measureMasterIdentifier(measure: IMeasure<IPoPMeasureDefinition | IPreviousPeriodMeasureDefinition>): string;
/**
 * Gets identifier of master measure for the provided derived measure (PoP measure or Previous Period measure).
 *
 * @remarks
 * If the measure is not derived or is derived and does not specify master measure id, then undefined is returned.
 *
 * @param measure - derived measure
 * @returns master measure identifier, undefined if input measure not derived or does not specify master
 * @public
 */
export declare function measureMasterIdentifier(measure: IMeasure): string | undefined;
/**
 * Gets identifiers of arithmetic operands from the provided arithmetic measure.
 *
 * @param measure - measure to get arithmetic operands from
 * @returns array of local identifiers of measures that are used as arithmetic operands
 * @public
 */
export declare function measureArithmeticOperands(measure: IMeasure<IArithmeticMeasureDefinition>): string[];
/**
 * Gets identifiers of arithmetic operands from the provided measure. If the measure is not an arithmetic measure, then
 * undefined is returned.
 *
 * @param measure - measure to get arithmetic operands from
 * @returns array of local identifiers of measures that are used as arithmetic operands, undefined if input measure
 * is not arithmetic
 * @public
 */
export declare function measureArithmeticOperands(measure: IMeasure): string[] | undefined;
/**
 * Gets arithmetic operator from the provided arithmetic measure.
 *
 * @param measure - arithmetic measure to get arithmetic operator from
 * @returns arithmetic operator of the measure
 * @public
 */
export declare function measureArithmeticOperator(measure: IMeasure<IArithmeticMeasureDefinition>): ArithmeticMeasureOperator;
/**
 * Gets arithmetic operator from the provided measure.
 *
 * @remarks
 * If the measure is not an arithmetic measure, then undefined is returned.
 *
 * @param measure - measure to get arithmetic operator from
 * @returns arithmetic operator of the measure, or undefined if measure is not arithmetic
 * @public
 */
export declare function measureArithmeticOperator(measure: IMeasure): ArithmeticMeasureOperator | undefined;
/**
 * Gets measure alias.
 *
 * @param measure - measure to get the alias of
 * @returns measure alias if specified, undefined otherwise
 * @public
 */
export declare function measureAlias(measure: IMeasure): string | undefined;
/**
 * Gets measure title.
 * @param measure - measure to get the title of
 * @returns measure title if specified, undefined otherwise
 * @public
 */
export declare function measureTitle(measure: IMeasure): string | undefined;
/**
 * Gets measure format.
 * @param measure - measure to get the format of
 * @returns measure format if specified, undefined otherwise
 * @public
 */
export declare function measureFormat(measure: IMeasure): string | undefined;
/**
 * Gets a flag indicating whether a given measure has a format resulting in data being formatted as percentage
 * @param measureOrFormat - measure or measure format to test
 * @returns true if the measure format is in percent, false otherwise
 * @public
 * @remarks Measure format is considered to represent value in percent when
 * A) format string has no conditional separators (i.e. no semicolons except a single one at the end);
 *    otherwise the parsing would need access to a particular value.
 * B) percentage symbol is found (not directly preceded by backslash)
 */
export declare function isMeasureFormatInPercent(measureOrFormat: IMeasure | string): boolean;
/**
 * Gets measure aggregation from a measure.
 *
 * @remarks
 * Measure aggregation is applicable and optional only for
 * simple measures. Passing any other measure to this function guarantees that undefined will be returned
 *
 * @param measure - measure to get the aggregation of
 * @returns measure aggregation if specified, undefined otherwise
 * @public
 */
export declare function measureAggregation(measure: IMeasure): MeasureAggregation | undefined;
/**
 * Gets measure filters.
 *
 * @param measure - measure to get the filters of
 * @returns measure filters if specified, undefined otherwise
 * @public
 */
export declare function measureFilters(measure: IMeasure): IMeasureFilter[] | undefined;
/**
 * Gets attribute used for period-over-period measure calculation.
 *
 * @param measure - measure to get the popAttribute of
 * @returns measure popAttribute
 * @public
 */
export declare function measurePopAttribute(measure: IMeasure<IPoPMeasureDefinition>): ObjRef;
/**
 * Gets attribute used for period-over-period measure calculation.
 *
 * @remarks
 * If the input measure is not a period over period measure, then undefined will be returned.
 *
 * @param measure - measure to get the popAttribute of
 * @returns measure popAttribute, undefined if input is not a PoP measure
 * @public
 */
export declare function measurePopAttribute(measure: IMeasure): ObjRef | undefined;
/**
 * Gets date data sets used in previous-period measure.
 *
 * @param measure - measure to get the previous period date data sets of
 * @returns previous period date data sets
 * @public
 */
export declare function measurePreviousPeriodDateDataSets(measure: IMeasure<IPreviousPeriodMeasureDefinition>): IPreviousPeriodDateDataSet[];
/**
 * Gets date data sets used in previous-period measure.
 *
 * @remarks
 * If the input is not a previous period measure, then undefined will be returned.
 *
 * @param measure - measure to get the previous period date data sets of
 * @returns measure previous period date data sets if specified, undefined otherwise
 * @public
 */
export declare function measurePreviousPeriodDateDataSets(measure: IMeasure): IPreviousPeriodDateDataSet[] | undefined;
//# sourceMappingURL=index.d.ts.map