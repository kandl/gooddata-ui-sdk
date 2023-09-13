// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { invariant } from "ts-invariant";
import { convertDateFilterConfigToDateFilterOptions } from "../../../_staging/dateFilterConfig/dateFilterConfigConverters.js";
import { selectIsInEditMode } from "../renderMode/renderModeSelectors.js";
const selectSelf = createSelector((state) => state, (state) => state.dateFilterConfig);
/**
 * Returns date filter config that is specified on the loaded dashboard.
 *
 * The dashboard-level date filter configuration MAY contain overrides and additional configuration to apply
 * on top of the workspace-level date filter config. If the dashboard-level overrides are not specified, then
 * the workspace-level config should be taken as-is.
 *
 * @remarks See {@link selectEffectiveDateFilterConfig} - you can use this selector to obtain the effective
 *  date filter config that contains the final config obtained by merging the workspace-level config and the
 *  dashboard-level overrides.
 *
 * @alpha
 */
export const selectDateFilterConfigOverrides = createSelector(selectSelf, (dateFilterConfigState) => {
    var _a;
    return (_a = dateFilterConfigState.dateFilterConfig) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Returns effective date filter config. The effective date filter config is created by merging the workspace-level
 * date filter config and the dashboard-level date filter config.
 *
 * This is the configuration that the DateFilter SHOULD use when rendering filtering presets.
 *
 * @alpha
 */
export const selectEffectiveDateFilterConfig = createSelector(selectSelf, (dateFilterConfigState) => {
    invariant(dateFilterConfigState.effectiveDateFilterConfig, "attempting to access uninitialized date filter config state");
    return dateFilterConfigState.effectiveDateFilterConfig;
});
/**
 * Returns effective date filter options. This is created by merging the workspace-level
 * date filter config and the dashboard-level date filter config.
 *
 * These are the date filter options that the DateFilter SHOULD use when rendering filtering presets.
 *
 * @alpha
 */
export const selectEffectiveDateFilterOptions = createSelector(selectEffectiveDateFilterConfig, (effectiveDateFilterConfig) => convertDateFilterConfigToDateFilterOptions(effectiveDateFilterConfig));
/**
 * Returns effective date filter options from. This is created by merging the workspace-level
 * date filter config and the dashboard-level date filter config.
 *
 * These are the date filter options that the DateFilter SHOULD use when rendering filtering presets.
 *
 * @alpha
 */
export const selectEffectiveDateFilterAvailableGranularities = createSelector(selectEffectiveDateFilterConfig, (effectiveDateFilterConfig) => { var _a, _b; return (_b = (_a = effectiveDateFilterConfig.relativeForm) === null || _a === void 0 ? void 0 : _a.availableGranularities) !== null && _b !== void 0 ? _b : []; });
/**
 * Indicates whether the effective date filter is using dashboard-level overrides.
 */
const effectiveDateFilterConfigIsUsingOverrides = createSelector(selectSelf, (dateFilterConfigState) => {
    invariant(dateFilterConfigState.isUsingDashboardOverrides !== undefined, "attempting to access uninitialized date filter config state");
    return dateFilterConfigState.isUsingDashboardOverrides;
});
/**
 * Returns custom title to use for the date filter. Custom title comes from the dashboard-level date filter config overrides. If no overrides
 * were defined OR the effective date filter config is not using them (because applying them means the final date filter config is invalid),
 * then no custom filter should be used.
 *
 * @alpha
 */
export const selectEffectiveDateFilterTitle = createSelector(effectiveDateFilterConfigIsUsingOverrides, selectDateFilterConfigOverrides, (isUsingOverrides, dashboardOverrides) => {
    if (!isUsingOverrides) {
        return undefined;
    }
    // If this happens then the load command handler does not work correctly - it sets that the overrides are used
    // while there are none.
    invariant(dashboardOverrides !== undefined);
    return dashboardOverrides.filterName;
});
/**
 * Returns display mode for the effective date filter. This always comes from the dashboard-level date filter config overrides - regardless whether
 * the rest of the overrides are actually used.
 *
 * @alpha
 */
export const selectEffectiveDateFilterMode = createSelector(selectIsInEditMode, selectDateFilterConfigOverrides, (isInEditMode, dashboardOverrides) => {
    var _a;
    if (isInEditMode) {
        return "active";
    }
    return (_a = dashboardOverrides === null || dashboardOverrides === void 0 ? void 0 : dashboardOverrides.mode) !== null && _a !== void 0 ? _a : "active";
});
/**
 * Returns the date filter config validation result warnings indicating any problems encountered during the date filter config resolution.
 *
 * @alpha
 */
export const selectDateFilterConfigValidationWarnings = createSelector(selectSelf, (dateFilterConfigState) => {
    var _a;
    return (_a = dateFilterConfigState.dateFilterConfigValidationWarnings) !== null && _a !== void 0 ? _a : [];
});
//# sourceMappingURL=dateFilterConfigSelectors.js.map