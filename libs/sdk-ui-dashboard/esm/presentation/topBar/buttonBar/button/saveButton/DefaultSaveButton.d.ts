/// <reference types="react" />
import { ISaveButtonProps } from "./types.js";
/**
 * @internal
 */
export declare function useSaveButtonProps(): ISaveButtonProps;
/**
 * @internal
 */
export declare function DefaultSaveButton({ isVisible, isEnabled, isSaving, buttonTitle, buttonValue, onSaveClick, }: ISaveButtonProps): JSX.Element | null;
