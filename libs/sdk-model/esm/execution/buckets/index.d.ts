import { AttributePredicate, IAttribute } from "../attribute/index.js";
import { Identifier } from "../../objRef/index.js";
import { IMeasure, MeasurePredicate } from "../measure/index.js";
import { ITotal } from "../base/totals.js";
/**
 * Type representing bucket items - which can be either measure or an attribute.
 *
 * @public
 */
export type IAttributeOrMeasure = IMeasure | IAttribute;
/**
 * Bucket is a logical, user-defined grouping of attributes, measures and totals.
 *
 * @remarks
 * Buckets can be used to create a new execution and to derive the result dimensionality.
 * In the context of an existing execution, they serve as metadata about the execution.
 *
 * @public
 */
export interface IBucket {
    localIdentifier?: Identifier;
    items: IAttributeOrMeasure[];
    totals?: ITotal[];
}
/**
 * Signature for bucket predicates; predicates are used by different functions to find/filter buckets according
 * to some criteria.
 *
 * @public
 */
export type BucketPredicate = (bucket: IBucket) => boolean;
/**
 * This predicate evaluates true for any bucket.
 *
 * @public
 */
export declare const anyBucket: BucketPredicate;
/**
 * Factory function for predicates that will evaluate true if bucket's id is same as the provided id.
 *
 * @public
 */
export declare const idMatchBucket: (id: string) => BucketPredicate;
/**
 * Describes exact location of attribute in a bucket.
 *
 * @public
 */
export type AttributeInBucket = {
    bucket: IBucket;
    idx: number;
    attribute: IAttribute;
};
/**
 * Describes exact location of measure in a bucket.
 *
 * @public
 */
export type MeasureInBucket = {
    bucket: IBucket;
    idx: number;
    measure: IMeasure;
};
/**
 * Type-guard testing whether the provided object is an instance of {@link IBucket}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isBucket(obj: unknown): obj is IBucket;
/**
 * Creates a new bucket with the provided id and all the specified content.
 *
 * @param localId - bucket identifier
 * @param content - items to put into the bucket; attributes, measures and/or totals
 * @returns always new instance
 * @public
 */
export declare function newBucket(localId: string, ...content: Array<IAttributeOrMeasure | ITotal | undefined>): IBucket;
/**
 * Tests whether the provided bucket is empty = contains no items and no totals.
 *
 * @param bucket - bucket to test
 * @returns true if empty, false if not
 * @public
 */
export declare function bucketIsEmpty(bucket: IBucket): boolean;
/**
 * Gets the index of the first attribute matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyAttribute predicate - meaning first found attribute
 * will be returned.
 *
 * This function also provides convenience to find attribute by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchAttribute predicate.
 *
 * @param bucket - bucket to to search in
 * @param idOrFun - attribute identifier or instance of AttributePredicate; {@link anyAttribute} predicate is default
 * @returns -1 if no matching attribute is found
 * @public
 */
export declare function bucketAttributeIndex(bucket: IBucket, idOrFun?: string | AttributePredicate): number;
/**
 * Gets first attribute matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyAttribute predicate - meaning first found attribute
 * will be returned.
 *
 * This function also provides convenience to find attribute by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchAttribute predicate.
 *
 * @param bucket - bucket to to search in
 * @param idOrFun - attribute identifier or instance of AttributePredicate; {@link anyAttribute} predicate is default
 * @returns undefined if no matching attribute is found
 * @public
 */
export declare function bucketAttribute(bucket: IBucket, idOrFun?: string | AttributePredicate): IAttribute | undefined;
/**
 * Gets all attributes matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyAttribute predicate - meaning all attributes
 * from the bucket will be returned.
 *
 * @param bucket - bucket to work with
 * @param predicate - attribute predicate; {@link anyAttribute} predicate is default
 * @returns empty list if none match
 * @public
 */
export declare function bucketAttributes(bucket: IBucket, predicate?: AttributePredicate): IAttribute[];
/**
 * Gets the index of the first measure matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyMeasure predicate - meaning first found measure
 * will be returned.
 *
 * This function also provides convenience to find measure by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchMeasure predicate.
 *
 * @param bucket - bucket to to search in
 * @param idOrFun - measure identifier or instance of MeasurePredicate; {@link anyMeasure} predicate is default
 * @returns -1 if no matching measure is found
 * @public
 */
export declare function bucketMeasureIndex(bucket: IBucket, idOrFun?: string | MeasurePredicate): number;
/**
 * Gets first measure matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyMeasure predicate - meaning first found measure
 * will be returned.
 *
 * This function also provides convenience to find measure by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchMeasure predicate.
 *
 * @param bucket - bucket to to search in
 * @param idOrFun - measure identifier or instance of MeasurePredicate; {@link anyMeasure} predicate is default
 * @returns undefined if no matching measure is found
 * @public
 */
export declare function bucketMeasure(bucket: IBucket, idOrFun?: string | MeasurePredicate): IMeasure | undefined;
/**
 * Gets all measures matching the provided predicate from the bucket.
 *
 * @remarks
 * If no predicate is provided, then the function defaults to anyMeasure predicate - meaning all measures from
 * the bucket will be returned.
 *
 * @param bucket - bucket to work with
 * @param predicate - measure predicate; {@link anyMeasure} predicate is default
 * @returns empty list if none match
 * @public
 */
export declare function bucketMeasures(bucket: IBucket, predicate?: MeasurePredicate): IMeasure[];
/**
 * Gets all attributes and measures from the bucket.
 *
 * @param bucket - bucket to work with
 * @returns empty list if no items
 * @public
 */
export declare function bucketItems(bucket: IBucket): IAttributeOrMeasure[];
/**
 * Gets all totals from the bucket
 *
 * @param bucket - bucket to work with
 * @returns empty list if no totals
 * @public
 */
export declare function bucketTotals(bucket: IBucket): ITotal[];
/**
 * Gets a new bucket that 'inherits' all data from the provided bucket but has different totals.
 *
 * @remarks
 * New totals will be used in the new bucket as-is, no merging with existing totals.
 *
 * @param bucket - bucket to work with
 * @param totals - new totals to apply
 * @returns new bucket
 * @public
 */
export declare function bucketSetTotals(bucket: IBucket, totals?: ITotal[]): IBucket;
/**
 * Defines possible compute ratio sanitization rules.
 *
 * @public
 */
export declare enum ComputeRatioRule {
    /**
     * Compute ratio must not be used in any measure
     */
    NEVER = 0,
    /**
     * Compute ratio can be used if there is just a single measure
     */
    SINGLE_MEASURE_ONLY = 1,
    /**
     * Compute ratio can be used on any measure
     */
    ANY_MEASURE = 2
}
/**
 * Applies compute ratio rule to all measures in a list.
 *
 * @remarks
 * This MAY be done to sanitize measure definitions so that the computed results make sense when visualized in a chart.
 *
 * The function will return a new list with updated measures according to the specified rule; see {@link ComputeRatioRule}.
 *
 * For convenience this function can work with list of measures AND attributes; attributes will be ignored
 * in processing and kept in resulting array as-is.
 *
 * @param items - list of attributes or measures to sanitize; attributes will be lef
 * @param rule - rule to apply; see {@link ComputeRatioRule}
 * @returns new list with modified measures; the original list and measures in it are left intact
 * @public
 */
export declare function applyRatioRule<T extends IAttributeOrMeasure>(items: T[], rule?: ComputeRatioRule): T[];
/**
 * Disables compute ratio if set on a simple measure. Does not do anything for other measures.
 *
 * @param item - maybe a simple measure where compute ratio should be disabled
 * @returns an instance of measure with compute ratio disabled
 * @public
 */
export declare function disableComputeRatio<T extends IAttributeOrMeasure>(item: T): T;
/**
 * Describes the type of the function used to modify the bucket items.
 *
 * @public
 */
export type BucketItemModifications = (bucketItem: IAttributeOrMeasure) => IAttributeOrMeasure;
/**
 * Describes the type of the function used to reduce the bucket items.
 *
 * @public
 */
export type BucketItemReducer = (acc: IAttributeOrMeasure[], cur: IAttributeOrMeasure, idx: number, src: IAttributeOrMeasure[]) => IAttributeOrMeasure[];
/**
 * Creates a new bucket by modifying items of the provided input bucket.
 *
 * @remarks
 * Each item from the input bucket will be dispatched to the modification function
 * and the result of the modification will be included in the new bucket.
 *
 * Note: it is valid for the modification function to just return the original item.
 * In that case the item will be included in the bucket without modification.
 *
 * @param bucket - bucket in which all items are applied the modification function
 * @param modifications - the modification to apply to the bucket items
 * @returns new instance of bucket with modified bucket items
 * @public
 */
export declare function bucketModifyItems(bucket: IBucket, modifications?: BucketItemModifications): IBucket;
/**
 * Creates a new bucket by modifying items of the provided input bucket.
 *
 * @remarks
 * Array of item from the input bucket will be dispatched to the reducer function
 * and the result of the modification will be included in the new bucket.
 *
 *
 * @param bucket - bucket in which all items are applied the modification function
 * @param reducer - the reducer function to apply to the bucket items
 * @returns new instance of bucket with modified bucket items
 * @public
 */
export declare function bucketItemReduce(bucket: IBucket, reducer?: BucketItemReducer): IBucket;
//# sourceMappingURL=index.d.ts.map