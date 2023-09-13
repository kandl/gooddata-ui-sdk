// (C) 2019-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep";
import every from "lodash/every";
import { BucketNames } from "@gooddata/sdk-ui";
import { METRIC, BUCKETS } from "../../../constants/bucket";
import { isDerivedBucketItem, findDerivedBucketItems, findMasterBucketItem, findMasterBucketItems, } from "../../../utils/bucketHelper";
export function findSecondMasterMeasure(allMeasures) {
    const masterBucketItems = findMasterBucketItems(allMeasures);
    return masterBucketItems.length > 1 ? masterBucketItems[1] : null;
}
export function tryToMapForeignBuckets(extendedReferencePoint) {
    const newReferencePoint = setHeadlineRefPointBuckets(extendedReferencePoint);
    const totalBuckets = extendedReferencePoint.buckets.length;
    let allMeasuresCompatible = true;
    let bucketIndex = -1;
    while (allMeasuresCompatible && ++bucketIndex < totalBuckets) {
        const sourceBucket = extendedReferencePoint.buckets[bucketIndex];
        const targetBucket = newReferencePoint[BUCKETS][bucketIndex];
        if (!targetBucket) {
            if (sourceBucket.items.length) {
                allMeasuresCompatible = false;
            }
            continue;
        }
        const targetBucketUiConfig = newReferencePoint.uiConfig.buckets[targetBucket.localIdentifier];
        if (!(targetBucketUiConfig === null || targetBucketUiConfig === void 0 ? void 0 : targetBucketUiConfig.enabled)) {
            allMeasuresCompatible = false;
            continue;
        }
        const measuresFitToLimit = sourceBucket.items.length <= targetBucketUiConfig.itemsLimit;
        if (!measuresFitToLimit) {
            allMeasuresCompatible = false;
            continue;
        }
        const isCompatibleMeasureType = every(sourceBucket.items, (item) => item.type === METRIC);
        if (!isCompatibleMeasureType) {
            allMeasuresCompatible = false;
            continue;
        }
        targetBucket.items = sourceBucket.items;
    }
    return allMeasuresCompatible ? newReferencePoint : null;
}
export function setHeadlineRefPointBuckets(extendedReferencePoint, primaryMeasure, secondaryMeasure) {
    const newReferencePoint = cloneDeep(extendedReferencePoint);
    newReferencePoint[BUCKETS] = [
        {
            localIdentifier: BucketNames.MEASURES,
            items: primaryMeasure ? [primaryMeasure] : [],
        },
        {
            localIdentifier: BucketNames.SECONDARY_MEASURES,
            items: secondaryMeasure ? [secondaryMeasure] : [],
        },
    ];
    return newReferencePoint;
}
export function findComplementaryOverTimeComparisonMeasure(primaryMeasure, allMeasures) {
    if (!primaryMeasure) {
        return null;
    }
    if (isDerivedBucketItem(primaryMeasure)) {
        return findMasterBucketItem(primaryMeasure, allMeasures) || null;
    }
    const derivedOfPrimaryMeasure = findDerivedBucketItems(primaryMeasure, allMeasures);
    return derivedOfPrimaryMeasure.length > 0 ? derivedOfPrimaryMeasure[0] : null;
}
//# sourceMappingURL=headlineBucketHelper.js.map