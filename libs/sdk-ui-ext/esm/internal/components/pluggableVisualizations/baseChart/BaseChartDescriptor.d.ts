import { IInsight, IInsightDefinition, ISettings } from "@gooddata/sdk-model";
import { IVisualizationDescriptor, IVisualizationMeta, IVisualizationSizeInfo, PluggableVisualizationFactory } from "../../../interfaces/VisualizationDescriptor.js";
import { IFluidLayoutDescriptor } from "../../../interfaces/LayoutDescriptor.js";
import { IDrillDownContext } from "../../../interfaces/Visualization.js";
export declare abstract class BaseChartDescriptor implements IVisualizationDescriptor {
    abstract getFactory(): PluggableVisualizationFactory;
    abstract getMeta(): IVisualizationMeta;
    getSizeInfo(_insight: IInsightDefinition, layoutDescriptor: IFluidLayoutDescriptor, settings: ISettings): IVisualizationSizeInfo;
    protected getDefaultHeight(enableCustomHeight: boolean): number;
    protected getMinHeight(enableCustomHeight: boolean): number;
    protected getMaxHeight(enableCustomHeight: boolean): number;
    applyDrillDown(insight: IInsight, drillDownContext: IDrillDownContext, backendSupportsElementUris: boolean): IInsight;
}
//# sourceMappingURL=BaseChartDescriptor.d.ts.map