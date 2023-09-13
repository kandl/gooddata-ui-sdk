import { IWorkspaceCatalogAvailableItemsFactory, IWorkspaceCatalogFactoryOptions, IWorkspaceCatalog } from "@gooddata/sdk-backend-spi";
import { CatalogItem, ICatalogGroup, ICatalogAttribute, ICatalogFact, ICatalogMeasure, ICatalogDateDataset, ICatalogAttributeHierarchy } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerWorkspaceCatalog implements IWorkspaceCatalog {
    private readonly authCall;
    private readonly workspace;
    private readonly catalogGroups;
    private readonly items;
    private readonly options;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string, catalogGroups: ICatalogGroup[], items: CatalogItem[], options: IWorkspaceCatalogFactoryOptions);
    groups(): ICatalogGroup[];
    allItems(): CatalogItem[];
    attributes(): ICatalogAttribute[];
    measures(): ICatalogMeasure[];
    facts(): ICatalogFact[];
    dateDatasets(): ICatalogDateDataset[];
    attributeHierarchies(): ICatalogAttributeHierarchy[];
    availableItems(): IWorkspaceCatalogAvailableItemsFactory;
}
//# sourceMappingURL=catalog.d.ts.map