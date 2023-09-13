// (C) 2020-2023 GoodData Corporation
import { FeatureFlagsValues, TigerFeaturesNames } from "../uiFeatures.js";
import { convertState } from "./state.js";
export function mapFeatures(features) {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, loadFeature(features, TigerFeaturesNames.EnableKPIDashboardExportPDF, "enableKPIDashboardExportPDF", "BOOLEAN", FeatureFlagsValues.enableKPIDashboardExportPDF)), loadFeature(features, TigerFeaturesNames.EnableSortingByTotalGroup, "enableSortingByTotalGroup", "BOOLEAN", FeatureFlagsValues.enableSortingByTotalGroup)), loadFeature(features, TigerFeaturesNames.ADMeasureValueFilterNullAsZeroOption, "ADMeasureValueFilterNullAsZeroOption", "STRING", FeatureFlagsValues.ADMeasureValueFilterNullAsZeroOption)), loadFeature(features, TigerFeaturesNames.EnableMultipleDates, "enableMultipleDates", "BOOLEAN", FeatureFlagsValues.enableMultipleDates)), loadFeature(features, TigerFeaturesNames.EnableKPIDashboardDeleteFilterButton, "enableKPIDashboardDeleteFilterButton", "BOOLEAN", FeatureFlagsValues.enableKPIDashboardDeleteFilterButton)), loadFeature(features, TigerFeaturesNames.DashboardEditModeDevRollout, "dashboardEditModeDevRollout", "BOOLEAN", FeatureFlagsValues.dashboardEditModeDevRollout)), loadFeature(features, TigerFeaturesNames.EnableMetricSqlAndDataExplain, "enableMetricSqlAndDataExplain", "BOOLEAN", FeatureFlagsValues.enableMetricSqlAndDataExplain)), loadFeature(features, TigerFeaturesNames.EnableLongitudeAndLatitudeLabels, "enableLongitudeAndLatitudeLabels", "BOOLEAN", FeatureFlagsValues.enableLongitudeAndLatitudeLabels)), loadFeature(features, TigerFeaturesNames.EnableDescriptions, "enableDescriptions", "BOOLEAN", FeatureFlagsValues.enableDescriptions)), loadFeature(features, TigerFeaturesNames.EnableAnalyticalDashboardPermissions, "enableAnalyticalDashboardPermissions", "BOOLEAN", FeatureFlagsValues.enableAnalyticalDashboardPermissions)), loadFeature(features, TigerFeaturesNames.EnableFunnelChart, "enableFunnelChart", "BOOLEAN", FeatureFlagsValues.enableFunnelChart)), loadFeature(features, TigerFeaturesNames.EnablePyramidChart, "enablePyramidChart", "BOOLEAN", FeatureFlagsValues.enablePyramidChart)), loadFeature(features, TigerFeaturesNames.EnableSankeyChart, "enableSankeyChart", "BOOLEAN", FeatureFlagsValues.enableSankeyChart)), loadFeature(features, TigerFeaturesNames.EnableDependencyWheelChart, "enableDependencyWheelChart", "BOOLEAN", FeatureFlagsValues.enableDependencyWheelChart)), loadFeature(features, TigerFeaturesNames.EnableWaterfallChart, "enableWaterfallChart", "BOOLEAN", FeatureFlagsValues.enableWaterfallChart)), loadFeature(features, TigerFeaturesNames.EnableSqlDatasets, "enableSqlDatasets", "BOOLEAN", FeatureFlagsValues.enableSqlDatasets)), loadFeature(features, TigerFeaturesNames.EnableCompositeGrain, "enableCompositeGrain", "BOOLEAN", FeatureFlagsValues.enableCompositeGrain)), loadFeature(features, TigerFeaturesNames.EnableTableTotalRows, "enableTableTotalRows", "BOOLEAN", FeatureFlagsValues.enableTableTotalRows)), loadFeature(features, TigerFeaturesNames.EnablePdmRemovalDeprecationPhase, "enablePdmRemovalDeprecationPhase", "BOOLEAN", FeatureFlagsValues.enablePdmRemovalDeprecationPhase)), loadFeature(features, TigerFeaturesNames.EnablePivotTableTransposition, "enablePivotTableTransposition", "BOOLEAN", FeatureFlagsValues.enablePivotTableTransposition)), loadFeature(features, TigerFeaturesNames.EnableColumnHeadersPosition, "enableColumnHeadersPosition", "BOOLEAN", FeatureFlagsValues.enableColumnHeadersPosition)), loadFeature(features, TigerFeaturesNames.EnableNewHeadline, "enableNewHeadline", "BOOLEAN", FeatureFlagsValues.enableNewHeadline)), loadFeature(features, TigerFeaturesNames.EnableAttributeHierarchies, "enableAttributeHierarchies", "BOOLEAN", FeatureFlagsValues.enableAttributeHierarchies)), loadFeature(features, TigerFeaturesNames.EnableUnavailableItemsVisible, "enableUnavailableItemsVisible", "BOOLEAN", FeatureFlagsValues.enableUnavailableItemsVisible));
}
function loadFeature(features, feature, name, outputType, possibleValues) {
    const item = features[feature];
    if (!item) {
        return {};
    }
    const val = getValueByType(item.type, item.value, outputType, possibleValues);
    return val !== undefined ? { [name]: val } : {};
}
function getValueByType(inputType, value, outputType, possibleValues) {
    switch (inputType) {
        case "BOOLEAN":
            if (value !== undefined) {
                return value;
            }
            break;
        case "STRING": {
            const state = convertState(outputType, possibleValues, value);
            if (state !== undefined) {
                return state;
            }
            break;
        }
        default:
            break;
    }
    return undefined;
}
//# sourceMappingURL=feature.js.map