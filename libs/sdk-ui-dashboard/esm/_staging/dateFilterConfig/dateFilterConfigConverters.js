// (C) 2019-2022 GoodData Corporation
import groupBy from "lodash/groupBy.js";
import isEmpty from "lodash/isEmpty.js";
import min from "lodash/min.js";
import max from "lodash/max.js";
import format from "date-fns/format/index.js";
import startOfDay from "date-fns/startOfDay/index.js";
import subMonths from "date-fns/subMonths/index.js";
// TODO: this import was coming from internal/esm and was wrecking tests
const PLATFORM_DATE_FORMAT = "yyyy-MM-dd";
/**
 * Converts date filter config - as stored on the backend - into the date filter options that are aimed for
 * consumption by the actual date filtering view components.
 *
 * @param config - date filter config from backend
 */
export function convertDateFilterConfigToDateFilterOptions(config) {
    const allTime = convertAllTime(config.allTime);
    const absoluteForm = convertAbsoluteForm(config.absoluteForm);
    const relativeForm = convertRelativeForm(config.relativeForm);
    const absolutePreset = convertAbsolutePresets(config.absolutePresets);
    const relativePreset = convertRelativePresets(config.relativePresets);
    return removeEmptyKeysFromDateFilterOptions({
        allTime,
        absoluteForm,
        absolutePreset,
        relativeForm,
        relativePreset,
    });
}
function convertAllTime(filter) {
    return (filter && Object.assign(Object.assign({}, filter), { type: "allTime" }));
}
function convertAbsoluteForm(filter) {
    return (filter && Object.assign(Object.assign({}, filter), { from: format(startOfDay(subMonths(new Date(), 1)), PLATFORM_DATE_FORMAT), to: format(startOfDay(new Date()), PLATFORM_DATE_FORMAT), type: "absoluteForm" }));
}
function convertRelativeForm(filter) {
    return (filter && {
        from: undefined,
        // we order the granularities anyway, this lets the user to config the default
        granularity: filter.availableGranularities[0],
        localIdentifier: filter.localIdentifier,
        name: filter.name,
        to: undefined,
        type: "relativeForm",
        visible: filter.visible,
    });
}
function convertAbsolutePresets(filters) {
    return filters === null || filters === void 0 ? void 0 : filters.map((preset) => sanitizeDateFilterOption(Object.assign(Object.assign({}, preset), { type: "absolutePreset" })));
}
function convertRelativePresets(filters) {
    return (filters &&
        groupBy(filters.map((preset) => sanitizeDateFilterOption(Object.assign(Object.assign({}, preset), { type: "relativePreset" }))), (preset) => preset.granularity));
}
function removeEmptyKeysFromDateFilterOptions(dateFilterOptions) {
    const { absoluteForm, absolutePreset, allTime, relativeForm, relativePreset } = dateFilterOptions;
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (allTime && { allTime })), (absoluteForm && { absoluteForm })), (!isEmpty(absolutePreset) && { absolutePreset })), (relativeForm && { relativeForm })), (!isEmpty(relativePreset) && { relativePreset }));
}
function sanitizeDateFilterOption(option) {
    return Object.assign(Object.assign({}, option), { from: min([option.from, option.to]), to: max([option.from, option.to]) });
}
//# sourceMappingURL=dateFilterConfigConverters.js.map