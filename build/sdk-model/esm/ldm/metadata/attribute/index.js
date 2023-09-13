// (C) 2019-2022 GoodData Corporation
import { isMetadataObject } from "../types.js";
/**
 * Tests whether the provided object is of type {@link IAttributeMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export function isAttributeMetadataObject(obj) {
    return isMetadataObject(obj) && obj.type === "attribute";
}
//# sourceMappingURL=index.js.map