import { IWorkspaceCatalogWithAvailableItems, IWorkspaceCatalogWithAvailableItemsFactoryOptions } from "@gooddata/sdk-backend-spi";
import { CatalogItem, ICatalogGroup, ICatalogAttribute, ICatalogFact, ICatalogMeasure, ICatalogDateDataset, ICatalogAttributeHierarchy } from "@gooddata/sdk-model";
export declare class TigerWorkspaceCatalogWithAvailableItems implements IWorkspaceCatalogWithAvailableItems {
    private readonly catalogGroups;
    private readonly items;
    private readonly availableItems;
    private readonly options;
    constructor(catalogGroups: ICatalogGroup[], items: CatalogItem[], availableItems: CatalogItem[], options: IWorkspaceCatalogWithAvailableItemsFactoryOptions);
    groups(): ICatalogGroup[];
    allItems(): CatalogItem[];
    attributes(): ICatalogAttribute[];
    measures(): ICatalogMeasure[];
    facts(): ICatalogFact[];
    dateDatasets(): ICatalogDateDataset[];
    attributeHierarchies(): ICatalogAttributeHierarchy[];
    allAvailableItems(): CatalogItem[];
    availableAttributes(): ICatalogAttribute[];
    availableMeasures(): ICatalogMeasure[];
    availableFacts(): ICatalogFact[];
    availableDateDatasets(): ICatalogDateDataset[];
    availableAttributeHierarchies(): ICatalogAttributeHierarchy[];
}
//# sourceMappingURL=catalogWithAvailableItems.d.ts.map