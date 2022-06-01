// (C) 2021-2022 GoodData Corporation
import { PayloadAction } from "@reduxjs/toolkit";
import { IAttributeElement } from "@gooddata/sdk-model";
import identity from "lodash/identity";

import { AttributeFilterReducer } from "../state";

const setSelection: AttributeFilterReducer<PayloadAction<{ selection: IAttributeElement[] }>> = (
    state,
    action,
) => {
    state.selectedAttributeElements = action.payload.selection;
};

const setIsInverted: AttributeFilterReducer<PayloadAction<{ isInverted: boolean }>> = (state, action) => {
    state.isInverted = action.payload.isInverted;
};

// changeSelection = (selection: InvertableSelection): void => {
//     return this.redux.dispatch(); // .changeSelection(selection);
// };
const changeSelection: AttributeFilterReducer = identity;

// revertSelection = (): void => {
//     return this.stagedSelectionHandler.revertSelection();
// };
const revertSelection: AttributeFilterReducer = identity;

// commitSelection = (): void => {
//     return this.stagedSelectionHandler.commitSelection();
// };
const commitSelection: AttributeFilterReducer = identity;

// invertSelection = (): void => {
//     return this.stagedSelectionHandler.invertSelection();
// };
const invertSelection: AttributeFilterReducer = identity;

// clearSelection = (): void => {
//     return this.stagedSelectionHandler.clearSelection();
// };
const clearSelection: AttributeFilterReducer = identity;

/**
 * @internal
 */
export const selectionReducers = {
    setSelection,
    setIsInverted,
    //
    changeSelection,
    revertSelection,
    commitSelection,
    invertSelection,
    clearSelection,
};
