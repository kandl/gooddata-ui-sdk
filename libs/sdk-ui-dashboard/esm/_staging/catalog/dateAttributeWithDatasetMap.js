import { ObjRefMap } from "../metadata/objRefMap.js";
/**
 * Creates an {@link ObjRefMap} mapping date attribute ObjRef to an entry that contains the date attribute and the date dataset to which it belongs
 *
 * @param items - items to add to mapping
 * @param strictTypeCheck - whether to do strict type checking in idRefs
 * @internal
 */
export function newCatalogDateAttributeWithDatasetMap(items, strictTypeCheck = false) {
    const config = {
        type: "attribute",
        strictTypeCheck,
        idExtract: (i) => i.attribute.attribute.id,
        uriExtract: (i) => i.attribute.attribute.uri,
        refExtract: (i) => i.attribute.attribute.ref,
    };
    const map = new ObjRefMap(config);
    return map.fromItems(items);
}
//# sourceMappingURL=dateAttributeWithDatasetMap.js.map