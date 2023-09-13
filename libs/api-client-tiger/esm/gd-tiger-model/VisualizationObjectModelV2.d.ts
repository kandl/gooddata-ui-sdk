import { IBucket, IFilter, ISortItem, VisualizationProperties } from "@gooddata/sdk-model";
/**
 * Visualization object used to store its data as a metadata object
 * @public
 */
export interface IVisualizationObject {
    version: "2";
    visualizationUrl: string;
    buckets: IBucket[];
    filters: IFilter[];
    sorts: ISortItem[];
    properties: VisualizationProperties;
}
/**
 * @public
 */
export declare function isVisualizationObject(visualizationObject: unknown): visualizationObject is IVisualizationObject;
//# sourceMappingURL=VisualizationObjectModelV2.d.ts.map