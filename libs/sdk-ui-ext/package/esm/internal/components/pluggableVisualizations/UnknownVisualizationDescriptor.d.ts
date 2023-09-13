import { IInsight } from "@gooddata/sdk-model";
import { IVisualizationDescriptor, IVisualizationMeta, PluggableVisualizationFactory } from "../../interfaces/VisualizationDescriptor";
import { BaseChartDescriptor } from "./baseChart/BaseChartDescriptor";
import { IDrillDownContext } from "../../interfaces/Visualization";
export declare class UnknownVisualizationDescriptor extends BaseChartDescriptor implements IVisualizationDescriptor {
    private uri;
    constructor(uri: string);
    getFactory(): PluggableVisualizationFactory;
    applyDrillDown(insight: IInsight, _drillDownContext: IDrillDownContext, _backendSupportsElementUris: boolean): IInsight;
    getEmbeddingCode: () => string;
    getMeta(): IVisualizationMeta;
}
//# sourceMappingURL=UnknownVisualizationDescriptor.d.ts.map