// (C) 2019-2020 GoodData Corporation
import { isMetadataObject } from "../types.js";
/**
 * Tests whether the provided object is of type {@link IFactMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export function isFactMetadataObject(obj) {
    return isMetadataObject(obj) && obj.type === "fact";
}
//# sourceMappingURL=index.js.map