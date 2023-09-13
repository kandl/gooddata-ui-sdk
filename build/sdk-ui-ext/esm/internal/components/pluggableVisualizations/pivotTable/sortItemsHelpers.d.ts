import { IBucket, ISortItem } from "@gooddata/sdk-model";
import { MeasureGroupDimension } from "@gooddata/sdk-ui-pivot";
import { IBucketFilter, IBucketItem } from "../../../interfaces/Visualization.js";
export declare function adaptReferencePointSortItemsToPivotTable(originalSortItems: ISortItem[], measures: IBucketItem[], rowAttributes: IBucketItem[], columnAttributes: IBucketItem[]): ISortItem[];
export declare function sanitizePivotTableSorts(originalSortItems: ISortItem[], buckets: IBucket[], measureGroupDimension: MeasureGroupDimension): ISortItem[];
export declare function addDefaultSort(sortItems: ISortItem[], filters: IBucketFilter[], rowAttributes: IBucketItem[], previousRowAttributes: IBucketItem[], columnAttributes?: IBucketItem[], tableSortingCheckDisabled?: boolean): ISortItem[];
export declare function isSortItemVisible(sortItem: ISortItem, filters: IBucketFilter[], columnAttributes: IBucketItem[], tableSortingCheckDisabled?: boolean): boolean;
export declare function getSanitizedSortItems(sortItems: ISortItem[], measureGroupDimension: MeasureGroupDimension): ISortItem[];
//# sourceMappingURL=sortItemsHelpers.d.ts.map