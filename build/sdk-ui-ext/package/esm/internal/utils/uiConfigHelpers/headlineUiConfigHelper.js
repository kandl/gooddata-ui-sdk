// (C) 2019-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { DEFAULT_HEADLINE_UICONFIG } from "../../constants/uiConfig";
import { BUCKETS } from "../../constants/bucket";
import { hasNoMeasures, hasNoSecondaryMeasures } from "./../bucketRules";
import { setBucketTitles, getItemsCount } from "./../bucketHelper";
import { getTranslation } from "./../translations";
import { messages } from "../../../locales";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const headlineMeasuresIcon = "local:headline/bucket-title-measures.svg";
const headlineSecondaryMeasuresIcon = "local:headline/bucket-title-secondary-measures.svg";
export function getDefaultHeadlineUiConfig() {
    return cloneDeep(DEFAULT_HEADLINE_UICONFIG);
}
export function getHeadlineUiConfig(referencePoint, intl) {
    var _a;
    let uiConfig = getDefaultHeadlineUiConfig();
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
    return uiConfig;
}
//# sourceMappingURL=headlineUiConfigHelper.js.map