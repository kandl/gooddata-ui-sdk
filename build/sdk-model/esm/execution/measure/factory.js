// (C) 2019-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import isEmpty from "lodash/isEmpty.js";
import identity from "lodash/identity.js";
import { isArithmeticMeasure, isMeasure, isPoPMeasure, isPreviousPeriodMeasure, isSimpleMeasure, measureLocalId, isInlineMeasure, } from "./index.js";
import { isObjRef, objRefToString } from "../../objRef/index.js";
import { idRef } from "../../objRef/factory.js";
import SparkMD5 from "spark-md5";
import { invariant, InvariantError } from "ts-invariant";
import { sanitizeLocalId } from "../../sanitizeLocalId.js";
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
export class MeasureBuilderBase {
    /**
     * @internal
     */
    constructor() {
        this.customLocalId = false;
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
        this.localId = (localId) => {
            if (!localId || localId.trim().length === 0) {
                return this.defaultLocalId();
            }
            this.measure.localIdentifier = localId;
            this.customLocalId = true;
            return this;
        };
        /**
         * Indicates that the measure's localId should be generated using the default local-id generator logic.
         */
        this.defaultLocalId = () => {
            this.measure.localIdentifier = "";
            this.customLocalId = false;
            return this;
        };
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
        this.alias = (alias) => {
            if (!alias) {
                return this.noAlias();
            }
            this.measure.alias = alias;
            return this;
        };
        /**
         * Resets alias - alternative title - set for the measure.
         *
         * @remarks
         * The measure title will be used if specified, otherwise the server-defined title will be used instead.
         */
        this.noAlias = () => {
            delete this.measure.alias;
            return this;
        };
        /**
         * Sets alternative title for the measure.
         *
         * @remarks
         * This value will then be used in various chart-specific descriptive elements.
         * For convenience if no title is specified, the measure will fall back to server-defined value.
         *
         * @param title - alternative title to use instead of server-defined value; undefined to use server-defined value
         */
        this.title = (title) => {
            if (!title) {
                return this.noTitle();
            }
            this.measure.title = title;
            return this;
        };
        /**
         * Resets alternative title for the measure. The server-defined title of the measure will be used
         * instead.
         */
        this.noTitle = () => {
            delete this.measure.title;
            return this;
        };
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
        this.format = (format) => {
            if (!format) {
                return this.defaultFormat();
            }
            this.measure.format = format;
            return this;
        };
        /**
         * Resets format string to the server-defined value.
         */
        this.defaultFormat = () => {
            delete this.measure.format;
            return this;
        };
        this.build = () => {
            const envelope = this.buildEnvelope();
            return {
                measure: Object.assign(Object.assign({}, envelope), { definition: this.buildDefinition() }),
            };
        };
        this.measure = { localIdentifier: "" };
    }
    /**
     * The measure builder subclasses must call this when they are used to modify
     * an existing measure. Existing measure modification returns a new object that
     * reflects the mods however it keeps the localId set as-is.
     *
     * @param measure - envelope of measure being modified
     */
    initializeFromExisting(measure) {
        this.measure = cloneDeep(measure);
        this.measure.localIdentifier = measure.localIdentifier;
        this.customLocalId = true;
    }
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
    getOrGenerateLocalId() {
        if (this.customLocalId && !isEmpty(this.measure.localIdentifier)) {
            return this.measure.localIdentifier;
        }
        return sanitizeLocalId(["m", this.buildEnvelopeLocalIdPart(), this.generateLocalId()]
            .filter((part) => !isEmpty(part))
            .join("_"));
    }
    buildEnvelopeLocalIdPart() {
        const { alias, format, title } = this.measure;
        if (!alias && !format && !title) {
            return "";
        }
        const hasher = new SparkMD5();
        hasher.append("alias_" + (alias !== null && alias !== void 0 ? alias : ""));
        hasher.append("format_" + (format !== null && format !== void 0 ? format : ""));
        hasher.append("title_" + (title !== null && title !== void 0 ? title : ""));
        return hasher.end().substr(0, 8);
    }
    buildEnvelope() {
        return Object.assign(Object.assign({}, this.measure), { localIdentifier: this.getOrGenerateLocalId() });
    }
}
/**
 * Builder for simple measures.
 *
 * Do not instantiate this builder directly, instead use {@link newMeasure} or {@link modifyMeasure} functions.
 *
 * @public
 */
export class MeasureBuilder extends MeasureBuilderBase {
    /**
     * @internal
     */
    constructor(measureOrRef) {
        super();
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
        this.aggregation = (aggregation) => {
            if (!aggregation) {
                return this.defaultAggregation();
            }
            this.measureDefinition.aggregation = aggregation;
            return this;
        };
        /**
         * Resets measure aggregation to the default (SUM).
         */
        this.defaultAggregation = () => {
            delete this.measureDefinition.aggregation;
            return this;
        };
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
        this.ratio = (value = true) => {
            if (!value) {
                return this.noRatio();
            }
            this.measureDefinition.computeRatio = true;
            return this;
        };
        /**
         * Resets compute as ratio indicator.
         */
        this.noRatio = () => {
            delete this.measureDefinition.computeRatio;
            return this;
        };
        /**
         * Sets filters to apply when calculating the values of this measure.
         *
         * @remarks
         * These filters apply only to this particular measure calculation and do not impact the rest of the execution.
         *
         * @param filters - filters to apply to this measure
         */
        this.filters = (...filters) => {
            this.measureDefinition.filters = filters;
            return this;
        };
        /**
         * Resets measure filters - this will remove all filters from the measure.
         */
        this.noFilters = () => {
            this.measureDefinition.filters = [];
            return this;
        };
        /**
         * Sets reference to measure item that will be used for calculation.
         *
         * @remarks
         * This can be either reference to a MAQL metric or a fact to calculate from.
         *
         * @param ref - new reference to use
         */
        this.measureItem = (ref) => {
            this.measureDefinition.item = ref;
            return this;
        };
        if (isMeasure(measureOrRef)) {
            this.initializeFromExisting(measureOrRef.measure);
            this.measureDefinition = cloneDeep(measureOrRef.measure.definition.measureDefinition);
        }
        else {
            this.measureDefinition = {
                item: measureOrRef,
            };
        }
    }
    generateLocalId() {
        const aggString = this.measureDefinition.aggregation ? `_${this.measureDefinition.aggregation}` : "";
        const ratioString = this.measureDefinition.computeRatio ? `_ratio` : "";
        return `${objRefToString(this.measureDefinition.item)}${aggString}${ratioString}${this.filterLocalIdString()}`;
    }
    buildDefinition() {
        return {
            measureDefinition: this.measureDefinition,
        };
    }
    filterLocalIdString() {
        if (isEmpty(this.measureDefinition.filters)) {
            return "";
        }
        const hasher = new SparkMD5();
        hasher.append(JSON.stringify(this.measureDefinition.filters));
        return "_" + hasher.end().substr(0, 8);
    }
}
/**
 * Builder for inline measures.
 *
 * Do not instantiate this builder directly, instead use {@link newMeasure} or {@link modifyMeasure} functions.
 *
 * @public
 */
export class InlineMeasureBuilder extends MeasureBuilderBase {
    /**
     * @internal
     */
    constructor(measureInput) {
        super();
        /**
         * Sets content of inline metric as string maql
         *
         * @param maql - maql of metric to use
         */
        this.maql = (maql) => {
            this.inlineMeasureDefinition.maql = maql;
            return this;
        };
        if (isInlineMeasure(measureInput)) {
            this.initializeFromExisting(measureInput.measure);
            this.inlineMeasureDefinition = cloneDeep(measureInput.measure.definition.inlineDefinition);
        }
        else {
            this.inlineMeasureDefinition = {
                maql: measureInput,
            };
        }
    }
    generateLocalId() {
        const hasher = new SparkMD5();
        hasher.append(this.inlineMeasureDefinition.maql);
        return hasher.end().substr(0, 8) + "_inline";
    }
    buildDefinition() {
        return {
            inlineDefinition: this.inlineMeasureDefinition,
        };
    }
}
/**
 * Builder for arithmetic measures.
 *
 * Do not instantiate this builder directly, instead use {@link newArithmeticMeasure}.
 *
 * @public
 */
export class ArithmeticMeasureBuilder extends MeasureBuilderBase {
    /**
     * @internal
     */
    constructor(input) {
        super();
        /**
         * Sets arithmetic operator to apply when calculating the arithmetic measure.
         *
         * @param op - operator
         */
        this.operator = (op) => {
            this.arithmeticMeasure.operator = op;
            return this;
        };
        /**
         * Sets operands for arithmetic: other measures specified by either value or local identifier -
         *
         * @param measuresOrLocalIds - array of measures and/or localIds of measures to use as operands
         */
        this.operands = (measuresOrLocalIds) => {
            this.arithmeticMeasure.measureIdentifiers = measuresOrLocalIds.map(measureLocalId);
            return this;
        };
        if (isArithmeticMeasure(input)) {
            this.initializeFromExisting(input.measure);
            this.arithmeticMeasure = cloneDeep(input.measure.definition.arithmeticMeasure);
        }
        else {
            const measureIdentifiers = input.measuresOrIds.map(measureLocalId);
            this.arithmeticMeasure = {
                measureIdentifiers,
                operator: input.operator,
            };
        }
    }
    buildDefinition() {
        return {
            arithmeticMeasure: this.arithmeticMeasure,
        };
    }
    generateLocalId() {
        const hasher = new SparkMD5();
        this.arithmeticMeasure.measureIdentifiers.forEach((id) => hasher.append(id));
        return hasher.end();
    }
}
/**
 * Builder for virtual arithmetic measures.
 *
 * Do not instantiate this builder directly, instead use {@link newVirtualArithmeticMeasure}.
 *
 * @internal
 */
export class VirtualArithmeticMeasureBuilder extends ArithmeticMeasureBuilder {
    buildDefinition() {
        const arithmeticDefinition = super.buildDefinition();
        return Object.assign(Object.assign({}, arithmeticDefinition), { virtual: true });
    }
}
/**
 * Builder for period-over-period measures.
 *
 * Do not instantiate this builder directly, instead use {@link newPopMeasure}.
 *
 * @public
 */
export class PoPMeasureBuilder extends MeasureBuilderBase {
    /**
     * @internal
     */
    constructor(input) {
        super();
        /**
         * Sets master measure from which this period-over-period measure should be calculated.
         *
         * @param measureOrLocalId - measure value or measure local identifier
         */
        this.masterMeasure = (measureOrLocalId) => {
            this.popMeasureDefinition.measureIdentifier = measureLocalId(measureOrLocalId);
            return this;
        };
        /**
         * Sets period-over-period date dimension attribute to use for offsetting. For convenience the attribute
         * may be specified by either object reference or as a string - in which case it is assumed this is identifier
         * of the attribute object.
         *
         * @param popAttrIdOrRef - reference of the PoP attribute, or identifier
         */
        this.popAttribute = (popAttrIdOrRef) => {
            this.popMeasureDefinition.popAttribute = isObjRef(popAttrIdOrRef)
                ? popAttrIdOrRef
                : idRef(popAttrIdOrRef, "attribute");
            return this;
        };
        if (isPoPMeasure(input)) {
            this.initializeFromExisting(input.measure);
            this.popMeasureDefinition = cloneDeep(input.measure.definition.popMeasureDefinition);
        }
        else {
            const measureIdentifier = measureLocalId(input.measureOrLocalId);
            const popAttribute = isObjRef(input.popAttrIdOrRef)
                ? input.popAttrIdOrRef
                : idRef(input.popAttrIdOrRef, "attribute");
            this.popMeasureDefinition = {
                measureIdentifier,
                popAttribute,
            };
        }
    }
    buildDefinition() {
        return {
            popMeasureDefinition: this.popMeasureDefinition,
        };
    }
    generateLocalId() {
        return `${this.popMeasureDefinition.measureIdentifier}_${objRefToString(this.popMeasureDefinition.popAttribute)}`;
    }
}
/**
 * Builder for previous period measures.
 *
 * Do not instantiate this builder directly, instead use {@link newPreviousPeriodMeasure}.
 *
 * @public
 */
export class PreviousPeriodMeasureBuilder extends MeasureBuilderBase {
    /**
     * @internal
     */
    constructor(input) {
        super();
        /**
         * Sets master measure from which this previous period measure should be calculated.
         *
         * @param measureOrLocalId - measure value or measure local identifier
         */
        this.masterMeasure = (measureOrLocalId) => {
            this.previousPeriodMeasure.measureIdentifier = measureLocalId(measureOrLocalId);
            return this;
        };
        /**
         * Sets date data set + offset within the data set to use when calculating values of this measure.
         *
         * @param dd - date data set + offset
         */
        this.dateDataSets = (dd) => {
            this.previousPeriodMeasure.dateDataSets = this.convertDd(dd);
            return this;
        };
        this.convertDd = (dd) => {
            return dd.map((d) => (Object.assign(Object.assign({}, d), { dataSet: typeof d.dataSet === "string" ? idRef(d.dataSet) : d.dataSet })));
        };
        if (isPreviousPeriodMeasure(input)) {
            this.initializeFromExisting(input.measure);
            this.previousPeriodMeasure = cloneDeep(input.measure.definition.previousPeriodMeasure);
        }
        else {
            this.previousPeriodMeasure = {
                measureIdentifier: measureLocalId(input.measureIdOrLocalId),
                dateDataSets: this.convertDd(input.dateDataSets),
            };
        }
    }
    buildDefinition() {
        return {
            previousPeriodMeasure: this.previousPeriodMeasure,
        };
    }
    generateLocalId() {
        return `${this.previousPeriodMeasure.measureIdentifier}_previous_period`;
    }
}
/**
 * Creates a new measure with the specified identifier and optional modifications and localIdentifier.
 * @param measure - ref of identifier of the measure
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export function newMeasure(measure, modifications = identity) {
    const ref = isObjRef(measure) ? measure : idRef(measure);
    const builder = new MeasureBuilder(ref);
    return modifications(builder).build();
}
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
export function modifyMeasure(measure, modifications = identity) {
    invariant(measure, "measure must be specified");
    const builder = createBuilder(measure);
    return modifications(builder).build();
}
function createBuilder(measure) {
    if (isSimpleMeasure(measure)) {
        return new MeasureBuilder(measure);
    }
    else if (isArithmeticMeasure(measure)) {
        return new ArithmeticMeasureBuilder(measure);
    }
    else if (isPoPMeasure(measure)) {
        return new PoPMeasureBuilder(measure);
    }
    else if (isPreviousPeriodMeasure(measure)) {
        return new PreviousPeriodMeasureBuilder(measure);
    }
    else if (isInlineMeasure(measure)) {
        return new InlineMeasureBuilder(measure);
    }
    throw new InvariantError("unexpected measure type");
}
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
export function modifySimpleMeasure(measure, modifications = identity) {
    invariant(measure, "measure must be specified");
    const builder = new MeasureBuilder(measure);
    return modifications(builder).build();
}
/**
 * Creates a new inline measure
 *
 * @param maql - maql definition of measure
 * @returns new instance
 * @public
 */
export function newInlineMeasure(maql) {
    invariant(maql, "maql must be specified");
    const builder = new InlineMeasureBuilder(maql);
    return builder.build();
}
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
export function modifyInlineMeasure(measure, modifications = identity) {
    invariant(measure, "measure must be specified");
    const builder = new InlineMeasureBuilder(measure);
    return modifications(builder).build();
}
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
export function modifyPopMeasure(measure, modifications = identity) {
    invariant(measure, "measure must be specified");
    const builder = new PoPMeasureBuilder(measure);
    return modifications(builder).build();
}
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
export function modifyPreviousPeriodMeasure(measure, modifications = identity) {
    invariant(measure, "measure must be specified");
    const builder = new PreviousPeriodMeasureBuilder(measure);
    return modifications(builder).build();
}
/**
 * Creates a new arithmetic measure with the specified measure identifiers and operator and optional modifications and localIdentifier.
 * @param measuresOrIds - measures or identifiers of the measures to be included in this arithmetic measure
 * @param operator - operator of the measure
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export function newArithmeticMeasure(measuresOrIds, operator, modifications = identity) {
    const builder = new ArithmeticMeasureBuilder({ measuresOrIds, operator });
    return modifications(builder).build();
}
/**
 * Creates a new virtual arithmetic measure with the specified measure identifiers and operator and optional modifications and localIdentifier.
 *
 * @param measuresOrIds - measures or identifiers of the measures to be included in this arithmetic measure
 * @param operator - operator of the measure
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 *
 * @internal
 */
export function newVirtualArithmeticMeasure(measuresOrIds, operator, modifications = identity) {
    const builder = new VirtualArithmeticMeasureBuilder({ measuresOrIds, operator });
    return modifications(builder).build();
}
/**
 * Creates a new PoP measure with the specified identifier and PoP attribute identifier and optional modifications and localIdentifier.
 * @param measureOrLocalId - measure or local identifier of the measure
 * @param popAttrIdOrRef - identifier or a reference to PoP attribute
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export function newPopMeasure(measureOrLocalId, popAttrIdOrRef, modifications = identity) {
    const builder = new PoPMeasureBuilder({ measureOrLocalId, popAttrIdOrRef });
    return modifications(builder).build();
}
/**
 * Creates a new Previous Period measure with the specified measure identifier and date data sets and optional modifications and localIdentifier.
 * @param measureIdOrLocalId - measure or local identifier of the measure to create Previous Period measure for
 * @param dateDataSets - date data sets to use in the Previous Period calculation
 * @param modifications - optional modifications (e.g. alias, title, etc.)
 * @public
 */
export function newPreviousPeriodMeasure(measureIdOrLocalId, dateDataSets, modifications = identity) {
    const builder = new PreviousPeriodMeasureBuilder({ measureIdOrLocalId, dateDataSets });
    return modifications(builder).build();
}
//# sourceMappingURL=factory.js.map