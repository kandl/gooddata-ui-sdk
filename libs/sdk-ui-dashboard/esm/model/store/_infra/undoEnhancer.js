// (C) 2021-2023 GoodData Corporation
import { produce, applyPatches, enablePatches, original, produceWithPatches } from "immer";
import { invariant } from "ts-invariant";
import flatMap from "lodash/flatMap.js";
/*
 * Undo relies on immer's patching functionality. It has to be turned on explicitly.
 */
enablePatches();
/**
 * Initial value of the undo state.
 */
export const InitialUndoState = {
    _undo: {
        undoPointer: -1,
        undoStack: [],
    },
};
function unwrapProxy(value) {
    try {
        return JSON.parse(JSON.stringify(value));
    }
    catch (_a) {
        return undefined;
    }
}
function safeOriginal(value) {
    var _a;
    /*
     * original() can return undefined in case the Proxy is corrupted (this happens with immer > 9.0.12 with react-scripts for some reason),
     * so we fallback to "poor man's" getting rid of the Proxy to prevent null references down the line
     */
    const originalState = (_a = original(value)) !== null && _a !== void 0 ? _a : unwrapProxy(value);
    invariant(originalState, "Unexpected value received as state in undo enhancer (not a draft).");
    return originalState; // this cast is necessary because immer typings of original() are wrong (not unwrapping Draft<T> to T)
}
/**
 * Decorates a reducer with capability to construct undo and redo patches for the state modification done by the underlying reducer.
 *
 * The essential undo metadata will be stored next to the modified state in the `undo` section.
 *
 * @param originalReducer - reducer to decorate
 */
export const withUndo = (originalReducer) => {
    return (state, action) => {
        const { undo } = action.payload;
        const originalState = safeOriginal(state);
        const [nextState, redoPatches, undoPatches] = produceWithPatches(originalState, (draft) => {
            originalReducer(draft, action);
        });
        return produce(nextState, (draft) => {
            draft._undo.undoPointer++;
            draft._undo.undoStack.push({
                /*
                 * TODO: Getting this error, struggling to type things correctly
                 *
                 * Type 'IDashboardCommand' is not assignable to type 'Draft<Immutable<TCmd>>'
                 */
                cmd: undo.cmd,
                redoPatches,
                undoPatches,
            });
        });
    };
};
/**
 * A generic undo reducer that works with any UndoEnhancedState and the undo stack stored within. When triggered,
 * it will roll the state back to particular point in history.
 *
 * Note that this reducer is not concerned by the transaction boundaries of command processing. It is responsibility
 * of the caller to create an undo action that
 */
export const undoReducer = (state, action) => {
    const { undoDownTo } = action.payload;
    const originalState = safeOriginal(state);
    const { _undo } = originalState;
    // if this happens then the issuer has incorrectly calculated point to which to rollback.
    invariant(undoDownTo <= _undo.undoStack.length, `invalid undo point ${undoDownTo} while the undo stack has ${_undo.undoStack.length} item(s)`);
    /*
     * Get entries to apply, they are on the stack from oldest to the newest. The undo 'unwinds' from the newest up to the
     * 'undoDownTo' index. Slice everything from that index to the end of stack, then reverse to get the right order.
     */
    const entriesToUndo = _undo.undoStack.slice(undoDownTo);
    entriesToUndo.reverse();
    /*
     * Concat all the undo patches from all undo stack entries. Since the entries are ordered from the newest to the
     * oldest order, this naturally translates to ordering of the patches.
     */
    const allPatches = flatMap(entriesToUndo, (entry) => entry.undoPatches);
    /*
     * Apply patches to restore the state.
     */
    const restoredState = applyPatches(originalState, allPatches);
    return produce(restoredState, (draft) => {
        draft._undo.undoPointer = undoDownTo - 1;
        // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length#shortening_an_array
        draft._undo.undoStack.length = undoDownTo;
    });
};
/**
 * A reducer to reset the undo state. This will clear the undo stack (the 'history').
 *
 * @param state - undo enhanced state whose undo to reset
 */
export const resetUndoReducer = (state) => {
    state._undo = InitialUndoState._undo;
};
/**
 * Given the undo information stored in state, this function produces an array of commands that can be un-done. The commands
 * are ordered from the newest (0 index) to the oldest.
 *
 * For each command, the function includes pointer to the undo stack up-to which the undo should be done in order
 * to roll back the command's effects.
 */
export function createUndoableCommandsMapping(state) {
    const result = [];
    let lastCmdUuid = "";
    const seenCmdUuids = new Set();
    state._undo.undoStack.forEach((entry, idx) => {
        const { cmd, cmd: { meta: { uuid } = {} }, } = entry;
        // if this bombs then the command stamping middleware does not do its job properly
        invariant(uuid);
        if (lastCmdUuid !== uuid) {
            // if this bombs then things are getting serious as it means command handlers execute in a way that
            // the reducer actions from two commands interleave which leads to undo stack containing 'zipped'
            // entries (entry for cmd A, entry from cmd B, entry from cmd A). Undo will lead to undesired
            // results.
            invariant(!seenCmdUuids.has(uuid), "jackpot winner 🥳");
            result.unshift({
                cmd,
                firstOccurrenceOnStack: idx,
            });
            lastCmdUuid = uuid;
            seenCmdUuids.add(uuid);
        }
    });
    return result;
}
//# sourceMappingURL=undoEnhancer.js.map