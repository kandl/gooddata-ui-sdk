// (C) 2022 GoodData Corporation
import { IAttributeFilter } from "@gooddata/sdk-model";
import { IAttributeDisplayFormLoader } from "./displayForm";
import { IAttributeElementLoader } from "./elements";
import { AttributeElementSelectionFull, IStagedAttributeElementsSelectionHandler } from "./selection";

// TODO: remove?
/**
 * Handles the whole attribute filter experience
 * @alpha
 */
export interface IAttributeFilterHandler
    extends IAttributeDisplayFormLoader,
        IAttributeElementLoader,
        IStagedAttributeElementsSelectionHandler {
    //
    // selectors
    //

    /**
     * Get the currently selected attribute elements (using the working selection).
     */
    getSelectedItems(): AttributeElementSelectionFull;

    /**
     * Get the effective filter (using the committed selection).
     */
    getFilter(): IAttributeFilter;
}
