import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IColor, IColorPalette } from "@gooddata/sdk-model";
import { DropdownVersionType } from "./ColorOverlay.js";
export declare enum IconPosition {
    Down = 0,
    Right = 1
}
export interface ISelectableChild {
    isSelected?: boolean;
    position?: IconPosition;
    disabled?: boolean;
}
export interface IColorDropdownOwnProps {
    selectedColorItem?: IColor;
    colorPalette: IColorPalette;
    showCustomPicker: boolean;
    onColorSelected: (color: IColor) => void;
    disabled?: boolean;
    children?: React.ReactNode;
}
export interface IColorDropdownState {
    isDropdownOpen: boolean;
    dropdownVersion: DropdownVersionType;
}
export type IColorDropdownProps = IColorDropdownOwnProps & WrappedComponentProps;
declare const _default: React.FC<import("react-intl").WithIntlProps<IColorDropdownProps>> & {
    WrappedComponent: React.ComponentType<IColorDropdownProps>;
};
export default _default;
//# sourceMappingURL=ColorDropdown.d.ts.map