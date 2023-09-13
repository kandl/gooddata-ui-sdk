import { IAttributeFilterReference, IDateFilterReference, IWrappedKPI, IWrappedVisualizationWidget } from "@gooddata/api-model-bear";
import { IDashboardFilterReference, IWidget } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare const convertFilterReference: (filterReference: IDateFilterReference | IAttributeFilterReference) => IDashboardFilterReference;
export declare const convertVisualizationWidget: (visualizationWidget: IWrappedVisualizationWidget) => IWidget;
export declare const convertKpi: (kpi: IWrappedKPI) => IWidget;
export declare const convertWidget: (widget: IWrappedKPI | IWrappedVisualizationWidget) => IWidget;
//# sourceMappingURL=widget.d.ts.map