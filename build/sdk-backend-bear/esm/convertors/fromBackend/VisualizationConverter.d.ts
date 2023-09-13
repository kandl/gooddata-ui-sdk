import { IInsight, IBucket, IUser } from "@gooddata/sdk-model";
import { IBucket as IBearBucket, IObjectLink, IVisualization } from "@gooddata/api-model-bear";
/**
 * @internal
 */
export declare const convertBucket: (bucket: IBearBucket) => IBucket;
/**
 *
 * @internal
 */
export declare const convertVisualization: (visualization: IVisualization, visualizationClassUri: string, userMap?: Map<string, IUser>) => IInsight;
export declare const convertListedVisualization: (visualizationLink: IObjectLink) => IInsight;
//# sourceMappingURL=VisualizationConverter.d.ts.map