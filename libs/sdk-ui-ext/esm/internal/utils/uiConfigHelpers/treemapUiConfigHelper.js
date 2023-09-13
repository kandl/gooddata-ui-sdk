// (C) 2019-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import forEach from "lodash/forEach.js";
import { BucketNames } from "@gooddata/sdk-ui";
import { UICONFIG } from "../../constants/uiConfig.js";
import { ATTRIBUTE, BUCKETS, DATE } from "../../constants/bucket.js";
import { hasMoreThanOneMasterMeasure, hasNoMeasures, hasOneCategory } from "../bucketRules.js";
import { getViewItems, setBucketTitles } from "../bucketHelper.js";
import { getTranslation } from "../translations.js";
import { getBucketItemsWarningMessage } from "./baseChartUiConfigHelper.js";
import { messages } from "../../../locales.js";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const treemapMeasuresIcon = "local:treemap/bucket-title-measures.svg";
const treemapViewIcon = "local:treemap/bucket-title-view.svg";
const treemapSegmentIcon = "local:treemap/bucket-title-segment.svg";
function setTreemapBucketWarningMessages(referencePoint, intl) {
    const buckets = (referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) || [];
    const updatedUiConfig = cloneDeep(referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.uiConfig);
    const viewItems = getViewItems(buckets, [ATTRIBUTE, DATE]);
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
                warningMessage = getBucketItemsWarningMessage(messages.metricView.id, intl, viewItems);
            }
            if (bucket.localIdentifier === BucketNames.VIEW) {
                warningMessage = getTranslation(messages.category.id, intl);
            }
            if (bucket.localIdentifier === BucketNames.SEGMENT) {
                warningMessage = getTranslation(messages.categorySegment.id, intl);
            }
            if (warningMessage) {
                set(updatedUiConfig, [BUCKETS, localIdentifier, "warningMessage"], warningMessage);
            }
        }
    });
    return updatedUiConfig;
}
export function setTreemapUiConfig(referencePoint, intl, visualizationType) {
    var _a;
    const referencePointConfigured = cloneDeep(referencePoint);
    const buckets = (_a = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.buckets) !== null && _a !== void 0 ? _a : [];
    const measuresCanAddItems = !hasOneCategory(buckets) || hasNoMeasures(buckets);
    const viewCanAddItems = !hasMoreThanOneMasterMeasure(buckets, BucketNames.MEASURES);
    set(referencePointConfigured, UICONFIG, setBucketTitles(referencePoint, visualizationType, intl));
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "canAddItems"], measuresCanAddItems);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.VIEW, "canAddItems"], viewCanAddItems);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.SEGMENT, "canAddItems"], true);
    set(referencePointConfigured, UICONFIG, setTreemapBucketWarningMessages(referencePointConfigured, intl));
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "icon"], treemapMeasuresIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.VIEW, "icon"], treemapViewIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.SEGMENT, "icon"], treemapSegmentIcon);
    return referencePointConfigured;
}
//# sourceMappingURL=treemapUiConfigHelper.js.map