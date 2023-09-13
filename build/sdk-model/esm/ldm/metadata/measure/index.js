// (C) 2019-2021 GoodData Corporation
import { isMetadataObject } from "../types.js";
/**
 * Tests whether the provided object is of type {@link IMeasureMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export function isMeasureMetadataObject(obj) {
    return isMetadataObject(obj) && obj.type === "measure";
}
/**
 * Tests whether the provided object is of type {@link IMeasureMetadataObjectDefinition}.
 *
 * @param obj - object to test
 * @public
 */
export function isMeasureMetadataObjectDefinition(obj) {
    return obj.type === "measure" && obj.ref === undefined;
}
//# sourceMappingURL=index.js.map