import { ComponentType } from "react";
/**
 * @beta
 */
export interface ICancelButtonProps {
    isVisible: boolean;
    onCancelClick: () => void;
}
/**
 * @beta
 */
export type CustomCancelButtonComponent = ComponentType<ICancelButtonProps>;
