import { IMetadataObject } from "../types.js";
/**
 * Fact metadata object
 *
 * @public
 */
export interface IFactMetadataObject extends IMetadataObject {
    type: "fact";
}
/**
 * Tests whether the provided object is of type {@link IFactMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isFactMetadataObject(obj: unknown): obj is IFactMetadataObject;
//# sourceMappingURL=index.d.ts.map