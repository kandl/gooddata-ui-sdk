import { IFilter, INullableFilter } from "./index.js";
/**
 * Merges two sets of filters.
 *
 * - Attribute filters and ranking filters from both sets are simply concatenated resulting
 *   in the filters being ANDed together.
 * - Date filters are merged based on date data set they filter on
 *   - For Date filters for the same date data set:
 *     - the filters are ordered putting original filters first
 *     - the last filter in this ordering is taken
 *        - if it is All time, all filters for the dimension are cleared
 *        - else the last filter is used
 * - Measure value filters are merged so that there is at most one Measure value filter per measure
 *   (the last one specified is used). This is to prevent errors with more than one Measure value filter
 *   on the same measure which is not supported.
 *
 * @remarks
 * It is the responsibility of the caller to make sure all the filters use the same ObjRef type so that
 * they can be compared without involving the backend. Otherwise, the results might be unexpected
 * (especially for date filters).
 *
 * There is also a function in backend insights service called getInsightWithAddedFilters that can help you
 * do this that takes care of the ObjRef normalization.
 *
 * @param originalFilters - original filters to merge with
 * @param addedFilters - new filters to add on top of original
 * @internal
 */
export declare function mergeFilters(originalFilters: IFilter[], addedFilters: INullableFilter[] | undefined): IFilter[];
//# sourceMappingURL=filterMerge.d.ts.map