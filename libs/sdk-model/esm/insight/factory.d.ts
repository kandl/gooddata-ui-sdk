import { IInsightDefinition, VisualizationProperties } from "./index.js";
import { IBucket } from "../execution/buckets/index.js";
import { IFilter } from "../execution/filter/index.js";
import { ISortItem } from "../execution/base/sort.js";
/**
 * Creates new, empty insight definition, modifying its content with given modifications.
 *
 * @param visualizationUrl - visualization URL (e.g. local:bar, local:table..)
 * @param modifications - modification function which will be called with builder to update the insight
 * @internal
 */
export declare function newInsightDefinition(visualizationUrl: string, modifications?: InsightModifications): IInsightDefinition;
/**
 * @internal
 */
export type InsightModifications = (builder: InsightDefinitionBuilder) => InsightDefinitionBuilder;
/**
 * Insight definition builder can be used to set various properties of the insight using fluent API.
 *
 * @internal
 */
export declare class InsightDefinitionBuilder {
    private insight;
    constructor(visualizationUrl: string);
    title: (title: string) => InsightDefinitionBuilder;
    buckets: (buckets: IBucket[]) => InsightDefinitionBuilder;
    filters: (filters: IFilter[]) => InsightDefinitionBuilder;
    sorts: (sorts: ISortItem[]) => InsightDefinitionBuilder;
    properties: (properties: VisualizationProperties) => InsightDefinitionBuilder;
    build: () => IInsightDefinition;
}
//# sourceMappingURL=factory.d.ts.map