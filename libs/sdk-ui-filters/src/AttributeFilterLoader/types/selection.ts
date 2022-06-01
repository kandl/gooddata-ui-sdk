// (C) 2022 GoodData Corporation
import { IAttributeElement } from "@gooddata/sdk-model";
import { IAttributeFilterHandlerBase } from "./base";
import { CallbackRegistration } from "./common";

//
// Single select
//

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

// Single select attribute handler

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
 * @alpha
 */
export interface IStagedSingleSelectionAttributeFilterHandler
    extends ISingleSelectAttributeFilterHandler,
        IStagedSingleSelectionHandler {}

//
// Invertable selection
//

/**
 * @alpha
 */
export interface InvertableSelection {
    items: string[];
    isInverted: boolean;
}

/**
 * Handles simple selection of items
 * @alpha
 */
export interface IInvertableSelectionHandler {
    //
    // manipulators
    //

    changeSelection(selection: InvertableSelection): void;
    invertSelection(): void;
    clearSelection(): void;

    //
    // selectors
    //

    getSelection(): InvertableSelection;

    //
    // callbacks
    //
    onSelectionChanged: CallbackRegistration<{ selection: InvertableSelection }>;
}

/**
 * Handles selection of items with stages: working and committed.
 * @alpha
 */
export interface IStagedInvertableSelectionHandler extends Omit<IInvertableSelectionHandler, "getSelection"> {
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

    getWorkingSelection(): InvertableSelection;
    getCommittedSelection(): InvertableSelection;

    //
    // callbacks
    //
    onSelectionCommitted: CallbackRegistration<{ selection: InvertableSelection }>;
}

//
// Multi select
//

/**
 * @alpha
 */
export interface AttributeElementSelectionFull {
    elements: IAttributeElement[];
    isInverted: boolean;
}

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
 * @alpha
 */
export interface IStagedMultiSelectionAttributeFilterHandler
    extends IMultiSelectAttributeFilterHandler,
        IStagedInvertableSelectionHandler {}
