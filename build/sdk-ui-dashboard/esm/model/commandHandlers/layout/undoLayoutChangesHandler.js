import { invalidArgumentsProvided } from "../../events/general.js";
import { selectLayout, selectUndoableLayoutCommands } from "../../store/layout/layoutSelectors.js";
import { put, select } from "redux-saga/effects";
import { layoutActions } from "../../store/layout/index.js";
import { layoutChanged } from "../../events/layout.js";
/*
 * Default impl returns 0 -> meaning drop everything that the latest command achieved.
 */
const latestCommandUndoSelector = (_cmds) => {
    return 0;
};
export function* undoLayoutChangesHandler(ctx, cmd) {
    const undoableCommands = yield select(selectUndoableLayoutCommands);
    const { undoPointSelector = latestCommandUndoSelector } = cmd.payload;
    const undoUpToIncludingCmd = undoPointSelector(undoableCommands.map((entry) => entry.cmd));
    if (undoUpToIncludingCmd < 0 || undoUpToIncludingCmd >= undoableCommands.length) {
        throw invalidArgumentsProvided(ctx, cmd, `Undo point selector returned result out of bounds. Undoable commands: ${undoableCommands.length}. Got index: ${undoUpToIncludingCmd}`);
    }
    const selectedCommand = undoableCommands[undoUpToIncludingCmd];
    yield put(layoutActions.undoLayout({
        undoDownTo: selectedCommand.firstOccurrenceOnStack,
    }));
    const layout = yield select(selectLayout);
    return layoutChanged(ctx, layout, cmd.correlationId);
}
//# sourceMappingURL=undoLayoutChangesHandler.js.map