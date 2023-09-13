import { IAttributeHierarchyMetadataObject } from "../../metadata/index.js";
/**
 * Type representing catalog attribute hierarchy.
 *
 * @public
 */
export interface ICatalogAttributeHierarchy {
    type: "attributeHierarchy";
    /**
     * Attribute hierarchy metadata object that attribute hierarchy represents.
     */
    attributeHierarchy: IAttributeHierarchyMetadataObject;
}
/**
 * Type guard checking whether the provided object is a {@link ICatalogAttributeHierarchy}.
 *
 * @public
 */
export declare function isCatalogAttributeHierarchy(obj: unknown): obj is ICatalogAttributeHierarchy;
//# sourceMappingURL=index.d.ts.map