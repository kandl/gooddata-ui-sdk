import { getMappingHeaderIdentifier, getMappingHeaderLocalIdentifier, getMappingHeaderUri, hasMappingHeaderLocalIdentifier, } from "./MappingHeader.js";
import { attributeDisplayFormRef, attributeLocalId, isArithmeticMeasure, isAttribute, isIdentifierRef, isObjRef, isSimpleMeasure, measureArithmeticOperands, measureIdentifier, measureItem, measureLocalId, measureMasterIdentifier, measureUri, isMeasureDescriptor, isResultAttributeHeader, } from "@gooddata/sdk-model";
/**
 * This predicate is returned when predicate factory encounters invalid input. Having it to keep backward
 * compatibility with the previous more lenient behavior.
 */
const alwaysFalsePredicate = () => false;
function arithmeticMeasureLocalIdentifierDeepMatch(dv, operandLocalIdentifier, predicate, context) {
    const operand = dv.def().measure(operandLocalIdentifier);
    const operandDescriptor = dv.meta().measureDescriptor(operandLocalIdentifier);
    if (isArithmeticMeasure(operand)) {
        const operands = measureArithmeticOperands(operand);
        return (operands ? operands : []).some((operandLocalIdentifier) => arithmeticMeasureLocalIdentifierDeepMatch(dv, operandLocalIdentifier, predicate, context));
    }
    return predicate(operandDescriptor, context);
}
function getMasterMeasureOperandIdentifiers(measure) {
    return measureArithmeticOperands(measure);
}
function getDerivedMeasureMasterMeasureOperandIdentifiers(measure, dv) {
    const masterMeasureLocalIdentifier = measureMasterIdentifier(measure);
    if (!masterMeasureLocalIdentifier) {
        return null;
    }
    const masterMeasure = dv.def().measure(masterMeasureLocalIdentifier);
    const result = getMasterMeasureOperandIdentifiers(masterMeasure);
    if (result === undefined) {
        return null;
    }
    return result;
}
function composedFromQualifier(predicate) {
    return (header, context) => {
        if (!isMeasureDescriptor(header)) {
            return false;
        }
        const { dv } = context;
        const measureLocalIdentifier = getMappingHeaderLocalIdentifier(header);
        const measure = dv.def().measure(measureLocalIdentifier);
        if (!measure) {
            return false;
        }
        const arithmeticMeasureOperands = getDerivedMeasureMasterMeasureOperandIdentifiers(measure, dv) ||
            getMasterMeasureOperandIdentifiers(measure);
        if (!arithmeticMeasureOperands) {
            return false;
        }
        return arithmeticMeasureOperands.some((operandLocalIdentifier) => arithmeticMeasureLocalIdentifierDeepMatch(dv, operandLocalIdentifier, predicate, context));
    };
}
function matchHeaderUri(uri, header) {
    const headerUri = getMappingHeaderUri(header);
    return headerUri ? headerUri === uri : false;
}
function matchHeaderIdentifier(identifier, header) {
    const headerIdentifier = getMappingHeaderIdentifier(header);
    return headerIdentifier ? headerIdentifier === identifier : false;
}
function matchUri(uri, measure) {
    const simpleMeasureUri = measureUri(measure);
    return simpleMeasureUri ? simpleMeasureUri === uri : false;
}
function matchMeasureIdentifier(identifier, measure) {
    const simpleMeasureIdentifier = measureIdentifier(measure);
    return simpleMeasureIdentifier ? simpleMeasureIdentifier === identifier : false;
}
function matchDerivedMeasureByMasterUri(uri, measure, context) {
    const { dv } = context;
    const masterMeasureLocalIdentifier = measureMasterIdentifier(measure);
    if (masterMeasureLocalIdentifier === undefined) {
        return false;
    }
    const masterMeasureHeader = dv.meta().measureDescriptor(masterMeasureLocalIdentifier);
    if (matchHeaderUri(uri, masterMeasureHeader)) {
        return true;
    }
    const masterMeasure = dv.def().measure(masterMeasureLocalIdentifier);
    return matchUri(uri, masterMeasure);
}
function matchDerivedMeasureByMasterIdentifier(identifier, measure, context) {
    const { dv } = context;
    const masterMeasureLocalIdentifier = measureMasterIdentifier(measure);
    if (masterMeasureLocalIdentifier === undefined) {
        return false;
    }
    const masterMeasureHeader = dv.meta().measureDescriptor(masterMeasureLocalIdentifier);
    if (matchHeaderIdentifier(identifier, masterMeasureHeader)) {
        return true;
    }
    const masterMeasure = dv.def().measure(masterMeasureLocalIdentifier);
    return matchMeasureIdentifier(identifier, masterMeasure);
}
/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided URI.
 *
 * @public
 */
export function uriMatch(uri) {
    if (!uri) {
        return alwaysFalsePredicate;
    }
    return (header, context) => {
        const { dv } = context;
        if (matchHeaderUri(uri, header)) {
            return true;
        }
        if (!isMeasureDescriptor(header)) {
            return false;
        }
        const measure = dv.def().measure(getMappingHeaderLocalIdentifier(header));
        if (!measure) {
            return false;
        }
        if (matchUri(uri, measure)) {
            return true;
        }
        return matchDerivedMeasureByMasterUri(uri, measure, context);
    };
}
/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided identifier.
 *
 * @public
 */
export function identifierMatch(identifier) {
    if (!identifier) {
        return alwaysFalsePredicate;
    }
    return (header, context) => {
        const { dv } = context;
        if (isResultAttributeHeader(header)) {
            return false;
        }
        if (matchHeaderIdentifier(identifier, header)) {
            return true;
        }
        if (!isMeasureDescriptor(header)) {
            return false;
        }
        const measure = dv.def().measure(getMappingHeaderLocalIdentifier(header));
        if (!measure) {
            return false;
        }
        if (matchMeasureIdentifier(identifier, measure)) {
            return true;
        }
        return matchDerivedMeasureByMasterIdentifier(identifier, measure, context);
    };
}
/**
 * Creates a predicate that return true for any attribute result header with the provided name.
 *
 * @public
 */
export function attributeItemNameMatch(name) {
    if (!name) {
        return alwaysFalsePredicate;
    }
    return (header, _context) => {
        return isResultAttributeHeader(header)
            ? header.attributeHeaderItem && header.attributeHeaderItem.name === name
            : false;
    };
}
/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided local identifier.
 *
 * @public
 */
export function localIdentifierMatch(localIdOrMeasure) {
    if (!localIdOrMeasure) {
        return alwaysFalsePredicate;
    }
    const localId = typeof localIdOrMeasure === "string" ? localIdOrMeasure : measureLocalId(localIdOrMeasure);
    return (header, _context) => {
        if (!hasMappingHeaderLocalIdentifier(header)) {
            return false;
        }
        const headerLocalIdentifier = getMappingHeaderLocalIdentifier(header);
        return headerLocalIdentifier !== undefined && headerLocalIdentifier === localId;
    };
}
/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided object reference.
 *
 * @public
 */
export function objRefMatch(objRef) {
    return isIdentifierRef(objRef)
        ? HeaderPredicates.identifierMatch(objRef.identifier)
        : HeaderPredicates.uriMatch(objRef.uri);
}
/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure matching
 * the provided object.
 *
 * @remarks
 * If the object is empty or is not attribute, simple measure or object reference, the function returns predicate
 * that is always falsy.
 *
 * @param obj - the object to be checked
 *
 * @public
 */
export function objMatch(obj) {
    if (!obj) {
        return alwaysFalsePredicate;
    }
    if (isAttribute(obj)) {
        return (header, context) => localIdentifierMatch(attributeLocalId(obj))(header, context) ||
            objRefMatch(attributeDisplayFormRef(obj))(header, context);
    }
    if (isSimpleMeasure(obj)) {
        return (header, context) => localIdentifierMatch(measureLocalId(obj))(header, context) ||
            objRefMatch(measureItem(obj))(header, context);
    }
    if (isObjRef(obj)) {
        return objRefMatch(obj);
    }
    return alwaysFalsePredicate;
}
/**
 * Creates a new predicate that returns true of any arithmetic measure where measure with the provided URI
 * is used as an operand.
 *
 * @public
 */
export function composedFromUri(uri) {
    if (!uri) {
        return alwaysFalsePredicate;
    }
    return composedFromQualifier(uriMatch(uri));
}
/**
 * Creates a new predicate that returns true of any arithmetic measure where measure with the provided identifier
 * is used as an operand.
 *
 * @public
 */
export function composedFromIdentifier(identifier) {
    if (!identifier) {
        return alwaysFalsePredicate;
    }
    return composedFromQualifier(identifierMatch(identifier));
}
/**
 * Set of factory functions to create the most commonly-used {@link IHeaderPredicate | HeaderPredicates}.
 *
 * @public
 */
export const HeaderPredicates = {
    attributeItemNameMatch,
    composedFromIdentifier,
    composedFromUri,
    identifierMatch,
    localIdentifierMatch,
    uriMatch,
    objRefMatch,
    objMatch,
};
//# sourceMappingURL=HeaderPredicateFactory.js.map