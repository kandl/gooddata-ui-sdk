// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { MetadataObjectBuilder } from "./factory.js";
import { builderFactory } from "../builder.js";
/**
 * Dashboard metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export class DashboardMetadataObjectBuilder extends MetadataObjectBuilder {
}
/**
 * Dashboard metadata object factory
 *
 * @param ref - dashboard reference
 * @param modifications - dashboard builder modifications to perform
 * @returns created dashboard metadata object
 * @beta
 */
export const newDashboardMetadataObject = (ref, modifications = identity) => builderFactory(DashboardMetadataObjectBuilder, { type: "analyticalDashboard", ref }, modifications);
//# sourceMappingURL=dashboardFactory.js.map