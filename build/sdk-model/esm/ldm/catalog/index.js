// (C) 2019-2020 GoodData Corporation
import { isCatalogAttribute } from "./attribute/index.js";
import { isCatalogMeasure } from "./measure/index.js";
import { isCatalogFact } from "./fact/index.js";
import { isCatalogAttributeHierarchy } from "./attributeHierarchy/index.js";
/**
 * Get metadata object that catalog item represents
 *
 * @param catalogItem - catalog item
 * @returns metadata object
 * @public
 */
export const catalogItemMetadataObject = (catalogItem) => {
    let item;
    if (isCatalogAttribute(catalogItem)) {
        item = catalogItem.attribute;
    }
    else if (isCatalogMeasure(catalogItem)) {
        item = catalogItem.measure;
    }
    else if (isCatalogFact(catalogItem)) {
        item = catalogItem.fact;
    }
    else if (isCatalogAttributeHierarchy(catalogItem)) {
        item = catalogItem.attributeHierarchy;
    }
    else {
        item = catalogItem.dataSet;
    }
    if (!item) {
        throw new Error("Catalog metadata item not found!");
    }
    return item;
};
export { isCatalogAttribute } from "./attribute/index.js";
export { isCatalogMeasure } from "./measure/index.js";
export { isCatalogFact } from "./fact/index.js";
export { isCatalogDateDataset } from "./dateDataset/index.js";
export { isCatalogAttributeHierarchy } from "./attributeHierarchy/index.js";
//# sourceMappingURL=index.js.map