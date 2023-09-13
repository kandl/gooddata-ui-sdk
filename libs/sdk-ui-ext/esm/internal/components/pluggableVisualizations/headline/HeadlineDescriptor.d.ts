import { ISettings, IInsight, IInsightDefinition } from "@gooddata/sdk-model";
import { IVisualizationSizeInfo, IVisualizationDescriptor, PluggableVisualizationFactory, IVisualizationMeta } from "../../../interfaces/VisualizationDescriptor.js";
import { IFluidLayoutDescriptor } from "../../../interfaces/LayoutDescriptor.js";
export declare class HeadlineDescriptor implements IVisualizationDescriptor {
    getFactory(): PluggableVisualizationFactory;
    getSizeInfo(insight: IInsightDefinition, layoutDescriptor: IFluidLayoutDescriptor, settings: ISettings): IVisualizationSizeInfo;
    private getDefaultHeight;
    private getMinHeight;
    private getMaxHeight;
    applyDrillDown(insight: IInsight): IInsight;
    getEmbeddingCode: (insight: IInsightDefinition, config?: import("../../../interfaces/VisualizationDescriptor.js").IEmbeddingCodeConfig) => string;
    getMeta(): IVisualizationMeta;
}
//# sourceMappingURL=HeadlineDescriptor.d.ts.map