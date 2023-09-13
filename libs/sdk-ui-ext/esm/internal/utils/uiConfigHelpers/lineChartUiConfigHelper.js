// (C) 2019-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import forEach from "lodash/forEach.js";
import { BucketNames } from "@gooddata/sdk-ui";
import { UICONFIG, OPEN_AS_REPORT, SUPPORTED } from "../../constants/uiConfig.js";
import { ATTRIBUTE, BUCKETS, DATE } from "../../constants/bucket.js";
import { hasNoMeasures, hasOneMeasure, hasSomeSegmentByItems, hasNoStacksWithDate } from "../bucketRules.js";
import { getStackItems, setBucketTitles } from "../bucketHelper.js";
import { getTranslation } from "../translations.js";
import { hasColorMapping } from "../propertiesHelper.js";
import { getBucketItemsWarningMessage } from "./baseChartUiConfigHelper.js";
import { messages } from "../../../locales.js";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const lineMeasuresIcon = "local:line/bucket-title-measures.svg";
const lineTrendIcon = "local:line/bucket-title-trend.svg";
const lineSegmentIcon = "local:line/bucket-title-segment.svg";
function setLineChartBucketWarningMessages(referencePoint, intl) {
    const buckets = (referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) || [];
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
                warningMessage = getBucketItemsWarningMessage(messages.metricSegment.id, intl, stackItems);
            }
            else if (bucket.localIdentifier === BucketNames.SEGMENT) {
                warningMessage = getTranslation(messages.categorySegment.id, intl);
            }
            if (warningMessage) {
                set(updatedUiConfig, [BUCKETS, localIdentifier, "warningMessage"], warningMessage);
            }
        }
    });
    return updatedUiConfig;
}
export function setLineChartUiConfig(referencePoint, intl, visualizationType) {
    var _a;
    const referencePointConfigured = cloneDeep(referencePoint);
    const buckets = (_a = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.buckets) !== null && _a !== void 0 ? _a : [];
    const measuresCanAddItems = hasNoMeasures(buckets) || hasNoStacksWithDate(buckets);
    const segmentCanAddItems = hasSomeSegmentByItems(buckets) || hasNoMeasures(buckets) || hasOneMeasure(buckets);
    set(referencePointConfigured, UICONFIG, setBucketTitles(referencePoint, visualizationType, intl));
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "canAddItems"], measuresCanAddItems);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.TREND, "canAddItems"], true);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.SEGMENT, "canAddItems"], segmentCanAddItems);
    set(referencePointConfigured, UICONFIG, setLineChartBucketWarningMessages(referencePointConfigured, intl));
    set(referencePointConfigured, [UICONFIG, OPEN_AS_REPORT, SUPPORTED], !hasColorMapping(referencePoint.properties));
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "icon"], lineMeasuresIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.TREND, "icon"], lineTrendIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.SEGMENT, "icon"], lineSegmentIcon);
    return referencePointConfigured;
}
//# sourceMappingURL=lineChartUiConfigHelper.js.map