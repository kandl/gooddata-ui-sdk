// (C) 2020 GoodData Corporation
import { isMetadataObject } from "../types.js";
/**
 * Tests whether the provided object is of type {@link IVariableMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export function isVariableMetadataObject(obj) {
    return isMetadataObject(obj) && obj.type === "variable";
}
//# sourceMappingURL=index.js.map