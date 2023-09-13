import React from "react";
import { ObjRefInScope } from "@gooddata/sdk-model";
import { IAttributeDropdownItem, ICustomGranularitySelection } from "../../types.js";
interface IAttributeItemProps {
    item: IAttributeDropdownItem;
    iconClass: string;
    isSelected: boolean;
    onSelect: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
    customGranularitySelection?: ICustomGranularitySelection;
}
export declare const AttributeItem: React.FC<IAttributeItemProps>;
export {};
