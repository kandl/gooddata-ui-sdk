var _a;
// (C) 2021-2022 GoodData Corporation
import { insightId, insightRef, insightUri, isIdentifierRef, } from "@gooddata/sdk-model";
import values from "lodash/values.js";
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
export class ObjRefMap {
    constructor(config) {
        this.config = config;
        this[_a] = "ObjRefMap";
        this.size = 0;
        this.items = [];
        this.itemsByIdentifier = {};
        this.itemsByUri = {};
        this.idRefToKey = (identifier, type) => {
            return !this.config.strictTypeCheck || !type ? identifier : `${identifier}#${type}`;
        };
        this.addItem = (item) => {
            const { refExtract, uriExtract, idExtract } = this.config;
            const uri = uriExtract(item);
            const identifier = idExtract(item);
            this.itemsByUri[uri] = item;
            this.itemsByIdentifier[this.idRefToKey(identifier, this.config.type)] = item;
            this.items.push([refExtract(item), item]);
            this.size++;
        };
        this.cleanupUnmappedItems = () => {
            const allItems = values(this.itemsByUri).concat(values(this.itemsByIdentifier));
            this.items = this.items.filter(([_, item]) => {
                return allItems.find((mappedItem) => mappedItem === item);
            });
        };
        this.fromItems = (items) => {
            items.forEach(this.addItem);
            this.cleanupUnmappedItems();
            return this;
        };
    }
    [(_a = Symbol.toStringTag, Symbol.iterator)]() {
        return this.items[Symbol.iterator]();
    }
    entries() {
        return this.items[Symbol.iterator]();
    }
    get(key) {
        if (isIdentifierRef(key)) {
            const strictMatch = this.itemsByIdentifier[this.idRefToKey(key.identifier, key.type)];
            if (!strictMatch && !key.type && this.config.strictTypeCheck) {
                console.warn("You are working with an analytical backend which can only match entities by idRefs that contain both identifier and type. However, while trying to find match an object by ref your code supplied just the identifier without type.");
            }
            return strictMatch;
        }
        return this.itemsByUri[key.uri];
    }
    has(key) {
        return this.get(key) !== undefined;
    }
    keys() {
        return this.items.map((i) => i[0])[Symbol.iterator]();
    }
    values() {
        return this.items.map((i) => i[1])[Symbol.iterator]();
    }
}
const metadataObjectExtractors = {
    idExtract: (i) => i.id,
    uriExtract: (i) => i.uri,
    refExtract: (i) => i.ref,
};
/**
 * Creates {@link ObjRefMap} for catalog date datasets. Either normal attributes or catalog date attributes.
 *
 * @param items - items to add into mapping
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export function newCatalogDateDatasetMap(items, strictTypeCheck = false) {
    const map = new ObjRefMap({
        type: "dataSet",
        strictTypeCheck,
        idExtract: (i) => i.dataSet.id,
        uriExtract: (i) => i.dataSet.uri,
        refExtract: (i) => i.dataSet.ref,
    });
    return map.fromItems(items);
}
/**
 * Creates {@link ObjRefMap} for catalog attribute items. Either normal attributes or catalog date attributes.
 *
 * @param items - items to add into mapping
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export function newCatalogAttributeMap(items, strictTypeCheck = false) {
    const map = new ObjRefMap({
        type: "attribute",
        strictTypeCheck,
        idExtract: (i) => i.attribute.id,
        uriExtract: (i) => i.attribute.uri,
        refExtract: (i) => i.attribute.ref,
    });
    return map.fromItems(items);
}
/**
 * Creates {@link ObjRefMap} for catalog measure items.
 *
 * @param items - items to add into mapping
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export function newCatalogMeasureMap(items, strictTypeCheck = false) {
    const map = new ObjRefMap({
        type: "measure",
        strictTypeCheck,
        idExtract: (i) => i.measure.id,
        uriExtract: (i) => i.measure.uri,
        refExtract: (i) => i.measure.ref,
    });
    return map.fromItems(items);
}
/**
 * Creates {@link ObjRefMap} for attribute display form metadata objects.
 *
 * @param items - items to add into map
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export function newDisplayFormMap(items, strictTypeCheck = false) {
    const map = new ObjRefMap(Object.assign({ type: "displayForm", strictTypeCheck }, metadataObjectExtractors));
    return map.fromItems(items);
}
/**
 * Creates {@link ObjRefMap} for attribute metadata objects.
 *
 * @param items - items to add into map
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export function newAttributeMap(items, strictTypeCheck = false) {
    const map = new ObjRefMap(Object.assign({ type: "attribute", strictTypeCheck }, metadataObjectExtractors));
    return map.fromItems(items);
}
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
export function newMapForObjectWithIdentity(items, type, strictTypeCheck = false) {
    const map = new ObjRefMap({
        type,
        strictTypeCheck,
        idExtract: (i) => i.identifier,
        uriExtract: (i) => i.uri,
        refExtract: (i) => i.ref,
    });
    return map.fromItems(items);
}
/**
 * Creates {@link ObjRefMap} for insights.
 *
 * @param items - items to add into mapping
 * @param strictTypeCheck - whether to do strict type checking when getting by identifierRef
 * @alpha
 */
export function newInsightMap(items, strictTypeCheck = false) {
    const map = new ObjRefMap({
        type: "insight",
        strictTypeCheck,
        idExtract: insightId,
        uriExtract: insightUri,
        refExtract: insightRef,
    });
    return map.fromItems(items);
}
//# sourceMappingURL=objRefMap.js.map