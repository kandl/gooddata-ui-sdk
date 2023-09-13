import { IInsight } from "@gooddata/sdk-model";
import { IVisualizationMeta, PluggableVisualizationFactory } from "../../../interfaces/VisualizationDescriptor.js";
import { BigChartDescriptor } from "../BigChartDescriptor.js";
import { IDrillDownContext } from "../../../interfaces/Visualization.js";
export declare class TreemapDescriptor extends BigChartDescriptor {
    getFactory(): PluggableVisualizationFactory;
    applyDrillDown(source: IInsight, drillDownContext: IDrillDownContext, backendSupportsElementUris: boolean): IInsight;
    getEmbeddingCode: (insight: import("@gooddata/sdk-model").IInsightDefinition, config?: import("../../../interfaces/VisualizationDescriptor.js").IEmbeddingCodeConfig) => string;
    getMeta(): IVisualizationMeta;
    private addFilters;
}
//# sourceMappingURL=TreemapDescriptor.d.ts.map