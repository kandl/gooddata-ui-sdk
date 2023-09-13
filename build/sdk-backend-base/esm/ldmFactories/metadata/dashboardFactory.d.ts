import { ObjRef, IDashboardMetadataObject } from "@gooddata/sdk-model";
import { MetadataObjectBuilder } from "./factory.js";
import { BuilderModifications } from "../builder.js";
/**
 * Dashboard metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class DashboardMetadataObjectBuilder<T extends IDashboardMetadataObject = IDashboardMetadataObject> extends MetadataObjectBuilder<T> {
}
/**
 * Dashboard metadata object factory
 *
 * @param ref - dashboard reference
 * @param modifications - dashboard builder modifications to perform
 * @returns created dashboard metadata object
 * @beta
 */
export declare const newDashboardMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<DashboardMetadataObjectBuilder>) => IDashboardMetadataObject;
//# sourceMappingURL=dashboardFactory.d.ts.map