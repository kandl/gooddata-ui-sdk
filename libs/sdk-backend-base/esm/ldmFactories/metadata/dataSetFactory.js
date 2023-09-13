// (C) 2019-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { MetadataObjectBuilder } from "./factory.js";
import { builderFactory } from "../builder.js";
/**
 * DataSet metadata object builder
 * See {@link Builder}
 *
 * @beta
 */
export class DataSetMetadataObjectBuilder extends MetadataObjectBuilder {
}
/**
 * DataSet metadata object factory
 *
 * @param ref - dataset reference
 * @param modifications - dataset builder modifications to perform
 * @returns created dataset metadata object
 * @beta
 */
export const newDataSetMetadataObject = (ref, modifications = identity) => builderFactory(DataSetMetadataObjectBuilder, { type: "dataSet", ref }, modifications);
//# sourceMappingURL=dataSetFactory.js.map