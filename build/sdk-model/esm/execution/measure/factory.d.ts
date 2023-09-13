import { ArithmeticMeasureOperator, IArithmeticMeasureDefinition, IMeasure, IMeasureDefinition, IMeasureDefinitionType, IPoPMeasureDefinition, IPreviousPeriodMeasureDefinition, MeasureAggregation, MeasureOrLocalId, IInlineMeasureDefinition, IVirtualArithmeticMeasureDefinition } from "./index.js";
import { Identifier, ObjRef } from "../../objRef/index.js";
import { IMeasureFilter } from "../filter/index.js";
/**
 * Simplified Previous Period Data DataSet specification
 * @public
 */
export interface IPreviousPeriodDateDataSetSimple {
    /**
     * Identifier or reference to the date data set.
     */
    dataSet: string | ObjRef;
    periodsAgo: number;
}
/**
 * Measure without the definition.
 * @public
 */
export type MeasureEnvelope = Omit<IMeasure["measure"], "definition">;
/**
 * Abstract base class for measure builders. Measure builders allow for incremental, fluent construction
 * and modification of measures.
 *
 * @remarks
 * You should not be instantiating the builders directly. Instead, rely on the different functions to
 * create different types of measures.
 *
 * @public
 */
export declare abstract class MeasureBuilderBase<T extends IMeasureDefinitionType> {
    protected customLocalId: boolean;
    private measure;
    /**
     * @internal
     */
    protected constructor();
    /**
     * Sets local identifier (localId) for the measure. LocalId can be used to reference the measure
     * within the execution definition.
     *
     * @remarks
     * Normally, builder will generate localId based on contents of the measure definition - taking all
     * properties into account: in typical scenarios you don't have to call this function at all. The only exception
     * where you have to provide custom local id is if your execution must contain the exact same measure twice.
     *
     * For convenience, this method also accepts 'undefined', which indicates that the default local id generation
     * logic should be used.
     *
     * @param localId - local identifier to set; if not specified, the builder will ensure local id will
     * be generated
     */
    localId: (localId?: Identifier | undefined) => this;
    /**
     * Indicates that the measure's localId should be generated using the default local-id generator logic.
     */
    defaultLocalId: () => this;
    /**
     * Sets alias - alternative title - for the measure.
     *
     * @remarks
     * This value will then be used in various chart-specific descriptive elements.
     * For convenience if no alias is specified, the measure will fall back to using either title (if specified)
     * or server-defined title as the ultimate fallback
     *
     * @param alias - alias to use instead of measure title; undefined to use the title instead
     */
    alias: (alias?: string | undefined) => this;
    /**
     * Resets alias - alternative title - set for the measure.
     *
     * @remarks
     * The measure title will be used if specified, otherwise the server-defined title will be used instead.
     */
    noAlias: () => this;
    /**
     * Sets alternative title for the measure.
     *
     * @remarks
     * This value will then be used in various chart-specific descriptive elements.
     * For convenience if no title is specified, the measure will fall back to server-defined value.
     *
     * @param title - alternative title to use instead of server-defined value; undefined to use server-defined value
     */
    title: (title?: string | undefined) => this;
    /**
     * Resets alternative title for the measure. The server-defined title of the measure will be used
     * instead.
     */
    noTitle: () => this;
    /**
     * Sets measure format to use when rendering values calculated from this measure.
     *
     * @remarks
     * The format string is described in more detail here {@link https://help.gooddata.com/doc/en/reporting-and-dashboards/reports/working-with-reports/formatting-numbers-in-reports}.
     *
     * For convenience, if you do not specify any format, then a default server-defined value will be used instead.
     *
     * @param format - measure format string; or undefined if you want to fall back to server-defined value
     */
    format: (format?: string | undefined) => this;
    /**
     * Resets format string to the server-defined value.
     */
    defaultFormat: () => this;
    build: () => IMeasure<T>;
    /**
     * The measure builder subclasses must call this when they are used to modify
     * an existing measure. Existing measure modification returns a new object that
     * reflects the mods however it keeps the localId set as-is.
     *
     * @param measure - envelope of measure being modified
     */
    protected initializeFromExisting(measure: MeasureEnvelope): void;
    /**
     * Generation of local identifier is a responsibility shared with the the subclass - so that the concrete
     * builders can use their concrete definition to provide additional parts of the local id.
     *
     * @returns local identifier
     */
    protected abstract generateLocalId(): string;
    /**
     * Build of measure definition is responsibility of the subclass.
     *
     * @returns new instance
     */
    protected abstract buildDefinition(): T;
    /**
     * If custom localId has been set using localId() function, then use it unless it is empty.
     *
     * In all other cases generate localId. The localId generation consists up from three parts:
     *
     * - local identifier always starts with letter 'm'
     * - IF alias, title or format is specified, it is hashed and first 8 chars of the hash will follow
     * - The measure type specific part of the local identifier follows
     *
     * These three parts are separated using underscore.
     */
    private getOrGenerateLocalId;
    private buildEnvelopeLocalIdPart;
    private buildEnvelope;
}
/**
 * Builder for simple measures.
 *
 * Do not instantiate this builder directly, instead use {@link newMeasure} or {@link modifyMeasure} functions.
 *
 * @public
 */
export declare class MeasureBuilder extends MeasureBuilderBase<IMeasureDefinition> {
    private readonly measureDefinition;
    /**
     * @internal
     */
    constructor(measureOrRef: IMeasure<IMeasureDefinition> | ObjRef);
    /**
     * Sets aggregation to use for measures created from facts.
     *
     * @remarks
     * By default the aggregation is SUM. For convenience the aggregation can be specified also for measures
     * created from metrics - and in that case it will be ignored.
     *
     * For convenience, the aggregation may be undefined and it means the value should be reset to the default.
     *
     * @param aggregation - aggregation to use; if undefined will reset to default
     */
    aggregation: (aggregation?: MeasureAggregation | undefined) => this;
    /**
     * Resets measure aggregation to the default (SUM).
     */
    defaultAggregation: () => this;
    /**
     * Indicates that the measure values should be calculated as percent contributions to the total unsliced
     * value.
     *
     * @remarks
     * This method works as 'turn-on-toggle' by default, however you can specify the actual boolean parameter and
     * turn the ratio computation off using this method.
     *
     * @param value - set the compute ratio indicator to this value
     */
    ratio: (value?: boolean) => this;
    /**
     * Resets compute as ratio indicator.
     */
    noRatio: () => this;
    /**
     * Sets filters to apply when calculating the values of this measure.
     *
     * @remarks
     * These filters apply only to this particular measure calculation and do not impact the rest of the execution.
     *
     * @param filters - filters to apply to this measure
     */
    filters: (...filters: IMeasureFilter[]) => this;
    /**
     * Resets measure filters - this will remove all filters from the measure.
     */
    noFilters: () => this;
    /**
     * Sets reference to measure item that will be used for calculation.
     *
     * @remarks
     * This can be either reference to a MAQL metric or a fact to calculate from.
     *
     * @param ref - new reference to use
     */
    measureItem: (ref: ObjRef) => this;
    protected generateLocalId(): string;
    protected buildDefinition(): IMeasureDefinition;
    private filterLocalIdString;
}
/**
 * Input to the InlineMeasureBuilder.
 * @public
 */
export type InlineMeasureBuilderInput = string | IMeasure<IInlineMeasureDefinition>;
/**
 * Builder for inline measures.
 *
 * Do not instantiate this builder directly, instead use {@link newMeasure} or {@link modifyMeasure} functions.
 *
 * @public
 */
export declare class InlineMeasureBuilder extends MeasureBuilderBase<IInlineMeasureDefinition> {
    private readonly inlineMeasureDefinition;
    /**
     * @internal
     */
    constructor(measureInput: InlineMeasureBuilderInput);
    /**
     * Sets content of inline metric as string maql
     *
     * @param maql - maql of metric to use
     */
    maql: (maql: string) => this;
    protected generateLocalId(): string;
    protected buildDefinition(): IInlineMeasureDefinition;
}
/**
 * Input to the ArithmeticMeasureBuilder.
 * @public
 */
export type ArithmeticMeasureBuilderInput = {
    measuresOrIds: ReadonlyArray<MeasureOrLocalId>;
    operator: ArithmeticMeasureOperator;
} | IMeasure<IArithmeticMeasureDefinition>;
/**
 * Builder for arithmetic measures.
 *
 * Do not instantiate this builder directly, instead use {@link newArithmeticMeasure}.
 *
 * @public
 */
export declare class ArithmeticMeasureBuilder extends MeasureBuilderBase<IArithmeticMeasureDefinition> {
    private readonly arithmeticMeasure;
    /**
     * @internal
     */
    constructor(input: ArithmeticMeasureBuilderInput);
    /**
     * Sets arithmetic operator to apply when calculating the arithmetic measure.
     *
     * @param op - operator
     */
    operator: (op: ArithmeticMeasureOperator) => this;
    /**
     * Sets operands for arithmetic: other measures specified by either value or local identifier -
     *
     * @param measuresOrLocalIds - array of measures and/or localIds of measures to use as operands
     */
    operands: (measuresOrLocalIds: MeasureOrLocalId[]) => this;
    protected buildDefinition(): IArithmeticMeasureDefinition;
    protected generateLocalId(): string;
}
/**
 * Builder for virtual arithmetic measures.
 *
 * Do not instantiate this builder directly, instead use {@link newVirtualArithmeticMeasure}.
 *
 * @internal
 */
export declare class VirtualArithmeticMeasureBuilder extends ArithmeticMeasureBuilder {
    protected buildDefinition(): IVirtualArithmeticMeasureDefinition;
}
/**
 * Input to the PoPMeasureBuilder.
 * @public
 */
export type PoPMeasureBuilderInput = {
    measureOrLocalId: MeasureOrLocalId;
    popAttrIdOrRef: ObjRef | Identifier;
} | IMeasure<IPoPMeasureDefinition>;
/**
 * Builder for period-over-period measures.
 *
 * Do not instantiate this builder directly, instead use {@link newPopMeasure}.
 *
 * @public
 */
export declare class PoPMeasureBuilder extends MeasureBuilderBase<IPoPMeasureDefinition> {
    private popMeasureDefinition;
    /**
     * @internal
     */
    constructor(input: PoPMeasureBuilderInput);
    /**
     * Sets master measure from which this period-over-period measure should be calculated.
     *
     * @param measureOrLocalId - measure value or measure local identifier
     */
    masterMeasure: (measureOrLocalId: MeasureOrLocalId) => this;
    /**
     * Sets period-over-period date dimension attribute to use for offsetting. For convenience the attribute
     * may be specified by either object reference or as a string - in which case it is assumed this is identifier
     * of the attribute object.
     *
     * @param popAttrIdOrRef - reference of the PoP attribute, or identifier
     */
    popAttribute: (popAttrIdOrRef: ObjRef | Identifier) => this;
    protected buildDefinition(): IPoPMeasureDefinition;
    protected generateLocalId(): string;
}
/**
 * Import to the PreviousPeriodMeasureBuilder.
 * @public
 */
export type PreviousPeriodMeasureBuilderInput = {
    measureIdOrLocalId: MeasureOrLocalId;
    dateDataSets: IPreviousPeriodDateDataSetSimple[];
} | IMeasure<IPreviousPeriodMeasureDefinition>;
/**
 * Builder for previous period measures.
 *
 * Do not instantiate this builder directly, instead use {@link newPreviousPeriodMeasure}.
 *
 * @public
 */
export declare class PreviousPeriodMeasureBuilder extends MeasureBuilderBase<IPreviousPeriodMeasureDefinition> {
    private previousPeriodMeasure;
    /**
     * @internal
     */
    constructor(input: PreviousPeriodMeasureBuilderInput);
    /**
     * Sets master measure from which this previous period measure should be calculated.
     *
     * @param measureOrLocalId - measure value or measure local identifier
     */
    masterMeasure: (measureOrLocalId: MeasureOrLocalId) => this;
    /**
     * Sets date data set + offset within the data set to use when calculating values of this measure.
     *
     * @param dd - date data set + offset
     */
    dateDataSets: (dd: IPreviousPeriodDateDataSetSimple[]) => this;
    protected buildDefinition(): IPreviousPeriodMeasureDefinition;
    protected generateLocalId(): string;
    private convertDd;
}
/**
 * Function that will be called to perform modifications of measure before it is fully constructed.
 *
 * @public
 */
export type MeasureModifications<TBuilder> = (builder: TBuilder) => TBuilder;
/**
 * Creates a new measure with the specified identifier and optional modifications and localIdentifier.
 * @param measure - ref of identifier of the measure
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export declare function newMeasure(measure: ObjRef | Identifier, modifications?: MeasureModifications<MeasureBuilder>): IMeasure<IMeasureDefinition>;
/**
 * Creates a new measure by applying modifications on top of an existing measure.
 *
 * @remarks
 * This generic function can accept measure of any type and thus in returns allows modifications on the properties that are common
 * in any type of measure.
 *
 * This operation is immutable and will not alter the input measure.
 *
 * The returned measure will have the same localIdentifier as the original measure. If you would like to assign
 * new/different local identifier to the measure, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the measure should fall back to the auto-generated localId.
 *
 * @param measure - measure to use as template for the new measure
 * @param modifications - modifications to apply
 * @returns new instance
 * @public
 */
export declare function modifyMeasure<T extends IMeasureDefinitionType>(measure: IMeasure<T>, modifications?: MeasureModifications<MeasureBuilderBase<IMeasureDefinitionType>>): IMeasure<T>;
/**
 * Creates a new simple measure by applying modifications on top of an existing measure.
 *
 * @remarks
 * This operation is immutable and will not alter the input measure.
 *
 * The returned measure will have the same localIdentifier as the original measure. If you would like to assign
 * new/different local identifier to the measure, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the measure should fall back to the auto-generated localId.
 *
 * @param measure - measure to use as template for the new measure
 * @param modifications - modifications to apply
 * @returns new instance
 * @public
 */
export declare function modifySimpleMeasure(measure: IMeasure<IMeasureDefinition>, modifications?: MeasureModifications<MeasureBuilder>): IMeasure<IMeasureDefinition>;
/**
 * Creates a new inline measure
 *
 * @param maql - maql definition of measure
 * @returns new instance
 * @public
 */
export declare function newInlineMeasure(maql: string): IMeasure<IInlineMeasureDefinition>;
/**
 * Creates a new inline measure by applying modifications on top of an existing measure.
 *
 * @remarks
 * This operation is immutable and will not alter the input measure.
 *
 * The returned measure will have the same localIdentifier as the original measure. If you would like to assign
 * new/different local identifier to the measure, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the measure should fall back to the auto-generated localId.
 *
 * @param measure - measure to use as template for the new measure
 * @param modifications - modifications to apply
 * @returns new instance
 * @public
 */
export declare function modifyInlineMeasure(measure: IMeasure<IInlineMeasureDefinition>, modifications?: MeasureModifications<InlineMeasureBuilder>): IMeasure<IInlineMeasureDefinition>;
/**
 * Creates a new PoP measure by applying modifications on top of an existing measure.
 *
 * @remarks
 * This operation is immutable and will not alter the input measure.
 *
 * The returned measure will have the same localIdentifier as the original measure. If you would like to assign
 * new/different local identifier to the measure, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the measure should fall back to the auto-generated localId.
 *
 * @param measure - measure to use as template for the new measure
 * @param modifications - modifications to apply
 * @returns new instance
 * @public
 */
export declare function modifyPopMeasure(measure: IMeasure<IPoPMeasureDefinition>, modifications?: MeasureModifications<PoPMeasureBuilder>): IMeasure<IPoPMeasureDefinition>;
/**
 * Creates a new Previous Period measure by applying modifications on top of an existing measure.
 *
 * @remarks
 * This operation is immutable and will not alter the input measure.
 *
 * The returned measure will have the same localIdentifier as the original measure. If you would like to assign
 * new/different local identifier to the measure, you can do that using the modifications where you can provide
 * either new custom localId or indicate that the measure should fall back to the auto-generated localId.
 *
 * @param measure - measure to use as template for the new measure
 * @param modifications - modifications to apply
 * @returns new instance
 * @public
 */
export declare function modifyPreviousPeriodMeasure(measure: IMeasure<IPreviousPeriodMeasureDefinition>, modifications?: MeasureModifications<PreviousPeriodMeasureBuilder>): IMeasure<IPreviousPeriodMeasureDefinition>;
/**
 * Creates a new arithmetic measure with the specified measure identifiers and operator and optional modifications and localIdentifier.
 * @param measuresOrIds - measures or identifiers of the measures to be included in this arithmetic measure
 * @param operator - operator of the measure
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export declare function newArithmeticMeasure(measuresOrIds: ReadonlyArray<MeasureOrLocalId>, operator: ArithmeticMeasureOperator, modifications?: MeasureModifications<ArithmeticMeasureBuilder>): IMeasure<IArithmeticMeasureDefinition>;
/**
 * Creates a new virtual arithmetic measure with the specified measure identifiers and operator and optional modifications and localIdentifier.
 *
 * @param measuresOrIds - measures or identifiers of the measures to be included in this arithmetic measure
 * @param operator - operator of the measure
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 *
 * @internal
 */
export declare function newVirtualArithmeticMeasure(measuresOrIds: ReadonlyArray<MeasureOrLocalId>, operator: ArithmeticMeasureOperator, modifications?: MeasureModifications<VirtualArithmeticMeasureBuilder>): IMeasure<IVirtualArithmeticMeasureDefinition>;
/**
 * Creates a new PoP measure with the specified identifier and PoP attribute identifier and optional modifications and localIdentifier.
 * @param measureOrLocalId - measure or local identifier of the measure
 * @param popAttrIdOrRef - identifier or a reference to PoP attribute
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export declare function newPopMeasure(measureOrLocalId: MeasureOrLocalId, popAttrIdOrRef: ObjRef | Identifier, modifications?: MeasureModifications<PoPMeasureBuilder>): IMeasure<IPoPMeasureDefinition>;
/**
 * Creates a new Previous Period measure with the specified measure identifier and date data sets and optional modifications and localIdentifier.
 * @param measureIdOrLocalId - measure or local identifier of the measure to create Previous Period measure for
 * @param dateDataSets - date data sets to use in the Previous Period calculation
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export declare function newPreviousPeriodMeasure(measureIdOrLocalId: MeasureOrLocalId, dateDataSets: IPreviousPeriodDateDataSetSimple[], modifications?: MeasureModifications<PreviousPeriodMeasureBuilder>): IMeasure<IPreviousPeriodMeasureDefinition>;
//# sourceMappingURL=factory.d.ts.map