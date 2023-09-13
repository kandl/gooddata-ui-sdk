import { MetadataObjectBuilder } from "./factory.js";
import { BuilderModifications } from "../builder.js";
import { ObjRef, IAttributeDisplayFormMetadataObject, IAttributeMetadataObject } from "@gooddata/sdk-model";
/**
 * Attribute metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class AttributeMetadataObjectBuilder<T extends IAttributeMetadataObject = IAttributeMetadataObject> extends MetadataObjectBuilder<T> {
    drillDownStep(ref: ObjRef | undefined): this;
    drillToAttributeLink(ref: ObjRef | undefined): this;
    displayForms(displayForms: IAttributeDisplayFormMetadataObject[]): this;
}
/**
 * Attribute metadata object factory
 *
 * @param ref - attribute reference
 * @param modifications - attribute builder modifications to perform
 * @returns created attribute metadata object
 * @beta
 */
export declare const newAttributeMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<AttributeMetadataObjectBuilder>) => IAttributeMetadataObject;
//# sourceMappingURL=attributeFactory.d.ts.map