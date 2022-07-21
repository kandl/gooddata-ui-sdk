// (C) 2021-2022 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";

import { selectState } from "../common/selectors";

/**
 * @internal
 */
export const selectWorkingSelection = createSelector(selectState, (state) => state.workingSelection);

/**
 * @internal
 */
export const selectIsWorkingSelectionInverted = createSelector(
    selectState,
    (state) => state.isWorkingSelectionInverted,
);

/**
 * @internal
 */
export const selectCommittedSelection = createSelector(selectState, (state) => state.committedSelection);

/**
 * @internal
 */
export const selectIsCommittedSelectionInverted = createSelector(
    selectState,
    (state) => state.isCommittedSelectionInverted,
);
