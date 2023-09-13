import { IWorkspaceCatalog, IWorkspaceCatalogFactory, IWorkspaceCatalogFactoryOptions } from "@gooddata/sdk-backend-spi";
import { ObjRef, CatalogItemType } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerWorkspaceCatalogFactory implements IWorkspaceCatalogFactory {
    private readonly authCall;
    readonly workspace: string;
    readonly options: IWorkspaceCatalogFactoryOptions;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string, options?: IWorkspaceCatalogFactoryOptions);
    withOptions: (options: Partial<IWorkspaceCatalogFactoryOptions>) => IWorkspaceCatalogFactory;
    forDataset: (dataset: ObjRef) => IWorkspaceCatalogFactory;
    forTypes: (types: CatalogItemType[]) => IWorkspaceCatalogFactory;
    includeTags: (tags: ObjRef[]) => IWorkspaceCatalogFactory;
    excludeTags: (tags: ObjRef[]) => IWorkspaceCatalogFactory;
    withGroups(loadGroups: boolean): IWorkspaceCatalogFactory;
    load: () => Promise<IWorkspaceCatalog>;
    private getCatalogItemSortingKey;
    private loadAttributesAndDatesAndHierarchies;
    private loadMeasures;
    private loadFacts;
    private extractGroups;
}
//# sourceMappingURL=factory.d.ts.map