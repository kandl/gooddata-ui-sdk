import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import omitBy from "lodash/omitBy";
import isEqual from "lodash/isEqual";
import { bucketAttributes, insightBucket, insightMeasures, insightSorts, newAttributeSort, newMeasureSort, newMeasureSortFromLocators, newAttributeAreaSort, isAttributeAreaSort, isAttributeValueSort, isMeasureSort, sortMeasureLocators, sortDirection, areObjRefsEqual, } from "@gooddata/sdk-model";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { getTranslation } from "./translations";
import { SORT_DIR_DESC } from "../constants/sort";
import { messages } from "../../locales";
export function getAttributeSortItem(identifier, direction = "asc", aggregation = false) {
    const attributeSortItemWithoutAggregation = {
        attributeIdentifier: identifier,
        direction,
    };
    return {
        attributeSortItem: aggregation
            ? Object.assign(Object.assign({}, attributeSortItemWithoutAggregation), { aggregation: "sum" }) : attributeSortItemWithoutAggregation,
    };
}
function getDefaultBarChartSort(insight, canSortStackTotalValue = false) {
    const measures = insightMeasures(insight);
    const viewBucket = insightBucket(insight, BucketNames.VIEW);
    const stackBucket = insightBucket(insight, BucketNames.STACK);
    const viewBy = viewBucket ? bucketAttributes(viewBucket) : [];
    const stackBy = stackBucket ? bucketAttributes(stackBucket) : [];
    if (viewBy.length === 2) {
        if (measures.length >= 2 && !canSortStackTotalValue) {
            return [
                newAttributeAreaSort(viewBy[0], SORT_DIR_DESC),
                newMeasureSort(measures[0], SORT_DIR_DESC),
            ];
        }
        return [
            newAttributeAreaSort(viewBy[0], SORT_DIR_DESC),
            newAttributeAreaSort(viewBy[1], SORT_DIR_DESC),
        ];
    }
    if (!isEmpty(viewBy) && !isEmpty(stackBy)) {
        return [newAttributeAreaSort(viewBy[0], SORT_DIR_DESC)];
    }
    if (!isEmpty(viewBy) && canSortStackTotalValue) {
        return [newAttributeAreaSort(viewBy[0], SORT_DIR_DESC)];
    }
    return isEmpty(stackBy) && !isEmpty(measures) ? [newMeasureSort(measures[0], SORT_DIR_DESC)] : [];
}
export function getDefaultTreemapSortFromBuckets(viewBy, segmentBy, measures) {
    const viewAttr = viewBy ? bucketAttributes(viewBy) : [];
    const stackAttr = segmentBy ? bucketAttributes(segmentBy) : [];
    if (!isEmpty(viewAttr) && !isEmpty(stackAttr)) {
        return [newAttributeSort(viewAttr[0], "asc"), ...measures.map((m) => newMeasureSort(m, "desc"))];
    }
    return [];
}
function getDefaultTreemapSort(insight) {
    return getDefaultTreemapSortFromBuckets(insightBucket(insight, BucketNames.VIEW), insightBucket(insight, BucketNames.SEGMENT), insightMeasures(insight));
}
function getDefaultHeatmapSortFromBuckets(viewBy) {
    const viewAttr = viewBy ? bucketAttributes(viewBy) : [];
    if (!isEmpty(viewAttr)) {
        return [newAttributeSort(viewAttr[0], "desc")];
    }
    return [];
}
function getDefaultHeatmapSort(insight) {
    const sorts = insightSorts(insight);
    if ((sorts === null || sorts === void 0 ? void 0 : sorts.length) > 0) {
        return sorts;
    }
    return getDefaultHeatmapSortFromBuckets(insightBucket(insight, BucketNames.VIEW));
}
function getDefaultPieDonutSort(insight) {
    const measures = insightMeasures(insight);
    const viewBucket = insightBucket(insight, BucketNames.VIEW);
    const viewBy = viewBucket ? bucketAttributes(viewBucket) : [];
    if (!isEmpty(measures) && !isEmpty(viewBy)) {
        return [newMeasureSort(measures[0], SORT_DIR_DESC)];
    }
    return [];
}
/**
 * Defaults created by this helper need to be the same
 * as defaults created by method getDefaultAndAvailableSort in each PV's class
 */
// Consider dissolving this function into individual components
export function createSorts(type, insight, supportedControls, featureFlags) {
    var _a;
    if (((_a = insight.insight.sorts) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        return insight.insight.sorts;
    }
    switch (type) {
        case VisualizationTypes.COLUMN:
        case VisualizationTypes.LINE:
            return [];
        case VisualizationTypes.BAR:
            return getDefaultBarChartSort(insight, canSortStackTotalValue(insight, supportedControls));
        case VisualizationTypes.TREEMAP:
            return getDefaultTreemapSort(insight);
        case VisualizationTypes.HEATMAP:
            return getDefaultHeatmapSort(insight);
        case VisualizationTypes.PIE:
        case VisualizationTypes.DONUT:
            if (featureFlags.enableChartsSorting) {
                return getDefaultPieDonutSort(insight);
            }
    }
    return [];
}
function areAllMeasuresOnSingleAxis(insight, secondaryYAxis) {
    var _a, _b;
    const measureCount = insightMeasures(insight).length;
    const numberOfMeasureOnSecondaryAxis = (_b = (_a = secondaryYAxis.measures) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    return numberOfMeasureOnSecondaryAxis === 0 || measureCount === numberOfMeasureOnSecondaryAxis;
}
function canSortStackTotalValue(insight, supportedControls) {
    var _a, _b;
    const stackMeasures = (_a = supportedControls === null || supportedControls === void 0 ? void 0 : supportedControls.stackMeasures) !== null && _a !== void 0 ? _a : false;
    const secondaryAxis = (_b = supportedControls === null || supportedControls === void 0 ? void 0 : supportedControls.secondary_yaxis) !== null && _b !== void 0 ? _b : { measures: [] };
    const allMeasuresOnSingleAxis = areAllMeasuresOnSingleAxis(insight, secondaryAxis);
    return stackMeasures && allMeasuresOnSingleAxis;
}
export function getBucketItemIdentifiers(referencePoint) {
    var _a;
    const buckets = (_a = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _a !== void 0 ? _a : [];
    return buckets.reduce((localIdentifiers, bucket) => {
        var _a;
        const items = (_a = bucket === null || bucket === void 0 ? void 0 : bucket.items) !== null && _a !== void 0 ? _a : [];
        localIdentifiers.push(...items.map((item) => item.localIdentifier));
        return localIdentifiers;
    }, []);
}
export function removeSort(referencePoint) {
    if (referencePoint.properties) {
        const properties = omitBy(Object.assign(Object.assign({}, referencePoint.properties), { sortItems: null }), isNil);
        return Object.assign(Object.assign({}, referencePoint), { properties });
    }
    return referencePoint;
}
function validateMeasureSortLocators(sortLocators, availableLocators) {
    return (sortLocators.length === availableLocators.length &&
        sortLocators.every((sortLocator, locatorIndex) => isEqual(sortLocator, availableLocators[locatorIndex])));
}
function isValidMeasureSort(measureSort, availableSort) {
    var _a;
    return (availableSort &&
        !!((_a = availableSort.metricSorts) === null || _a === void 0 ? void 0 : _a.find((availableMetricSort) => validateMeasureSortLocators(availableMetricSort.locators, sortMeasureLocators(measureSort)))));
}
function handleDifferentOrder(currentSort, availableSortGroup, previousAvailableSorts) {
    const correspondingGroupIndex = previousAvailableSorts.findIndex((previousSortGroup) => areObjRefsEqual(previousSortGroup.itemId, availableSortGroup.itemId));
    if (correspondingGroupIndex !== -1) {
        const reusedItem = reuseSortItemType(currentSort[correspondingGroupIndex], availableSortGroup);
        const modifiedSorts = [...currentSort];
        modifiedSorts[correspondingGroupIndex] = undefined; // clear reused item to not affect other availableGroups
        return {
            modifiedSorts,
            reusedItem,
        };
    }
    return {};
}
function reuseAttributeValueSortItem(currentSortItem, availableSortGroup) {
    const currentSortDirection = sortDirection(currentSortItem);
    return newAttributeSort(availableSortGroup.itemId.localIdentifier, currentSortDirection);
}
function reuseAttributeAreaSortItem(currentSortItem, availableSortGroup) {
    var _a;
    const currentSortDirection = sortDirection(currentSortItem);
    // reuse it whole
    if (availableSortGroup.attributeSort.areaSortEnabled) {
        return newAttributeAreaSort(availableSortGroup.itemId.localIdentifier, currentSortDirection);
    }
    // reuse numeric sort type
    const availableMetricSort = (_a = availableSortGroup.metricSorts) === null || _a === void 0 ? void 0 : _a[0];
    if (availableMetricSort) {
        return newMeasureSortFromLocators(availableMetricSort.locators, currentSortDirection);
    }
}
function reuseMetricSortItem(currentSortItem, availableSortGroup) {
    var _a;
    const currentSortDirection = sortDirection(currentSortItem);
    // reuse it whole
    if (isValidMeasureSort(currentSortItem, availableSortGroup)) {
        return currentSortItem;
    }
    // reuse direction
    const availableMetricSort = (_a = availableSortGroup.metricSorts) === null || _a === void 0 ? void 0 : _a[0];
    if (availableMetricSort) {
        return newMeasureSortFromLocators(availableMetricSort.locators, currentSortDirection);
    }
    // reuse numeric sort type in form of area sort
    if (availableSortGroup.attributeSort.areaSortEnabled) {
        return newAttributeAreaSort(availableSortGroup.itemId.localIdentifier, currentSortDirection);
    }
}
function reuseSortItemType(currentSortItem, availableSortGroup) {
    if (currentSortItem) {
        if (isAttributeValueSort(currentSortItem) && availableSortGroup.attributeSort.normalSortEnabled) {
            return reuseAttributeValueSortItem(currentSortItem, availableSortGroup);
        }
        if (isAttributeAreaSort(currentSortItem)) {
            return reuseAttributeAreaSortItem(currentSortItem, availableSortGroup);
        }
        if (isMeasureSort(currentSortItem)) {
            return reuseMetricSortItem(currentSortItem, availableSortGroup);
        }
    }
}
/**
 * Validates the previous sort in context of new available sorts for new buckets state.
 * Keeps current sort item if valid.
 * If current sort is not valid it is replaced by the most similar sort or default one for current moment.
 * - metric sort replaced by area sort if available
 * - area sort replaced by metric sort if available
 * - attribute sort used regardless its position
 * @param previousAvailableSorts - available sorts for previous setup (buckets content, set properties)
 * @param previousSort - current sorts to validate
 * @param availableSorts - available sorts for current moment (buckets content, set properties)
 * @param defaultSort - default sorts for current moment
 */
export function validateCurrentSort(previousAvailableSorts = [], previousSort = [], availableSorts = [], defaultSort = []) {
    if (previousSort.length === 0) {
        return [];
    }
    let sortsToReuse = [...previousSort];
    const completelyReused = availableSorts.map((availableSortGroup) => {
        // reuse existing sort item with only changed order
        // it may affect also items in current sort - set to undefined when item already reused
        const { reusedItem, modifiedSorts } = handleDifferentOrder(sortsToReuse, availableSortGroup, previousAvailableSorts);
        if (reusedItem) {
            sortsToReuse = modifiedSorts;
            return reusedItem;
        }
    });
    return availableSorts
        .map((availableSortGroup, index) => {
        var _a;
        if (completelyReused[index]) {
            return completelyReused[index];
        }
        const currentSortItem = sortsToReuse[index];
        // reuse at least type of sort item
        return (_a = reuseSortItemType(currentSortItem, availableSortGroup)) !== null && _a !== void 0 ? _a : defaultSort[index];
    })
        .filter(Boolean);
}
export function getCustomSortDisabledExplanation(relevantMeasures, relevantAttributes, intl) {
    if (relevantAttributes.length === 0 && relevantMeasures.length >= 2) {
        return getTranslation(messages.explanationMeasure.id, intl);
    }
    if (relevantAttributes.length === 0) {
        return getTranslation(messages.explanationAttribute.id, intl);
    }
}
//# sourceMappingURL=sort.js.map