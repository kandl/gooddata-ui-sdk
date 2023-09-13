import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IColor, IColorPalette } from "@gooddata/sdk-model";
import { DropdownVersionType } from "./ColorOverlay";
export declare enum IconPosition {
    Down = 0,
    Right = 1
}
export interface ISelectableChild {
    isSelected?: boolean;
    position?: IconPosition;
}
export interface IColorDropdownOwnProps {
    selectedColorItem?: IColor;
    colorPalette: IColorPalette;
    showCustomPicker: boolean;
    onColorSelected: (color: IColor) => void;
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