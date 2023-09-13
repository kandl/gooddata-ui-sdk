import { MouseEvent } from "react";
import { ObjRef } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface IUseWidgetSelectionResult {
    /**
     * Flag indicating the given item can be selected.
     */
    isSelectable: boolean;
    /**
     * Flag indicating the given item is selected.
     */
    isSelected: boolean;
    /**
     * Callback to call when an item is selected. Called with the relevant mouse event if originating from a click.
     */
    onSelected: (e?: MouseEvent) => void;
    /**
     * Callback to call when you want to close the config panel.
     */
    closeConfigPanel: () => void;
    /**
     * Callback to call to deselect widgets. Called with the relevant mouse event if originating from a click.
     */
    deselectWidgets: (e?: MouseEvent) => void;
    /**
     * Flag indicating the given item has its config panel open.
     */
    hasConfigPanelOpen: boolean;
}
/**
 * @internal
 */
export declare function useWidgetSelection(widgetRef?: ObjRef): IUseWidgetSelectionResult;
