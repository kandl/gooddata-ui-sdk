// (C) 2020-2023 GoodData Corporation
/**
 * This is list of feature flags managed on Panther by FeatureHub
 * and keeping their default values for non-managed env
 */
export var TigerFeaturesNames;
(function (TigerFeaturesNames) {
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableSortingByTotalGroup"] = "enableSortingByTotalGroup";
    //string, possible values: disabled, enabledCheckedByDefault, enabledUncheckedByDefault
    TigerFeaturesNames["ADMeasureValueFilterNullAsZeroOption"] = "ADMeasureValueFilterNullAsZeroOption";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableMultipleDates"] = "enableMultipleDates";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableKPIDashboardDeleteFilterButton"] = "enableKPIDashboardDeleteFilterButton";
    //boolean + possible values: enabled, disabled
    // Remove this FF only after 8.12.0 end of life. The following selector is missing parentheses and is not correctly set to true when FF is missing (read more in ticket RAIL-4970)
    // https://github.com/gooddata/gooddata-ui-sdk/commit/cd47ff9115fc944be721dfda9d58ede00c7c15e9#diff-d047b642946d563ff25cca09624eede9a605d2b8809bac26531324507de4e546R313
    TigerFeaturesNames["DashboardEditModeDevRollout"] = "dashboardEditModeDevRollout";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableMetricSqlAndDataExplain"] = "enableMetricSqlAndDataExplain";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableLongitudeAndLatitudeLabels"] = "enableLongitudeAndLatitudeLabels";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableDescriptions"] = "enableDescriptions";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableAnalyticalDashboardPermissions"] = "enableAnalyticalDashboardPermissions";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableKPIDashboardExportPDF"] = "enableKPIDashboardExportPDF";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableSqlDatasets"] = "enableSqlDatasets";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableFunnelChart"] = "enableFunnelChart";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnablePyramidChart"] = "enablePyramidChart";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableSankeyChart"] = "enableSankeyChart";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableDependencyWheelChart"] = "enableDependencyWheelChart";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableWaterfallChart"] = "enableWaterfallChart";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableCompositeGrain"] = "enableCompositeGrain";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableTableTotalRows"] = "enableTableTotalRows";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnablePdmRemovalDeprecationPhase"] = "enablePdmRemovalDeprecationPhase";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnablePivotTableTransposition"] = "enablePivotTableTransposition";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableColumnHeadersPosition"] = "enableColumnHeadersPosition";
    TigerFeaturesNames["EnableNewHeadline"] = "enableNewHeadline";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableAttributeHierarchies"] = "enableAttributeHierarchies";
    //boolean + possible values: enabled, disabled
    TigerFeaturesNames["EnableUnavailableItemsVisible"] = "enableUnavailableItemsVisible";
})(TigerFeaturesNames = TigerFeaturesNames || (TigerFeaturesNames = {}));
export const DefaultFeatureFlags = {
    enableSortingByTotalGroup: false,
    ADMeasureValueFilterNullAsZeroOption: "EnabledUncheckedByDefault",
    enableMultipleDates: true,
    enableKPIDashboardDeleteFilterButton: false,
    dashboardEditModeDevRollout: true,
    enableMetricSqlAndDataExplain: false,
    enableLongitudeAndLatitudeLabels: true,
    enableDescriptions: true,
    enableAnalyticalDashboardPermissions: true,
    enableKPIDashboardExportPDF: true,
    enableSqlDatasets: false,
    enableFunnelChart: true,
    enablePyramidChart: true,
    enableSankeyChart: true,
    enableDependencyWheelChart: true,
    enableWaterfallChart: true,
    enableCompositeGrain: false,
    enableTableTotalRows: true,
    enablePdmRemovalDeprecationPhase: false,
    enablePivotTableTransposition: true,
    enableColumnHeadersPosition: true,
    enableNewHeadline: false,
    enableAttributeHierarchies: false,
    enableUnavailableItemsVisible: false,
};
export const FeatureFlagsValues = {
    enableSortingByTotalGroup: [true, false],
    ADMeasureValueFilterNullAsZeroOption: [
        "Disabled",
        "EnabledCheckedByDefault",
        "EnabledUncheckedByDefault",
    ],
    enableMultipleDates: [true, false],
    enableKPIDashboardDeleteFilterButton: [true, false],
    dashboardEditModeDevRollout: [true, false],
    enableMetricSqlAndDataExplain: [true, false],
    enableLongitudeAndLatitudeLabels: [true, false],
    enableDescriptions: [true, false],
    enableAnalyticalDashboardPermissions: [true, false],
    enableKPIDashboardExportPDF: [true, false],
    enableSqlDatasets: [true, false],
    enableFunnelChart: [true, false],
    enablePyramidChart: [true, false],
    enableSankeyChart: [true, false],
    enableDependencyWheelChart: [true, false],
    enableWaterfallChart: [true, false],
    enableCompositeGrain: [true, false],
    enableTableTotalRows: [true, false],
    enablePdmRemovalDeprecationPhase: [true, false],
    enablePivotTableTransposition: [true, false],
    enableColumnHeadersPosition: [true, false],
    enableNewHeadline: [true, false],
    enableAttributeHierarchies: [true, false],
    enableUnavailableItemsVisible: [true, false],
};
//# sourceMappingURL=uiFeatures.js.map