import { IInsightDefinition, ISettings } from "@gooddata/sdk-model";
import { IVisualizationDescriptor, IVisualizationMeta, IVisualizationSizeInfo, PluggableVisualizationFactory } from "../../../interfaces/VisualizationDescriptor.js";
import { IFluidLayoutDescriptor } from "../../../interfaces/LayoutDescriptor.js";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor.js";
export declare class GeoPushpinChartDescriptor extends BaseChartDescriptor implements IVisualizationDescriptor {
    getFactory(): PluggableVisualizationFactory;
    getSizeInfo(_insight: IInsightDefinition, layoutDescriptor: IFluidLayoutDescriptor, settings: ISettings): IVisualizationSizeInfo;
    getEmbeddingCode: (insight: IInsightDefinition, config?: import("../../../interfaces/VisualizationDescriptor.js").IEmbeddingCodeConfig) => string;
    getMeta(): IVisualizationMeta;
    protected getMinHeight(enableCustomHeight: boolean): number;
}
//# sourceMappingURL=GeoPushpinChartDescriptor.d.ts.map