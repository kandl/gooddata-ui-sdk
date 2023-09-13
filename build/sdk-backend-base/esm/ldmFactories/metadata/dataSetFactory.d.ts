import { ObjRef, IDataSetMetadataObject } from "@gooddata/sdk-model";
import { MetadataObjectBuilder } from "./factory.js";
import { BuilderModifications } from "../builder.js";
/**
 * DataSet metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export declare class DataSetMetadataObjectBuilder<T extends IDataSetMetadataObject = IDataSetMetadataObject> extends MetadataObjectBuilder<T> {
}
/**
 * DataSet metadata object factory
 *
 * @param ref - dataset reference
 * @param modifications - dataset builder modifications to perform
 * @returns created dataset metadata object
 * @beta
 */
export declare const newDataSetMetadataObject: (ref: ObjRef, modifications?: BuilderModifications<DataSetMetadataObjectBuilder>) => IDataSetMetadataObject;
//# sourceMappingURL=dataSetFactory.d.ts.map