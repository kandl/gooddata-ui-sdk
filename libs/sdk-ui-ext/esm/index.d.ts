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
import { IInsight, IInsightDefinition, ISettings } from "@gooddata/sdk-model";
import { IDrillEvent } from "@gooddata/sdk-ui";
import { IDrillDownDefinition, IVisualizationSizeInfo, IVisualizationMeta } from "./internal/index.js";
export { clearInsightViewCaches } from "./dataLoaders/index.js";
export * from "./insightView/index.js";
export { IDrillDownDefinition, isDrillDownDefinition, IVisualizationSizeInfo, IVisualizationDefaultSizeInfo, IVisualizationMeta, ISizeInfo, ISizeInfoDefault, fluidLayoutDescriptor, FluidLayoutDescriptor, IFluidLayoutDescriptor, ILayoutDescriptor, LayoutType, isEmptyAfm, EmptyAfmSdkError, PluggableVisualizationErrorCodes, PluggableVisualizationErrorType, addIntersectionFiltersToInsight, DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT_PX, INSIGHT_WIDGET_SIZE_INFO_DEFAULT, INSIGHT_WIDGET_SIZE_INFO_DEFAULT_LEGACY, KPI_WIDGET_SIZE_INFO_DEFAULT, KPI_WIDGET_SIZE_INFO_DEFAULT_LEGACY, WIDGET_DROPZONE_SIZE_INFO_DEFAULT, EmbedInsightDialog, IEmbedInsightDialogProps, } from "./internal/index.js";
export { provideCreateRoot, CreateRoot, Root } from "./internal/createRootProvider.js";
/**
 * @internal
 */
export declare function getInsightSizeInfo(insight: IInsightDefinition, settings: ISettings): IVisualizationSizeInfo;
/**
 * @internal
 */
export declare function getInsightWithAppliedDrillDown(insight: IInsight, drillEvent: IDrillEvent, drillDefinition: IDrillDownDefinition, backendSupportsElementUris: boolean): IInsight;
/**
 * @internal
 */
export declare function getInsightVisualizationMeta(insight: IInsightDefinition): IVisualizationMeta;
//# sourceMappingURL=index.d.ts.map