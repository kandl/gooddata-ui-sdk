// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { MetadataObjectBuilder } from "./factory.js";
import { builderFactory } from "../builder.js";
/**
 * Fact metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export class FactMetadataObjectBuilder extends MetadataObjectBuilder {
}
/**
 * Fact metadata object factory
 *
 * @param ref - fact reference
 * @param modifications - fact builder modifications to perform
 * @returns created fact metadata object
 * @beta
 */
export const newFactMetadataObject = (ref, modifications = identity) => builderFactory(FactMetadataObjectBuilder, { type: "fact", ref }, modifications);
//# sourceMappingURL=factFactory.js.map