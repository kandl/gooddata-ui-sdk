import { NotSupported, UnexpectedError } from "@gooddata/sdk-backend-spi";
import { isIdentifierRef, isLocalIdRef, isUriRef } from "@gooddata/sdk-model";
import { isTigerCompatibleType, objectTypeToTigerIdType, } from "../../types/refTypeMapping.js";
// TODO: get rid of the defaultValue, tiger should explode if ref is not provided correctly
export function toTigerType(value, defaultValue) {
    if (!value) {
        if (!defaultValue) {
            throw new UnexpectedError("No value or default value was provided to toTigerType ");
        }
        return defaultValue;
    }
    if (!isTigerCompatibleType(value)) {
        throw new UnexpectedError(`Cannot convert ${value} to AFM type, ${value} is not valid AfmObjectType`);
    }
    return objectTypeToTigerIdType[value];
}
export function toObjQualifier(ref, defaultValue) {
    if (isUriRef(ref)) {
        throw new NotSupported(`Tiger backend does not allow referencing objects by URI.`);
    }
    return {
        identifier: {
            id: ref.identifier,
            type: toTigerType(ref.type, defaultValue),
        },
    };
}
/**
 * @internal
 */
export function toFactQualifier(ref) {
    return toObjQualifier(ref, "fact");
}
/**
 * @internal
 */
export function toLabelQualifier(ref) {
    return toObjQualifier(ref, "label");
}
/**
 * @internal
 */
export function toAttributeQualifier(ref) {
    return toObjQualifier(ref, "attribute");
}
/**
 * @internal
 */
export function toDateDataSetQualifier(ref) {
    return toObjQualifier(ref, "dataset");
}
/**
 * @internal
 */
export function toLocalIdentifier(localIdentifier) {
    return {
        localIdentifier,
    };
}
/**
 * @internal
 */
export function toAfmIdentifier(ref) {
    if (isLocalIdRef(ref)) {
        return toLocalIdentifier(ref.localIdentifier);
    }
    else if (isIdentifierRef(ref)) {
        if (!ref.type) {
            throw new UnexpectedError(`Incomplete object specification in ${JSON.stringify(ref)}. You must provide both id and type of object you want to reference.`);
        }
        return toObjQualifier(ref);
    }
    else {
        throw new UnexpectedError(`Invalid object specification in ${JSON.stringify(ref)}. Must be either object identifier or local identifier.`);
    }
}
//# sourceMappingURL=ObjRefConverter.js.map