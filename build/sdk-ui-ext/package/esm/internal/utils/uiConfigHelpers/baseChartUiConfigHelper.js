// (C) 2019-2023 GoodData Corporation
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import forEach from "lodash/forEach";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { UICONFIG, RECOMMENDATIONS, OPEN_AS_REPORT, SUPPORTED } from "../../constants/uiConfig";
import { ATTRIBUTE, BUCKETS, DATE } from "../../constants/bucket";
import { messages } from "../../../locales";
import { comparisonAndTrendingRecommendationEnabled, overTimeComparisonRecommendationEnabled, hasNoMeasures, hasMoreThanOneMasterMeasure, percentRecommendationEnabled, previousPeriodRecommendationEnabled, hasNoStacksWithDate, } from "./../bucketRules";
import { getStackItems, isDateBucketItem, setBucketTitles } from "./../bucketHelper";
import { getTranslation } from "./../translations";
import { hasColorMapping } from "./../propertiesHelper";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const columnMeasuresIcon = "local:column/bucket-title-measures.svg";
const columnViewIcon = "local:column/bucket-title-view.svg";
const columnStackIcon = "local:column/bucket-title-stack.svg";
const barMeasuresIcon = "local:bar/bucket-title-measures.svg";
const barViewIcon = "local:bar/bucket-title-view.svg";
const barStackIcon = "local:bar/bucket-title-stack.svg";
function setBaseChartBucketWarningMessages(referencePoint, intl) {
    var _a;
    const buckets = (_a = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _a !== void 0 ? _a : [];
    const updatedUiConfig = cloneDeep(referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.uiConfig);
    const stackItems = getStackItems(buckets, [ATTRIBUTE, DATE]);
    forEach(buckets, (bucket) => {
        var _a, _b;
        const localIdentifier = (_a = bucket === null || bucket === void 0 ? void 0 : bucket.localIdentifier) !== null && _a !== void 0 ? _a : "";
        const bucketUiConfig = (_b = updatedUiConfig === null || updatedUiConfig === void 0 ? void 0 : updatedUiConfig.buckets) === null || _b === void 0 ? void 0 : _b[localIdentifier];
        // skip disabled buckets
        if (!(bucketUiConfig === null || bucketUiConfig === void 0 ? void 0 : bucketUiConfig.enabled)) {
            return;
        }
        if (!(bucketUiConfig === null || bucketUiConfig === void 0 ? void 0 : bucketUiConfig.canAddItems)) {
            let warningMessage;
            if (bucket.localIdentifier === BucketNames.MEASURES) {
                warningMessage = getBucketItemsWarningMessage(messages.metricStack.id, intl, stackItems);
            }
            else if (bucket.localIdentifier === BucketNames.STACK) {
                warningMessage = getTranslation(messages.categoryStack.id, intl);
            }
            if (warningMessage) {
                set(updatedUiConfig, [BUCKETS, localIdentifier, "warningMessage"], warningMessage);
            }
        }
    });
    return updatedUiConfig;
}
export function setBaseChartUiConfig(referencePoint, intl, visualizationType) {
    var _a, _b, _c, _d;
    const referencePointConfigured = cloneDeep(referencePoint);
    const buckets = (_a = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.buckets) !== null && _a !== void 0 ? _a : [];
    const measuresCanAddItems = hasNoMeasures(buckets) || hasNoStacksWithDate(buckets);
    const stackCanAddItems = !hasMoreThanOneMasterMeasure(buckets, BucketNames.MEASURES);
    set(referencePointConfigured, [UICONFIG], setBucketTitles(referencePoint, visualizationType, intl));
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "canAddItems"], measuresCanAddItems);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.VIEW, "canAddItems"], true);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.STACK, "canAddItems"], stackCanAddItems);
    set(referencePointConfigured, [UICONFIG, OPEN_AS_REPORT, SUPPORTED], !hasColorMapping(referencePointConfigured.properties));
    const iconsMap = {
        column: {
            [BucketNames.MEASURES]: columnMeasuresIcon,
            [BucketNames.VIEW]: columnViewIcon,
            [BucketNames.STACK]: columnStackIcon,
        },
        bar: {
            [BucketNames.MEASURES]: barMeasuresIcon,
            [BucketNames.VIEW]: barViewIcon,
            [BucketNames.STACK]: barStackIcon,
        },
    };
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "icon"], (_b = iconsMap[visualizationType]) === null || _b === void 0 ? void 0 : _b[BucketNames.MEASURES]);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.VIEW, "icon"], (_c = iconsMap[visualizationType]) === null || _c === void 0 ? void 0 : _c[BucketNames.VIEW]);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.STACK, "icon"], (_d = iconsMap[visualizationType]) === null || _d === void 0 ? void 0 : _d[BucketNames.STACK]);
    set(referencePointConfigured, UICONFIG, setBaseChartBucketWarningMessages(referencePointConfigured, intl));
    return referencePointConfigured;
}
export function setBaseChartUiConfigRecommendations(referencePoint, visualizationType, weekFiltersEnabled) {
    if (visualizationType === VisualizationTypes.COLUMN) {
        const newReferencePoint = cloneDeep(referencePoint);
        const buckets = newReferencePoint === null || newReferencePoint === void 0 ? void 0 : newReferencePoint.buckets;
        const filters = newReferencePoint === null || newReferencePoint === void 0 ? void 0 : newReferencePoint.filters;
        const percentEnabled = percentRecommendationEnabled(buckets, filters);
        const comparisonAndTrending = comparisonAndTrendingRecommendationEnabled(buckets);
        const overTimeComparison = overTimeComparisonRecommendationEnabled(newReferencePoint, weekFiltersEnabled);
        const previousPeriod = previousPeriodRecommendationEnabled(buckets);
        set(newReferencePoint, [UICONFIG, RECOMMENDATIONS, "percent"], percentEnabled);
        set(newReferencePoint, [UICONFIG, RECOMMENDATIONS, "comparison"], comparisonAndTrending);
        set(newReferencePoint, [UICONFIG, RECOMMENDATIONS, "trending"], comparisonAndTrending);
        set(newReferencePoint, [UICONFIG, RECOMMENDATIONS, "overTimeComparison"], overTimeComparison);
        set(newReferencePoint, [UICONFIG, RECOMMENDATIONS, "previousPeriod"], previousPeriod);
        return newReferencePoint;
    }
    return referencePoint;
}
function getBucketItemsIcons(bucket, intl) {
    const attributeUsed = bucket.find((x) => !isDateBucketItem(x));
    const dateUsed = bucket.find((x) => isDateBucketItem(x));
    const orString = intl.formatMessage(messages.or);
    if (attributeUsed && dateUsed) {
        return `<span class="attr-field-icon" /> ${orString} <span class="date-field-icon" />`;
    }
    else if (attributeUsed) {
        return '<span class="attr-field-icon" />';
    }
    else {
        return '<span class="date-field-icon" />';
    }
}
export function getBucketItemsWarningMessage(messageId, intl, bucketItems) {
    const icons = getBucketItemsIcons(bucketItems, intl);
    return getTranslation(messageId, intl, {
        icons,
    });
}
//# sourceMappingURL=baseChartUiConfigHelper.js.map