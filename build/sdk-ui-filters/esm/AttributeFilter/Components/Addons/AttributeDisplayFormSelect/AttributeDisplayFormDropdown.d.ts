import React from "react";
import { IAttributeDisplayFormMetadataObject, ObjRef } from "@gooddata/sdk-model";
import { IAlignPoint } from "@gooddata/sdk-ui-kit";
/**
 * @internal
 */
export interface IAttributeDisplayFormDropdownProps {
    displayForms: IAttributeDisplayFormMetadataObject[];
    selectedDisplayForm: ObjRef;
    onSelect: (displayForm: ObjRef) => void;
    alignPoints?: IAlignPoint[];
}
/**
 * @internal
 */
export declare const AttributeDisplayFormDropdown: React.FC<IAttributeDisplayFormDropdownProps>;
