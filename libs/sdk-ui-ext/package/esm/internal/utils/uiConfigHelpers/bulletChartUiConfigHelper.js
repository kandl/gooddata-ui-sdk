// (C) 2019-2022 GoodData Corporation
import { BucketNames } from "@gooddata/sdk-ui";
import cloneDeep from "lodash/cloneDeep";
import { UICONFIG } from "../../constants/uiConfig";
import { setBucketTitles, getItemsCount } from "./../bucketHelper";
import { getTranslation } from "../translations";
import { messages } from "../../../locales";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const bulletPrimaryMeasureIcon = "local:bullet/bucket-title-primary.svg";
const bulletTargetMeasureIcon = "local:bullet/bucket-title-target.svg";
const bulletComparativeMeasureIcon = "local:bullet/bucket-title-comparative.svg";
const bulletViewByIcon = "local:bullet/bucket-title-view-by.svg";
export function getBulletChartUiConfig(referencePoint, intl, visualizationType) {
    var _a;
    const referencePointConfigured = cloneDeep(referencePoint);
    referencePointConfigured[UICONFIG] = setBucketTitles(referencePointConfigured, visualizationType, intl);
    const buckets = (_a = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets) !== null && _a !== void 0 ? _a : [];
    const primaryMeasuresCount = getItemsCount(buckets, BucketNames.MEASURES);
    const secondaryMeasuresCount = getItemsCount(buckets, BucketNames.SECONDARY_MEASURES);
    const tertiaryMeasuresCount = getItemsCount(buckets, BucketNames.TERTIARY_MEASURES);
    referencePointConfigured[UICONFIG].buckets[BucketNames.MEASURES] = Object.assign(Object.assign({}, referencePointConfigured[UICONFIG].buckets[BucketNames.MEASURES]), { canAddItems: primaryMeasuresCount < 1, icon: bulletPrimaryMeasureIcon });
    referencePointConfigured[UICONFIG].buckets[BucketNames.SECONDARY_MEASURES] = Object.assign(Object.assign({}, referencePointConfigured[UICONFIG].buckets[BucketNames.SECONDARY_MEASURES]), { canAddItems: secondaryMeasuresCount < 1, icon: bulletTargetMeasureIcon });
    referencePointConfigured[UICONFIG].buckets[BucketNames.TERTIARY_MEASURES] = Object.assign(Object.assign({}, referencePointConfigured[UICONFIG].buckets[BucketNames.TERTIARY_MEASURES]), { canAddItems: tertiaryMeasuresCount < 1, icon: bulletComparativeMeasureIcon });
    referencePointConfigured[UICONFIG].buckets[BucketNames.VIEW] = Object.assign(Object.assign({}, referencePointConfigured[UICONFIG].buckets[BucketNames.VIEW]), { icon: bulletViewByIcon });
    if (primaryMeasuresCount === 0 && (secondaryMeasuresCount !== 0 || tertiaryMeasuresCount !== 0)) {
        referencePointConfigured[UICONFIG].customError = {
            heading: getTranslation(messages.heading.id, intl),
            text: getTranslation(messages.text.id, intl),
        };
    }
    return referencePointConfigured;
}
//# sourceMappingURL=bulletChartUiConfigHelper.js.map