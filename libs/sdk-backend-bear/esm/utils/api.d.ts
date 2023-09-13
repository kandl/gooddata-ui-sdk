import { IAuthenticatedPrincipal } from "@gooddata/sdk-backend-spi";
import { Identifier, IUser, ObjRef, Uri } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../types/auth.js";
/**
 * Returns a user uri. This is used in some bear client calls.
 * If there is no user available, returns null instead.
 * @param getPrincipal - function to obtain currently authenticated principal to get the data from
 *
 * @internal
 */
export declare const userUriFromAuthenticatedPrincipalWithAnonymous: (getPrincipal: () => Promise<IAuthenticatedPrincipal>) => Promise<string | null>;
/**
 * Returns a user uri. This is used in some bear client calls
 * If there is no user available, throws an error.
 * @param getPrincipal - function to obtain currently authenticated principal to get the data from
 *
 * @internal
 */
export declare const userUriFromAuthenticatedPrincipal: (getPrincipal: () => Promise<IAuthenticatedPrincipal>) => Promise<string>;
/**
 * Returns a user login md5. This is used in some bear client calls as a userId.
 * If there is no user available, returns null instead.
 * @param getPrincipal - function to obtain currently authenticated principal to get the data from
 *
 * @internal
 */
export declare const userLoginMd5FromAuthenticatedPrincipalWithAnonymous: (getPrincipal: () => Promise<IAuthenticatedPrincipal>) => Promise<string | null>;
/**
 * Returns a user login md5. This is used in some bear client calls as a userId.
 * If there is no user available, throws an error.
 * @param getPrincipal - function to obtain currently authenticated principal to get the data from
 *
 * @internal
 */
export declare const userLoginMd5FromAuthenticatedPrincipal: (getPrincipal: () => Promise<IAuthenticatedPrincipal>) => Promise<string>;
/**
 * Returns the objectId from the given URI.
 * @param uri - URI to get objectId from
 */
export declare const getObjectIdFromUri: (uri: string) => string;
/**
 * Converts ObjRef instance to URI. For UriRef returns the uri as is, for IdentifierRef calls the backend and gets the URI.
 * @param ref - ref to convert
 * @param workspace - workspace id to use
 * @param authCall - call guard to perform API calls through
 *
 * @internal
 */
export declare const objRefToUri: (ref: ObjRef, workspace: string, authCall: BearAuthenticatedCallGuard) => Promise<Uri>;
/**
 * Converts ObjRef instances to URIs. For UriRefs, it returns the URIs as they are,
 * for IdentifierRefs calls the backend and gets the URIs.
 * @param refs - refs to convert
 * @param workspace - workspace id to use
 * @param authCall - call guard to perform API calls through
 * @param throwOnUnresolved - whether to throw an error if id to uri cannot be resolved for some ref; default is true
 * @returns resolved URIs; when throwOnUnresolved is true, then order of appearance of the resolved URIs
 *  is guaranteed to match the order on the input; otherwise if throwOnUnresolved is false and some identifiers
 *  could not be resolved, the returned array will be smaller with no indication as to which identifiers could
 *  not be resolved
 * @internal
 */
export declare const objRefsToUris: (refs: ObjRef[], workspace: string, authCall: BearAuthenticatedCallGuard, throwOnUnresolved?: boolean) => Promise<Uri[]>;
/**
 * Converts ObjRef instance to identifier. For IdentifierRef returns the identifier as is,
 * for UriRef calls the backend and gets the identifier.
 * @param ref - ref to convert
 * @param workspace - workspace id to use
 * @param authCall - call guard to perform API calls through
 *
 * @internal
 */
export declare const objRefToIdentifier: (ref: ObjRef, authCall: BearAuthenticatedCallGuard) => Promise<Identifier>;
/**
 * Converts ObjRef instances to identifiers. For IdentifierRefs returns the identifiers as is,
 * for UriRefs calls the backend and gets the identifiers.
 * @param refs - refs to convert
 * @param workspace - workspace id to use
 * @param authCall - call guard to perform API calls through
 *
 * @internal
 */
export declare const objRefsToIdentifiers: (refs: ObjRef[], authCall: BearAuthenticatedCallGuard) => Promise<Identifier[]>;
/**
 * Gets an updated userMap loading information for any missing users. The map is keyed by the user URI.
 */
export declare const updateUserMap: (userMap: Map<string, IUser>, requestedUserUris: string[], authCall: BearAuthenticatedCallGuard) => Promise<Map<string, IUser>>;
//# sourceMappingURL=api.d.ts.map