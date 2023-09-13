import React from "react";
import { ICatalogAttribute, IDataSetMetadataObject } from "@gooddata/sdk-model";
import { IUseAttributeElements } from "../../../../../model/index.js";
interface IAttributeListItemTooltipContentProps {
    item: ICatalogAttribute;
    attributesDataSetLoading: boolean;
    attributesElementsLoading: boolean;
    attributeDataSet?: IDataSetMetadataObject;
    attributeElements?: IUseAttributeElements;
}
/**
 * @internal
 */
export declare const AttributeListItemTooltipContent: React.FC<IAttributeListItemTooltipContentProps>;
export {};
