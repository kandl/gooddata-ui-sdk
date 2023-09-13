// (C) 2023 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import forEach from "lodash/forEach.js";
import { BucketNames } from "@gooddata/sdk-ui";
import { UICONFIG, SUPPORTED, OPEN_AS_REPORT } from "../../constants/uiConfig.js";
import { BUCKETS } from "../../constants/bucket.js";
import { hasMoreThanOneCategory, hasMoreThanOneMasterMeasure } from "../bucketRules.js";
import { setBucketTitles } from "../bucketHelper.js";
import { getTranslation } from "../translations.js";
import { hasColorMapping } from "../propertiesHelper.js";
import { messages } from "../../../locales.js";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const waterfallMeasuresIcon = "local:waterfall/bucket-title-measures.svg";
const waterfallViewIcon = "local:waterfall/bucket-title-view.svg";
function setWaterfallChartBucketWarningMessages(referencePoint, intl) {
    const buckets = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets;
    const updatedUiConfig = cloneDeep(referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.uiConfig);
    forEach(buckets, (bucket) => {
        var _a, _b;
        const localIdentifier = (_a = bucket === null || bucket === void 0 ? void 0 : bucket.localIdentifier) !== null && _a !== void 0 ? _a : "";
        const bucketUiConfig = (_b = updatedUiConfig === null || updatedUiConfig === void 0 ? void 0 : updatedUiConfig.buckets) === null || _b === void 0 ? void 0 : _b[localIdentifier];
        // skip disabled buckets
        if (!(bucketUiConfig === null || bucketUiConfig === void 0 ? void 0 : bucketUiConfig.enabled)) {
            return;
        }
        if (!(bucketUiConfig === null || bucketUiConfig === void 0 ? void 0 : bucketUiConfig.canAddItems) && bucket.localIdentifier === BucketNames.VIEW) {
            const warningMessage = getTranslation(messages.category.id, intl);
            set(updatedUiConfig, [BUCKETS, localIdentifier, "warningMessage"], warningMessage);
        }
    });
    return updatedUiConfig;
}
export function setWaterfallChartUiConfig(referencePoint, intl, visualizationType) {
    var _a;
    const referencePointConfigured = cloneDeep(referencePoint);
    const buckets = (_a = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.buckets) !== null && _a !== void 0 ? _a : [];
    const measuresCanAddItems = !hasMoreThanOneCategory(buckets);
    const viewCanAddItems = !hasMoreThanOneMasterMeasure(buckets, BucketNames.MEASURES);
    set(referencePointConfigured, UICONFIG, setBucketTitles(referencePoint, visualizationType, intl));
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "canAddItems"], measuresCanAddItems);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.VIEW, "canAddItems"], viewCanAddItems);
    set(referencePointConfigured, UICONFIG, setWaterfallChartBucketWarningMessages(referencePointConfigured, intl));
    set(referencePointConfigured, [UICONFIG, OPEN_AS_REPORT, SUPPORTED], !hasColorMapping(referencePoint.properties));
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "icon"], waterfallMeasuresIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.VIEW, "icon"], waterfallViewIcon);
    return referencePointConfigured;
}
export function isWaterfallColorHeaderItemKey(headerName) {
    return [
        messages.colorTotalLabel.id,
        messages.colorPositiveLabel.id,
        messages.colorNegativeLabel.id,
    ].includes(headerName);
}
export function getWaterfallTotalColumnName(totalName, intl) {
    return totalName !== null && totalName !== void 0 ? totalName : getTranslation(messages.colorTotalLabel.id, intl);
}
//# sourceMappingURL=waterfallChartUiConfigHelper.js.map