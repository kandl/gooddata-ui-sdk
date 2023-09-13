import { ObjRef, IFactMetadataObject } from "@gooddata/sdk-model";
import { MetadataObjectBuilder } from "./factory.js";
import { BuilderModifications } from "../builder.js";
/**
 * Fact metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class FactMetadataObjectBuilder<T extends IFactMetadataObject = IFactMetadataObject> extends MetadataObjectBuilder<T> {
}
/**
 * Fact metadata object factory
 *
 * @param ref - fact reference
 * @param modifications - fact builder modifications to perform
 * @returns created fact metadata object
 * @beta
 */
export declare const newFactMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<FactMetadataObjectBuilder>) => IFactMetadataObject;
//# sourceMappingURL=factFactory.d.ts.map