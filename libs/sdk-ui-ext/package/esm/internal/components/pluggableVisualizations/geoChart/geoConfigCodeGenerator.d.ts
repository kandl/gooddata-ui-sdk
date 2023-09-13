import { IAttribute, IInsightDefinition } from "@gooddata/sdk-model";
import { IGeoConfig } from "@gooddata/sdk-ui-geo";
import { IEmbeddingCodeContext } from "../../../interfaces/VisualizationDescriptor";
import { IInsightToPropConversion, PropWithMeta } from "../../../utils/embeddingCodeGenerator";
export declare function geoConfigFromInsight(insight: IInsightDefinition, ctx?: IEmbeddingCodeContext): IGeoConfig;
export declare function geoInsightConversion<TProps extends object, TPropKey extends keyof TProps>(propName: TPropKey, bucketName: string): IInsightToPropConversion<TProps, TPropKey, IAttribute>;
export declare function mapBoxTokenPlaceholder(): IGeoConfig;
export declare function isGeoChart(insightDefinition: IInsightDefinition): boolean;
export declare function geoConfigForInsightViewComponent(): PropWithMeta<IGeoConfig> | undefined;
//# sourceMappingURL=geoConfigCodeGenerator.d.ts.map