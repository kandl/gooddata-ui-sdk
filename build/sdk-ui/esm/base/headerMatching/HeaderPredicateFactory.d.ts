import { IHeaderPredicate } from "./HeaderPredicate.js";
import { IMeasure, ObjRef } from "@gooddata/sdk-model";
/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided URI.
 *
 * @public
 */
export declare function uriMatch(uri: string): IHeaderPredicate;
/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided identifier.
 *
 * @public
 */
export declare function identifierMatch(identifier: string): IHeaderPredicate;
/**
 * Creates a predicate that return true for any attribute result header with the provided name.
 *
 * @public
 */
export declare function attributeItemNameMatch(name: string): IHeaderPredicate;
/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided local identifier.
 *
 * @public
 */
export declare function localIdentifierMatch(localIdOrMeasure: string | IMeasure): IHeaderPredicate;
/**
 * Creates a new predicate that returns true for any header that belongs to either attribute or measure with the
 * provided object reference.
 *
 * @public
 */
export declare function objRefMatch(objRef: ObjRef): IHeaderPredicate;
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
export declare function objMatch(obj: any): IHeaderPredicate;
/**
 * Creates a new predicate that returns true of any arithmetic measure where measure with the provided URI
 * is used as an operand.
 *
 * @public
 */
export declare function composedFromUri(uri: string): IHeaderPredicate;
/**
 * Creates a new predicate that returns true of any arithmetic measure where measure with the provided identifier
 * is used as an operand.
 *
 * @public
 */
export declare function composedFromIdentifier(identifier: string): IHeaderPredicate;
/**
 * Set of factory functions to create the most commonly-used {@link IHeaderPredicate | HeaderPredicates}.
 *
 * @public
 */
export declare const HeaderPredicates: {
    attributeItemNameMatch: typeof attributeItemNameMatch;
    composedFromIdentifier: typeof composedFromIdentifier;
    composedFromUri: typeof composedFromUri;
    identifierMatch: typeof identifierMatch;
    localIdentifierMatch: typeof localIdentifierMatch;
    uriMatch: typeof uriMatch;
    objRefMatch: typeof objRefMatch;
    objMatch: typeof objMatch;
};
//# sourceMappingURL=HeaderPredicateFactory.d.ts.map