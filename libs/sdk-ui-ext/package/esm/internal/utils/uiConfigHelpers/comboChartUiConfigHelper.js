// (C) 2019-2023 GoodData Corporation
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { isLineChart } from "@gooddata/sdk-ui-charts";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { BUCKETS } from "../../constants/bucket";
import { getTranslation } from "../translations";
import { getBucketsByNames, setBucketTitles } from "../bucketHelper";
import { UICONFIG } from "../../constants/uiConfig";
import { messages } from "../../../locales";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const columnMeasureIcon = "local:combo/bucket-title-measures-column.svg";
const lineMeasureIcon = "local:combo/bucket-title-measures-line.svg";
const areaMeasureIcon = "local:combo/bucket-title-measures-area.svg";
const columnLineIcon = "local:combo/bucket-title-view-column-line.svg";
const columnAreaIcon = "local:combo/bucket-title-view-column-area.svg";
const lineAreaIcon = "local:combo/bucket-title-view-line-area.svg";
const columnViewIcon = "local:column/bucket-title-view.svg";
const lineViewIcon = "local:combo/bucket-title-view-line-line.svg";
const areaViewIcon = "local:area/bucket-title-view.svg";
const { COLUMN, LINE, AREA } = VisualizationTypes;
const MEASURE_BUCKET_ICONS = {
    [COLUMN]: columnMeasureIcon,
    [LINE]: lineMeasureIcon,
    [AREA]: areaMeasureIcon,
};
const VIEW_BY_ICONS = {
    [`${COLUMN}-${COLUMN}`]: columnViewIcon,
    [`${COLUMN}-${LINE}`]: columnLineIcon,
    [`${COLUMN}-${AREA}`]: columnAreaIcon,
    [`${LINE}-${COLUMN}`]: columnLineIcon,
    [`${LINE}-${LINE}`]: lineViewIcon,
    [`${LINE}-${AREA}`]: lineAreaIcon,
    [`${AREA}-${COLUMN}`]: columnAreaIcon,
    [`${AREA}-${LINE}`]: lineAreaIcon,
    [`${AREA}-${AREA}`]: areaViewIcon,
};
function setCanStackInPercent(uiConfig, secondaryChartType, isDualAxis) {
    const canStackInPercent = !(isDualAxis === false && isLineChart(secondaryChartType));
    set(uiConfig, "optionalStacking.canStackInPercent", canStackInPercent);
}
export function setComboChartUiConfig(referencePoint, intl, visualizationType) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const referencePointConfigured = cloneDeep(referencePoint);
    const measureBuckets = getBucketsByNames(referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.buckets, [
        BucketNames.MEASURES,
        BucketNames.SECONDARY_MEASURES,
    ]);
    const chartTypes = [
        (_c = (_b = (_a = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b.primaryChartType) !== null && _c !== void 0 ? _c : COLUMN,
        (_f = (_e = (_d = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.properties) === null || _d === void 0 ? void 0 : _d.controls) === null || _e === void 0 ? void 0 : _e.secondaryChartType) !== null && _f !== void 0 ? _f : LINE,
    ];
    const updatedUiConfig = setBucketTitles(referencePointConfigured, visualizationType, intl);
    const isDualAxis = (_j = (_h = (_g = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.properties) === null || _g === void 0 ? void 0 : _g.controls) === null || _h === void 0 ? void 0 : _h.dualAxis) !== null && _j !== void 0 ? _j : true;
    setCanStackInPercent(updatedUiConfig, chartTypes[1], isDualAxis);
    measureBuckets.forEach((bucket, index) => {
        var _a;
        const type = chartTypes[index];
        const localIdentifier = (_a = bucket === null || bucket === void 0 ? void 0 : bucket.localIdentifier) !== null && _a !== void 0 ? _a : "";
        const subtitle = getTranslation(messages[type].id, intl);
        set(updatedUiConfig, [BUCKETS, localIdentifier, "subtitle"], subtitle);
        set(updatedUiConfig, [BUCKETS, localIdentifier, "icon"], MEASURE_BUCKET_ICONS[type]);
    });
    set(updatedUiConfig, [BUCKETS, BucketNames.VIEW, "icon"], VIEW_BY_ICONS[chartTypes.join("-")]);
    set(referencePointConfigured, UICONFIG, updatedUiConfig);
    return referencePointConfigured;
}
//# sourceMappingURL=comboChartUiConfigHelper.js.map