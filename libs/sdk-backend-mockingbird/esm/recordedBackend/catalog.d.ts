import { IWorkspaceCatalogFactoryOptions, IWorkspaceCatalog, IWorkspaceCatalogFactory } from "@gooddata/sdk-backend-spi";
import { ObjRef, CatalogItemType } from "@gooddata/sdk-model";
import { RecordedBackendConfig, RecordingIndex } from "./types.js";
/**
 * @internal
 */
export declare class RecordedCatalogFactory implements IWorkspaceCatalogFactory {
    readonly workspace: string;
    private readonly recordings;
    private readonly config;
    readonly options: IWorkspaceCatalogFactoryOptions;
    constructor(workspace: string, recordings?: RecordingIndex, config?: RecordedBackendConfig, options?: IWorkspaceCatalogFactoryOptions);
    forDataset: (dataset: ObjRef) => IWorkspaceCatalogFactory;
    forTypes: (types: CatalogItemType[]) => IWorkspaceCatalogFactory;
    includeTags: (tags: ObjRef[]) => IWorkspaceCatalogFactory;
    excludeTags: (tags: ObjRef[]) => IWorkspaceCatalogFactory;
    withOptions: (options: Partial<IWorkspaceCatalogFactoryOptions>) => IWorkspaceCatalogFactory;
    withGroups(loadGroups: boolean): IWorkspaceCatalogFactory;
    load: () => Promise<IWorkspaceCatalog>;
    private convertToCatalogItem;
}
//# sourceMappingURL=catalog.d.ts.map