// (C) 2019-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import { BucketNames, OverTimeComparisonTypes } from "@gooddata/sdk-ui";
import { UICONFIG, SUPPORTED_COMPARISON_TYPES } from "../../constants/uiConfig.js";
import { BUCKETS } from "../../constants/bucket.js";
import { getMeasureItems } from "../bucketHelper.js";
import { getTranslation } from "../translations.js";
import { messages } from "../../../locales.js";
export function setColumnBarChartUiConfig(referencePoint, intl) {
    var _a;
    const referencePointConfigured = cloneDeep(referencePoint);
    set(referencePointConfigured, [UICONFIG, SUPPORTED_COMPARISON_TYPES], [OverTimeComparisonTypes.SAME_PERIOD_PREVIOUS_YEAR, OverTimeComparisonTypes.PREVIOUS_PERIOD]);
    const buckets = (_a = referencePointConfigured === null || referencePointConfigured === void 0 ? void 0 : referencePointConfigured.buckets) !== null && _a !== void 0 ? _a : [];
    const measures = getMeasureItems(buckets);
    if (measures.length > 1) {
        const warningMessage = getTranslation(messages.measureStack.id, intl);
        set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.STACK, "canAddItems"], false);
        set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.STACK, "warningMessage"], warningMessage);
    }
    return referencePointConfigured;
}
//# sourceMappingURL=columnBarChartUiConfigHelper.js.map