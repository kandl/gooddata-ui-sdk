import { IMetadataObject } from "../types.js";
/**
 * Dashboard metadata object
 *
 * @public
 */
export interface IDashboardMetadataObject extends IMetadataObject {
    type: "analyticalDashboard";
}
/**
 * Tests whether the provided object is of type {@link IDashboardMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isDashboardMetadataObject(obj: unknown): obj is IDashboardMetadataObject;
//# sourceMappingURL=index.d.ts.map