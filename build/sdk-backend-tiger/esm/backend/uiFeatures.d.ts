/**
 * This is list of feature flags managed on Panther by FeatureHub
 * and keeping their default values for non-managed env
 */
export declare enum TigerFeaturesNames {
    EnableSortingByTotalGroup = "enableSortingByTotalGroup",
    ADMeasureValueFilterNullAsZeroOption = "ADMeasureValueFilterNullAsZeroOption",
    EnableMultipleDates = "enableMultipleDates",
    EnableKPIDashboardDeleteFilterButton = "enableKPIDashboardDeleteFilterButton",
    DashboardEditModeDevRollout = "dashboardEditModeDevRollout",
    EnableMetricSqlAndDataExplain = "enableMetricSqlAndDataExplain",
    EnableLongitudeAndLatitudeLabels = "enableLongitudeAndLatitudeLabels",
    EnableDescriptions = "enableDescriptions",
    EnableAnalyticalDashboardPermissions = "enableAnalyticalDashboardPermissions",
    EnableKPIDashboardExportPDF = "enableKPIDashboardExportPDF",
    EnableSqlDatasets = "enableSqlDatasets",
    EnableFunnelChart = "enableFunnelChart",
    EnablePyramidChart = "enablePyramidChart",
    EnableSankeyChart = "enableSankeyChart",
    EnableDependencyWheelChart = "enableDependencyWheelChart",
    EnableWaterfallChart = "enableWaterfallChart",
    EnableCompositeGrain = "enableCompositeGrain",
    EnableTableTotalRows = "enableTableTotalRows",
    EnablePdmRemovalDeprecationPhase = "enablePdmRemovalDeprecationPhase",
    EnablePivotTableTransposition = "enablePivotTableTransposition",
    EnableColumnHeadersPosition = "enableColumnHeadersPosition",
    EnableNewHeadline = "enableNewHeadline",
    EnableAttributeHierarchies = "enableAttributeHierarchies",
    EnableUnavailableItemsVisible = "enableUnavailableItemsVisible"
}
export type ITigerFeatureFlags = {
    enableSortingByTotalGroup: typeof FeatureFlagsValues["enableSortingByTotalGroup"][number];
    ADMeasureValueFilterNullAsZeroOption: typeof FeatureFlagsValues["ADMeasureValueFilterNullAsZeroOption"][number];
    enableMultipleDates: typeof FeatureFlagsValues["enableMultipleDates"][number];
    enableKPIDashboardDeleteFilterButton: typeof FeatureFlagsValues["enableKPIDashboardDeleteFilterButton"][number];
    dashboardEditModeDevRollout: typeof FeatureFlagsValues["dashboardEditModeDevRollout"][number];
    enableMetricSqlAndDataExplain: typeof FeatureFlagsValues["enableMetricSqlAndDataExplain"][number];
    enableLongitudeAndLatitudeLabels: typeof FeatureFlagsValues["enableLongitudeAndLatitudeLabels"][number];
    enableDescriptions: typeof FeatureFlagsValues["enableDescriptions"][number];
    enableAnalyticalDashboardPermissions: typeof FeatureFlagsValues["enableAnalyticalDashboardPermissions"][number];
    enableKPIDashboardExportPDF: typeof FeatureFlagsValues["enableKPIDashboardExportPDF"][number];
    enableSqlDatasets: typeof FeatureFlagsValues["enableSqlDatasets"][number];
    enableFunnelChart: typeof FeatureFlagsValues["enableFunnelChart"][number];
    enablePyramidChart: typeof FeatureFlagsValues["enablePyramidChart"][number];
    enableSankeyChart: typeof FeatureFlagsValues["enableSankeyChart"][number];
    enableDependencyWheelChart: typeof FeatureFlagsValues["enableDependencyWheelChart"][number];
    enableWaterfallChart: typeof FeatureFlagsValues["enableWaterfallChart"][number];
    enableCompositeGrain: typeof FeatureFlagsValues["enableCompositeGrain"][number];
    enableTableTotalRows: typeof FeatureFlagsValues["enableTableTotalRows"][number];
    enablePdmRemovalDeprecationPhase: typeof FeatureFlagsValues["enablePdmRemovalDeprecationPhase"][number];
    enablePivotTableTransposition: typeof FeatureFlagsValues["enablePivotTableTransposition"][number];
    enableColumnHeadersPosition: typeof FeatureFlagsValues["enableColumnHeadersPosition"][number];
    enableNewHeadline: typeof FeatureFlagsValues["enableNewHeadline"][number];
    enableAttributeHierarchies: typeof FeatureFlagsValues["enableAttributeHierarchies"][number];
    enableUnavailableItemsVisible: typeof FeatureFlagsValues["enableUnavailableItemsVisible"][number];
};
export declare const DefaultFeatureFlags: ITigerFeatureFlags;
export declare const FeatureFlagsValues: {
    enableSortingByTotalGroup: readonly [true, false];
    ADMeasureValueFilterNullAsZeroOption: readonly ["Disabled", "EnabledCheckedByDefault", "EnabledUncheckedByDefault"];
    enableMultipleDates: readonly [true, false];
    enableKPIDashboardDeleteFilterButton: readonly [true, false];
    dashboardEditModeDevRollout: readonly [true, false];
    enableMetricSqlAndDataExplain: readonly [true, false];
    enableLongitudeAndLatitudeLabels: readonly [true, false];
    enableDescriptions: readonly [true, false];
    enableAnalyticalDashboardPermissions: readonly [true, false];
    enableKPIDashboardExportPDF: readonly [true, false];
    enableSqlDatasets: readonly [true, false];
    enableFunnelChart: readonly [true, false];
    enablePyramidChart: readonly [true, false];
    enableSankeyChart: readonly [true, false];
    enableDependencyWheelChart: readonly [true, false];
    enableWaterfallChart: readonly [true, false];
    enableCompositeGrain: readonly [true, false];
    enableTableTotalRows: readonly [true, false];
    enablePdmRemovalDeprecationPhase: readonly [true, false];
    enablePivotTableTransposition: readonly [true, false];
    enableColumnHeadersPosition: readonly [true, false];
    enableNewHeadline: readonly [true, false];
    enableAttributeHierarchies: readonly [true, false];
    enableUnavailableItemsVisible: readonly [true, false];
};
//# sourceMappingURL=uiFeatures.d.ts.map