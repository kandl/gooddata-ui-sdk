import { IInsightDefinition } from "./index.js";
import { IBucket } from "../execution/buckets/index.js";
import { ISortItem } from "../execution/base/sort.js";
import { ITotal } from "../execution/base/totals.js";
/**
 * Makes sure the insight does not have any nonsensical data (like totals that no longer make sense, etc.), before it is saved.
 *
 * @param insight - the insight or insight definition to sanitize
 * @public
 */
export declare function insightSanitize<T extends IInsightDefinition>(insight: T): T;
/**
 * Takes totals from a bucket and removes all subtotals if the bucket is sorted on other than the first attribute.
 * This does not apply to columns bucket, as totals set with columns bucket are valid with sorts.
 *
 * @param bucket - a grouping of attributes, measures and totals to sanitize
 * @param sortItems - a specification of the sort
 * @param totals - if specified these totals instead of the bucket totals will be sanitized in regard to the bucket
 * @returns sanitized totals
 * @internal
 */
export declare function sanitizeBucketTotals(bucket: IBucket, sortItems: ISortItem[], totals?: ITotal[]): ITotal[];
//# sourceMappingURL=sanitization.d.ts.map