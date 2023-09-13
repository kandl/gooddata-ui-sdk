import { AfmObjectIdentifier, AttributeExecutionResultHeader, AttributeHeaderOut, ExecutionResultHeader, ResultDimensionHeader, MeasureExecutionResultHeader, TotalExecutionResultHeader } from "../generated/afm-rest-api/index.js";
import { JsonApiFilterContextIn, JsonApiVisualizationObjectOutWithLinks, JsonApiDashboardPluginOutWithLinks } from "../generated/metadata-json-api/index.js";
/**
 * @public
 */
export declare function isAttributeHeader(header: ResultDimensionHeader): header is AttributeHeaderOut;
/**
 * @public
 */
export declare const isAfmObjectIdentifier: (value: unknown) => value is AfmObjectIdentifier;
/**
 * @public
 */
export declare function isResultAttributeHeader(header: ExecutionResultHeader): header is AttributeExecutionResultHeader;
/**
 * @public
 */
export declare function isResultMeasureHeader(header: ExecutionResultHeader): header is MeasureExecutionResultHeader;
/**
 * @public
 */
export declare function isResultTotalHeader(header: ExecutionResultHeader): header is TotalExecutionResultHeader;
/**
 * @public
 */
export declare function isVisualizationObjectsItem(visualizationObject: unknown): visualizationObject is JsonApiVisualizationObjectOutWithLinks;
/**
 * @public
 */
export declare function isFilterContextData(filterContext: unknown): filterContext is JsonApiFilterContextIn;
/**
 * @public
 */
export declare function isDashboardPluginsItem(dashboardPlugin: unknown): dashboardPlugin is JsonApiDashboardPluginOutWithLinks;
//# sourceMappingURL=typeGuards.d.ts.map