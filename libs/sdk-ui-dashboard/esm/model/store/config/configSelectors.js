import { createSelector } from "@reduxjs/toolkit";
import { invariant } from "ts-invariant";
const selectSelf = createSelector((state) => state, (state) => state.config);
/**
 * Returns dashboard's config.
 *
 * @remarks
 * It is expected that the selector is called only after the config state
 * is correctly initialized. Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export const selectConfig = createSelector(selectSelf, (configState) => {
    invariant(configState.config, "attempting to access uninitialized config state");
    return configState.config;
});
/**
 * Returns workspace-level configuration for the of the date filter options and presets.
 *
 * @remarks
 * Note: this configuration SHOULD be further augmented by the dashboard-level overrides to obtain
 * the effective date filter configuration.
 *
 * @public
 */
export const selectDateFilterConfig = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.dateFilterConfig) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Returns settings that are in effect for the current dashboard.
 *
 * @public
 */
export const selectSettings = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.settings) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Returns locale to use for internationalization of the dashboard.
 *
 * @public
 */
export const selectLocale = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.locale) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Returns number separators to use when rendering numeric values on charts or KPIs.
 *
 * @public
 */
export const selectSeparators = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.separators) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Returns the color palette for dashboard charts.
 *
 * @public
 */
export const selectColorPalette = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.colorPalette) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Returns the object availability configuration for this dashboard.
 *
 * @remarks
 * Only objects that match the availability criteria can appear in selections where user has pick
 * an object to use for some purpose (for instance metric for KPI or date dataset to filter by).
 *
 * @public
 */
export const selectObjectAvailabilityConfig = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.objectAvailability) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Returns Mapbox token.
 *
 * @internal
 */
export const selectMapboxToken = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.mapboxToken) !== null && _a !== void 0 ? _a : undefined;
});
/**
 * Returns week start day
 *
 * @internal
 */
export const selectWeekStart = createSelector(selectConfig, (state) => {
    var _a, _b;
    if (state.settings == null) {
        return "Sunday";
    }
    if (state.settings.enableNewUIWeekStartChange && state.settings.weekStartOnMondayEnabled) {
        return "Monday";
    }
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.weekStart) !== null && _b !== void 0 ? _b : "Sunday";
});
/**
 * Returns whether the Dashboard is executed in read-only mode.
 *
 * @remarks
 * Read-only mode disables any interactions that can alter the backend data.
 *
 * @public
 */
export const selectIsReadOnly = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.isReadOnly) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the Dashboard is executed in embedded context.
 *
 * @remarks
 * In embedded mode, some interactions may be disabled.
 *
 * @public
 */
export const selectIsEmbedded = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.isEmbedded) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the Dashboard is rendered in the export mode.
 * In export mode, some components can be hidden, or rendered differently.
 *
 * @public
 */
export const selectIsExport = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.isExport) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the Dashboard is white labeled.
 *
 * @internal
 */
export const selectIsWhiteLabeled = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.isWhiteLabeled) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the default drills configured on the widgets or implicit drills (eg. drill down) are disabled.
 * This option does not affect drilling enabled by drillableItems.
 *
 * @public
 */
export const selectDisableDefaultDrills = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.disableDefaultDrills) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether filter values in drill events should be resolved.
 *
 * @public
 */
export const selectEnableFilterValuesResolutionInDrillEvents = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.enableFilterValuesResolutionInDrillEvents) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the save as new button is hidden.
 *
 * @internal
 */
export const selectIsSaveAsNewButtonHidden = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.hideSaveAsNewButton) !== null && _a !== void 0 ? _a : false;
});
//
// FEATURE FLAGS
//
/**
 * Returns date format.
 *
 * @public
 */
export const selectDateFormat = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.responsiveUiDateFormat) !== null && _b !== void 0 ? _b : undefined;
});
/**
 * Returns whether the current user can schedule emails.
 *
 * @public
 */
export const selectEnableKPIDashboardSchedule = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKPIDashboardSchedule) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether the current user can share scheduled email to other recipients.
 *
 * @public
 */
export const selectEnableKPIDashboardScheduleRecipients = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKPIDashboardScheduleRecipients) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns current platform edition.
 *
 * @public
 */
export const selectPlatformEdition = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.platformEdition) !== null && _b !== void 0 ? _b : "enterprise";
});
/**
 * Returns whether company logo should be visible in embedded dashboard.
 *
 * @public
 */
export const selectEnableCompanyLogoInEmbeddedUI = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableCompanyLogoInEmbeddedUI) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether the export to pdf is enabled.
 *
 * @public
 */
export const selectEnableKPIDashboardExportPDF = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKPIDashboardExportPDF) !== null && _b !== void 0 ? _b : true;
});
/**
 * Returns whether the drill to dashboard is enabled.
 *
 * @public
 */
export const selectEnableKPIDashboardDrillToDashboard = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKPIDashboardDrillToDashboard) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether the save as new dashboard functionality is enabled.
 *
 * @public
 */
export const selectEnableKPIDashboardSaveAsNew = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKPIDashboardSaveAsNew) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether implicit drill to attributes url enabled
 *
 * @public
 */
export const selectEnableClickableAttributeURL = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableClickableAttributeURL) !== null && _b !== void 0 ? _b : true;
});
/**
 * Returns whether drill to url is enabled
 *
 * @public
 */
export const selectEnableKPIDashboardDrillToURL = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKPIDashboardDrillToURL) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether drill to insight is enabled
 *
 * @public
 */
export const selectEnableKPIDashboardDrillToInsight = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKPIDashboardDrillToInsight) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether implicit drill to attributes url enabled
 *
 * @public
 */
export const selectEnableKPIDashboardImplicitDrillDown = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKPIDashboardImplicitDrillDown) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether drill fromAttribute is enabled
 *
 * @public
 */
export const selectEnableKPIDashboardDrillFromAttribute = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKPIDashboardDrillFromAttribute) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether Kpi drills in embedded mode are disabled.
 *
 * @public
 */
export const selectHideKpiDrillInEmbedded = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.hideKpiDrillInEmbedded) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether insight export scheduling is enabled.
 *
 * @public
 */
export const selectEnableInsightExportScheduling = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableInsightExportScheduling) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether analytical dashboard permissions are enabled
 *
 * @internal
 */
export const selectEnableAnalyticalDashboardPermissions = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableAnalyticalDashboardPermissions) !== null && _b !== void 0 ? _b : true;
});
/**
 * Returns whether custom widget heights are enabled
 *
 * @internal
 */
export const selectEnableWidgetCustomHeight = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKDWidgetCustomHeight) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether we should call workspaces workspaces (true) or projects (false).
 *
 * @internal
 */
export const selectEnableRenamingProjectToWorkspace = createSelector(selectConfig, (state) => {
    var _a, _b;
    return !!((_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableRenamingProjectToWorkspace) !== null && _b !== void 0 ? _b : true);
});
/**
 * Returns whether we should call measures metrics (true) or measures (false).
 *
 * @internal
 */
export const selectEnableRenamingMeasureToMetric = createSelector(selectConfig, (state) => {
    var _a, _b;
    return !!((_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableRenamingMeasureToMetric) !== null && _b !== void 0 ? _b : false);
});
/**
 * Returns whether we should hide the pixel perfect experience references.
 *
 * @internal
 */
export const selectShouldHidePixelPerfectExperience = createSelector(selectConfig, (state) => {
    var _a, _b, _c, _d;
    const isHidden = (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.hidePixelPerfectExperience) !== null && _b !== void 0 ? _b : true;
    const isEnabled = (_d = (_c = state.settings) === null || _c === void 0 ? void 0 : _c.enablePixelPerfectExperience) !== null && _d !== void 0 ? _d : false;
    return !isHidden && isEnabled;
});
/**
 * Returns whether we should disable the underline in KPIs when they are drillable.
 *
 * @internal
 */
export const selectDisableKpiDashboardHeadlineUnderline = createSelector(selectConfig, (state) => {
    var _a, _b;
    return !!((_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.disableKpiDashboardHeadlineUnderline) !== null && _b !== void 0 ? _b : false);
});
/**
 * Returns whether unfinished features are allowed.
 *
 * @internal
 */
export const selectAllowUnfinishedFeatures = createSelector(selectConfig, (state) => state.allowUnfinishedFeatures || false);
/**
 * Returns whether creating new insight from dashboard is enabled.
 *
 * @internal
 */
export const selectAllowCreateInsightRequest = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.allowCreateInsightRequest) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether analytical designer is enabled.
 *
 * @internal
 */
export const selectIsAnalyticalDesignerEnabled = createSelector(selectConfig, (state) => { var _a; return !!(((_a = state.settings) === null || _a === void 0 ? void 0 : _a.analyticalDesigner) || false); });
/**
 * Returns whether delete button in dashboard attribute filters is visible.
 *
 * @internal
 */
export const selectIsDeleteFilterButtonEnabled = createSelector(selectConfig, (state) => { var _a; return !!(((_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKPIDashboardDeleteFilterButton) || false); });
/**
 * Returns whether dependent filters are enabled.
 *
 * @internal
 */
export const selectIsKPIDashboardDependentFiltersEnabled = createSelector(selectConfig, (state) => { var _a; return !!(((_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableKPIDashboardDependentFilters) || false); });
/**
 * Returns whether choice of alternate display forms is enabled.
 *
 * @internal
 */
export const selectIsAlternativeDisplayFormSelectionEnabled = createSelector(selectConfig, (state) => { var _a; return !!(((_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableAlternativeDisplayFormSelection) || false); });
/**
 * Returns whether share button is hidden.
 *
 * @internal
 */
export const selectIsShareButtonHidden = createSelector(selectConfig, (state) => {
    var _a;
    return (_a = state.hideShareButton) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether attribute hierarchies are enabled.
 *
 * @internal
 */
export const selectEnableAttributeHierarchies = createSelector(selectConfig, (state) => {
    var _a, _b;
    return (_b = (_a = state.settings) === null || _a === void 0 ? void 0 : _a.enableAttributeHierarchies) !== null && _b !== void 0 ? _b : false;
});
/**
 * Returns whether drill down is enabled.
 *
 * On Bear, drill down is driven by isKPIDashboardImplicitDrillDown.
 * On Tiger, it is driven by attribute hierarchies, thus isAttribueHierarchiesEnabled.
 *
 * @internal
 */
export const selectIsDrillDownEnabled = createSelector(selectEnableKPIDashboardImplicitDrillDown, selectEnableAttributeHierarchies, (isKPIDashboardImplicitDrillDownEnabled, isAttribueHierarchiesEnabled) => {
    return isKPIDashboardImplicitDrillDownEnabled || isAttribueHierarchiesEnabled;
});
//# sourceMappingURL=configSelectors.js.map