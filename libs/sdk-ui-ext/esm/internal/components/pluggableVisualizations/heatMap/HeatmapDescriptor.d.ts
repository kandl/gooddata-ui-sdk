import { IInsight } from "@gooddata/sdk-model";
import { IVisualizationDescriptor, IVisualizationMeta, PluggableVisualizationFactory } from "../../../interfaces/VisualizationDescriptor.js";
import { BigChartDescriptor } from "../BigChartDescriptor.js";
import { IDrillDownContext } from "../../../interfaces/Visualization.js";
export declare class HeatmapDescriptor extends BigChartDescriptor implements IVisualizationDescriptor {
    getFactory(): PluggableVisualizationFactory;
    applyDrillDown(insight: IInsight, drillDownContext: IDrillDownContext, backendSupportsElementUris: boolean): IInsight;
    getEmbeddingCode: (insight: import("@gooddata/sdk-model").IInsightDefinition, config?: import("../../../interfaces/VisualizationDescriptor.js").IEmbeddingCodeConfig) => string;
    getMeta(): IVisualizationMeta;
    private addFilters;
}
//# sourceMappingURL=HeatmapDescriptor.d.ts.map