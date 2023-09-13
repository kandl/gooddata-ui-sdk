import { Identifier, Uri, IdentifierRef, UriRef, LocalIdRef, ObjectType } from "./index.js";
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
export declare function idRef(identifier: Identifier, type?: ObjectType): IdentifierRef;
/**
 * Creates an UriRef from an URI
 * @param uri - URI to use
 * @returns uri reference
 * @public
 */
export declare function uriRef(uri: Uri): UriRef;
/**
 * Creates an LocalIdRef from a local identifier
 * @param localIdentifier - local identifier to use
 * @returns local identifier reference
 * @public
 */
export declare function localIdRef(localIdentifier: Identifier): LocalIdRef;
//# sourceMappingURL=factory.d.ts.map