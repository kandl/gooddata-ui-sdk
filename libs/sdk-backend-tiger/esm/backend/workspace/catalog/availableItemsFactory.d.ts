import { IWorkspaceCatalogAvailableItemsFactory, IWorkspaceCatalogWithAvailableItemsFactoryOptions } from "@gooddata/sdk-backend-spi";
import { IAttributeOrMeasure, IInsightDefinition, ObjRef, CatalogItemType, CatalogItem, ICatalogGroup } from "@gooddata/sdk-model";
import { TigerWorkspaceCatalogWithAvailableItems } from "./catalogWithAvailableItems.js";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerWorkspaceCatalogAvailableItemsFactory implements IWorkspaceCatalogAvailableItemsFactory {
    private readonly authCall;
    private readonly workspace;
    private readonly groups;
    private readonly items;
    private readonly options;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string, groups: ICatalogGroup[], items: CatalogItem[], options?: IWorkspaceCatalogWithAvailableItemsFactoryOptions);
    withOptions(options: Partial<IWorkspaceCatalogWithAvailableItemsFactoryOptions>): IWorkspaceCatalogAvailableItemsFactory;
    forDataset(dataset: ObjRef): IWorkspaceCatalogAvailableItemsFactory;
    forTypes(types: CatalogItemType[]): IWorkspaceCatalogAvailableItemsFactory;
    includeTags(tags: ObjRef[]): IWorkspaceCatalogAvailableItemsFactory;
    excludeTags(tags: ObjRef[]): IWorkspaceCatalogAvailableItemsFactory;
    forItems(items: IAttributeOrMeasure[]): IWorkspaceCatalogAvailableItemsFactory;
    forInsight(insight: IInsightDefinition): IWorkspaceCatalogAvailableItemsFactory;
    withGroups(loadGroups: boolean): IWorkspaceCatalogAvailableItemsFactory;
    load(): Promise<TigerWorkspaceCatalogWithAvailableItems>;
}
/**
 * @internal
 */
export declare function filterAvailableItems(refs: ObjRef[], items: CatalogItem[]): CatalogItem[];
//# sourceMappingURL=availableItemsFactory.d.ts.map