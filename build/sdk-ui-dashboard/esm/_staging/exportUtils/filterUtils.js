// (C) 2021-2022 GoodData Corporation
import { isDashboardDateFilter } from "@gooddata/sdk-model";
// the value is taken from gdc-dashboards
const allTimeFilterContextItem = {
    dateFilter: {
        type: "absolute",
        granularity: "GDC.time.year",
    },
};
export function ensureAllTimeFilterForExport(filters) {
    // if there is no date filter, add an "all time" filter so that in case the dashboard is saved with some
    // date filter, it is overridden to All time for the purpose of the export
    return filters.some(isDashboardDateFilter) ? filters : [allTimeFilterContextItem, ...filters];
}
//# sourceMappingURL=filterUtils.js.map