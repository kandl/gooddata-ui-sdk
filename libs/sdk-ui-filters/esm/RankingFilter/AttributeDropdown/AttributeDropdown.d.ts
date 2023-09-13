import React from "react";
import { ObjRefInScope } from "@gooddata/sdk-model";
import { IAttributeDropdownItem, ICustomGranularitySelection } from "../types.js";
import { WrappedComponentProps } from "react-intl";
interface IAttributeDropdownComponentProps {
    items: IAttributeDropdownItem[];
    selectedItemRef: ObjRefInScope;
    onSelect: (ref?: ObjRefInScope) => void;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
    customGranularitySelection?: ICustomGranularitySelection;
}
type AttributeDropdownProps = IAttributeDropdownComponentProps & WrappedComponentProps;
export declare const AttributeDropdown: React.FC<import("react-intl").WithIntlProps<AttributeDropdownProps>> & {
    WrappedComponent: React.ComponentType<AttributeDropdownProps>;
};
export {};
