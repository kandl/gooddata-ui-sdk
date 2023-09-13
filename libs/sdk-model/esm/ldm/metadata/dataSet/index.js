// (C) 2019-2020 GoodData Corporation
import { isMetadataObject } from "../types.js";
/**
 * Tests whether the provided object is of type {@link IDataSetMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export function isDataSetMetadataObject(obj) {
    return isMetadataObject(obj) && obj.type === "dataSet";
}
//# sourceMappingURL=index.js.map