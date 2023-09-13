// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { anyAttribute, attributeIdentifier, idMatchAttribute, isAttribute, } from "../attribute/index.js";
import { anyMeasure, idMatchMeasure, isMeasure, isSimpleMeasure, measureIdentifier, } from "../measure/index.js";
import { isTotal } from "../base/totals.js";
import { invariant } from "ts-invariant";
import { modifySimpleMeasure } from "../measure/factory.js";
import isArray from "lodash/isArray.js";
import identity from "lodash/identity.js";
import findIndex from "lodash/findIndex.js";
import intersection from "lodash/intersection.js";
import stringify from "json-stable-stringify";
/**
 * This predicate evaluates true for any bucket.
 *
 * @public
 */
export const anyBucket = (_) => true;
/**
 * Factory function for predicates that will evaluate true if bucket's id is same as the provided id.
 *
 * @public
 */
export const idMatchBucket = (id) => (bucket) => bucket.localIdentifier === id;
//
// Type guards
//
/**
 * Type-guard testing whether the provided object is an instance of {@link IBucket}.
 *
 * @param obj - object to test
 * @public
 */
export function isBucket(obj) {
    return (!isEmpty(obj) &&
        obj.localIdentifier !== undefined &&
        obj.items !== undefined);
}
//
// Functions
//
const AGGREGATION_KEYS = ["Sum", "Count", "Avg", "Min", "Max", "Median", "Runsum"];
function getIdentifier(obj) {
    if (isMeasure(obj)) {
        return measureIdentifier(obj);
    }
    if (isAttribute(obj)) {
        return attributeIdentifier(obj);
    }
    return undefined;
}
function getAttributeDisplayFormIdentifiers(obj) {
    const result = [];
    for (const objKey of Object.keys(obj)) {
        const identifier = getIdentifier(obj[objKey]);
        if (identifier) {
            result.push({
                [objKey]: identifier,
            });
        }
    }
    return result;
}
/**
 * Creates a new bucket with the provided id and all the specified content.
 *
 * @param localId - bucket identifier
 * @param content - items to put into the bucket; attributes, measures and/or totals
 * @returns always new instance
 * @public
 */
export function newBucket(localId, ...content) {
    invariant(localId, "local identifier must be specified");
    const items = [];
    const totals = [];
    (content !== null && content !== void 0 ? content : []).forEach((i) => {
        if (!i) {
            return;
        }
        const contentErrorMessage = `Contents of a bucket must be either attribute, measure or total.`;
        if (isAttribute(i) || isMeasure(i)) {
            items.push(i);
        }
        else if (isTotal(i)) {
            totals.push(i);
        }
        else if (isArray(i)) {
            invariant(false, `newBucket called with an array of length ${i.length} as one of the items for bucket ${localId}.` +
                "Please make sure that you are not trying to put an array of items into a bucket that only accepts single item.");
        }
        else if (typeof i === "object") {
            if (Object.keys(i).indexOf("Default") > -1) {
                const identifiers = getAttributeDisplayFormIdentifiers(i).map((identifier) => {
                    const k = Object.keys(identifier)[0];
                    const value = identifier[k];
                    return `${k}: ${value}`;
                });
                invariant(false, `${contentErrorMessage} It looks like you used an attribute from generated metadata containing more than one display form. Use one of the following display forms instead: ${identifiers.join(", ")}.`);
            }
            const keys = intersection(AGGREGATION_KEYS, Object.keys(i));
            if (!isEmpty(keys)) {
                const identifier = getIdentifier(i[keys[0]]);
                invariant(false, `${contentErrorMessage} It looks like you used an object ${identifier} from generated metadata. You need to use one of the following aggregation functions instead: ${keys.join(", ")}.`);
            }
            invariant(false, `${contentErrorMessage} Got unknown content object: ${stringify(i)}.`);
        }
        else {
            invariant(false, `${contentErrorMessage} Got unsupported content of type ${typeof i}: ${i}.`);
        }
    });
    const totalsProp = !isEmpty(totals) ? { totals } : {};
    return Object.assign({ localIdentifier: localId, items }, totalsProp);
}
/**
 * Tests whether the provided bucket is empty = contains no items and no totals.
 *
 * @param bucket - bucket to test
 * @returns true if empty, false if not
 * @public
 */
export function bucketIsEmpty(bucket) {
    invariant(bucket, "bucket must be specified");
    return bucket.items.length === 0 && (!bucket.totals || bucket.totals.length === 0);
}
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
export function bucketAttributeIndex(bucket, idOrFun = anyAttribute) {
    invariant(bucket, "bucket must be specified");
    const predicate = typeof idOrFun === "string" ? idMatchAttribute(idOrFun) : idOrFun;
    const compositeGuard = (obj) => {
        return isAttribute(obj) && predicate(obj);
    };
    return findIndex(bucket.items, compositeGuard);
}
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
export function bucketAttribute(bucket, idOrFun = anyAttribute) {
    const index = bucketAttributeIndex(bucket, idOrFun);
    return index >= 0 ? bucket.items[index] : undefined;
}
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
export function bucketAttributes(bucket, predicate = anyAttribute) {
    invariant(bucket, "bucket must be specified");
    // need custom type-guard so as not to break type inference in filter() method
    const compositeGuard = (obj) => {
        return isAttribute(obj) && predicate(obj);
    };
    return bucket.items.filter(compositeGuard);
}
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
export function bucketMeasureIndex(bucket, idOrFun = anyMeasure) {
    invariant(bucket, "bucket must be specified");
    const predicate = typeof idOrFun === "string" ? idMatchMeasure(idOrFun) : idOrFun;
    const compositeGuard = (obj) => {
        return isMeasure(obj) && predicate(obj);
    };
    return findIndex(bucket.items, compositeGuard);
}
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
export function bucketMeasure(bucket, idOrFun = anyMeasure) {
    const index = bucketMeasureIndex(bucket, idOrFun);
    return index >= 0 ? bucket.items[index] : undefined;
}
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
export function bucketMeasures(bucket, predicate = anyMeasure) {
    invariant(bucket, "bucket must be specified");
    // need custom type-guard so as not to break type inference in filter() method
    const compositeGuard = (obj) => {
        return isMeasure(obj) && predicate(obj);
    };
    return bucket.items.filter(compositeGuard);
}
/**
 * Gets all attributes and measures from the bucket.
 *
 * @param bucket - bucket to work with
 * @returns empty list if no items
 * @public
 */
export function bucketItems(bucket) {
    invariant(bucket, "bucket must be specified");
    return bucket.items;
}
/**
 * Gets all totals from the bucket
 *
 * @param bucket - bucket to work with
 * @returns empty list if no totals
 * @public
 */
export function bucketTotals(bucket) {
    invariant(bucket, "bucket must be specified");
    if (!bucket.totals) {
        return [];
    }
    return bucket.totals;
}
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
export function bucketSetTotals(bucket, totals = []) {
    invariant(bucket, "bucket must be specified");
    return Object.assign(Object.assign({}, bucket), { totals });
}
/**
 * Defines possible compute ratio sanitization rules.
 *
 * @public
 */
export var ComputeRatioRule;
(function (ComputeRatioRule) {
    /**
     * Compute ratio must not be used in any measure
     */
    ComputeRatioRule[ComputeRatioRule["NEVER"] = 0] = "NEVER";
    /**
     * Compute ratio can be used if there is just a single measure
     */
    ComputeRatioRule[ComputeRatioRule["SINGLE_MEASURE_ONLY"] = 1] = "SINGLE_MEASURE_ONLY";
    /**
     * Compute ratio can be used on any measure
     */
    ComputeRatioRule[ComputeRatioRule["ANY_MEASURE"] = 2] = "ANY_MEASURE";
})(ComputeRatioRule = ComputeRatioRule || (ComputeRatioRule = {}));
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
export function applyRatioRule(items, rule = ComputeRatioRule.SINGLE_MEASURE_ONLY) {
    invariant(items, "items must be specified");
    if (rule === ComputeRatioRule.ANY_MEASURE) {
        return items;
    }
    const numberOfMeasures = items.filter(isMeasure).length;
    if (numberOfMeasures > 1 || rule === ComputeRatioRule.NEVER) {
        return items.map(disableComputeRatio);
    }
    return items;
}
/**
 * Disables compute ratio if set on a simple measure. Does not do anything for other measures.
 *
 * @param item - maybe a simple measure where compute ratio should be disabled
 * @returns an instance of measure with compute ratio disabled
 * @public
 */
export function disableComputeRatio(item) {
    if (isSimpleMeasure(item)) {
        return modifySimpleMeasure(item, (m) => m.noRatio());
    }
    return item;
}
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
export function bucketModifyItems(bucket, modifications = identity) {
    invariant(bucket, "bucket must be specified");
    const items = bucketItems(bucket);
    return Object.assign(Object.assign({}, bucket), { items: items.map((bucketItem) => modifications(bucketItem)) });
}
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
export function bucketItemReduce(bucket, reducer = identity) {
    invariant(bucket, "bucket must be specified");
    const items = bucketItems(bucket);
    const result = items.reduce((acc, cur, idx, src) => {
        return reducer(acc, cur, idx, src);
    }, []);
    return Object.assign(Object.assign({}, bucket), { items: result });
}
//# sourceMappingURL=index.js.map