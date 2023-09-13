// (C) 2019-2021 GoodData Corporation
import forEach from "lodash/forEach";
import set from "lodash/set";
import isEmpty from "lodash/isEmpty";
import includes from "lodash/includes";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import { OverTimeComparisonTypes } from "@gooddata/sdk-ui";
import { METRIC, SHOW_IN_PERCENT } from "../constants/bucket";
import { filterOutDerivedMeasures, filterOutArithmeticMeasuresFromDerived, getComparisonTypeFromFilters, keepOnlyMasterAndDerivedMeasuresOfType, filterOutIncompatibleArithmeticMeasures, isComparisonAvailable, removeAllDerivedMeasures, } from "./bucketHelper";
import { isShowInPercentAllowed, isComparisonOverTimeAllowed } from "./bucketRules";
function getTypeOfDerivedToKeep(supportedTypes, appliedType) {
    return isEmpty(supportedTypes) || isEqual(supportedTypes, [OverTimeComparisonTypes.NOTHING])
        ? OverTimeComparisonTypes.NOTHING
        : appliedType;
}
export function configureOverTimeComparison(extendedReferencePoint, weekFiltersEnabled) {
    let newExtendedReferencePoint = cloneDeep(extendedReferencePoint);
    const { buckets, filters, uiConfig } = newExtendedReferencePoint;
    const { supportedOverTimeComparisonTypes } = uiConfig;
    const appliedComparisonType = getComparisonTypeFromFilters(filters);
    const isSelectedComparisonSupportedByVis = includes(supportedOverTimeComparisonTypes, appliedComparisonType);
    const derivedOfTypeToKeep = getTypeOfDerivedToKeep(supportedOverTimeComparisonTypes, appliedComparisonType);
    const comparisonOverTimeAllowed = isComparisonOverTimeAllowed(buckets, filters, weekFiltersEnabled);
    const originalBuckets = cloneDeep(buckets);
    forEach(buckets, (bucket) => {
        let newItems = bucket.items;
        if (!comparisonOverTimeAllowed) {
            newItems = filterOutArithmeticMeasuresFromDerived(newItems, originalBuckets);
            newItems = filterOutDerivedMeasures(newItems);
        }
        if (!isSelectedComparisonSupportedByVis) {
            newItems = filterOutIncompatibleArithmeticMeasures(newItems, originalBuckets, derivedOfTypeToKeep);
            newItems = keepOnlyMasterAndDerivedMeasuresOfType(newItems, derivedOfTypeToKeep);
        }
        bucket.items = newItems;
    });
    if (!isComparisonAvailable(buckets, filters)) {
        newExtendedReferencePoint = removeAllDerivedMeasures(newExtendedReferencePoint);
    }
    return newExtendedReferencePoint;
}
function removeShowInPercent(measure) {
    return set(measure, SHOW_IN_PERCENT, null);
}
export function configurePercent(extendedReferencePoint, percentDisabled = false) {
    forEach(extendedReferencePoint.buckets, (bucket) => {
        const showInPercentEnabled = !percentDisabled &&
            isShowInPercentAllowed(extendedReferencePoint.buckets, extendedReferencePoint.filters, bucket.localIdentifier);
        if (!showInPercentEnabled) {
            bucket.items.forEach((measure) => {
                if (measure.type === METRIC) {
                    removeShowInPercent(measure);
                }
            });
        }
        const bucketUiConfig = extendedReferencePoint.uiConfig.buckets[bucket.localIdentifier];
        if (bucketUiConfig.accepts.indexOf(METRIC) >= 0) {
            bucketUiConfig.isShowInPercentEnabled = showInPercentEnabled;
        }
    });
    return extendedReferencePoint;
}
//# sourceMappingURL=bucketConfig.js.map