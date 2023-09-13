import { IMetadataObject } from "../types.js";
/**
 * DataSet metadata object
 *
 * @public
 */
export interface IDataSetMetadataObject extends IMetadataObject {
    type: "dataSet";
}
/**
 * Tests whether the provided object is of type {@link IDataSetMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isDataSetMetadataObject(obj: unknown): obj is IDataSetMetadataObject;
//# sourceMappingURL=index.d.ts.map