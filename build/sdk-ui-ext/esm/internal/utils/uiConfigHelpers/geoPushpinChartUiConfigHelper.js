import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import { UICONFIG, OPEN_AS_REPORT, SUPPORTED } from "../../constants/uiConfig.js";
import { BUCKETS } from "../../constants/bucket.js";
import { setBucketTitles } from "../bucketHelper.js";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const geoPushPinBucketLocationIcon = "local:geoPushpin/bucket-title-location-icon.svg";
const geoPushPinBucketSizeIcon = "local:geoPushpin/bucket-title-size-icon.svg";
const geoPushPinBucketColorIcon = "local:geoPushpin/bucket-title-color-icon.svg";
const geoPushPinBucketSegmentIcon = "local:geoPushpin/bucket-title-segment-icon.svg";
import { BucketNames } from "@gooddata/sdk-ui";
export function setGeoPushpinUiConfig(referencePoint, intl, visualizationType) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const referencePointConfigured = cloneDeep(referencePoint);
    set(referencePointConfigured, UICONFIG, setBucketTitles(referencePoint, visualizationType, intl));
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.LOCATION, "icon"], geoPushPinBucketLocationIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.SIZE, "icon"], geoPushPinBucketSizeIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.COLOR, "icon"], geoPushPinBucketColorIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.SEGMENT, "icon"], geoPushPinBucketSegmentIcon);
    // overide base config
    set(referencePointConfigured, [UICONFIG, OPEN_AS_REPORT, SUPPORTED], false);
    // only apply related bucket uiConfig
    set(referencePointConfigured, [UICONFIG, BUCKETS], {
        [BucketNames.LOCATION]: (_b = (_a = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.uiConfig) === null || _a === void 0 ? void 0 : _a.buckets) === null || _b === void 0 ? void 0 : _b[BucketNames.LOCATION],
        [BucketNames.SIZE]: (_d = (_c = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.uiConfig) === null || _c === void 0 ? void 0 : _c.buckets) === null || _d === void 0 ? void 0 : _d[BucketNames.SIZE],
        [BucketNames.COLOR]: (_f = (_e = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.uiConfig) === null || _e === void 0 ? void 0 : _e.buckets) === null || _f === void 0 ? void 0 : _f[BucketNames.COLOR],
        [BucketNames.SEGMENT]: (_h = (_g = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.uiConfig) === null || _g === void 0 ? void 0 : _g.buckets) === null || _h === void 0 ? void 0 : _h[BucketNames.SEGMENT],
        filters: (_k = (_j = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.uiConfig) === null || _j === void 0 ? void 0 : _j.buckets) === null || _k === void 0 ? void 0 : _k.filters,
    });
    return referencePointConfigured;
}
//# sourceMappingURL=geoPushpinChartUiConfigHelper.js.map