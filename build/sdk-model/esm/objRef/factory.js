/**
 * Creates an IdentifierRef from object identifier and given object type.
 *
 * @remarks see {@link IdentifierRef} for more information about identifier references
 *
 * @param identifier - identifier to use
 * @param type - referenced object type
 * @returns identifier reference
 * @public
 */
export function idRef(identifier, type) {
    return type ? { identifier, type } : { identifier };
}
/**
 * Creates an UriRef from an URI
 * @param uri - URI to use
 * @returns uri reference
 * @public
 */
export function uriRef(uri) {
    return { uri };
}
/**
 * Creates an LocalIdRef from a local identifier
 * @param localIdentifier - local identifier to use
 * @returns local identifier reference
 * @public
 */
export function localIdRef(localIdentifier) {
    return { localIdentifier };
}
//# sourceMappingURL=factory.js.map