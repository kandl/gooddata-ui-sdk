// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { newAttribute, isAttributeDisplayFormMetadataObject, isAttributeMetadataObject, } from "@gooddata/sdk-model";
import { GroupableCatalogItemBuilder } from "./groupFactory.js";
import { builderFactory } from "../builder.js";
import { newAttributeMetadataObject } from "../metadata/attributeFactory.js";
import { newAttributeDisplayFormMetadataObject, } from "../metadata/displayFormFactory.js";
/**
 * Catalog attribute builder
 * See {@link Builder}
 *
 * @beta
 */
export class CatalogAttributeBuilder extends GroupableCatalogItemBuilder {
    attribute(attributeOrRef, modifications) {
        if (!isAttributeMetadataObject(attributeOrRef)) {
            this.item.attribute = newAttributeMetadataObject(attributeOrRef, modifications);
        }
        else {
            this.item.attribute = attributeOrRef;
        }
        return this;
    }
    defaultDisplayForm(displayFormOrRef, modifications) {
        if (!isAttributeDisplayFormMetadataObject(displayFormOrRef)) {
            this.item.defaultDisplayForm = newAttributeDisplayFormMetadataObject(displayFormOrRef, modifications);
        }
        else {
            this.item.defaultDisplayForm = displayFormOrRef;
        }
        return this;
    }
    displayForms(displayForms) {
        this.item.displayForms = displayForms;
        return this;
    }
    geoPinDisplayForms(displayForms) {
        this.item.geoPinDisplayForms = displayForms;
        return this;
    }
    toExecutionModel(modifications = identity) {
        if (!this.item.defaultDisplayForm) {
            throw new Error("Cannot convert catalog attribute to execution model, no displayForm found!");
        }
        const defaultModifications = (a) => { var _a; return a.alias((_a = this.item.defaultDisplayForm) === null || _a === void 0 ? void 0 : _a.title); };
        return newAttribute(this.item.defaultDisplayForm.ref, (m) => modifications(defaultModifications(m)));
    }
}
/**
 * Catalog attribute factory
 *
 * @param modifications - catalog attribute builder modifications to perform
 * @returns created catalog attribute
 * @beta
 */
export const newCatalogAttribute = (modifications = identity) => builderFactory(CatalogAttributeBuilder, { type: "attribute" }, modifications);
//# sourceMappingURL=attributeFactory.js.map