import { AttributeModifications, IAttribute, ObjRef, ICatalogAttribute, IAttributeDisplayFormMetadataObject, IAttributeMetadataObject } from "@gooddata/sdk-model";
import { GroupableCatalogItemBuilder } from "./groupFactory.js";
import { BuilderModifications } from "../builder.js";
import { AttributeMetadataObjectBuilder } from "../metadata/attributeFactory.js";
import { AttributeDisplayFormMetadataObjectBuilder } from "../metadata/displayFormFactory.js";
/**
 * Catalog attribute builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class CatalogAttributeBuilder<T extends ICatalogAttribute = ICatalogAttribute> extends GroupableCatalogItemBuilder<T> {
    attribute(attributeOrRef: IAttributeMetadataObject | ObjRef, modifications?: BuilderModifications<AttributeMetadataObjectBuilder>): this;
    defaultDisplayForm(displayFormOrRef: IAttributeDisplayFormMetadataObject | ObjRef, modifications?: BuilderModifications<AttributeDisplayFormMetadataObjectBuilder>): this;
    displayForms(displayForms: IAttributeDisplayFormMetadataObject[]): this;
    geoPinDisplayForms(displayForms: IAttributeDisplayFormMetadataObject[]): this;
    toExecutionModel(modifications?: AttributeModifications): IAttribute;
}
/**
 * Catalog attribute factory
 *
 * @param modifications - catalog attribute builder modifications to perform
 * @returns created catalog attribute
 * @beta
 */
export declare const newCatalogAttribute: (modifications?: BuilderModifications<CatalogAttributeBuilder>) => ICatalogAttribute;
//# sourceMappingURL=attributeFactory.d.ts.map