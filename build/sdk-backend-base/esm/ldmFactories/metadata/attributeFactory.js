// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { MetadataObjectBuilder } from "./factory.js";
import { builderFactory } from "../builder.js";
/**
 * Attribute metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export class AttributeMetadataObjectBuilder extends MetadataObjectBuilder {
    drillDownStep(ref) {
        if (ref) {
            this.item.drillDownStep = ref;
        }
        return this;
    }
    drillToAttributeLink(ref) {
        if (ref) {
            this.item.drillToAttributeLink = ref;
        }
        return this;
    }
    displayForms(displayForms) {
        this.item.displayForms = displayForms;
        return this;
    }
}
/**
 * Attribute metadata object factory
 *
 * @param ref - attribute reference
 * @param modifications - attribute builder modifications to perform
 * @returns created attribute metadata object
 * @beta
 */
export const newAttributeMetadataObject = (ref, modifications = identity) => builderFactory(AttributeMetadataObjectBuilder, { type: "attribute", ref }, modifications);
//# sourceMappingURL=attributeFactory.js.map