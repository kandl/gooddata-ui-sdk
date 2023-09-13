// (C) 2023 GoodData Corporation
import { isMetadataObject } from "../types.js";
/**
 * Tests whether the provided object is of type {@link IAttributeHierarchyMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export function isAttributeHierarchyMetadataObject(obj) {
    return isMetadataObject(obj) && obj.type === "attributeHierarchy";
}
//# sourceMappingURL=index.js.map