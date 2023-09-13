import { ObjRef, Uri, Identifier } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../types/index.js";
/**
 * Converts ObjRef instance to URI. For UriRef returns the uri as is, for IdentifierRef calls the backend and gets the URI.
 * @param ref - ref to convert
 * @param workspace - workspace id to use
 * @param authCall - call guard to perform API calls through
 *
 * @internal
 */
export declare const objRefToUri: (ref: ObjRef, workspace: string, authCall: TigerAuthenticatedCallGuard) => Promise<Uri>;
/**
 * Converts ObjRef instance to identifier. For IdentifierRef returns the identifier as is,
 * otherwise converts the UriRef to the identifier.
 * @param ref - ref to convert
 * @param authCall - call guard to perform API calls through
 *
 * @internal
 */
export declare const objRefToIdentifier: (ref: ObjRef, _authCall: TigerAuthenticatedCallGuard) => Promise<Identifier>;
/**
 * Converts ObjRef instances to identifiers. For IdentifierRef returns the identifier as is,
 * otherwise converts the UriRefs to the identifiers.
 * @param refs - refs to convert
 * @param authCall - call guard to perform API calls through
 *
 * @internal
 */
export declare const objRefsToIdentifiers: (refs: ObjRef[], authCall: TigerAuthenticatedCallGuard) => Promise<Identifier[]>;
//# sourceMappingURL=api.d.ts.map