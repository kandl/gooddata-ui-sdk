// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import isEmpty from "lodash/isEmpty.js";
import isEqual from "lodash/isEqual.js";
import { selectState } from "../common/selectors.js";
/**
 * @internal
 */
export const selectWorkingSelection = createSelector(selectState, (state) => state.selection.working.keys);
/**
 * @internal
 */
export const selectIsWorkingSelectionInverted = createSelector(selectState, (state) => state.selection.working.isInverted);
/**
 * @internal
 */
export const selectCommittedSelection = createSelector(selectState, (state) => state.selection.commited.keys);
/**
 * @internal
 */
export const selectIsCommittedSelectionInverted = createSelector(selectState, (state) => state.selection.commited.isInverted);
/**
 * @internal
 */
export const selectInvertableWorkingSelection = createSelector(selectWorkingSelection, selectIsWorkingSelectionInverted, (keys, isInverted) => ({
    keys,
    isInverted,
}));
/**
 * @internal
 */
export const selectInvertableCommittedSelection = createSelector(selectCommittedSelection, selectIsCommittedSelectionInverted, (keys, isInverted) => ({
    keys,
    isInverted,
}));
/**
 * @internal
 */
export const selectIsWorkingSelectionChanged = createSelector(selectIsWorkingSelectionInverted, selectWorkingSelection, selectIsCommittedSelectionInverted, selectCommittedSelection, (isWorkingSelectionInverted, workingSelection, isCommitedSelectionInverted, commitedSelection) => isWorkingSelectionInverted !== isCommitedSelectionInverted ||
    !isEqual([...commitedSelection].sort(), [...workingSelection].sort()));
/**
 * @internal
 */
export const selectIsWorkingSelectionEmpty = createSelector(selectWorkingSelection, isEmpty);
//# sourceMappingURL=selectionSelectors.js.map