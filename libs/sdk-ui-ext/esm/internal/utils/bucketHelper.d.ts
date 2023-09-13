import { IntlShape } from "react-intl";
import { OverTimeComparisonType } from "@gooddata/sdk-ui";
import { IBucket, IInsightDefinition, ITotal, IMeasure } from "@gooddata/sdk-model";
import { IAttributeFilter, IBucketFilter, IBucketItem, IBucketOfFun, IDateFilter, IExtendedReferencePoint, IFilters, IFiltersBucketItem, IMeasureValueFilter, IUiConfig, IRankingFilter } from "../interfaces/Visualization.js";
export declare function isDateFilter(filter: IBucketFilter): filter is IDateFilter;
export declare function isFiltersBucketItem(filter: IFiltersBucketItem): filter is IFiltersBucketItem;
export declare function isAttributeFilter(filter: IBucketFilter): filter is IAttributeFilter;
export declare function isMeasureValueFilter(filter: IBucketFilter): filter is IMeasureValueFilter;
export declare function isActiveMeasureValueFilter(filter: IBucketFilter): boolean;
export declare function isRankingFilter(filter: IBucketFilter): filter is IRankingFilter;
export declare function sanitizeFilters(newReferencePoint: IExtendedReferencePoint): IExtendedReferencePoint;
export declare function isDerivedBucketItem(measureItem: IBucketItem): boolean;
export declare function isArithmeticBucketItem(bucketItem: IBucketItem): boolean;
/**
 * Get array of unique over time comparison types used in ancestors of the provided arithmetic measure.
 *
 * @param measure - the (possibly) arithmetic measure
 * @param buckets - all buckets
 * @returns empty array if there are no derived measures in the arithmetic measure ancestors, empty array if provided
 * measure is not arithmetic, array of unique {@link OverTimeComparisonType} of derived ancestor measures found in arithmetic
 * measure tree.
 */
export declare function getDerivedTypesFromArithmeticMeasure(measure: IBucketItem, buckets: IBucketOfFun[]): OverTimeComparisonType[];
export declare function filterOutDerivedMeasures(measures: IBucketItem[]): IBucketItem[];
export declare function filterOutArithmeticMeasuresFromDerived(measures: IBucketItem[], buckets: IBucketOfFun[]): IBucketItem[];
export declare function keepOnlyMasterAndDerivedMeasuresOfType(measures: IBucketItem[], derivedType: OverTimeComparisonType): IBucketItem[];
export declare function filterOutIncompatibleArithmeticMeasures(measures: IBucketItem[], buckets: IBucketOfFun[], derivedOfTypeToKeep: OverTimeComparisonType): IBucketItem[];
export declare function isDateBucketItem(bucketItem: IBucketItem): boolean;
export declare const isNotDateBucketItem: (bucketItem: IBucketItem) => boolean;
export declare function getDateFilter(filtersBucket: IFilters): IDateFilter;
export declare function getComparisonTypeFromFilters(filtersBucket: IFilters): OverTimeComparisonType;
export declare function setBucketTitles(referencePoint: IExtendedReferencePoint, visualizationType: string, intl?: IntlShape): IUiConfig;
export declare function generateBucketTitleId(localIdentifier: string, visualizationType: string): string;
export declare function getItemsCount(buckets: IBucketOfFun[], localIdentifier: string): number;
export declare function getBucketItems(buckets: IBucketOfFun[], localIdentifier: string): IBucketItem[];
export declare function getItemsFromBuckets(buckets: IBucketOfFun[], localIdentifiers: string[], types?: string[]): IBucketItem[];
export declare function getBucketItemsByType(buckets: IBucketOfFun[], localIdentifier: string, types: string[]): IBucketItem[];
export declare function getPreferredBucketItems(buckets: IBucketOfFun[], preference: string[], type: string[]): IBucketItem[];
export declare function getAllItemsByType(buckets: IBucketOfFun[], types: string[]): IBucketItem[];
export declare function removeDuplicateBucketItems(buckets: IBucketOfFun[]): IBucketOfFun[];
export declare function getTotalsFromBucket(buckets: IBucketOfFun[], bucketName: string): ITotal[];
export declare function getMeasuresFromMdObject(insight: IInsightDefinition): IMeasure[];
export declare function getAllMeasures(buckets: IBucketOfFun[]): IBucketItem[];
export declare function getFirstValidMeasure(buckets: IBucketOfFun[]): IBucketItem;
export declare function getFirstAttribute(buckets: IBucketOfFun[]): IBucketItem;
export declare function getMeasureItems(buckets: IBucketOfFun[]): IBucketItem[];
export declare function getBucketItemsWithExcludeByType(buckets: IBucketOfFun[], excludedBucket: string[], type: string[]): IBucketItem[];
export declare function getStackItems(buckets: IBucketOfFun[], itemTypes?: string[]): IBucketItem[];
export declare function getAttributeToItems(buckets: IBucketOfFun[]): IBucketItem[];
export declare function getAttributeFromItems(buckets: IBucketOfFun[]): IBucketItem[];
export declare function getViewItems(buckets: IBucketOfFun[], itemTypes?: string[]): IBucketItem[];
export declare function getAttributeItems(buckets: IBucketOfFun[]): IBucketItem[];
export declare function getAttributeItemsWithoutStacks(buckets: IBucketOfFun[], itemTypes?: string[]): IBucketItem[];
export declare function getAllCategoriesAttributeItems(buckets: IBucketOfFun[]): IBucketItem[];
export declare function getAllAttributeItems(buckets: IBucketOfFun[]): IBucketItem[];
export declare function getAllAttributeItemsWithPreference(buckets: IBucketOfFun[], preference: string[]): IBucketItem[];
export declare function getDateItems(buckets: IBucketOfFun[]): IBucketItem[];
export declare function getDateItemsWithMultipleDates(buckets: IBucketOfFun[]): IBucketItem[];
export declare function getFistDateItemWithMultipleDates(buckets: IBucketOfFun[]): IBucketItem | undefined;
export declare function getFistDateItem(buckets: IBucketOfFun[]): IBucketItem | undefined;
export declare function getMainDateItem(dateItems: IBucketItem[]): IBucketItem;
export declare function applyUiConfig(referencePoint: IExtendedReferencePoint): IExtendedReferencePoint;
export declare function hasBucket(buckets: IBucketOfFun[], localIdentifier: string): boolean;
export declare function findBucket(buckets: IBucketOfFun[], localIdentifier: string): IBucketOfFun;
export declare function getBucketsByNames(buckets: IBucketOfFun[], names: string[]): IBucketOfFun[];
export declare function getFirstMasterWithDerived(measureItems: IBucketItem[]): IBucketItem[];
export declare function removeAllArithmeticMeasuresFromDerived(extendedReferencePoint: IExtendedReferencePoint): IExtendedReferencePoint;
export declare function removeAllDerivedMeasures(extendedReferencePoint: IExtendedReferencePoint): IExtendedReferencePoint;
export declare function findMasterBucketItem(derivedBucketItem: IBucketItem, bucketItems: IBucketItem[]): IBucketItem;
export declare function findMasterBucketItems(bucketItems: IBucketItem[]): IBucketItem[];
export declare function findDerivedBucketItems(masterBucketItem: IBucketItem, bucketItems: IBucketItem[]): IBucketItem[];
export declare function findDerivedBucketItem(masterBucketItem: IBucketItem, bucketItems: IBucketItem[]): IBucketItem;
export declare function hasDerivedBucketItems(masterBucketItem: IBucketItem, buckets: IBucketOfFun[]): boolean;
export declare function getFilteredMeasuresForStackedCharts(buckets: IBucketOfFun[]): IBucketItem[];
export declare function noRowsAndHasOneMeasure(buckets: IBucket[]): boolean;
export declare function noColumnsAndHasOneMeasure(buckets: IBucket[]): boolean;
export declare function limitNumberOfMeasuresInBuckets(buckets: IBucketOfFun[], measuresLimitCount: number, tryToSelectDerivedWithMaster?: boolean): IBucketOfFun[];
export declare function setMeasuresShowOnSecondaryAxis(items: IBucketItem[], value: boolean): IBucketItem[];
export declare function removeShowOnSecondaryAxis(items: IBucketItem[]): IBucketItem[];
export declare function getAllMeasuresShowOnSecondaryAxis(buckets: IBucketOfFun[]): IBucketItem[];
export declare function getItemsLocalIdentifiers(items: IBucketItem[]): string[];
export interface IMeasureBucketItemsLimit {
    localIdentifier: string;
    itemsLimit: number;
}
export declare const transformMeasureBuckets: (measureBucketItemsLimits: IMeasureBucketItemsLimit[], buckets: IBucketOfFun[]) => IBucketOfFun[];
export declare const hasSameDateDimension: (dateItem: IBucketItem, referenceDateItem: IBucketItem) => boolean;
export declare const removeDivergentDateItems: (viewItems: IBucketItem[], mainDateItem: IBucketItem) => IBucketItem[];
export declare const isComparisonAvailable: (buckets: IBucketOfFun[], filters: IFilters) => boolean;
//# sourceMappingURL=bucketHelper.d.ts.map