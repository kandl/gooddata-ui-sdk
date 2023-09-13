// (C) 2019-2022 GoodData Corporation
import some from "lodash/some";
import every from "lodash/every";
import isEmpty from "lodash/isEmpty";
import reduce from "lodash/reduce";
import flatMap from "lodash/flatMap";
import { BucketNames } from "@gooddata/sdk-ui";
import { getItemsCount, getMeasureItems, getStackItems, getAllAttributeItems, getBucketItems, getAllItemsByType, getAttributeItemsWithoutStacks, isDateBucketItem, isMeasureValueFilter, isRankingFilter, } from "./bucketHelper";
import { FILTERS, GRANULARITY, ALL_TIME, METRIC, ATTRIBUTE, DATE } from "../constants/bucket";
export function hasOneMeasure(buckets) {
    return getItemsCount(buckets, BucketNames.MEASURES) === 1;
}
function hasOneMasterMeasure(buckets) {
    return getMasterMeasuresCount(buckets, BucketNames.MEASURES) === 1;
}
export function getMasterMeasuresCount(buckets, bucketLocalIdentifier) {
    const items = getBucketItems(buckets, bucketLocalIdentifier);
    return reduce(items, (acc, item) => (item.masterLocalIdentifier ? acc : acc + 1), 0);
}
export function hasOneMasterMeasureInBucket(buckets, bucketLocalIdentifier) {
    return getMasterMeasuresCount(buckets, bucketLocalIdentifier) === 1;
}
export function filteredByDerivedMeasure(buckets, filters) {
    const measures = getAllItemsByType(buckets, [METRIC]);
    const derivedMeasuresLocalIdentifiers = measures.reduce((acc, measure) => {
        if (measure.masterLocalIdentifier) {
            acc.push(measure.localIdentifier);
        }
        return acc;
    }, []);
    const allBucketFilters = flatMap(filters.items, (filterItem) => filterItem.filters);
    return allBucketFilters
        .filter(isMeasureValueFilter)
        .some((measureValueFilter) => derivedMeasuresLocalIdentifiers.includes(measureValueFilter.measureLocalIdentifier));
}
export function hasNoMeasures(buckets) {
    return getItemsCount(buckets, BucketNames.MEASURES) === 0;
}
export function hasNoSecondaryMeasures(buckets) {
    return getItemsCount(buckets, BucketNames.SECONDARY_MEASURES) === 0;
}
export function hasNoAttribute(buckets) {
    return getItemsCount(buckets, BucketNames.ATTRIBUTE) === 0;
}
export function hasSomeSegmentByItems(buckets) {
    return getItemsCount(buckets, BucketNames.SEGMENT) !== 0;
}
export function hasMoreThanOneCategory(buckets) {
    return getAllAttributeItems(buckets).length > 1;
}
export function hasMoreThanOneMasterMeasure(buckets, bucketLocalIdentifier) {
    return getMasterMeasuresCount(buckets, bucketLocalIdentifier) > 1;
}
function hasSomeCategories(buckets) {
    return getAttributeItemsWithoutStacks(buckets).length > 0;
}
function hasNoCategories(buckets) {
    return getAttributeItemsWithoutStacks(buckets).length === 0;
}
function allRulesMet(rules, buckets, filters) {
    return rules.every((rule) => rule(buckets, filters));
}
function hasDateInCategories(buckets) {
    return some(getAllAttributeItems(buckets), isDateBucketItem);
}
export function hasGlobalDateFilterIgnoreAllTime(filters) {
    if (filters) {
        return some(filters.items, (item) => {
            var _a, _b, _c;
            const interval = (_c = (_b = (_a = item === null || item === void 0 ? void 0 : item.filters) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.interval) !== null && _c !== void 0 ? _c : null;
            return interval && interval.name !== ALL_TIME;
        });
    }
    return false;
}
export function hasGlobalDateFilter(filters) {
    if (filters) {
        return some(filters.items, (item) => { var _a, _b; return (_b = (_a = item === null || item === void 0 ? void 0 : item.filters) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.interval; });
    }
    return false;
}
export function hasUsedDateIgnoreAllTime(buckets, filters) {
    return hasDateInCategories(buckets) || hasGlobalDateFilterIgnoreAllTime(filters);
}
export function hasUsedDate(buckets, filters) {
    return hasDateInCategories(buckets) || hasGlobalDateFilter(filters);
}
function hasNoWeekGranularity(buckets) {
    if (hasDateInCategories(buckets)) {
        return every(getAllAttributeItems(buckets), (item) => (item === null || item === void 0 ? void 0 : item.granularity) !== GRANULARITY.week);
    }
    return every(getBucketItems(buckets, FILTERS), (item) => (item === null || item === void 0 ? void 0 : item.granularity) !== GRANULARITY.week);
}
function hasNoMeasureDateFilter(buckets) {
    return !some(getMeasureItems(buckets), (item) => {
        const filters = item === null || item === void 0 ? void 0 : item.filters;
        return filters && some(filters, isDateBucketItem);
    });
}
export function hasNoStacks(buckets) {
    return getStackItems(buckets).length === 0;
}
export function hasNoStacksWithDate(buckets) {
    return getStackItems(buckets, [ATTRIBUTE, DATE]).length === 0;
}
export function hasOneCategory(buckets) {
    return getAttributeItemsWithoutStacks(buckets, [ATTRIBUTE, DATE]).length === 1;
}
function isShowPercentageUnselected(buckets) {
    var _a, _b;
    return !((_b = (_a = getBucketItems(buckets, BucketNames.MEASURES)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.showInPercent);
}
export function noDerivedMeasurePresent(buckets) {
    const measures = getAllItemsByType(buckets, [METRIC]);
    return !some(measures, (measure) => measure.masterLocalIdentifier);
}
function hasFirstDate(buckets) {
    var _a;
    const firstAttributeItem = (_a = getAllAttributeItems(buckets)) === null || _a === void 0 ? void 0 : _a[0];
    return firstAttributeItem && isDateBucketItem(firstAttributeItem);
}
function hasNotFirstDate(buckets) {
    return !hasFirstDate(buckets);
}
export function hasNonAllTimeFilter(filters) {
    var _a, _b, _c, _d, _e;
    const filterBucketItems = (_a = filters === null || filters === void 0 ? void 0 : filters.items) !== null && _a !== void 0 ? _a : [];
    const dateFilter = filterBucketItems.find((filter) => {
        return (filter === null || filter === void 0 ? void 0 : filter.attribute) === "attr.datedataset";
    });
    const filterInterval = (_e = (_d = (_c = (_b = dateFilter === null || dateFilter === void 0 ? void 0 : dateFilter.filters) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.interval) === null || _d === void 0 ? void 0 : _d.interval) !== null && _e !== void 0 ? _e : [];
    return !isEmpty(filterInterval);
}
function hasNoRankingFilter(_, filters) {
    const allBucketFilters = flatMap(filters.items, (filterItem) => filterItem.filters);
    return !allBucketFilters.some(isRankingFilter);
}
export function isShowInPercentAllowed(buckets, filters, bucketLocalIdentifier) {
    const rules = [hasNoStacks, hasSomeCategories, hasNoRankingFilter];
    return (allRulesMet(rules, buckets, filters) &&
        hasOneMasterMeasureInBucket(buckets, bucketLocalIdentifier) &&
        !filteredByDerivedMeasure(buckets, filters));
}
export function isComparisonOverTimeAllowed(buckets, filters, weekFiltersEnabled) {
    const rules = weekFiltersEnabled ? [hasNoStacksWithDate] : [hasNoStacksWithDate, hasNoWeekGranularity];
    return allRulesMet(rules, buckets, filters) && hasGlobalDateFilter(filters);
}
export function overTimeComparisonRecommendationEnabled(referencePoint, weekFiltersEnabled) {
    var _a;
    const baseRules = [
        noDerivedMeasurePresent,
        hasOneMeasure,
        hasFirstDate,
        hasNoStacksWithDate,
        hasOneCategory,
        hasNoMeasureDateFilter,
    ];
    const rules = weekFiltersEnabled ? baseRules : [...baseRules, hasNoWeekGranularity];
    return (allRulesMet(rules, (_a = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _a !== void 0 ? _a : []) &&
        hasGlobalDateFilterIgnoreAllTime(referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.filters));
}
export function comparisonAndTrendingRecommendationEnabled(buckets) {
    const rules = [hasOneMeasure, noDerivedMeasurePresent, hasNoCategories];
    return allRulesMet(rules, buckets);
}
export function percentRecommendationEnabled(buckets, filters) {
    const rules = [
        isShowPercentageUnselected,
        hasNotFirstDate,
        hasOneMasterMeasure,
        hasOneCategory,
        hasNoStacks,
        hasNoRankingFilter,
    ];
    return allRulesMet(rules, buckets, filters) && !filteredByDerivedMeasure(buckets, filters);
}
export function previousPeriodRecommendationEnabled(buckets) {
    const rules = [
        hasOneMeasure,
        hasOneCategory,
        hasNotFirstDate,
        hasNoStacks,
        noDerivedMeasurePresent,
        isShowPercentageUnselected,
        hasNoMeasureDateFilter,
    ];
    return allRulesMet(rules, buckets);
}
//# sourceMappingURL=bucketRules.js.map