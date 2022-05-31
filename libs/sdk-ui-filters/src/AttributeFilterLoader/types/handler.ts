// (C) 2022 GoodData Corporation
import { IAttributeFilter } from "@gooddata/sdk-model";
import { AttributeElementSelectionFull } from "./common";
import { IAttributeDisplayFormLoader } from "./displayForm";
import { IAttributeElementLoader } from "./elements";
import { IStagedAttributeElementsSelectionHandler } from "./selection";

/**
 * Handles the whole attribute filter experience
 * @internal
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
