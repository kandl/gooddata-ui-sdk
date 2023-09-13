// (C) 2019-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { isUiRelativeDateFilterForm, } from "../interfaces/index.js";
import { isRelativeDateFilterPreset, } from "@gooddata/sdk-model";
export function getDateFilterOptionGranularity(dateFilterOption) {
    return isUiRelativeDateFilterForm(dateFilterOption) || isRelativeDateFilterPreset(dateFilterOption)
        ? dateFilterOption.granularity
        : undefined;
}
function isDateFilterOptionVisible(option) {
    return option === null || option === void 0 ? void 0 : option.visible;
}
function pickDateFilterOptionIfVisible(option) {
    return isDateFilterOptionVisible(option) ? option : undefined;
}
function filterVisibleRelativePresets(relativePreset) {
    return Object.keys(relativePreset).reduce((filtered, granularity) => {
        const presetsOfGranularity = relativePreset[granularity];
        const visiblePresetsOfGranularity = presetsOfGranularity.filter(isDateFilterOptionVisible);
        if (visiblePresetsOfGranularity.length) {
            filtered[granularity] = visiblePresetsOfGranularity;
        }
        return filtered;
    }, {});
}
function removeEmptyKeysFromDateFilterOptions(dateFilterOptions) {
    const { absoluteForm, absolutePreset, allTime, relativeForm, relativePreset } = dateFilterOptions;
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (allTime && { allTime })), (absoluteForm && { absoluteForm })), (!isEmpty(absolutePreset) && { absolutePreset })), (relativeForm && { relativeForm })), (!isEmpty(relativePreset) && { relativePreset }));
}
/**
 * Returns dateFilterOptions with only items that have visible set to true.
 *
 * @param dateFilterOptions - options to filter
 * @public
 */
export function filterVisibleDateFilterOptions(dateFilterOptions) {
    var _a;
    const allTime = pickDateFilterOptionIfVisible(dateFilterOptions.allTime);
    const absoluteForm = pickDateFilterOptionIfVisible(dateFilterOptions.absoluteForm);
    const relativeForm = pickDateFilterOptionIfVisible(dateFilterOptions.relativeForm);
    const absolutePreset = (_a = dateFilterOptions.absolutePreset) === null || _a === void 0 ? void 0 : _a.filter(isDateFilterOptionVisible);
    const relativePreset = dateFilterOptions.relativePreset && filterVisibleRelativePresets(dateFilterOptions.relativePreset);
    return removeEmptyKeysFromDateFilterOptions({
        allTime,
        absoluteForm,
        absolutePreset,
        relativeForm,
        relativePreset,
    });
}
function sanitizePreset(option) {
    if (option.from > option.to) {
        return Object.assign(Object.assign({}, option), { from: option.to, to: option.from });
    }
    return option;
}
function sanitizeRelativePresets(relativePreset) {
    return Object.keys(relativePreset).reduce((filtered, granularity) => {
        const presetsOfGranularity = relativePreset[granularity];
        filtered[granularity] = presetsOfGranularity.map(sanitizePreset);
        return filtered;
    }, {});
}
/**
 * Returns dateFilterOptions with all the presets sanitized, i.e. having `from <= to`.
 * @param dateFilterOptions - options to sanitize
 */
export function sanitizePresetIntervals(dateFilterOptions) {
    var _a;
    const absolutePreset = (_a = dateFilterOptions.absolutePreset) === null || _a === void 0 ? void 0 : _a.map(sanitizePreset);
    const relativePreset = dateFilterOptions.relativePreset && sanitizeRelativePresets(dateFilterOptions.relativePreset);
    return removeEmptyKeysFromDateFilterOptions(Object.assign(Object.assign({}, dateFilterOptions), { absolutePreset,
        relativePreset }));
}
//# sourceMappingURL=OptionUtils.js.map