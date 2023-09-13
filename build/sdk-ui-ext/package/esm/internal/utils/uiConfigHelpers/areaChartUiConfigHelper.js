// (C) 2019-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { BucketNames } from "@gooddata/sdk-ui";
import { UICONFIG } from "../../constants/uiConfig";
import { ATTRIBUTE, BUCKETS, DATE } from "../../constants/bucket";
import { getMasterMeasuresCount, hasNoStacksWithDate } from "../bucketRules";
import { getItemsCount, getStackItems, getViewItems, setBucketTitles } from "../bucketHelper";
import { getBucketItemsWarningMessage } from "./baseChartUiConfigHelper";
import { getTranslation } from "../translations";
import { messages } from "../../../locales";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const areaMeasuresIcon = "local:area/bucket-title-measures.svg";
const areaViewIcon = "local:area/bucket-title-view.svg";
const areaStackIcon = "local:area/bucket-title-stack.svg";
function getWarningMessageForMeasuresBucket(intl, categoriesCount, stackItems, viewItems) {
    return categoriesCount > 1
        ? getBucketItemsWarningMessage(messages.metricView.id, intl, viewItems)
        : getBucketItemsWarningMessage(messages.metricStack.id, intl, stackItems);
}
function getWarningMessageForViewByBucket(intl, measuresCount, stackItems) {
    return measuresCount > 1
        ? getTranslation(messages.categoryView.id, intl)
        : getBucketItemsWarningMessage(messages.viewStack.id, intl, stackItems);
}
function getWarningMessageForStackByBucket(intl, categoriesCount) {
    return categoriesCount > 1
        ? getTranslation(messages.stackView.id, intl)
        : getTranslation(messages.measureStack.id, intl);
}
function setAreaChartBucketWarningMessages(referencePoint, messageConfig) {
    var _a;
    const buckets = (_a = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _a !== void 0 ? _a : [];
    const updatedUiConfig = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.uiConfig;
    return buckets.reduce((uiConfig, bucket) => {
        var _a, _b, _c;
        const localIdentifier = (_a = bucket === null || bucket === void 0 ? void 0 : bucket.localIdentifier) !== null && _a !== void 0 ? _a : "";
        const bucketUiConfig = (_b = uiConfig === null || uiConfig === void 0 ? void 0 : uiConfig.buckets) === null || _b === void 0 ? void 0 : _b[localIdentifier];
        const isEnabled = (_c = bucketUiConfig === null || bucketUiConfig === void 0 ? void 0 : bucketUiConfig.enabled) !== null && _c !== void 0 ? _c : false;
        const canAddItem = bucketUiConfig === null || bucketUiConfig === void 0 ? void 0 : bucketUiConfig.canAddItems;
        // skip disabled buckets
        if (canAddItem || !isEnabled) {
            return uiConfig;
        }
        const warningMessage = messageConfig[localIdentifier];
        return set(uiConfig, [BUCKETS, localIdentifier, "warningMessage"], warningMessage);
    }, updatedUiConfig);
}
export function setAreaChartUiConfig(referencePoint, intl, visualizationType) {
    var _a;
    const referencePointConfigured = cloneDeep(referencePoint);
    const buckets = (_a = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.buckets) !== null && _a !== void 0 ? _a : [];
    const categoriesCount = getItemsCount(buckets, BucketNames.VIEW);
    const stackItems = getStackItems(buckets, [ATTRIBUTE, DATE]);
    const viewItems = getViewItems(buckets, [ATTRIBUTE, DATE]);
    const measuresCount = getMasterMeasuresCount(buckets, BucketNames.MEASURES);
    const isStackEmpty = hasNoStacksWithDate(buckets);
    const canAddMeasuresItems = !measuresCount || (categoriesCount <= 1 && isStackEmpty);
    const canAddViewItems = !categoriesCount || (measuresCount <= 1 && isStackEmpty);
    const canAddStackItems = categoriesCount <= 1 && measuresCount <= 1;
    const messageConfig = {
        [BucketNames.MEASURES]: getWarningMessageForMeasuresBucket(intl, categoriesCount, stackItems, viewItems),
        [BucketNames.VIEW]: getWarningMessageForViewByBucket(intl, measuresCount, stackItems),
        [BucketNames.STACK]: getWarningMessageForStackByBucket(intl, categoriesCount),
    };
    set(referencePointConfigured, UICONFIG, setBucketTitles(referencePoint, visualizationType, intl));
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "canAddItems"], canAddMeasuresItems);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.VIEW, "canAddItems"], canAddViewItems);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.STACK, "canAddItems"], canAddStackItems);
    setAreaChartBucketWarningMessages(referencePointConfigured, messageConfig);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "icon"], areaMeasuresIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.VIEW, "icon"], areaViewIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.STACK, "icon"], areaStackIcon);
    return referencePointConfigured;
}
//# sourceMappingURL=areaChartUiConfigHelper.js.map