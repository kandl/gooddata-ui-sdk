import { ObjRef } from "../../../objRef/index.js";
import { IMetadataObjectBase, IMetadataObjectIdentity } from "../types.js";
/**
 * Attribute hierarchy metadata object.
 *
 * @public
 */
export interface IAttributeHierarchyMetadataObject extends IMetadataObjectIdentity, IMetadataObjectBase {
    type: "attributeHierarchy";
    /**
     * Ordered array of attributes which represent hierarchy.
     */
    attributes: ObjRef[];
}
/**
 * Tests whether the provided object is of type {@link IAttributeHierarchyMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isAttributeHierarchyMetadataObject(obj: unknown): obj is IAttributeHierarchyMetadataObject;
//# sourceMappingURL=index.d.ts.map