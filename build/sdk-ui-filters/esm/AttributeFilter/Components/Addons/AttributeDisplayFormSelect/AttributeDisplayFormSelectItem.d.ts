import React from "react";
import { IAttributeDisplayFormMetadataObject, ObjRef } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface IAttributeDisplayFormSelectItemProps {
    displayForm: IAttributeDisplayFormMetadataObject;
    onClick: (displayForm: ObjRef) => void;
    selected: boolean;
}
/**
 * @internal
 */
export declare const AttributeDisplayFormSelectItem: React.FC<IAttributeDisplayFormSelectItemProps>;
