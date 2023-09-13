// (C) 2019-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { bucketMeasure, bucketMeasures, insightBucket, isPoPMeasure, isPreviousPeriodMeasure, } from "@gooddata/sdk-model";
import { CalculateAs, DEFAULT_COMPARISON_PALETTE, updateConfigWithSettings, } from "@gooddata/sdk-ui-charts";
import { DEFAULT_HEADLINE_UICONFIG } from "../../constants/uiConfig.js";
import { BUCKETS } from "../../constants/bucket.js";
import { hasNoMeasures, hasNoSecondaryMeasures, noDerivedMeasurePresent } from "../bucketRules.js";
import { getItemsCount, setBucketTitles } from "../bucketHelper.js";
import { getTranslation } from "../translations.js";
import { messages } from "../../../locales.js";
import { HEADLINE_DEFAULT_CONTROL_PROPERTIES } from "../../constants/supportedProperties.js";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const headlineMeasuresIcon = "local:headline/bucket-title-measures.svg";
const headlineSecondaryMeasuresIcon = "local:headline/bucket-title-secondary-measures.svg";
export function getDefaultHeadlineUiConfig(settings) {
    const uiConfig = cloneDeep(DEFAULT_HEADLINE_UICONFIG);
    if (settings === null || settings === void 0 ? void 0 : settings.enableNewHeadline) {
        set(uiConfig, [BUCKETS, BucketNames.SECONDARY_MEASURES, "itemsLimit"], 2);
    }
    return uiConfig;
}
export function getHeadlineUiConfig(referencePoint, intl, settings) {
    var _a;
    let uiConfig = getDefaultHeadlineUiConfig(settings);
    const buckets = (_a = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _a !== void 0 ? _a : [];
    const viewCanAddPrimaryItems = hasNoMeasures(buckets);
    const viewCanAddSecondaryItems = hasNoSecondaryMeasures(buckets);
    uiConfig = setBucketTitles(Object.assign(Object.assign({}, referencePoint), { uiConfig }), VisualizationTypes.HEADLINE, intl);
    set(uiConfig, [BUCKETS, BucketNames.MEASURES, "canAddItems"], viewCanAddPrimaryItems);
    set(uiConfig, [BUCKETS, BucketNames.SECONDARY_MEASURES, "canAddItems"], viewCanAddSecondaryItems);
    set(uiConfig, [BUCKETS, BucketNames.MEASURES, "icon"], headlineMeasuresIcon);
    set(uiConfig, [BUCKETS, BucketNames.SECONDARY_MEASURES, "icon"], headlineSecondaryMeasuresIcon);
    const primaryMeasuresCount = getItemsCount(buckets, BucketNames.MEASURES);
    const secondaryMeasuresCount = getItemsCount(buckets, BucketNames.SECONDARY_MEASURES);
    if (primaryMeasuresCount === 0 && secondaryMeasuresCount !== 0) {
        uiConfig.customError = {
            heading: getTranslation(messages.heading.id, intl),
            text: getTranslation(messages.text.id, intl),
        };
    }
    if (settings === null || settings === void 0 ? void 0 : settings.enableNewHeadline) {
        set(uiConfig, [BUCKETS, BucketNames.SECONDARY_MEASURES, "canAddItems"], true);
        set(uiConfig, [BUCKETS, BucketNames.SECONDARY_MEASURES, "itemsLimit"], noDerivedMeasurePresent(buckets) ? 2 : 1);
        set(uiConfig, [BUCKETS, BucketNames.SECONDARY_MEASURES, "allowsReordering"], true);
    }
    return uiConfig;
}
export function buildHeadlineVisualizationConfig(visualizationProperties, settings, options) {
    const { config, customVisualizationConfig } = options;
    const supportedProperties = getHeadlineSupportedProperties(visualizationProperties);
    const fullConfig = Object.assign(Object.assign(Object.assign({}, config), supportedProperties.controls), { colorPalette: DEFAULT_COMPARISON_PALETTE });
    return updateConfigWithSettings(Object.assign(Object.assign({}, fullConfig), customVisualizationConfig), settings);
}
export function getHeadlineSupportedProperties(visualizationProperties) {
    var _a;
    const comparison = Object.assign(Object.assign({}, HEADLINE_DEFAULT_CONTROL_PROPERTIES.comparison), (((_a = visualizationProperties === null || visualizationProperties === void 0 ? void 0 : visualizationProperties.controls) === null || _a === void 0 ? void 0 : _a.comparison) || {}));
    return Object.assign(Object.assign({}, visualizationProperties), { controls: Object.assign(Object.assign({}, visualizationProperties.controls), { comparison }) });
}
export function isComparisonEnabled(insight) {
    const primaryMeasure = insightPrimaryMeasure(insight);
    const secondaryMeasures = insightSecondaryMeasures(insight);
    return primaryMeasure && (secondaryMeasures === null || secondaryMeasures === void 0 ? void 0 : secondaryMeasures.length) === 1;
}
export function getComparisonDefaultCalculationType(insight) {
    const [secondaryMeasure] = insightSecondaryMeasures(insight);
    const secondaryIsDerivedMeasure = isPoPMeasure(secondaryMeasure) || isPreviousPeriodMeasure(secondaryMeasure);
    return secondaryIsDerivedMeasure ? CalculateAs.CHANGE : CalculateAs.RATIO;
}
function insightPrimaryMeasure(insight) {
    const primaryBucket = insightBucket(insight, BucketNames.MEASURES);
    return primaryBucket && bucketMeasure(primaryBucket);
}
function insightSecondaryMeasures(insight) {
    const secondaryBucket = insightBucket(insight, BucketNames.SECONDARY_MEASURES);
    return (secondaryBucket && bucketMeasures(secondaryBucket)) || [];
}
//# sourceMappingURL=headlineUiConfigHelper.js.map