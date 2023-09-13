import { __rest } from "tslib";
// (C) 2019-2022 GoodData Corporation
import flow from "lodash/flow.js";
import uniqBy from "lodash/uniqBy.js";
import stringify from "json-stable-stringify";
import { sanitizeDateFilterOption } from "./sanitization.js";
/**
 * Merges presets so that presets that are semantically unique are de-duplicated.
 */
const mergePresets = (projectPresets, dashboardPresets) => {
    const merged = [...(projectPresets || []), ...(dashboardPresets || [])].map(sanitizeDateFilterOption);
    return uniqBy(merged, stringify);
};
const addPresets = (dashboardConfig) => (projectConfig) => {
    var _a, _b, _c, _d, _e, _f;
    if (!dashboardConfig.addPresets) {
        return projectConfig;
    }
    const absolutePresets = mergePresets((_a = projectConfig === null || projectConfig === void 0 ? void 0 : projectConfig.absolutePresets) !== null && _a !== void 0 ? _a : [], (_c = (_b = dashboardConfig.addPresets) === null || _b === void 0 ? void 0 : _b.absolutePresets) !== null && _c !== void 0 ? _c : []);
    const relativePresets = mergePresets((_d = projectConfig === null || projectConfig === void 0 ? void 0 : projectConfig.relativePresets) !== null && _d !== void 0 ? _d : [], (_f = (_e = dashboardConfig.addPresets) === null || _e === void 0 ? void 0 : _e.relativePresets) !== null && _f !== void 0 ? _f : []);
    return Object.assign(Object.assign(Object.assign({}, projectConfig), (absolutePresets.length ? { absolutePresets } : null)), (relativePresets.length ? { relativePresets } : null));
};
const hideNonArrayOptionType = (key) => (dashboardConfig) => (projectConfig) => {
    var _a;
    const configKey = projectConfig[key];
    if (!configKey) {
        return projectConfig;
    }
    if (!configKey.visible || !dashboardConfig.hideOptions) {
        return projectConfig;
    }
    return ((_a = dashboardConfig.hideOptions) === null || _a === void 0 ? void 0 : _a.includes(configKey.localIdentifier))
        ? Object.assign(Object.assign({}, projectConfig), { [key]: Object.assign(Object.assign({}, projectConfig[key]), { visible: false }) }) : projectConfig;
};
const hideAllTime = hideNonArrayOptionType("allTime");
const hideAbsoluteForm = hideNonArrayOptionType("absoluteForm");
const hideRelativeForm = hideNonArrayOptionType("relativeForm");
const shouldHideRelativePreset = (preset, dashboardConfig) => {
    var _a, _b;
    const hideForGranularity = (_a = dashboardConfig.hideGranularities) === null || _a === void 0 ? void 0 : _a.includes(preset.granularity);
    const hideForId = (_b = dashboardConfig.hideOptions) === null || _b === void 0 ? void 0 : _b.includes(preset.localIdentifier);
    return hideForGranularity || hideForId || false;
};
const hideAbsolutePresets = (dashboardConfig) => (projectConfig) => {
    var _a;
    if (!((_a = projectConfig.absolutePresets) === null || _a === void 0 ? void 0 : _a.length) || !dashboardConfig.hideOptions) {
        return projectConfig;
    }
    const absolutePresets = projectConfig.absolutePresets.map((preset) => {
        var _a;
        return ((_a = dashboardConfig.hideOptions) === null || _a === void 0 ? void 0 : _a.includes(preset.localIdentifier))
            ? Object.assign(Object.assign({}, preset), { visible: false }) : preset;
    });
    return Object.assign(Object.assign({}, projectConfig), { absolutePresets });
};
const hideRelativePresets = (dashboardConfig) => (projectConfig) => {
    var _a;
    const canDashboardConfigHideRelativePreset = dashboardConfig.hideOptions || dashboardConfig.hideGranularities;
    if (!((_a = projectConfig.relativePresets) === null || _a === void 0 ? void 0 : _a.length) || !canDashboardConfigHideRelativePreset) {
        return projectConfig;
    }
    const relativePresets = projectConfig.relativePresets.map((preset) => shouldHideRelativePreset(preset, dashboardConfig)
        ? Object.assign(Object.assign({}, preset), { visible: false }) : preset);
    return Object.assign(Object.assign({}, projectConfig), { relativePresets });
};
const hideRelativeFormGranularities = (dashboardConfig) => (projectConfig) => {
    var _a;
    if (!((_a = projectConfig.relativeForm) === null || _a === void 0 ? void 0 : _a.visible) || !dashboardConfig.hideGranularities) {
        return projectConfig;
    }
    const granularities = projectConfig.relativeForm.availableGranularities.filter((granularity) => { var _a, _b; return !((_b = (_a = dashboardConfig.hideGranularities) === null || _a === void 0 ? void 0 : _a.includes(granularity)) !== null && _b !== void 0 ? _b : false); });
    const { relativeForm } = projectConfig, projectConfigWithoutRelativeForm = __rest(projectConfig, ["relativeForm"]);
    return granularities.length > 0
        ? Object.assign(Object.assign({}, projectConfig), { relativeForm: Object.assign(Object.assign({}, relativeForm), { availableGranularities: granularities }) }) : projectConfigWithoutRelativeForm;
};
/**
 * Merges the date filter config with the dashboard-level overrides. The overrides may hide some presets
 * or add custom presets. This function addresses all that and returns the final merged Date Filter Config.
 *
 * @param config - date filter config
 * @param dashboardOverrides - dashboard-level overrides.
 */
export function mergeDateFilterConfigs(config, dashboardOverrides) {
    const pipeline = flow(addPresets(dashboardOverrides), hideAllTime(dashboardOverrides), hideAbsoluteForm(dashboardOverrides), hideRelativeForm(dashboardOverrides), hideRelativeFormGranularities(dashboardOverrides), hideAbsolutePresets(dashboardOverrides), hideRelativePresets(dashboardOverrides));
    return pipeline(config);
}
//# sourceMappingURL=merge.js.map