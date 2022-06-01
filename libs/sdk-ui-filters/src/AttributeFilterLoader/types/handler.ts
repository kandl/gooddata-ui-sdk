// (C) 2022 GoodData Corporation
import { IAttributeFilter } from "@gooddata/sdk-model";
import { IAttributeLoader } from "./attribute";
import { IAttributeElementLoader } from "./elements";
import { AttributeElementSelectionFull, IStagedInvertableSelectionHandler } from "./selection";

// TODO: remove?
/**
 * Handles the whole attribute filter experience
 * @alpha
 */
export interface IAttributeFilterHandler
    extends IAttributeLoader,
        IAttributeElementLoader,
        IStagedInvertableSelectionHandler {
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
