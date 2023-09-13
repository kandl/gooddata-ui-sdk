import React from "react";
import { IDataSetMetadataObject } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface IAttributeDatasetInfoProps {
    title?: string;
    defaultAttributeFilterTitle?: string;
    attributeDataSet?: IDataSetMetadataObject;
}
/**
 * @internal
 */
export declare const AttributeDatasetInfo: React.FC<IAttributeDatasetInfoProps>;
