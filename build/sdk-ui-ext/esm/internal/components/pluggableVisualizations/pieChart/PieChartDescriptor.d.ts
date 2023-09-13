import { IVisualizationDescriptor, IVisualizationMeta, PluggableVisualizationFactory } from "../../../interfaces/VisualizationDescriptor.js";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor.js";
export declare class PieChartDescriptor extends BaseChartDescriptor implements IVisualizationDescriptor {
    getFactory(): PluggableVisualizationFactory;
    getEmbeddingCode: (insight: import("@gooddata/sdk-model").IInsightDefinition, config?: import("../../../interfaces/VisualizationDescriptor.js").IEmbeddingCodeConfig) => string;
    getMeta(): IVisualizationMeta;
}
//# sourceMappingURL=PieChartDescriptor.d.ts.map