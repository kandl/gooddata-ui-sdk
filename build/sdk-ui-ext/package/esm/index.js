// (C) 2007-2022 GoodData Corporation
/**
 * This package contains various extensions on top of the stable components included in GoodData.UI.
 *
 * @remarks
 * The extensions land here instead of their own project as part of their staged development.
 *
 * Notable member of the package is InsightView, the component that allows you to embed
 * Analytical Designer insights.
 *
 * @packageDocumentation
 */
import { fluidLayoutDescriptor, FullVisualizationCatalog, } from "./internal";
export { clearInsightViewCaches } from "./dataLoaders";
export * from "./insightView";
// exported for sdk-ui-dashboard
export { isDrillDownDefinition, fluidLayoutDescriptor, FluidLayoutDescriptor, isEmptyAfm, EmptyAfmSdkError, PluggableVisualizationErrorCodes, addIntersectionFiltersToInsight, DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT_PX, INSIGHT_WIDGET_SIZE_INFO_DEFAULT, INSIGHT_WIDGET_SIZE_INFO_DEFAULT_LEGACY, KPI_WIDGET_SIZE_INFO_DEFAULT, KPI_WIDGET_SIZE_INFO_DEFAULT_LEGACY, WIDGET_DROPZONE_SIZE_INFO_DEFAULT, EmbedInsightDialog, } from "./internal";
// below functions are exported only for sdk-ui-dashboard use to avoid exporting the whole FullVisualizationCatalog
/**
 * @internal
 */
export function getInsightSizeInfo(insight, settings) {
    return FullVisualizationCatalog.forInsight(insight).getSizeInfo(insight, fluidLayoutDescriptor, settings);
}
/**
 * @internal
 */
export function getInsightWithAppliedDrillDown(insight, drillEvent, drillDefinition, backendSupportsElementUris) {
    return FullVisualizationCatalog.forInsight(insight).applyDrillDown(insight, {
        drillDefinition,
        event: drillEvent,
    }, backendSupportsElementUris);
}
/**
 * @internal
 */
export function getInsightVisualizationMeta(insight) {
    return FullVisualizationCatalog.forInsight(insight).getMeta();
}
//# sourceMappingURL=index.js.map