import { IAttributeDisplayFormMetadataObject, ObjRef } from "@gooddata/sdk-model";
import React from "react";
interface IAttributeFilterDisplayFormDropdownProps {
    displayForms: IAttributeDisplayFormMetadataObject[];
    selectedDisplayForm: ObjRef;
    onChange: (displayForm: ObjRef) => void;
}
export declare const AttributeDisplayFormsDropdown: React.FC<IAttributeFilterDisplayFormDropdownProps>;
export {};
