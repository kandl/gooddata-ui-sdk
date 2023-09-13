import React from "react";
import { WrappedComponentProps } from "react-intl";
interface IValueDropdownOwnProps {
    selectedValue: number;
    onSelect: (value: number) => void;
}
type ValueDropdownProps = IValueDropdownOwnProps & WrappedComponentProps;
export declare const ValueDropdown: React.FC<import("react-intl").WithIntlProps<ValueDropdownProps>> & {
    WrappedComponent: React.ComponentType<ValueDropdownProps>;
};
export {};
