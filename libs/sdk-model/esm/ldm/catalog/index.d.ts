import { ICatalogAttribute } from "./attribute/index.js";
import { ICatalogMeasure } from "./measure/index.js";
import { ICatalogFact } from "./fact/index.js";
import { ICatalogDateDataset } from "./dateDataset/index.js";
import { MetadataObject } from "../metadata/index.js";
import { ICatalogAttributeHierarchy } from "./attributeHierarchy/index.js";
/**
 * Type representing catalog item - attribute, measure, fact or dateDataset
 *
 * @public
 */
export type CatalogItem = ICatalogAttribute | ICatalogMeasure | ICatalogFact | ICatalogDateDataset | ICatalogAttributeHierarchy;
/**
 * Get metadata object that catalog item represents
 *
 * @param catalogItem - catalog item
 * @returns metadata object
 * @public
 */
export declare const catalogItemMetadataObject: (catalogItem: CatalogItem) => MetadataObject;
/**
 * Type representing groupable catalog item - attribute, measure or fact
 *
 * @public
 */
export type GroupableCatalogItem = ICatalogAttribute | ICatalogMeasure | ICatalogFact;
export { CatalogItemType, ICatalogItemBase } from "./types.js";
export { ICatalogAttribute, isCatalogAttribute } from "./attribute/index.js";
export { ICatalogMeasure, isCatalogMeasure } from "./measure/index.js";
export { ICatalogFact, isCatalogFact } from "./fact/index.js";
export { ICatalogDateDataset, ICatalogDateAttribute, isCatalogDateDataset } from "./dateDataset/index.js";
export { ICatalogGroup, IGroupableCatalogItemBase } from "./group/index.js";
export { ICatalogAttributeHierarchy, isCatalogAttributeHierarchy } from "./attributeHierarchy/index.js";
//# sourceMappingURL=index.d.ts.map