// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { MetadataObjectBuilder } from "./factory.js";
import { builderFactory } from "../builder.js";
/**
 * Attribute display form metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export class AttributeDisplayFormMetadataObjectBuilder extends MetadataObjectBuilder {
    attribute(ref) {
        this.item.attribute = ref;
        return this;
    }
    displayFormType(type) {
        this.item.displayFormType = type;
        return this;
    }
    isDefault(value) {
        this.item.isDefault = value;
        return this;
    }
}
/**
 * Attribute display form metadata object factory
 *
 * @param ref - attribute display form reference
 * @param modifications - attribute diplay form builder modifications to perform
 * @returns created attribute display form metadata object
 * @beta
 */
export const newAttributeDisplayFormMetadataObject = (ref, modifications = identity) => builderFactory(AttributeDisplayFormMetadataObjectBuilder, { type: "displayForm", ref }, modifications);
//# sourceMappingURL=displayFormFactory.js.map