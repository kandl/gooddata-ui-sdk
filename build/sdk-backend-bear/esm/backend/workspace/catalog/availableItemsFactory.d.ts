import { IWorkspaceCatalogAvailableItemsFactory, IWorkspaceCatalogWithAvailableItemsFactoryOptions } from "@gooddata/sdk-backend-spi";
import { CatalogItemType, CatalogItem, ICatalogGroup, IAttributeOrMeasure, IInsightDefinition, ObjRef } from "@gooddata/sdk-model";
import { IUriMappings } from "../../../types/catalog.js";
import { BearWorkspaceCatalogWithAvailableItems } from "./catalogWithAvailableItems.js";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearWorkspaceCatalogAvailableItemsFactory implements IWorkspaceCatalogAvailableItemsFactory {
    private readonly authCall;
    private readonly workspace;
    private readonly groups;
    private readonly items;
    private readonly options;
    private readonly mappings;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string, groups: ICatalogGroup[], items: CatalogItem[], options: IWorkspaceCatalogWithAvailableItemsFactoryOptions, mappings: IUriMappings);
    withOptions(options: Partial<IWorkspaceCatalogWithAvailableItemsFactoryOptions>): IWorkspaceCatalogAvailableItemsFactory;
    forDataset(dataset: ObjRef): IWorkspaceCatalogAvailableItemsFactory;
    forTypes(types: CatalogItemType[]): IWorkspaceCatalogAvailableItemsFactory;
    includeTags(tags: ObjRef[]): IWorkspaceCatalogAvailableItemsFactory;
    excludeTags(tags: ObjRef[]): IWorkspaceCatalogAvailableItemsFactory;
    forItems(items: IAttributeOrMeasure[]): IWorkspaceCatalogAvailableItemsFactory;
    forInsight(insight: IInsightDefinition): IWorkspaceCatalogAvailableItemsFactory;
    withGroups(loadGroups: boolean): IWorkspaceCatalogAvailableItemsFactory;
    load(): Promise<BearWorkspaceCatalogWithAvailableItems>;
    private loadAvailableCatalogItems;
    private loadAvailableDateDatasets;
}
//# sourceMappingURL=availableItemsFactory.d.ts.map