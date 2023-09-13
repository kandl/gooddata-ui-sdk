// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { MetadataObjectBuilder } from "./factory.js";
import { builderFactory } from "../builder.js";
/**
 * Variable metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export class VariableMetadataObjectBuilder extends MetadataObjectBuilder {
}
/**
 * Variable metadata object factory
 *
 * @param ref - variable reference
 * @param modifications - variable builder modifications to perform
 * @returns created variable metadata object
 * @beta
 */
export const newVariableMetadataObject = (ref, modifications = identity) => builderFactory(VariableMetadataObjectBuilder, { type: "variable", ref }, modifications);
//# sourceMappingURL=variableFactory.js.map