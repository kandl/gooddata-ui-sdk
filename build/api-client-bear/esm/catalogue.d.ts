import { XhrModule } from "./xhr.js";
import { ExecutionModule } from "./execution.js";
import { CatalogItem, ICatalogGroup, ILoadAvailableCatalogItemsParams, ILoadCatalogGroupsParams, ILoadCatalogItemsParams, ILoadDateDataSetsParams, ItemDescription, IDateDataSet, IVisualizationObjectContent, IDataset } from "@gooddata/api-model-bear";
/**
 * @internal
 */
export declare const unwrapItemDescriptionObject: (itemDescription: ItemDescription) => string;
export declare class CatalogueModule {
    private xhr;
    private execution;
    constructor(xhr: XhrModule, execution: ExecutionModule);
    /**
     * Load all catalog items
     * @param projectId - string
     * @param options - ILoadCatalogItemsParams
     */
    loadAllItems(projectId: string, options?: ILoadCatalogItemsParams): Promise<CatalogItem[]>;
    /**
     * Load catalog groups
     * @param projectId - string
     * @param options - ILoadCatalogGroupsParams
     */
    loadGroups(projectId: string, options?: ILoadCatalogGroupsParams): Promise<ICatalogGroup[]>;
    /**
     * Load available item uris by already used uris and expressions
     * @param projectId - string
     * @param options - ILoadAvailableCatalogItemsParams
     */
    loadAvailableItemUris(projectId: string, options: ILoadAvailableCatalogItemsParams): Promise<string[]>;
    loadItems(projectId: string, options?: any): Promise<any>;
    loadDateDataSets(projectId: string, options: ILoadDateDataSetsParams): Promise<{
        dateDataSets: IDateDataSet[];
        unavailableDateDataSetsCount?: number | undefined;
    }>;
    /**
     * Loads item description objects and returns them
     *
     * @internal
     *
     * @param projectId - id of the project to load from
     * @param mdObj - metadata object containing buckets, visualization class, properties etc.
     * @param attributesMap - contains map of attributes where the keys are the attributes display forms URIs
     * @param removeDateItems - whether to skip date items
     * @returns ItemDescription which is either `{ uri: string }` or `{ expression: string }`
     */
    loadItemDescriptionObjects(projectId: string, mdObj: IVisualizationObjectContent, attributesMap?: any, removeDateItems?: boolean): Promise<ItemDescription[]>;
    /**
     * Loads all available data sets.
     * @param projectId - id of the project to load from
     */
    loadDataSets(projectId: string): Promise<IDataset[]>;
    private requestDateDataSets;
    private loadCatalog;
}
//# sourceMappingURL=catalogue.d.ts.map