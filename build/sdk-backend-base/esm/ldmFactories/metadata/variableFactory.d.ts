import { ObjRef, IVariableMetadataObject } from "@gooddata/sdk-model";
import { MetadataObjectBuilder } from "./factory.js";
import { BuilderModifications } from "../builder.js";
/**
 * Variable metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class VariableMetadataObjectBuilder<T extends IVariableMetadataObject = IVariableMetadataObject> extends MetadataObjectBuilder<T> {
}
/**
 * Variable metadata object factory
 *
 * @param ref - variable reference
 * @param modifications - variable builder modifications to perform
 * @returns created variable metadata object
 * @beta
 */
export declare const newVariableMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<VariableMetadataObjectBuilder>) => IVariableMetadataObject;
//# sourceMappingURL=variableFactory.d.ts.map