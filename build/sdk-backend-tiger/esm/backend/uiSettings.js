import { DefaultFeatureFlags } from "./uiFeatures.js";
/**
 * Tiger does not yet have endpoints for settings. All the UI-specific
 * settings are thus hardcoded here.
 */
export const DefaultUiSettings = Object.assign({ activeFiltersByDefault: true, enableActiveFilterContext: false, cellMergedByDefault: true, enableMetricDateFilter: true, enableAnalyticalDesignerExport: true, enableNewADFilterBar: true, enableMeasureValueFilters: true, hidePixelPerfectExperience: true, enableBulletChart: true, enableCsvUploader: true, platformEdition: "enterprise", portalLogoPage: false, analyticalDesigner: true, enableWeekFilters: true, enableAnalyticalDashboards: true, enableHidingOfDataPoints: true, enableAdCatalogRefresh: true, enableAdRankingFilter: true, enableDomainHomepage: true, enableKPIDashboardDependentFilters: false, enableKDWidgetCustomHeight: true, enableSectionHeaders: true, enableKPIDashboardSaveAsNew: true, enableEmbedButtonInKD: true, enableEmbedButtonInAD: true, enableHidingOfWidgetTitle: true, 
    // pivot table specific
    enableTableColumnsManualResizing: true, enableTableColumnsAutoResizing: true, enableTableColumnsGrowToFit: true, 
    // embedding AD in KD
    enableExploreInsightsFromKD: true, enableEditInsightsFromKD: true, enableKPIDashboardNewInsight: true, 
    // drilling
    enableKPIDashboardDrillToDashboard: true, enableKPIDashboardDrillToInsight: true, enableKPIDashboardDrillToURL: true, enableKPIDashboardImplicitDrillDown: false, enableKPIDashboardDrillFromAttribute: true, enableDrilledInsightExport: true, enableFilterValuesResolution: false, enableClickableAttributeURL: true, enableNewNavigationForResponsiveUi: true, enableDataSection: true, ADCatalogGroupsExpanded: true, enableCustomColorPicker: true, enableAdAdditionalDateAttributes: true, enableAlternativeDisplayFormSelection: true, enableNewAnalyticalDashboardsNavigation: true, 
    // enable the plugin-ready Dashboard component in gdc-dashboards
    dashboardComponentDevRollout: true, enableRenamingProjectToWorkspace: true, enableRenamingMeasureToMetric: true, enableAxisLabelFormat: true, enableChartsSorting: true, enableAxisNameViewByTwoAttributes: true, enableAxisNameConfiguration: true, enableReversedStacking: true, enableSeparateTotalLabels: true, enableKPIDashboardExport: true, enableKDZooming: true, enableAdDescriptionEdit: true, ["msf.enableTenantCustomModel"]: false, drillIntoUrlDocumentationLink: "https://www.gooddata.com/developers/cloud-native/doc/cloud/create-dashboards/drilling-in-dashboards/set-drill-into-hyperlink/", enablePushpinGeoChart: true, tableSortingCheckDisabled: true, metadataTimeZone: "UTC" }, DefaultFeatureFlags);
/**
 * Locale for the applications.
 */
export const DefaultLocale = "en-US";
export const DefaultWeekStart = "Sunday";
/**
 * Number separators.
 */
export const DefaultSeparators = {
    thousand: ",",
    decimal: ".",
};
/**
 * Default user settings. Make sure to override the 'userId' with the real id when using.
 */
export const DefaultUserSettings = Object.assign({ userId: "template", locale: DefaultLocale, separators: DefaultSeparators }, DefaultUiSettings);
//# sourceMappingURL=uiSettings.js.map