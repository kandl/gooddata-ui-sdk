// (C) 2019-2023 GoodData Corporation
import set from "lodash/set.js";
import uniq from "lodash/uniq.js";
import uniqBy from "lodash/uniqBy.js";
import negate from "lodash/negate.js";
import includes from "lodash/includes.js";
import every from "lodash/every.js";
import forEach from "lodash/forEach.js";
import cloneDeep from "lodash/cloneDeep.js";
import isEmpty from "lodash/isEmpty.js";
import flatMap from "lodash/flatMap.js";
import compact from "lodash/compact.js";
import without from "lodash/without.js";
import { BucketNames, OverTimeComparisonTypes, VisualizationTypes, } from "@gooddata/sdk-ui";
import { bucketItems, bucketsFind, bucketsMeasures, insightBuckets, isSimpleMeasure, areObjRefsEqual, } from "@gooddata/sdk-model";
import { DATE_DATASET_ATTRIBUTE, } from "../interfaces/Visualization.js";
import { ATTRIBUTE, BUCKETS, DATE, METRIC, SHOW_ON_SECONDARY_AXIS } from "../constants/bucket.js";
import { getTranslation } from "./translations.js";
import { titles, subtitles } from "../../locales.js";
export function isDateFilter(filter) {
    return !!filter && filter.attribute === DATE_DATASET_ATTRIBUTE;
}
export function isFiltersBucketItem(filter) {
    return (filter === null || filter === void 0 ? void 0 : filter.attribute) === DATE_DATASET_ATTRIBUTE;
}
export function isAttributeFilter(filter) {
    const filterAsAttributeFilter = filter;
    return (!!filter &&
        filterAsAttributeFilter.attribute !== DATE_DATASET_ATTRIBUTE &&
        filterAsAttributeFilter.attribute !== undefined);
}
export function isMeasureValueFilter(filter) {
    return !!filter && !!filter.measureLocalIdentifier;
}
export function isActiveMeasureValueFilter(filter) {
    if (!isMeasureValueFilter(filter)) {
        return false;
    }
    return !!filter.condition;
}
export function isRankingFilter(filter) {
    const filterAsRankingFilter = filter;
    return (!!filter &&
        typeof filterAsRankingFilter.measure === "string" &&
        typeof filterAsRankingFilter.operator === "string" &&
        typeof filterAsRankingFilter.value === "number");
}
export function sanitizeFilters(newReferencePoint) {
    const attributeBucketItems = getAllAttributeItems(newReferencePoint.buckets);
    const measureBucketItems = getAllMeasureItems(newReferencePoint.buckets);
    newReferencePoint.filters = newReferencePoint.filters || {
        localIdentifier: "filters",
        items: [],
    };
    const filteredFilters = newReferencePoint.filters.items.filter((filterBucketItem) => {
        const filter = filterBucketItem.filters[0];
        if (isAttributeFilter(filter) || isDateFilter(filter)) {
            if (filterBucketItem.autoCreated === false) {
                return true;
            }
            return attributeBucketItems.some((attributeBucketItem) => attributeBucketItem.attribute === filter.attribute);
        }
        else if (isMeasureValueFilter(filter)) {
            if (attributeBucketItems.length === 0) {
                return false;
            }
            return measureBucketItems.some((measureBucketItem) => measureBucketItem.localIdentifier === filter.measureLocalIdentifier);
        }
        else if (isRankingFilter(filter)) {
            if (attributeBucketItems.length === 0) {
                return false;
            }
            const hasValidMeasure = measureBucketItems.some((measureBucketItem) => measureBucketItem.localIdentifier === filter.measure);
            const hasValidAttributes = !filter.attributes ||
                filter.attributes.every((localIdentifier) => attributeBucketItems.some((attributeBucketItem) => attributeBucketItem.localIdentifier === localIdentifier));
            return hasValidMeasure && hasValidAttributes;
        }
        return false;
    });
    return Object.assign(Object.assign({}, newReferencePoint), { filters: Object.assign(Object.assign({}, newReferencePoint.filters), { items: filteredFilters }) });
}
export function isDerivedBucketItem(measureItem) {
    return !!measureItem.masterLocalIdentifier;
}
export function isArithmeticBucketItem(bucketItem) {
    return !!bucketItem.operandLocalIdentifiers;
}
function isDerivedOfTypeBucketItem(measureItem, derivedType) {
    if (!isDerivedBucketItem(measureItem)) {
        return false;
    }
    return measureItem.overTimeComparisonType === derivedType;
}
function findDerivedTypesReferencedByArithmeticMeasure(measure, allMeasures, visitedMeasures) {
    return measure.operandLocalIdentifiers.reduce((types, operandIdentifier) => {
        if (operandIdentifier === null || visitedMeasures.has(operandIdentifier)) {
            return types;
        }
        const operand = findMeasureByLocalIdentifier(operandIdentifier, allMeasures);
        if (operand === undefined) {
            return types;
        }
        if (isArithmeticBucketItem(operand)) {
            visitedMeasures.add(operandIdentifier);
            findDerivedTypesReferencedByArithmeticMeasure(operand, allMeasures, visitedMeasures).forEach((type) => types.add(type));
        }
        else if (isDerivedBucketItem(operand) && !types.has(operand.overTimeComparisonType)) {
            types.add(operand.overTimeComparisonType);
        }
        return types;
    }, new Set());
}
/**
 * Get array of unique over time comparison types used in ancestors of the provided arithmetic measure.
 *
 * @param measure - the (possibly) arithmetic measure
 * @param buckets - all buckets
 * @returns empty array if there are no derived measures in the arithmetic measure ancestors, empty array if provided
 * measure is not arithmetic, array of unique {@link OverTimeComparisonType} of derived ancestor measures found in arithmetic
 * measure tree.
 */
export function getDerivedTypesFromArithmeticMeasure(measure, buckets) {
    if (!isArithmeticBucketItem(measure)) {
        return [];
    }
    const allMeasures = flatMap(buckets, (bucket) => bucket.items);
    const overTimeComparisonTypes = findDerivedTypesReferencedByArithmeticMeasure(measure, allMeasures, new Set());
    return Array.from(overTimeComparisonTypes);
}
export function filterOutDerivedMeasures(measures) {
    return measures.filter((measure) => !isDerivedBucketItem(measure));
}
function isArithmeticMeasureFromDerived(measure, buckets) {
    return getDerivedTypesFromArithmeticMeasure(measure, buckets).length > 0;
}
export function filterOutArithmeticMeasuresFromDerived(measures, buckets) {
    return measures.filter((measure) => !isArithmeticMeasureFromDerived(measure, buckets));
}
function isArithmeticMeasureFromDerivedOfTypeOnly(measure, buckets, derivedType) {
    const arithmeticMeasureDerivedTypes = getDerivedTypesFromArithmeticMeasure(measure, buckets);
    return arithmeticMeasureDerivedTypes.length === 1 && arithmeticMeasureDerivedTypes[0] === derivedType;
}
export function keepOnlyMasterAndDerivedMeasuresOfType(measures, derivedType) {
    return measures.filter((measure) => !isDerivedBucketItem(measure) || isDerivedOfTypeBucketItem(measure, derivedType));
}
export function filterOutIncompatibleArithmeticMeasures(measures, buckets, derivedOfTypeToKeep) {
    return measures.filter((measure) => !isArithmeticBucketItem(measure) ||
        !isArithmeticMeasureFromDerived(measure, buckets) ||
        isArithmeticMeasureFromDerivedOfTypeOnly(measure, buckets, derivedOfTypeToKeep));
}
export function isDateBucketItem(bucketItem) {
    return (bucketItem === null || bucketItem === void 0 ? void 0 : bucketItem.type) === DATE;
}
export const isNotDateBucketItem = negate(isDateBucketItem);
export function getDateFilter(filtersBucket) {
    if (!filtersBucket) {
        return null;
    }
    const dateFiltersInclEmpty = flatMap(filtersBucket.items, (filterItem) => {
        var _a;
        const filters = (_a = filterItem.filters) !== null && _a !== void 0 ? _a : [];
        return filters.find(isDateFilter);
    });
    const dateFilters = compact(dateFiltersInclEmpty);
    return dateFilters.length ? dateFilters[0] : null;
}
export function getComparisonTypeFromFilters(filtersBucket) {
    if (isEmpty(filtersBucket)) {
        return OverTimeComparisonTypes.NOTHING;
    }
    const dateFilter = getDateFilter(filtersBucket);
    return !isEmpty(dateFilter) && dateFilter.overTimeComparisonType
        ? dateFilter.overTimeComparisonType
        : OverTimeComparisonTypes.NOTHING;
}
function bucketSupportsSubtitle(visualizationType, bucketLocalIdentifier) {
    switch (visualizationType) {
        case VisualizationTypes.HEADLINE:
            return true;
        case VisualizationTypes.SCATTER:
            return bucketLocalIdentifier !== BucketNames.ATTRIBUTE;
        case VisualizationTypes.BUBBLE:
            return bucketLocalIdentifier !== BucketNames.VIEW;
        case VisualizationTypes.COMBO:
            return bucketLocalIdentifier !== BucketNames.VIEW;
        case VisualizationTypes.BULLET:
            return bucketLocalIdentifier !== BucketNames.VIEW;
        case VisualizationTypes.PUSHPIN:
            return (bucketLocalIdentifier !== BucketNames.LOCATION &&
                bucketLocalIdentifier !== BucketNames.SEGMENT);
        case VisualizationTypes.SANKEY:
        case VisualizationTypes.DEPENDENCY_WHEEL:
            return bucketLocalIdentifier !== BucketNames.MEASURES;
        default:
            return false;
    }
}
export function setBucketTitles(referencePoint, visualizationType, intl) {
    const buckets = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets;
    const updatedUiConfig = cloneDeep(referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.uiConfig);
    forEach(buckets, (bucket) => {
        var _a, _b, _c, _d;
        const localIdentifier = (_a = bucket.localIdentifier) !== null && _a !== void 0 ? _a : "";
        // skip disabled buckets
        if (!((_d = (_c = (_b = updatedUiConfig === null || updatedUiConfig === void 0 ? void 0 : updatedUiConfig.buckets) === null || _b === void 0 ? void 0 : _b[localIdentifier]) === null || _c === void 0 ? void 0 : _c.enabled) !== null && _d !== void 0 ? _d : false)) {
            return;
        }
        if (bucketSupportsSubtitle(visualizationType, localIdentifier)) {
            const subtitleId = generateBucketSubtitleId(localIdentifier, visualizationType);
            const subtitle = getTranslation(subtitleId, intl);
            set(updatedUiConfig, [BUCKETS, localIdentifier, "subtitle"], subtitle);
        }
        const titleId = generateBucketTitleId(localIdentifier, visualizationType);
        const title = getTranslation(titleId, intl);
        set(updatedUiConfig, [BUCKETS, localIdentifier, "title"], title);
    });
    return updatedUiConfig;
}
export function generateBucketTitleId(localIdentifier, visualizationType) {
    return titles[`${localIdentifier}_${visualizationType}`].id;
}
function generateBucketSubtitleId(localIdentifier, visualizationType) {
    return subtitles[`${localIdentifier}_${visualizationType}`].id;
}
export function getItemsCount(buckets, localIdentifier) {
    return getBucketItems(buckets, localIdentifier).length;
}
export function getBucketItems(buckets, localIdentifier) {
    var _a, _b;
    return (_b = (_a = buckets.find((bucket) => bucket.localIdentifier === localIdentifier)) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : [];
}
// return bucket items matching localIdentifiers from any bucket
export function getItemsFromBuckets(buckets, localIdentifiers, types) {
    return localIdentifiers.reduce((bucketItems, localIdentifier) => {
        const toAdd = types
            ? getBucketItemsByType(buckets, localIdentifier, types)
            : getBucketItems(buckets, localIdentifier);
        bucketItems.push(...toAdd);
        return bucketItems;
    }, []);
}
export function getBucketItemsByType(buckets, localIdentifier, types) {
    const itemsOfType = [];
    const bucketItems = getBucketItems(buckets, localIdentifier);
    bucketItems.forEach((item) => {
        if (includes(types, item.type)) {
            itemsOfType.push(item);
        }
    });
    return itemsOfType;
}
export function getPreferredBucketItems(buckets, preference, type) {
    var _a;
    const bucket = getPreferredBucket(buckets, preference, type);
    return (_a = bucket === null || bucket === void 0 ? void 0 : bucket.items) !== null && _a !== void 0 ? _a : [];
}
function getPreferredBucket(buckets, preference, type) {
    return preference.reduce((result, preference) => {
        if (result) {
            return result;
        }
        return buckets.find((bucket) => {
            var _a;
            const preferenceMatch = bucket.localIdentifier === preference;
            const typeMatch = every((_a = bucket === null || bucket === void 0 ? void 0 : bucket.items) !== null && _a !== void 0 ? _a : [], (item) => type.indexOf(item.type) !== -1);
            return preferenceMatch && typeMatch;
        });
    }, undefined);
}
function getAllBucketItemsByType(bucket, types) {
    return bucket.items.reduce((resultItems, item) => {
        if (includes(types, item.type)) {
            resultItems.push(item);
        }
        return resultItems;
    }, []);
}
export function getAllItemsByType(buckets, types) {
    return buckets.reduce((items, bucket) => {
        items.push(...getAllBucketItemsByType(bucket, types));
        return items;
    }, []);
}
export function removeDuplicateBucketItems(buckets) {
    const usedIdentifiersMap = {};
    return buckets.map((bucket) => {
        const filteredBucketItems = bucket.items.filter((bucketItem) => {
            const isDuplicate = usedIdentifiersMap[bucketItem.localIdentifier];
            usedIdentifiersMap[bucketItem.localIdentifier] = true;
            return !isDuplicate;
        });
        return filteredBucketItems.length === bucket.items.length
            ? bucket
            : Object.assign(Object.assign({}, bucket), { items: filteredBucketItems });
    });
}
export function getTotalsFromBucket(buckets, bucketName) {
    var _a;
    const selectedBucket = buckets.find((bucket) => bucket.localIdentifier === bucketName);
    return (_a = selectedBucket === null || selectedBucket === void 0 ? void 0 : selectedBucket.totals) !== null && _a !== void 0 ? _a : [];
}
function getUniqueAttributes(buckets) {
    const attributes = getAllItemsByType(buckets, [ATTRIBUTE, DATE]);
    return uniqBy(attributes, (attribute) => attribute === null || attribute === void 0 ? void 0 : attribute.attribute);
}
export function getMeasuresFromMdObject(insight) {
    if (!insight) {
        return [];
    }
    return bucketsMeasures(insightBuckets(insight), isSimpleMeasure);
}
export function getAllMeasures(buckets) {
    return getAllItemsByType(buckets, [METRIC]);
}
export function getFirstValidMeasure(buckets) {
    const measures = getAllMeasures(buckets);
    const validMeasures = measures.filter(isValidMeasure);
    return validMeasures[0] || null;
}
function isValidMeasure(measure) {
    if (isArithmeticBucketItem(measure)) {
        return measure.operandLocalIdentifiers.every((operandLocalIdentifier) => operandLocalIdentifier !== null);
    }
    return true;
}
export function getFirstAttribute(buckets) {
    return getUniqueAttributes(buckets)[0] || null;
}
export function getMeasureItems(buckets) {
    const preference = [BucketNames.MEASURES, BucketNames.SECONDARY_MEASURES, BucketNames.TERTIARY_MEASURES];
    const preferredMeasures = preference.reduce((acc, pref) => {
        const prefBucketItems = getPreferredBucketItems(buckets, [pref], [METRIC]);
        acc.push(...prefBucketItems);
        return acc;
    }, []);
    // if no preferred items are found, return all available items
    if (isEmpty(preferredMeasures)) {
        return getAllMeasures(buckets);
    }
    return preferredMeasures;
}
export function getBucketItemsWithExcludeByType(buckets, excludedBucket, type) {
    const includedBuckets = buckets.filter((bucket) => !includes(excludedBucket, bucket.localIdentifier));
    return getAllItemsByType(includedBuckets, type);
}
export function getStackItems(buckets, itemTypes = [ATTRIBUTE]) {
    var _a;
    const preferredStacks = getPreferredBucket(buckets, [BucketNames.STACK, BucketNames.SEGMENT], itemTypes);
    return (_a = preferredStacks === null || preferredStacks === void 0 ? void 0 : preferredStacks.items) !== null && _a !== void 0 ? _a : [];
}
export function getAttributeToItems(buckets) {
    var _a;
    const preferredAttributeTos = getPreferredBucket(buckets, [BucketNames.ATTRIBUTE_TO], [ATTRIBUTE, DATE]);
    return (_a = preferredAttributeTos === null || preferredAttributeTos === void 0 ? void 0 : preferredAttributeTos.items) !== null && _a !== void 0 ? _a : [];
}
export function getAttributeFromItems(buckets) {
    var _a;
    const preferredAttributeTos = getPreferredBucket(buckets, [BucketNames.ATTRIBUTE_FROM], [ATTRIBUTE, DATE]);
    return (_a = preferredAttributeTos === null || preferredAttributeTos === void 0 ? void 0 : preferredAttributeTos.items) !== null && _a !== void 0 ? _a : [];
}
export function getViewItems(buckets, itemTypes = [ATTRIBUTE]) {
    var _a;
    const preferredStacks = getPreferredBucket(buckets, [BucketNames.VIEW], itemTypes);
    return (_a = preferredStacks === null || preferredStacks === void 0 ? void 0 : preferredStacks.items) !== null && _a !== void 0 ? _a : [];
}
export function getAttributeItems(buckets) {
    return getAllAttributeItemsWithPreference(buckets, [
        BucketNames.LOCATION,
        BucketNames.VIEW,
        BucketNames.TREND,
    ]);
}
export function getAttributeItemsWithoutStacks(buckets, itemTypes = [ATTRIBUTE]) {
    return getAttributeItems(buckets).filter((attribute) => {
        return !includes(getStackItems(buckets, itemTypes), attribute);
    });
}
export function getAllCategoriesAttributeItems(buckets) {
    const stackItemsWithDate = getStackItems(buckets, [ATTRIBUTE, DATE]);
    return getAttributeItems(buckets).filter((attribute) => {
        return !includes(stackItemsWithDate, attribute);
    });
}
export function getAllAttributeItems(buckets) {
    return getAllItemsByType(buckets, [ATTRIBUTE, DATE]);
}
function getAllMeasureItems(buckets) {
    return getAllItemsByType(buckets, [METRIC]);
}
// get all attributes from buckets, but items from preferred buckets are first
export function getAllAttributeItemsWithPreference(buckets, preference) {
    const preferredAttributes = preference.reduce((acc, pref) => {
        var _a;
        const prefBucket = getPreferredBucket(buckets, [pref], [ATTRIBUTE, DATE]);
        if ((_a = prefBucket === null || prefBucket === void 0 ? void 0 : prefBucket.items) === null || _a === void 0 ? void 0 : _a.length) {
            acc.push(...prefBucket.items);
        }
        return acc;
    }, []);
    const allBucketNames = buckets.map((bucket) => bucket === null || bucket === void 0 ? void 0 : bucket.localIdentifier);
    const otherBucketNames = allBucketNames.filter((bucketName) => !includes(preference, bucketName));
    const allOtherAttributes = otherBucketNames.reduce((attributes, bucketName) => {
        attributes.push(...getBucketItemsByType(buckets, bucketName, [ATTRIBUTE, DATE]));
        return attributes;
    }, []);
    return [...preferredAttributes, ...allOtherAttributes];
}
export function getDateItems(buckets) {
    return getAttributeItemsWithoutStacks(buckets).filter(isDateBucketItem);
}
export function getDateItemsWithMultipleDates(buckets) {
    return getAttributeItemsWithoutStacks(buckets, [ATTRIBUTE, DATE]).filter(isDateBucketItem);
}
export function getFistDateItemWithMultipleDates(buckets) {
    const dateItems = getDateItemsWithMultipleDates(buckets);
    return dateItems[0];
}
export function getFistDateItem(buckets) {
    const dateItems = getDateItems(buckets);
    return dateItems[0];
}
export function getMainDateItem(dateItems) {
    // first item for now, can be replaced by item matching the dimension of date filter in future
    return dateItems[0];
}
function hasItemsAboveLimit(bucket, itemsLimit) {
    const masterBucketItems = filterOutDerivedMeasures(bucket.items);
    return masterBucketItems.length > itemsLimit;
}
function applyItemsLimit(bucket, itemsLimit) {
    if (itemsLimit !== undefined && hasItemsAboveLimit(bucket, itemsLimit)) {
        const newBucket = cloneDeep(bucket);
        newBucket.items = newBucket.items.slice(0, itemsLimit);
        return newBucket;
    }
    return bucket;
}
function applyUiConfigOnBucket(bucket, bucketUiConfig) {
    return applyItemsLimit(bucket, bucketUiConfig === null || bucketUiConfig === void 0 ? void 0 : bucketUiConfig.itemsLimit);
}
export function applyUiConfig(referencePoint) {
    const buckets = referencePoint.buckets;
    const uiConfig = referencePoint.uiConfig.buckets;
    const newBuckets = buckets.map((bucket) => applyUiConfigOnBucket(bucket, uiConfig[bucket.localIdentifier]));
    set(referencePoint, "buckets", newBuckets);
    return referencePoint;
}
export function hasBucket(buckets, localIdentifier) {
    return buckets.some((bucket) => bucket.localIdentifier === localIdentifier);
}
export function findBucket(buckets, localIdentifier) {
    return buckets.find((bucket) => (bucket === null || bucket === void 0 ? void 0 : bucket.localIdentifier) === localIdentifier);
}
export function getBucketsByNames(buckets, names) {
    return buckets.filter((bucket) => includes(names, bucket === null || bucket === void 0 ? void 0 : bucket.localIdentifier));
}
export function getFirstMasterWithDerived(measureItems) {
    const masters = filterOutDerivedMeasures(measureItems);
    const chosenMaster = masters[0];
    return measureItems.filter((measureItem) => measureItem.masterLocalIdentifier === chosenMaster.localIdentifier ||
        measureItem === chosenMaster);
}
export function removeAllArithmeticMeasuresFromDerived(extendedReferencePoint) {
    const originalBuckets = cloneDeep(extendedReferencePoint.buckets);
    forEach(extendedReferencePoint.buckets, (bucket) => {
        bucket.items = filterOutArithmeticMeasuresFromDerived(bucket.items, originalBuckets);
    });
    return extendedReferencePoint;
}
export function removeAllDerivedMeasures(extendedReferencePoint) {
    forEach(extendedReferencePoint.buckets, (bucket) => {
        bucket.items = filterOutDerivedMeasures(bucket.items);
    });
    return extendedReferencePoint;
}
export function findMasterBucketItem(derivedBucketItem, bucketItems) {
    return bucketItems.find((item) => item.localIdentifier === derivedBucketItem.masterLocalIdentifier);
}
export function findMasterBucketItems(bucketItems) {
    return bucketItems.filter((measure) => !isDerivedBucketItem(measure));
}
export function findDerivedBucketItems(masterBucketItem, bucketItems) {
    return bucketItems.filter((measure) => measure.masterLocalIdentifier === masterBucketItem.localIdentifier);
}
export function findDerivedBucketItem(masterBucketItem, bucketItems) {
    return bucketItems.find((bucketItem) => bucketItem.masterLocalIdentifier === masterBucketItem.localIdentifier);
}
export function hasDerivedBucketItems(masterBucketItem, buckets) {
    return buckets.some((bucket) => bucket.items.some((bucketItem) => bucketItem.masterLocalIdentifier === masterBucketItem.localIdentifier));
}
export function getFilteredMeasuresForStackedCharts(buckets) {
    const hasStacks = getStackItems(buckets, [ATTRIBUTE, DATE]).length > 0;
    if (hasStacks) {
        const limitedBuckets = limitNumberOfMeasuresInBuckets(buckets, 1);
        return getMeasureItems(limitedBuckets);
    }
    return getMeasureItems(buckets);
}
export function noRowsAndHasOneMeasure(buckets) {
    const measuresBucket = bucketsFind(buckets, BucketNames.MEASURES);
    const measures = measuresBucket ? bucketItems(measuresBucket) : [];
    const rowsBucket = bucketsFind(buckets, BucketNames.VIEW);
    const rows = rowsBucket ? bucketItems(rowsBucket) : [];
    const hasOneMeasure = measures.length === 1;
    const hasRows = rows.length > 0;
    return Boolean(hasOneMeasure && !hasRows);
}
export function noColumnsAndHasOneMeasure(buckets) {
    const measuresBucket = bucketsFind(buckets, BucketNames.MEASURES);
    const measures = measuresBucket ? bucketItems(measuresBucket) : [];
    const columnsBucket = bucketsFind(buckets, BucketNames.STACK);
    const columns = columnsBucket ? bucketItems(columnsBucket) : [];
    const hasOneMeasure = measures.length === 1;
    const hasColumn = columns.length > 0;
    return hasOneMeasure && !hasColumn;
}
export function limitNumberOfMeasuresInBuckets(buckets, measuresLimitCount, tryToSelectDerivedWithMaster = false) {
    const allMeasures = getAllMeasures(buckets);
    let selectedMeasuresLocalIdentifiers = [];
    // try to select measures one per bucket
    buckets.forEach((bucket) => {
        const currentBucketMeasures = getAllBucketItemsByType(bucket, [METRIC]);
        if (currentBucketMeasures.length === 0) {
            return;
        }
        selectedMeasuresLocalIdentifiers = getLimitedMeasuresLocalIdentifiers(currentBucketMeasures, 1, allMeasures, measuresLimitCount, tryToSelectDerivedWithMaster, selectedMeasuresLocalIdentifiers);
    });
    // if it was not possible to select all measures one per bucket then limit them globally
    if (selectedMeasuresLocalIdentifiers.length < measuresLimitCount) {
        selectedMeasuresLocalIdentifiers = getLimitedMeasuresLocalIdentifiers(allMeasures, measuresLimitCount, allMeasures, measuresLimitCount, tryToSelectDerivedWithMaster, selectedMeasuresLocalIdentifiers);
    }
    return pruneBucketMeasureItems(buckets, selectedMeasuresLocalIdentifiers);
}
function getLimitedMeasuresLocalIdentifiers(measures, measuresLimitCount, allMeasures, allMeasuresLimitCount, tryToSelectDerivedWithMaster, alreadySelectedMeasures) {
    let selectedMeasures = alreadySelectedMeasures;
    // try to select measures one by one together with their dependencies
    measures.forEach((measure) => {
        if (selectedMeasures.length - alreadySelectedMeasures.length === measuresLimitCount) {
            return;
        }
        const measureDependencies = getDependenciesLocalIdentifiers(measure, allMeasures);
        const measureWithDependencies = [measure.localIdentifier, ...measureDependencies];
        if (tryToSelectDerivedWithMaster) {
            const derivedMeasures = getDerivedLocalIdentifiers(measure, allMeasures);
            const masterDerivedAndDependencies = [...measureWithDependencies, ...derivedMeasures];
            selectedMeasures = tryToSelectMeasures(masterDerivedAndDependencies, selectedMeasures, allMeasuresLimitCount);
        }
        selectedMeasures = tryToSelectMeasures(measureWithDependencies, selectedMeasures, allMeasuresLimitCount);
    });
    return selectedMeasures;
}
function getDerivedLocalIdentifiers(measure, allMeasures) {
    const derivedMeasures = findDerivedBucketItems(measure, allMeasures);
    return derivedMeasures.map((derivedMeasure) => derivedMeasure.localIdentifier);
}
function findMeasureByLocalIdentifier(localIdentifier, measures) {
    return measures.find((measure) => measure.localIdentifier === localIdentifier);
}
function getDependenciesLocalIdentifiers(measure, allMeasures) {
    const directDependencies = [];
    if (measure.masterLocalIdentifier) {
        directDependencies.push(measure.masterLocalIdentifier);
    }
    if (measure.operandLocalIdentifiers) {
        measure.operandLocalIdentifiers
            .filter((operandLocalIdentifier) => operandLocalIdentifier !== null)
            .forEach((operandLocalIdentifier) => {
            const operandMeasure = findMeasureByLocalIdentifier(operandLocalIdentifier, allMeasures);
            if (operandMeasure !== undefined) {
                directDependencies.push(operandLocalIdentifier);
            }
        });
    }
    const indirectDependencies = [];
    directDependencies.forEach((dependencyLocalIdentifier) => {
        const dependencyMeasure = findMeasureByLocalIdentifier(dependencyLocalIdentifier, allMeasures);
        const dependenciesOfDependency = getDependenciesLocalIdentifiers(dependencyMeasure, allMeasures);
        indirectDependencies.push(...dependenciesOfDependency);
    });
    return uniq([...directDependencies, ...indirectDependencies]);
}
function tryToSelectMeasures(measures, alreadySelectedMeasures, limit) {
    const measuresToBePlaced = without(measures, ...alreadySelectedMeasures);
    if (measuresToBePlaced.length <= limit - alreadySelectedMeasures.length) {
        return [...alreadySelectedMeasures, ...measuresToBePlaced];
    }
    return alreadySelectedMeasures;
}
function pruneBucketMeasureItems(buckets, measureLocalIdentifiersToBeKept) {
    return buckets.map((bucket) => {
        const prunedItems = bucket.items.filter((item) => measureLocalIdentifiersToBeKept.indexOf(item.localIdentifier) > -1 || item.type !== METRIC);
        return Object.assign(Object.assign({}, bucket), { items: prunedItems });
    });
}
function isShowOnSecondaryAxis(item) {
    var _a;
    return (_a = item === null || item === void 0 ? void 0 : item.showOnSecondaryAxis) !== null && _a !== void 0 ? _a : false;
}
export function setMeasuresShowOnSecondaryAxis(items, value) {
    return items.map((item) => (Object.assign(Object.assign({}, item), { [SHOW_ON_SECONDARY_AXIS]: value })));
}
export function removeShowOnSecondaryAxis(items) {
    return setMeasuresShowOnSecondaryAxis(items, null);
}
export function getAllMeasuresShowOnSecondaryAxis(buckets) {
    return getAllItemsByType(buckets, [METRIC]).filter(isShowOnSecondaryAxis);
}
export function getItemsLocalIdentifiers(items) {
    return items.map((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.localIdentifier) !== null && _a !== void 0 ? _a : ""; });
}
export const transformMeasureBuckets = (measureBucketItemsLimits, buckets) => {
    let unusedMeasures = [];
    const newBuckets = measureBucketItemsLimits.map(({ localIdentifier, itemsLimit }) => {
        const preferredBucketLocalIdentifiers = localIdentifier === BucketNames.MEASURES
            ? [BucketNames.MEASURES, BucketNames.SIZE]
            : localIdentifier === BucketNames.SECONDARY_MEASURES
                ? [BucketNames.SECONDARY_MEASURES, BucketNames.COLOR]
                : [localIdentifier];
        const preferredBucketItems = getPreferredBucketItems(buckets, preferredBucketLocalIdentifiers, [
            METRIC,
        ]);
        const measuresToBePlaced = preferredBucketItems.splice(0, itemsLimit);
        if (measuresToBePlaced.length === 0) {
            return {
                localIdentifier,
                items: unusedMeasures.splice(0, itemsLimit),
            };
        }
        unusedMeasures = [...unusedMeasures, ...preferredBucketItems];
        return {
            localIdentifier,
            items: measuresToBePlaced,
        };
    });
    return newBuckets.map((bucket, bucketIndex) => {
        const bucketItemsLimit = measureBucketItemsLimits[bucketIndex].itemsLimit;
        const freeSlotsCount = bucketItemsLimit - bucket.items.length;
        if (freeSlotsCount === 0) {
            return bucket;
        }
        return Object.assign(Object.assign({}, bucket), { items: [...bucket.items, ...unusedMeasures.splice(0, freeSlotsCount)] });
    });
};
export const hasSameDateDimension = (dateItem, referenceDateItem) => {
    if (isDateBucketItem(dateItem) && isDateBucketItem(referenceDateItem)) {
        return areObjRefsEqual(dateItem.dateDatasetRef, referenceDateItem.dateDatasetRef);
    }
    return false;
};
export const removeDivergentDateItems = (viewItems, mainDateItem) => {
    return viewItems.filter((item) => isNotDateBucketItem(item) || hasSameDateDimension(item, mainDateItem));
};
const getDateFilterRef = (filters) => {
    var _a;
    const dateFilter = (_a = filters === null || filters === void 0 ? void 0 : filters.items) === null || _a === void 0 ? void 0 : _a.find(isFiltersBucketItem);
    if (!dateFilter) {
        return undefined;
    }
    return dateFilter.dateDatasetRef;
};
export const isComparisonAvailable = (buckets, filters) => {
    const itemsFromBucket = buckets.reduce((acc, bucket) => {
        acc.push(...bucket.items);
        return acc;
    }, []);
    const bucketDateItems = itemsFromBucket.filter(isDateBucketItem);
    const areDateBucketItemsEmpty = bucketDateItems.length === 0;
    const dateFilterRef = getDateFilterRef(filters);
    if (areDateBucketItemsEmpty) {
        return true;
    }
    return bucketDateItems.some((bucketDateItem) => areObjRefsEqual(bucketDateItem.dateDatasetRef, dateFilterRef));
};
//# sourceMappingURL=bucketHelper.js.map