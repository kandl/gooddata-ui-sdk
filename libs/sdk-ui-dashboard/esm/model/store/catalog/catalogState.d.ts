import { ICatalogAttribute, ICatalogFact, ICatalogMeasure, ICatalogDateDataset, ICatalogAttributeHierarchy } from "@gooddata/sdk-model";
/**
 * @public
 */
export interface CatalogState {
    /** @beta */
    attributes?: ICatalogAttribute[];
    /** @beta */
    measures?: ICatalogMeasure[];
    /** @beta */
    dateDatasets?: ICatalogDateDataset[];
    /** @beta */
    facts?: ICatalogFact[];
    /** @beta */
    attributeHierarchies?: ICatalogAttributeHierarchy[];
}
export declare const catalogInitialState: CatalogState;
