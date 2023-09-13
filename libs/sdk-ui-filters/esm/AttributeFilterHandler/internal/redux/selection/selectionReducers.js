import isNil from "lodash/isNil.js";
import { selectCommittedSelection, selectIsCommittedSelectionInverted, selectIsWorkingSelectionInverted, selectWorkingSelection, } from "./selectionSelectors.js";
const changeSelection = (state, action) => {
    state.selection.working.keys = action.payload.selection;
    if (!isNil(action.payload.isInverted)) {
        state.selection.working.isInverted = action.payload.isInverted;
    }
};
const revertSelection = (state) => {
    const committedSelection = selectCommittedSelection(state);
    const isCommittedSelectionInverted = selectIsCommittedSelectionInverted(state);
    state.selection.working.keys = committedSelection;
    state.selection.working.isInverted = isCommittedSelectionInverted;
};
const commitSelection = (state) => {
    const workingSelection = selectWorkingSelection(state);
    const isWorkingSelectionInverted = selectIsWorkingSelectionInverted(state);
    state.selection.commited.keys = workingSelection;
    state.selection.commited.isInverted = isWorkingSelectionInverted;
};
const invertSelection = (state) => {
    const isWorkingSelectionInverted = selectIsWorkingSelectionInverted(state);
    state.selection.working.isInverted = !isWorkingSelectionInverted;
};
const clearSelection = (state) => {
    state.selection.working.keys = [];
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
//# sourceMappingURL=selectionReducers.js.map