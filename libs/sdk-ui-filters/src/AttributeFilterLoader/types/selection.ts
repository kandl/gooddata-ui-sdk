// (C) 2022 GoodData Corporation
import { IAttributeElement } from "@gooddata/sdk-model";
import { IAttributeFilterHandlerBase } from "./base";
import { CallbackRegistration } from "./common";

/**
 * @alpha
 */
export interface AttributeElementSelection {
    items: string[];
    isInverted: boolean;
}

/**
 * @alpha
 */
export interface AttributeElementSelectionFull {
    elements: IAttributeElement[];
    isInverted: boolean;
}

//
// Single select
//

/**
 * Handles the whole attribute filter experience
 * @alpha
 */
export interface ISingleSelectAttributeFilterHandler extends IAttributeFilterHandlerBase {
    //
    // selectors
    //

    /**
     * Get the currently selected attribute element (using the working selection).
     */
    getSelectedItem(): IAttributeElement | undefined;
}

/**
 * Handles simple selection of at most one item
 * @alpha
 */
export interface ISingleSelectionHandler {
    //
    // manipulators
    //

    changeSelection(selection: string | undefined): void;

    //
    // selectors
    //

    getSelection(): string | undefined;

    //
    // callbacks
    //

    onSelectionChanged: CallbackRegistration<{ selection: string | undefined }>;
}

/**
 * Handles selection of items with stages: working and committed.
 * @alpha
 */
export interface IStagedSingleSelectionHandler extends Omit<ISingleSelectionHandler, "getSelection"> {
    //
    // manipulators
    //

    /**
     * Commit the current working selection making it the new committed selection.
     */
    commitSelection(): void;

    /**
     * Revert the current working selection by resetting it to the committed selection.
     */
    revertSelection(): void;

    //
    // selectors
    //
    getWorkingSelection(): string | undefined;
    getCommittedSelection(): string | undefined;

    //
    // callbacks
    //
    onSelectionCommitted: CallbackRegistration<{ selection: string | undefined }>;
}

/**
 * @alpha
 */
export interface IStagedSingleSelectionAttributeFilterHandler
    extends ISingleSelectAttributeFilterHandler,
        IStagedSingleSelectionHandler {}

//
// Multi select
//

/**
 * Handles the whole attribute filter experience
 * @alpha
 */
export interface IMultiSelectAttributeFilterHandler extends IAttributeFilterHandlerBase {
    //
    // selectors
    //

    /**
     * Get the currently selected attribute elements (using the working selection).
     */
    getSelectedItems(): AttributeElementSelectionFull;
}

/**
 * Handles simple selection of items
 * @alpha
 */
export interface IAttributeElementsSelectionHandler {
    //
    // manipulators
    //

    changeSelection(selection: AttributeElementSelection): void;
    invertSelection(): void;
    clearSelection(): void;

    //
    // selectors
    //

    getSelection(): AttributeElementSelection;

    //
    // callbacks
    //
    onSelectionChanged: CallbackRegistration<{ selection: AttributeElementSelection }>;
}

/**
 * Handles selection of items with stages: working and committed.
 * @alpha
 */
export interface IStagedAttributeElementsSelectionHandler
    extends Omit<IAttributeElementsSelectionHandler, "getSelection"> {
    //
    // manipulators
    //

    /**
     * Commit the current working selection making it the new committed selection.
     */
    commitSelection(): void;

    /**
     * Revert the current working selection by resetting it to the committed selection.
     */
    revertSelection(): void;

    //
    // selectors
    //

    getWorkingSelection(): AttributeElementSelection;
    getCommittedSelection(): AttributeElementSelection;

    //
    // callbacks
    //
    onSelectionCommitted: CallbackRegistration<{ selection: AttributeElementSelection }>;
}

/**
 * @alpha
 */
export interface IStagedMultiSelectionAttributeFilterHandler
    extends IMultiSelectAttributeFilterHandler,
        IStagedAttributeElementsSelectionHandler {}
