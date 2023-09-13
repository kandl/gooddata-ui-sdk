import { ComponentType } from "react";
/**
 * @beta
 */
export interface IEditButtonProps {
    isVisible: boolean;
    isEnabled: boolean;
    onEditClick: () => void;
}
/**
 * @beta
 */
export type CustomEditModeButtonComponent = ComponentType<IEditButtonProps>;
