// (C) 2019-2021 GoodData Corporation
import { isMetadataObject } from "../types.js";
/**
 * Tests whether the provided object is of type {@link IDashboardMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export function isDashboardMetadataObject(obj) {
    return isMetadataObject(obj) && obj.type === "analyticalDashboard";
}
//# sourceMappingURL=index.js.map