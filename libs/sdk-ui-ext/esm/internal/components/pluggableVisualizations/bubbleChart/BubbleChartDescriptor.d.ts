import { IVisualizationDescriptor, IVisualizationMeta, PluggableVisualizationFactory } from "../../../interfaces/VisualizationDescriptor.js";
import { BigChartDescriptor } from "../BigChartDescriptor.js";
export declare class BubbleChartDescriptor extends BigChartDescriptor implements IVisualizationDescriptor {
    getFactory(): PluggableVisualizationFactory;
    getEmbeddingCode: (insight: import("@gooddata/sdk-model").IInsightDefinition, config?: import("../../../interfaces/VisualizationDescriptor.js").IEmbeddingCodeConfig) => string;
    getMeta(): IVisualizationMeta;
}
//# sourceMappingURL=BubbleChartDescriptor.d.ts.map