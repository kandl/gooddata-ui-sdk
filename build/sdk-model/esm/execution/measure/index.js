// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { invariant } from "ts-invariant";
import { isIdentifierRef, isUriRef } from "../../objRef/index.js";
/**
 * Implementation of measure predicate which always returns true.
 *
 * @public
 */
export const anyMeasure = (_) => true;
/**
 * Factory function for measure predicate which evaluates true for measures that match particular ID.
 *
 * @public
 */
export const idMatchMeasure = (id) => (m) => m.measure.localIdentifier === id;
//
// Type guards
//
/**
 * Type guard for checking whether object is any type of measure.
 *
 * @public
 */
export function isMeasure(obj) {
    var _a;
    return (!isEmpty(obj) &&
        // we need to prevent false positives for the "insides" of measure value filters that also have `measure` property
        // so check also for the definition property which is mandatory anyway
        ((_a = obj.measure) === null || _a === void 0 ? void 0 : _a.definition) !== undefined);
}
/**
 * Type guard for checking whether object is a simple measure.
 *
 * @public
 */
export function isSimpleMeasure(obj) {
    return isMeasure(obj) && isMeasureDefinition(obj.measure.definition);
}
/**
 * Type guard for checking whether object is a inline measure.
 *
 * @public
 */
export function isInlineMeasure(obj) {
    return isMeasure(obj) && isInlineMeasureDefinition(obj.measure.definition);
}
/**
 * Type guard for checking whether object is an adhoc measure.
 *
 * @remarks
 * An adhoc measure is a measure having an aggregation, one or some filters or a computeRatio of true
 *
 * @public
 */
export function isAdhocMeasure(obj) {
    if (!isSimpleMeasure(obj)) {
        return false;
    }
    const { measureDefinition } = obj.measure.definition;
    return (!!measureDefinition.aggregation ||
        !!measureDefinition.computeRatio ||
        (Array.isArray(measureDefinition.filters) && measureDefinition.filters.length > 0));
}
/**
 * Type guard for checking whether object is a period-over-period measure.
 *
 * @public
 */
export function isPoPMeasure(obj) {
    return isMeasure(obj) && isPoPMeasureDefinition(obj.measure.definition);
}
/**
 * Type guard for checking whether object is a previous-period measure.
 *
 * @public
 */
export function isPreviousPeriodMeasure(obj) {
    return isMeasure(obj) && isPreviousPeriodMeasureDefinition(obj.measure.definition);
}
/**
 * Type guard for checking whether object is an arithmetic measure.
 *
 * @public
 */
export function isArithmeticMeasure(obj) {
    return isMeasure(obj) && isArithmeticMeasureDefinition(obj.measure.definition);
}
/**
 * Type guard for checking whether an object is a virtual arithmetic measure.
 *
 * @internal
 *
 * @param obj - The object to be checked for being a virtual arithmetic measure.
 * @returns Returns true if the object is a virtual arithmetic measure, false otherwise.
 */
export function isVirtualArithmeticMeasure(obj) {
    return isMeasure(obj) && isVirtualArithmeticMeasureDefinition(obj.measure.definition);
}
/**
 * Type guard for checking whether object is a measure definition.
 *
 * @public
 */
export function isMeasureDefinition(obj) {
    return !isEmpty(obj) && obj.measureDefinition !== undefined;
}
/**
 * Type guard for checking whether object is a inline measure definition.
 *
 * @public
 */
export function isInlineMeasureDefinition(obj) {
    return !isEmpty(obj) && obj.inlineDefinition !== undefined;
}
/**
 * Type guard for checking whether object is a period-over-period measure definition.
 *
 * @public
 */
export function isPoPMeasureDefinition(obj) {
    return !isEmpty(obj) && obj.popMeasureDefinition !== undefined;
}
/**
 * Type guard for checking whether object is a previous period measure definition.
 *
 * @public
 */
export function isPreviousPeriodMeasureDefinition(obj) {
    return !isEmpty(obj) && obj.previousPeriodMeasure !== undefined;
}
/**
 * Type guard for checking whether object is an arithmetic measure definition.
 *
 * @public
 */
export function isArithmeticMeasureDefinition(obj) {
    return !isEmpty(obj) && obj.arithmeticMeasure !== undefined;
}
/**
 * Type guard for checking whether object is a virtual arithmetic measure definition.
 *
 * @internal
 */
export function isVirtualArithmeticMeasureDefinition(obj) {
    const virtualArithmeticDefinition = obj;
    return (isArithmeticMeasureDefinition(virtualArithmeticDefinition) && !!virtualArithmeticDefinition.virtual);
}
//
// Functions
//
/**
 * Gets measure's local identifier. For convenience and fluency, this function accepts both measure object and identifier
 * object.
 *
 * @param measureOrLocalId - measure object or measure localId; if localId provided, it is returned as is
 * @returns string identifier
 * @public
 */
export function measureLocalId(measureOrLocalId) {
    invariant(measureOrLocalId, "measure or local id must be specified");
    return typeof measureOrLocalId === "string" ? measureOrLocalId : measureOrLocalId.measure.localIdentifier;
}
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
export function measureUri(measure) {
    invariant(measure, "measure must be specified");
    const ref = measureItem(measure);
    if (!ref) {
        return undefined;
    }
    return isUriRef(ref) ? ref.uri : undefined;
}
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
export function measureIdentifier(measure) {
    invariant(measure, "measure must be specified");
    const ref = measureItem(measure);
    if (!ref) {
        return undefined;
    }
    return isIdentifierRef(ref) ? ref.identifier : undefined;
}
export function measureItem(measure) {
    var _a;
    invariant(measure, "measure must be specified");
    return (_a = measure.measure.definition.measureDefinition) === null || _a === void 0 ? void 0 : _a.item;
}
/**
 * Tests whether the measure is set to compute ratio.
 *
 * @param measure - measure to to test
 * @returns true if computes ratio, false otherwise
 * @public
 */
export function measureDoesComputeRatio(measure) {
    invariant(measure, "measure must be specified");
    if (!isSimpleMeasure(measure)) {
        return false;
    }
    return !!measure.measure.definition.measureDefinition.computeRatio;
}
export function measureMasterIdentifier(measure) {
    invariant(measure, "measure must be specified");
    if (isPoPMeasure(measure)) {
        return measure.measure.definition.popMeasureDefinition.measureIdentifier;
    }
    else if (isPreviousPeriodMeasure(measure)) {
        return measure.measure.definition.previousPeriodMeasure.measureIdentifier;
    }
    return undefined;
}
export function measureArithmeticOperands(measure) {
    invariant(measure, "measure must be specified");
    if (!isArithmeticMeasure(measure)) {
        return undefined;
    }
    return measure.measure.definition.arithmeticMeasure.measureIdentifiers;
}
export function measureArithmeticOperator(measure) {
    invariant(measure, "measure must be specified");
    if (!isArithmeticMeasure(measure)) {
        return undefined;
    }
    return measure.measure.definition.arithmeticMeasure.operator;
}
/**
 * Gets measure alias.
 *
 * @param measure - measure to get the alias of
 * @returns measure alias if specified, undefined otherwise
 * @public
 */
export function measureAlias(measure) {
    invariant(measure, "measure must be specified");
    return measure.measure.alias;
}
/**
 * Gets measure title.
 * @param measure - measure to get the title of
 * @returns measure title if specified, undefined otherwise
 * @public
 */
export function measureTitle(measure) {
    invariant(measure, "measure must be specified");
    return measure.measure.title;
}
/**
 * Gets measure format.
 * @param measure - measure to get the format of
 * @returns measure format if specified, undefined otherwise
 * @public
 */
export function measureFormat(measure) {
    invariant(measure, "measure must be specified");
    return measure.measure.format;
}
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
export function isMeasureFormatInPercent(measureOrFormat) {
    const format = isMeasure(measureOrFormat) ? measureFormat(measureOrFormat) : measureOrFormat;
    // no reasonable way to avoid the super-linear backtracking right now
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    return !!format && /^[^;]*%[^;]*;*$/.test(format.trim().replace(/\\%/g, ""));
}
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
export function measureAggregation(measure) {
    invariant(measure, "measure must be specified");
    if (!isSimpleMeasure(measure)) {
        return undefined;
    }
    return measure.measure.definition.measureDefinition.aggregation;
}
/**
 * Gets measure filters.
 *
 * @param measure - measure to get the filters of
 * @returns measure filters if specified, undefined otherwise
 * @public
 */
export function measureFilters(measure) {
    invariant(measure, "measure must be specified");
    if (!isSimpleMeasure(measure)) {
        return undefined;
    }
    return measure.measure.definition.measureDefinition.filters;
}
export function measurePopAttribute(measure) {
    invariant(measure, "measure must be specified");
    if (!isPoPMeasure(measure)) {
        return undefined;
    }
    return measure.measure.definition.popMeasureDefinition.popAttribute;
}
export function measurePreviousPeriodDateDataSets(measure) {
    invariant(measure, "measure must be specified");
    if (!isPreviousPeriodMeasure(measure)) {
        return undefined;
    }
    return measure.measure.definition.previousPeriodMeasure.dateDataSets;
}
//# sourceMappingURL=index.js.map