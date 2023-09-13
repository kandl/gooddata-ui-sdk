import { IInsight } from "@gooddata/sdk-model";
import { IVisualizationDescriptor, IVisualizationMeta, PluggableVisualizationFactory } from "../../../interfaces/VisualizationDescriptor";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor";
import { IDrillDownContext } from "../../../interfaces/Visualization";
export declare class ColumnChartDescriptor extends BaseChartDescriptor implements IVisualizationDescriptor {
    getFactory(): PluggableVisualizationFactory;
    applyDrillDown(insight: IInsight, drillDownContext: IDrillDownContext, backendSupportsElementUris: boolean): IInsight;
    getEmbeddingCode: (insight: import("@gooddata/sdk-model").IInsightDefinition, config?: import("../../../interfaces/VisualizationDescriptor").IEmbeddingCodeConfig) => string;
    getMeta(): IVisualizationMeta;
    private adjustIntersectionForColumnBar;
    private addFiltersForColumnBar;
}
//# sourceMappingURL=ColumnChartDescriptor.d.ts.map