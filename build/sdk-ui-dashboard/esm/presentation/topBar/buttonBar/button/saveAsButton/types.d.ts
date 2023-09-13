import { ComponentType } from "react";
/**
 * @beta
 */
export interface ISaveAsNewButtonProps {
    isVisible: boolean;
    onSaveAsNewClick: () => void;
}
/**
 * @beta
 */
export type CustomSaveAsNewButtonComponent = ComponentType<ISaveAsNewButtonProps>;
