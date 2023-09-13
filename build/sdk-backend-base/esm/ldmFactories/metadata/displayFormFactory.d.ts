import { ObjRef, IAttributeDisplayFormMetadataObject } from "@gooddata/sdk-model";
import { MetadataObjectBuilder } from "./factory.js";
import { BuilderModifications } from "../builder.js";
/**
 * Attribute display form metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class AttributeDisplayFormMetadataObjectBuilder<T extends IAttributeDisplayFormMetadataObject = IAttributeDisplayFormMetadataObject> extends MetadataObjectBuilder<T> {
    attribute(ref: ObjRef): this;
    displayFormType(type: string | undefined): this;
    isDefault(value: boolean | undefined): this;
}
/**
 * Attribute display form metadata object factory
 *
 * @param ref - attribute display form reference
 * @param modifications - attribute diplay form builder modifications to perform
 * @returns created attribute display form metadata object
 * @beta
 */
export declare const newAttributeDisplayFormMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<AttributeDisplayFormMetadataObjectBuilder>) => IAttributeDisplayFormMetadataObject;
//# sourceMappingURL=displayFormFactory.d.ts.map