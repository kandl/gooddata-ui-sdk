import { isAllTimeDateFilter, isRelativeDateFilter, relativeDateFilterValues, } from "@gooddata/sdk-model";
const getGeneralKpiPopLabel = (intl) => intl.formatMessage({ id: "filters.allTime.previousPeriod" });
const getRelativeFilterKpiPopLabel = (filter, intl) => {
    const { from, to, granularity } = relativeDateFilterValues(filter);
    const n = Math.abs(to - from) + 1;
    switch (granularity) {
        case "GDC.time.minute":
            return intl.formatMessage({ id: `filters.minute.previousPeriod` }, { n });
        case "GDC.time.hour":
            return intl.formatMessage({ id: `filters.hour.previousPeriod` }, { n });
        case "GDC.time.date":
            return intl.formatMessage({ id: `filters.day.previousPeriod` }, { n });
        case "GDC.time.week_us":
            return intl.formatMessage({ id: `filters.week.previousPeriod` }, { n });
        case "GDC.time.month":
            return intl.formatMessage({ id: `filters.month.previousPeriod` }, { n });
        case "GDC.time.quarter":
            return intl.formatMessage({ id: `filters.quarter.previousPeriod` }, { n });
        case "GDC.time.year":
            return intl.formatMessage({ id: `filters.year.previousPeriod` }, { n });
        default:
            return "";
    }
};
export const getKpiPopLabel = (filter, comparisonType, intl) => {
    if (comparisonType === "lastYear") {
        // This string is meant to be the same no matter the filter
        return intl.formatMessage({ id: "filters.allTime.lastYear" });
    }
    if (isRelativeDateFilter(filter) && !isAllTimeDateFilter(filter)) {
        return getRelativeFilterKpiPopLabel(filter, intl);
    }
    return getGeneralKpiPopLabel(intl);
};
//# sourceMappingURL=translations.js.map