import { IAttributeDisplayFormMetadataObject, ObjRef } from "@gooddata/sdk-model";
import React from "react";
export interface IAttributeDisplayFormDropDownItemProps {
    displayForm: IAttributeDisplayFormMetadataObject;
    onClick: (displayForm: ObjRef) => void;
    selected: boolean;
}
export declare const AttributeDisplayFormDropDownItem: React.FC<IAttributeDisplayFormDropDownItemProps>;
