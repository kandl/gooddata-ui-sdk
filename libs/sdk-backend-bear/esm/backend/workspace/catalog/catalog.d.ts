import { IWorkspaceCatalogAvailableItemsFactory, IWorkspaceCatalogFactoryOptions, IWorkspaceCatalog } from "@gooddata/sdk-backend-spi";
import { CatalogItem, ICatalogGroup, ICatalogAttribute, ICatalogFact, ICatalogMeasure, ICatalogDateDataset, ICatalogAttributeHierarchy } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
import { IUriMappings } from "../../../types/catalog.js";
export declare class BearWorkspaceCatalog implements IWorkspaceCatalog {
    private readonly authCall;
    private readonly workspace;
    private readonly catalogGroups;
    private readonly items;
    private readonly options;
    private readonly mappings;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string, catalogGroups: ICatalogGroup[], items: CatalogItem[], options: IWorkspaceCatalogFactoryOptions, mappings: IUriMappings);
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