// (C) 2007-2023 GoodData Corporation
import { isLocalIdentifierQualifier, isObjectUriQualifier, } from "@gooddata/api-model-bear";
import { idRef, uriRef, localIdRef } from "@gooddata/sdk-model";
/**
 * Converts reference into a format acceptable by the SPI. URI references are left as-is, while
 * the identifier references have the object type added.
 *
 * @param ref - reference
 * @param defaultType - type to use it the ref has none specified
 * @internal
 */
export function fromBearRef(ref, defaultType) {
    if (isObjectUriQualifier(ref)) {
        return uriRef(ref.uri);
    }
    return idRef(ref.identifier, defaultType);
}
/**
 * Converts scoped reference into a format acceptable by the bear SPI. URI references are left as-is, scoped
 * references are left as is, while the identifier references have the object type added.
 *
 * @param ref - reference
 * @param defaultType - type to use it the ref has none specified
 * @internal
 */
export function fromScopedBearRef(ref, defaultType) {
    if (isLocalIdentifierQualifier(ref)) {
        return localIdRef(ref.localIdentifier);
    }
    return fromBearRef(ref, defaultType);
}
//# sourceMappingURL=ObjRefConverter.js.map