// (C) 2021-2022 GoodData Corporation
import groupBy from "lodash/groupBy.js";
import isEmpty from "lodash/isEmpty.js";
import { DateGranularity, } from "@gooddata/sdk-model";
import includes from "lodash/includes.js";
import { defaultDateFilterConfig } from "./defaultConfig.js";
const isNotWeekGranularity = (granularity) => granularity !== DateGranularity.week;
const isNotWeekPreset = (preset) => preset.granularity !== DateGranularity.week;
function getDuplicateIdentifiers(options) {
    const groups = groupBy(options, (filter) => filter.localIdentifier);
    const duplicates = Object.keys(groups).filter((localIdentifier) => groups[localIdentifier].length > 1);
    if (duplicates.length) {
        console.warn(`There were duplicate localIdentifiers in the date filter config: ${duplicates.join(",")}`);
    }
    return duplicates;
}
function isFilterVisible(filter) {
    var _a;
    return (_a = filter === null || filter === void 0 ? void 0 : filter.visible) !== null && _a !== void 0 ? _a : false;
}
function containsVisibleFilter(filters) {
    var _a;
    return (_a = filters === null || filters === void 0 ? void 0 : filters.some(isFilterVisible)) !== null && _a !== void 0 ? _a : false;
}
function isRelativeFormVisible(filter) {
    var _a;
    return isFilterVisible(filter) && !isEmpty((_a = filter === null || filter === void 0 ? void 0 : filter.availableGranularities) !== null && _a !== void 0 ? _a : []);
}
function isAnyFilterVisible(config) {
    return (isFilterVisible(config.allTime) ||
        isFilterVisible(config.absoluteForm) ||
        isRelativeFormVisible(config.relativeForm) ||
        containsVisibleFilter(config.absolutePresets) ||
        containsVisibleFilter(config.relativePresets));
}
function getAllOptionsFlattened(config) {
    const allPresets = [
        config.allTime,
        config.absoluteForm,
        config.relativeForm,
        ...(config.absolutePresets || []),
        ...(config.relativePresets || []),
    ];
    return allPresets.filter((item) => item !== undefined);
}
function isSelectedOptionValid(config) {
    // only presets and all time are allowed for now (RAIL-1598), so look only there
    const candidateOptions = [
        config.allTime,
        ...(config.absolutePresets || []),
        ...(config.relativePresets || []),
    ];
    const matchingOption = candidateOptions.find((option) => (option === null || option === void 0 ? void 0 : option.localIdentifier) === config.selectedOption);
    return matchingOption ? matchingOption.visible : false;
}
/**
 * Validates the provided date filter config. The config has a lot of options and not all of them can be
 * covered by the typing.
 *
 * @param config - config to validate
 * @param shouldCheckSelectedOption - indicate whether validation should check that a valid option is selected
 */
export function validateDateFilterConfig(config, shouldCheckSelectedOption = true) {
    if (!isAnyFilterVisible(config)) {
        return "NoVisibleOptions";
    }
    const allOptions = getAllOptionsFlattened(config);
    const duplicateIdentifiers = getDuplicateIdentifiers(allOptions);
    if (duplicateIdentifiers.length) {
        return "ConflictingIdentifiers";
    }
    return !shouldCheckSelectedOption || isSelectedOptionValid(config) ? "Valid" : "SelectedOptionInvalid";
}
/**
 * Filters out all weekly presets from the filter config.
 */
export function filterOutWeeks(config) {
    var _a, _b;
    const { relativeForm, relativePresets } = config;
    const relativeFormProp = relativeForm
        ? {
            relativeForm: Object.assign(Object.assign({}, relativeForm), { availableGranularities: (_b = (_a = relativeForm === null || relativeForm === void 0 ? void 0 : relativeForm.availableGranularities) === null || _a === void 0 ? void 0 : _a.filter(isNotWeekGranularity)) !== null && _b !== void 0 ? _b : [] }),
        }
        : {};
    return Object.assign(Object.assign(Object.assign({}, config), relativeFormProp), { relativePresets: relativePresets === null || relativePresets === void 0 ? void 0 : relativePresets.filter(isNotWeekPreset) });
}
const FallbackToDefault = ["ConflictingIdentifiers", "NoVisibleOptions"];
/**
 * Given the date filter config loaded from backend and the settings, this function will perform validation
 * of the config and if needed also cleanup of invalid/disabled presets.
 */
export function getValidDateFilterConfig(config, settings) {
    const configValidation = validateDateFilterConfig(config);
    const validConfig = !includes(FallbackToDefault, configValidation) ? config : defaultDateFilterConfig;
    const dateFilterConfig = !settings.enableWeekFilters ? filterOutWeeks(validConfig) : validConfig;
    return [dateFilterConfig, configValidation];
}
//# sourceMappingURL=validation.js.map