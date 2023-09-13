import { IInsightDefinition } from "@gooddata/sdk-model";
import { IChartConfig } from "@gooddata/sdk-ui-charts";
import { IEmbeddingCodeContext } from "../../interfaces/VisualizationDescriptor.js";
import { IAdditionalFactoryDefinition, IInsightToPropConversion } from "../../utils/embeddingCodeGenerator/index.js";
export declare function chartConfigFromInsight(insight: IInsightDefinition, ctx?: IEmbeddingCodeContext): IChartConfig;
export declare function chartAdditionalFactories(options?: {
    getColorMappingPredicatePackage?: string;
}): IAdditionalFactoryDefinition[];
export declare function chartConfigInsightConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey): IInsightToPropConversion<TProps, TPropKey, IChartConfig>;
//# sourceMappingURL=chartCodeGenUtils.d.ts.map