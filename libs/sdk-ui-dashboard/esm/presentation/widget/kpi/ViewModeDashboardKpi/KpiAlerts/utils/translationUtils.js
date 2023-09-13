import lowerFirst from "lodash/lowerFirst.js";
import { DateFilterHelpers } from "@gooddata/sdk-ui-filters";
import { absoluteDateFilterValues, isAbsoluteDateFilter, isAllTimeDateFilter, isRelativeDateFilter, relativeDateFilterValues, } from "@gooddata/sdk-model";
import { messages } from "../../../../../../locales.js";
function filterMetadata(filter) {
    var _a, _b, _c, _d;
    if (isRelativeDateFilter(filter)) {
        return Object.assign(Object.assign({}, relativeDateFilterValues(filter)), { type: "relative" });
    }
    else if (isAbsoluteDateFilter(filter)) {
        return Object.assign(Object.assign({}, absoluteDateFilterValues(filter)), { type: "absolute" });
    }
    else if (filter.dateFilter.type === "relative") {
        return {
            type: "relative",
            from: Number.parseInt((_b = (_a = filter.dateFilter.from) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "0", 10),
            to: Number.parseInt((_d = (_c = filter.dateFilter.to) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "0", 10),
            granularity: filter.dateFilter.granularity,
        };
    }
    else {
        return {
            type: "absolute",
            from: filter.dateFilter.from.toString(),
            to: filter.dateFilter.to.toString(),
        };
    }
}
export function translateDateFilter(filter, intl, dateFormat) {
    const metadata = filterMetadata(filter);
    return metadata.type === "absolute"
        ? DateFilterHelpers.formatAbsoluteDateRange(metadata.from, metadata.to, dateFormat)
        : DateFilterHelpers.formatRelativeDateRange(metadata.from, metadata.to, metadata.granularity, intl);
}
function getIntlIdRoot(filter) {
    const metadata = filterMetadata(filter);
    if (metadata.type === "absolute") {
        return messages.alertMessageRelativePresetInPeriod.id;
    }
    const hasOneBoundToday = metadata.from === 0 || metadata.to === 0; // e.g. last 4 months, next 6 days
    const isLastOneX = metadata.from === -1 && metadata.to === -1; // e.g last month
    const isNextOneX = metadata.from === 1 && metadata.to === 1; // e.g. next month
    return hasOneBoundToday || isLastOneX || isNextOneX
        ? messages.alertMessageRelativePreset.id
        : messages.alertMessageRelativePresetInPeriod.id;
}
export function getKpiAlertTranslationData(filter, intl, dateFormat) {
    if (!filter || isAllTimeDateFilter(filter)) {
        return null;
    }
    return {
        intlIdRoot: getIntlIdRoot(filter),
        rangeText: lowerFirst(translateDateFilter(filter, intl, dateFormat)),
    };
}
//# sourceMappingURL=translationUtils.js.map