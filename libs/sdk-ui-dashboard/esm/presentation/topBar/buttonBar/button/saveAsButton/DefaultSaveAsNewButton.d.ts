/// <reference types="react" />
import { DashboardSelector } from "../../../../../model/index.js";
import { ISaveAsNewButtonProps } from "./types.js";
/**
 * @internal
 */
export declare const selectIsSaveAsNewButtonVisible: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare function useSaveAsNewButtonProps(): ISaveAsNewButtonProps;
/**
 * @internal
 */
export declare function DefaultSaveAsNewButton({ isVisible, onSaveAsNewClick }: ISaveAsNewButtonProps): JSX.Element | null;
