import { Identifier, IInsight, ObjectType, ObjRef, ICatalogAttribute, ICatalogMeasure, ICatalogDateDataset, ICatalogDateAttribute, IAttributeDisplayFormMetadataObject, IAttributeMetadataObject } from "@gooddata/sdk-model";
/**
 * Configuration for the ObjRefMap.
 *
 * @alpha
 */
export interface ObjRefMapConfig<T> {
    /**
     * Function that extracts `ref` from object
     */
    readonly refExtract: (obj: T) => ObjRef;
    /**
     * Function that extracts `id` from object
     */
    readonly idExtract: (obj: T) => Identifier;
    /**
     * Function that extracts `uri` from object
     */
    readonly uriExtract: (obj: T) => string;
    /**
     * Indicates whether strict idRef type-checking is desired. Some backends (e.g. tiger) have identifier
     * refs use combination of `id` and `type` and have type-level `id` uniqueness constraints. On those backends,
     * strict type checks are essential to correctly match objects.
     *
     * On other backends, the `type` information coming in the idRef is superfluous and should not be influencing
     * anything.
     */
    readonly strictTypeCheck: boolean;
    /**
     * Type of object stored in the map.
     */
    readonly type?: ObjectType;
}
/**
 * Utility class that assists with type-agnostic mapping of metadata objects by ObjRef.
 *
 * Problem
 * =======
 *
 * The challenges with ObjRef's start in context of backend that supports both uri and id ref (e.g. bear) and the client.
 *
 * Backend according to contract creates one type of ref - uri ref - so that is fine. However when instances of `ref` are created
 * by the client code and are passed in through the public API (as is the case with the dashboard component) - problems start.
 *
 * For clients it is often more convenient to use ID refs.. because they are transferable across workspaces and because
 * they appear in the catalog export.
 *
 * Doing strict ref-to-ref matching between user input and the data stored in state will result in no matches because
 * the types of ref's do not match.
 *
 * ---
 *
 * This class addresses the problem by having the `get` method check the type of ObjRef first and then perform
 * lookups into either id to item or uri to item mapping.
 *
 * @alpha
 */
export declare class ObjRefMap<T> {
    private readonly config;
    readonly [Symbol.toStringTag]: string;
    size: number;
    private items;
    private itemsByIdentifier;
    private itemsByUri;
    constructor(config: ObjRefMapConfig<T>);
    private idRefToKey;
    private addItem;
    private cleanupUnmappedItems;
    fromItems: (items: ReadonlyArray<T>) => ObjRefMap<T>;
    [Symbol.iterator](): IterableIterator<[ObjRef, T]>;
    entries(): IterableIterator<[ObjRef, T]>;
    get(key: ObjRef): T | undefined;
    has(key: ObjRef): boolean;
    keys(): IterableIterator<ObjRef>;
    values(): IterableIterator<T>;
}
/**
 * Creates {@link ObjRefMap} for catalog date datasets. Either normal attributes or catalog date attributes.
 *
 * @param items - items to add into mapping
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export declare function newCatalogDateDatasetMap(items: ReadonlyArray<ICatalogDateDataset>, strictTypeCheck?: boolean): ObjRefMap<ICatalogDateDataset>;
/**
 * Creates {@link ObjRefMap} for catalog attribute items. Either normal attributes or catalog date attributes.
 *
 * @param items - items to add into mapping
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export declare function newCatalogAttributeMap(items: ReadonlyArray<ICatalogAttribute | ICatalogDateAttribute>, strictTypeCheck?: boolean): ObjRefMap<ICatalogAttribute | ICatalogDateAttribute>;
/**
 * Creates {@link ObjRefMap} for catalog measure items.
 *
 * @param items - items to add into mapping
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export declare function newCatalogMeasureMap(items: ReadonlyArray<ICatalogMeasure>, strictTypeCheck?: boolean): ObjRefMap<ICatalogMeasure>;
/**
 * Creates {@link ObjRefMap} for attribute display form metadata objects.
 *
 * @param items - items to add into map
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export declare function newDisplayFormMap(items: ReadonlyArray<IAttributeDisplayFormMetadataObject>, strictTypeCheck?: boolean): ObjRefMap<IAttributeDisplayFormMetadataObject>;
/**
 * Creates {@link ObjRefMap} for attribute metadata objects.
 *
 * @param items - items to add into map
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export declare function newAttributeMap(items: IAttributeMetadataObject[], strictTypeCheck?: boolean): ObjRefMap<IAttributeMetadataObject>;
/**
 * Creates {@link ObjRefMap} for any object of any type granted that it contains `ref` property with ObjRef.
 *
 * The map will be setup so that it extracts id and uri from the `ref` - thus ensuring that objects that are
 * both uri and identifier refs are indexed properly.
 *
 * Storing objects whose `ref` is of both types then allows lookup of those objects externally using either id
 * or uri.
 *
 * @param items - items to insert
 * @param type - type of objects, may be undefined
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export declare function newMapForObjectWithIdentity<T extends {
    identifier: Identifier;
    uri: string;
    ref: ObjRef;
}>(items: T[], type?: ObjectType, strictTypeCheck?: boolean): ObjRefMap<T>;
/**
 * Creates {@link ObjRefMap} for insights.
 *
 * @param items - items to add into mapping
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export declare function newInsightMap(items: ReadonlyArray<IInsight>, strictTypeCheck?: boolean): ObjRefMap<IInsight>;
