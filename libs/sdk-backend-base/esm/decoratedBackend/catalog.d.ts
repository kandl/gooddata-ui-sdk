import { IWorkspaceCatalog, IWorkspaceCatalogAvailableItemsFactory, IWorkspaceCatalogFactory, IWorkspaceCatalogFactoryOptions } from "@gooddata/sdk-backend-spi";
import { ObjRef, CatalogItemType, CatalogItem, ICatalogGroup, ICatalogAttribute, ICatalogFact, ICatalogMeasure, ICatalogDateDataset, ICatalogAttributeHierarchy } from "@gooddata/sdk-model";
/**
 * @alpha
 */
export type WorkspaceCatalogWrapper = (catalog: IWorkspaceCatalog) => IWorkspaceCatalog;
/**
 * @alpha
 */
export declare abstract class DecoratedWorkspaceCatalogFactory implements IWorkspaceCatalogFactory {
    private decorated;
    protected readonly wrapper: WorkspaceCatalogWrapper;
    options: IWorkspaceCatalogFactoryOptions;
    workspace: string;
    protected constructor(decorated: IWorkspaceCatalogFactory, wrapper?: WorkspaceCatalogWrapper);
    forDataset(dataset: ObjRef): IWorkspaceCatalogFactory;
    forTypes(types: CatalogItemType[]): IWorkspaceCatalogFactory;
    excludeTags(tags: ObjRef[]): IWorkspaceCatalogFactory;
    includeTags(tags: ObjRef[]): IWorkspaceCatalogFactory;
    withOptions(options: IWorkspaceCatalogFactoryOptions): IWorkspaceCatalogFactory;
    withGroups(loadGroups: boolean): IWorkspaceCatalogFactory;
    load(): Promise<IWorkspaceCatalog>;
    /**
     * Methods that create new instances of catalog loader (e.g. all except load) will
     * call out to this method to create decorated loader. This is essential to maintain the decoration
     * during immutable operations where decorated implementation creates new instances.
     *
     * @param decorated - instance to decorate
     */
    protected abstract createNew(decorated: IWorkspaceCatalogFactory): IWorkspaceCatalogFactory;
}
/**
 * @alpha
 */
export declare abstract class DecoratedWorkspaceCatalog implements IWorkspaceCatalog {
    private readonly decorated;
    protected constructor(decorated: IWorkspaceCatalog);
    availableItems(): IWorkspaceCatalogAvailableItemsFactory;
    attributes(): ICatalogAttribute[];
    dateDatasets(): ICatalogDateDataset[];
    facts(): ICatalogFact[];
    groups(): ICatalogGroup[];
    allItems(): CatalogItem[];
    measures(): ICatalogMeasure[];
    attributeHierarchies(): ICatalogAttributeHierarchy[];
}
//# sourceMappingURL=catalog.d.ts.map