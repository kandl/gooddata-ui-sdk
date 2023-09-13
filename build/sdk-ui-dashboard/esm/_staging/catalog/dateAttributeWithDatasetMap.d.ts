import { ICatalogDateDataset, ICatalogDateAttribute } from "@gooddata/sdk-model";
import { ObjRefMap } from "../metadata/objRefMap.js";
/**
 * @internal
 */
export type CatalogDateAttributeWithDataset = {
    readonly attribute: ICatalogDateAttribute;
    readonly dataset: ICatalogDateDataset;
};
/**
 * Creates an {@link ObjRefMap} mapping date attribute ObjRef to an entry that contains the date attribute and the date dataset to which it belongs
 *
 * @param items - items to add to mapping
 * @param strictTypeCheck - whether to do strict type checking in idRefs
 * @internal
 */
export declare function newCatalogDateAttributeWithDatasetMap(items: ReadonlyArray<CatalogDateAttributeWithDataset>, strictTypeCheck?: boolean): ObjRefMap<CatalogDateAttributeWithDataset>;
