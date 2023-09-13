import { IVisualizationDescriptor, PluggableVisualizationFactory } from "../../../interfaces/VisualizationDescriptor.js";
import { SankeyChartDescriptor } from "../sankeyChart/SankeyChartDescriptor.js";
export declare class DependencyWheelChartDescriptor extends SankeyChartDescriptor implements IVisualizationDescriptor {
    getFactory(): PluggableVisualizationFactory;
    getEmbeddingCode: (insight: import("@gooddata/sdk-model").IInsightDefinition, config?: import("../../../interfaces/VisualizationDescriptor.js").IEmbeddingCodeConfig) => string;
}
//# sourceMappingURL=DependencyWheelChartDescriptor.d.ts.map