import React, { ComponentType } from "react";
import { ICancelButtonProps, IEditButtonProps, ISaveButtonProps, ISaveAsNewButtonProps, IShareButtonProps } from "./button/types.js";
/**
 * @beta
 */
export interface IButtonBarProps {
    buttons?: React.ReactNode;
    childContentPosition?: "left" | "right";
    shareButtonProps: IShareButtonProps;
    DefaultButtonBar: CustomButtonBarComponent;
    cancelButtonProps: ICancelButtonProps;
    editButtonProps: IEditButtonProps;
    saveButtonProps: ISaveButtonProps;
    saveAsNewButtonProps: ISaveAsNewButtonProps;
    children?: React.ReactNode;
}
/**
 * @beta
 */
export type CustomButtonBarComponent = ComponentType<IButtonBarProps>;
