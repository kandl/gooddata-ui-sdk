// (C) 2021-2022 GoodData Corporation
import { PayloadAction } from "@reduxjs/toolkit";
import isNil from "lodash/isNil";

import { AttributeFilterReducer } from "../state";
import {
    selectCommittedSelection,
    selectIsCommittedSelectionInverted,
    selectIsWorkingSelectionInverted,
    selectWorkingSelection,
} from "./selectors";

const changeSelection: AttributeFilterReducer<
    PayloadAction<{ selection: string[]; isInverted?: boolean }>
> = (state, action) => {
    state.workingSelection = action.payload.selection;

    if (!isNil(action.payload.isInverted)) {
        state.isWorkingSelectionInverted = action.payload.isInverted;
    }
};

const revertSelection: AttributeFilterReducer = (state) => {
    const committedSelection = selectCommittedSelection(state);
    const isCommittedSelectionInverted = selectIsCommittedSelectionInverted(state);

    state.workingSelection = committedSelection;
    state.isWorkingSelectionInverted = isCommittedSelectionInverted;
};

const commitSelection: AttributeFilterReducer = (state) => {
    const workingSelection = selectWorkingSelection(state);
    const isWorkingSelectionInverted = selectIsWorkingSelectionInverted(state);

    state.committedSelection = workingSelection;
    state.isCommittedSelectionInverted = isWorkingSelectionInverted;
};

const invertSelection: AttributeFilterReducer = (state) => {
    const isWorkingSelectionInverted = selectIsWorkingSelectionInverted(state);

    state.isWorkingSelectionInverted = !isWorkingSelectionInverted;
};

const clearSelection: AttributeFilterReducer = (state) => {
    state.workingSelection = [];
};

/**
 * @internal
 */
export const selectionReducers = {
    changeSelection,
    revertSelection,
    commitSelection,
    invertSelection,
    clearSelection,
};
