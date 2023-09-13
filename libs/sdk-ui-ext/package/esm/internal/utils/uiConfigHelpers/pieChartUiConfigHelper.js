// (C) 2019-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import forEach from "lodash/forEach";
import { BucketNames } from "@gooddata/sdk-ui";
import { UICONFIG, SUPPORTED, OPEN_AS_REPORT } from "../../constants/uiConfig";
import { BUCKETS } from "../../constants/bucket";
import { hasMoreThanOneCategory, hasMoreThanOneMasterMeasure } from "./../bucketRules";
import { setBucketTitles } from "./../bucketHelper";
import { getTranslation } from "./../translations";
import { hasColorMapping } from "../propertiesHelper";
import { messages } from "../../../locales";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const pieMeasuresIcon = "local:pie/bucket-title-measures.svg";
const pieViewIcon = "local:pie/bucket-title-view.svg";
function setPieChartBucketWarningMessages(referencePoint, intl) {
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
        if (!(bucketUiConfig === null || bucketUiConfig === void 0 ? void 0 : bucketUiConfig.canAddItems)) {
            let warningMessageId;
            if (bucket.localIdentifier === BucketNames.VIEW) {
                warningMessageId = messages.category.id;
            }
            if (warningMessageId) {
                const warningMessage = getTranslation(warningMessageId, intl);
                set(updatedUiConfig, [BUCKETS, localIdentifier, "warningMessage"], warningMessage);
            }
        }
    });
    return updatedUiConfig;
}
export function setPieChartUiConfig(referencePoint, intl, visualizationType) {
    var _a;
    const referencePointConfigured = cloneDeep(referencePoint);
    const buckets = (_a = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.buckets) !== null && _a !== void 0 ? _a : [];
    const measuresCanAddItems = !hasMoreThanOneCategory(buckets);
    const viewCanAddItems = !hasMoreThanOneMasterMeasure(buckets, BucketNames.MEASURES);
    set(referencePointConfigured, UICONFIG, setBucketTitles(referencePoint, visualizationType, intl));
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "canAddItems"], measuresCanAddItems);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.VIEW, "canAddItems"], viewCanAddItems);
    set(referencePointConfigured, UICONFIG, setPieChartBucketWarningMessages(referencePointConfigured, intl));
    set(referencePointConfigured, [UICONFIG, OPEN_AS_REPORT, SUPPORTED], !hasColorMapping(referencePoint.properties));
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.MEASURES, "icon"], pieMeasuresIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.VIEW, "icon"], pieViewIcon);
    return referencePointConfigured;
}
//# sourceMappingURL=pieChartUiConfigHelper.js.map