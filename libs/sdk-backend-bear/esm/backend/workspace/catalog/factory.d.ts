import { IWorkspaceCatalogFactory, IWorkspaceCatalogFactoryOptions } from "@gooddata/sdk-backend-spi";
import { ObjRef, CatalogItemType } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
import { BearWorkspaceCatalog } from "./catalog.js";
export declare class BearWorkspaceCatalogFactory implements IWorkspaceCatalogFactory {
    private readonly authCall;
    readonly workspace: string;
    readonly options: IWorkspaceCatalogFactoryOptions;
    private tagsAndDatasetIdsPromise;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string, options?: IWorkspaceCatalogFactoryOptions);
    withOptions(options: Partial<IWorkspaceCatalogFactoryOptions>): IWorkspaceCatalogFactory;
    forDataset(dataset: ObjRef): IWorkspaceCatalogFactory;
    forTypes(types: CatalogItemType[]): IWorkspaceCatalogFactory;
    includeTags(tags: ObjRef[]): IWorkspaceCatalogFactory;
    excludeTags(tags: ObjRef[]): IWorkspaceCatalogFactory;
    withGroups(loadGroups: boolean): IWorkspaceCatalogFactory;
    load(): Promise<BearWorkspaceCatalog>;
    private loadAllCatalogItemsAndMappings;
    private loadDateDatasets;
    private loadBearCatalogItems;
    private loadBearAttributes;
    private loadCatalogGroups;
    private getTagsAndDatasetIds;
}
//# sourceMappingURL=factory.d.ts.map