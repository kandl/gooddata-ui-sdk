// (C) 2019-2022 GoodData Corporation
import set from "lodash/set";
import { BucketNames, OverTimeComparisonTypes } from "@gooddata/sdk-ui";
import { UICONFIG, MAX_TABLE_CATEGORIES_COUNT, measuresBase, viewBase, defaultFilters, defaultRootUiConfigProperties, disabledOpenAsReportConfig, } from "../../constants/uiConfig";
import { BUCKETS } from "../../constants/bucket";
import { setBucketTitles } from "./../bucketHelper";
// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const tableMeasuresIcon = "local:table/bucket-title-measures.svg";
const tableRowsIcon = "local:table/bucket-title-rows.svg";
const tableColumnsIcon = "local:table/bucket-title-columns.svg";
export function setPivotTableUiConfig(referencePoint, intl, visualizationType) {
    set(referencePoint, UICONFIG, setBucketTitles(referencePoint, visualizationType, intl));
    set(referencePoint, [UICONFIG, BUCKETS, BucketNames.MEASURES, "canAddItems"], true);
    set(referencePoint, [UICONFIG, BUCKETS, BucketNames.ATTRIBUTE, "canAddItems"], true);
    set(referencePoint, [UICONFIG, BUCKETS, BucketNames.COLUMNS, "canAddItems"], true);
    set(referencePoint, [UICONFIG, BUCKETS, BucketNames.MEASURES, "icon"], tableMeasuresIcon);
    set(referencePoint, [UICONFIG, BUCKETS, BucketNames.ATTRIBUTE, "icon"], tableRowsIcon);
    set(referencePoint, [UICONFIG, BUCKETS, BucketNames.COLUMNS, "icon"], tableColumnsIcon);
}
export function getPivotTableDefaultUiConfig(multipleDatesEnabled) {
    return Object.assign(Object.assign(Object.assign({ buckets: Object.assign({ measures: Object.assign({}, measuresBase), attribute: Object.assign(Object.assign({}, viewBase), { allowsSwapping: true, allowsReordering: true, itemsLimit: MAX_TABLE_CATEGORIES_COUNT, allowsDuplicateDates: multipleDatesEnabled, itemsLimitByType: {
                    date: multipleDatesEnabled ? MAX_TABLE_CATEGORIES_COUNT : 1,
                } }), columns: Object.assign(Object.assign({}, viewBase), { allowsSwapping: true, allowsReordering: true, itemsLimit: MAX_TABLE_CATEGORIES_COUNT, allowsDuplicateDates: multipleDatesEnabled, itemsLimitByType: {
                    date: multipleDatesEnabled ? MAX_TABLE_CATEGORIES_COUNT : 1,
                } }) }, defaultFilters) }, defaultRootUiConfigProperties), disabledOpenAsReportConfig), { supportedOverTimeComparisonTypes: [
            OverTimeComparisonTypes.SAME_PERIOD_PREVIOUS_YEAR,
            OverTimeComparisonTypes.PREVIOUS_PERIOD,
        ] });
}
//# sourceMappingURL=pivotTableUiConfigHelper.js.map