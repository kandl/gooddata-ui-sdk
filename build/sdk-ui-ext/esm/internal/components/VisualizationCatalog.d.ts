import { IInsightDefinition } from "@gooddata/sdk-model";
import { IVisualizationDescriptor } from "../interfaces/VisualizationDescriptor.js";
/**
 * Visualization catalog is able to resolve visualization class to factory function that will
 * create respective pluggable visualization.
 *
 * @alpha
 */
export interface IVisualizationCatalog {
    /**
     * Looks up pluggable visualization descriptor by vis class URI.
     *
     * @param uri - visualization URI (in format such as local:<type>)
     * @alpha
     */
    forUri(uri: string): IVisualizationDescriptor;
    /**
     * Looks up whether there is a pluggable visualization descriptor for a given vis class URI.
     *
     * @param uri - visualization URI (in format such as local:<type>)
     * @alpha
     */
    hasDescriptorForUri(uri: string): boolean;
    /**
     * Looks up pluggable visualization descriptor that provides all access to the visualization.
     *
     * @param insight - insight to render
     * @alpha
     */
    forInsight(insight: IInsightDefinition): IVisualizationDescriptor;
    /**
     * Looks up whether there is a pluggable visualization descriptor for the provided insight.
     *
     * @param insight - insight to query for
     * @alpha
     */
    hasDescriptorForInsight(insight: IInsightDefinition): boolean;
}
type TypeToClassMapping = {
    [type: string]: any;
};
/**
 * @internal
 */
export declare class CatalogViaTypeToClassMap implements IVisualizationCatalog {
    private readonly mapping;
    constructor(mapping: TypeToClassMapping);
    forUri(uri: string): IVisualizationDescriptor;
    hasDescriptorForUri(uri: string): boolean;
    forInsight(insight: IInsightDefinition): IVisualizationDescriptor;
    hasDescriptorForInsight(insight: IInsightDefinition): boolean;
    private findInMapping;
}
/**
 * Default pluggable visualization catalog. This is implemented using static lookup table between vis type
 * and the actual plug vis implementation.
 *
 * @alpha
 */
export declare const DefaultVisualizationCatalog: IVisualizationCatalog;
/**
 * Pluggable visualization catalog containing all available visualizations.
 *
 * @alpha
 */
export declare const FullVisualizationCatalog: IVisualizationCatalog;
export {};
//# sourceMappingURL=VisualizationCatalog.d.ts.map