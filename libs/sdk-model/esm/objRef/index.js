// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { invariant } from "ts-invariant";
import stringify from "json-stable-stringify";
//
// Type guards
//
/**
 * Type guard checking whether object is an URI Reference.
 *
 * @public
 */
export function isUriRef(obj) {
    return !isEmpty(obj) && obj.uri !== undefined;
}
/**
 * Type guard checking whether object is an Identifier Reference.
 *
 * @public
 */
export function isIdentifierRef(obj) {
    return !isEmpty(obj) && obj.identifier !== undefined;
}
/**
 * Type guard checking whether object is an Identifier Reference or an URI reference.
 *
 * @public
 */
export function isObjRef(obj) {
    return isUriRef(obj) || isIdentifierRef(obj);
}
/**
 * Type guard checking whether object is a localId Reference.
 *
 * @public
 */
export function isLocalIdRef(obj) {
    return !isEmpty(obj) && obj.localIdentifier !== undefined;
}
/**
 * Retrieves string representation of object reference. This is purely for for representation of
 * references in text, debug and tests.
 *
 * @internal
 */
export function objRefToString(objRef) {
    invariant(objRef, "object reference must be specified");
    if (isIdentifierRef(objRef)) {
        return `${objRef.identifier}`;
    }
    else if (isUriRef(objRef)) {
        return objRef.uri;
    }
    return objRef.localIdentifier;
}
/**
 * Serializes an instance of ObjRef to a string representation.
 *
 * @remarks
 * This is suitable when ObjRef needs to be used as a key in dictionaries/objects.
 *
 * Note: there is no loss of information and the serialized value is guaranteed to be stable, meaning same ObjRef
 * will always serialize the same.
 *
 * @param objRef - ref to serialize
 * @remarks see {@link deserializeObjRef}
 * @public
 */
export function serializeObjRef(objRef) {
    return stringify(objRef, { space: 0 });
}
/**
 * Deserializes an ObjRef from its pure string representation.
 *
 * @remarks
 * The function will throw an error if the input is not a valid, serialized ObjRef.
 *
 * @param val - string representation of ObjRef
 * @remarks see {@link serializeObjRef}
 * @public
 */
export function deserializeObjRef(val) {
    const obj = JSON.parse(val);
    invariant(isObjRef(obj) || isLocalIdRef(obj), `Attempting to deserialize ObjRef but the input is invalid: '${val}'`);
    return obj;
}
/**
 * Returns a value indicating whether the two ObjRef instances are semantically equal (i.e. are of the same type and have the same value).
 * Null and undefined are considered equal to each other.
 *
 * @remarks If the objects are ObjRefs of multiple types at once (for example they have identifiers and URIs),
 * the match is tested in the following sequence:
 * 1. identifier
 * 2. URI
 * 3. localIdentifier
 *
 * @public
 */
export function areObjRefsEqual(a, b) {
    if (a == null) {
        return b == null;
    }
    if (isIdentifierRef(a) && isIdentifierRef(b) && a.type && b.type) {
        return a.identifier === b.identifier && a.type === b.type;
    }
    if (isIdentifierRef(a) && isIdentifierRef(b)) {
        return a.identifier === b.identifier;
    }
    if (isUriRef(a) && isUriRef(b)) {
        return a.uri === b.uri;
    }
    return isLocalIdRef(a) && isLocalIdRef(b) && a.localIdentifier === b.localIdentifier;
}
//# sourceMappingURL=index.js.map