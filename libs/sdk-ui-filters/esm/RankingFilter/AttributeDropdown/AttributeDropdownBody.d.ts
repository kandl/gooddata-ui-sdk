import React from "react";
import { ObjRefInScope } from "@gooddata/sdk-model";
import { IAttributeDropdownItem, ICustomGranularitySelection } from "../types.js";
interface IAttributeDropdownBodyProps {
    items: IAttributeDropdownItem[];
    selectedItemRef: ObjRefInScope;
    onSelect: (ref?: ObjRefInScope) => void;
    onClose: () => void;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
    customGranularitySelection?: ICustomGranularitySelection;
}
export declare const AttributeDropdownBody: React.FC<IAttributeDropdownBodyProps>;
export {};
