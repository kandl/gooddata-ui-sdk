import { Patch } from "immer";
import { CaseReducer, Draft, PayloadAction } from "@reduxjs/toolkit";
import { IDashboardCommand } from "../../commands/index.js";
/**
 * An entry on undo stack contains patches required
 *
 * @alpha
 */
export interface UndoEntry<T extends IDashboardCommand = IDashboardCommand> {
    /**
     * Dashboard command that has initiated the state changes.
     */
    cmd: T;
    /**
     * Patches to apply in order to undo the changes.
     */
    undoPatches: Patch[];
    /**
     * Patches to apply in order to redo the undone changes.
     */
    redoPatches: Patch[];
}
/**
 * Slice that can be undo-enabled needs to include the undo section which will contain the essential undo metadata.
 *
 * @alpha
 */
export interface UndoEnhancedState<T extends IDashboardCommand = IDashboardCommand> {
    _undo: {
        undoPointer: number;
        undoStack: UndoEntry<T>[];
    };
}
/**
 * Initial value of the undo state.
 */
export declare const InitialUndoState: UndoEnhancedState<any>;
/**
 * Actions that can be undone need to contain extra information in order to perform the undo correctly.
 */
export interface UndoPayload<T extends IDashboardCommand = IDashboardCommand> {
    /**
     * Undo-related information. If not specified, then no undo will be possible for the action
     */
    undo: {
        /**
         * Command that has initiated the undoable reductions. Command processing establishes the boundary for undo
         * processing: undo needs to roll back everything that a command has done to the state. Single command may do
         * multiple modifications in succession and may create several entries in the undo stack. All of those need
         * to be undone.
         */
        cmd: T;
    };
}
/**
 * Signature of the reducer enhanced to with undo - the payload action requires additional `undo` part in the payload.
 *
 * @internal
 */
export type UndoEnabledReducer<TState extends UndoEnhancedState<TCmd>, TPayload, TCmd extends IDashboardCommand = IDashboardCommand> = CaseReducer<TState, PayloadAction<UndoPayload<TCmd> & TPayload>>;
/**
 * Decorates a reducer with capability to construct undo and redo patches for the state modification done by the underlying reducer.
 *
 * The essential undo metadata will be stored next to the modified state in the `undo` section.
 *
 * @param originalReducer - reducer to decorate
 */
export declare const withUndo: <TState extends UndoEnhancedState<TCmd>, TPayload, TCmd extends IDashboardCommand = IDashboardCommand>(originalReducer: CaseReducer<TState, {
    /**
     * Dashboard command that has initiated the state changes.
     */
    payload: TPayload;
    type: string;
}>) => UndoEnabledReducer<TState, UndoPayload<TCmd> & TPayload, IDashboardCommand>;
export type UndoActionPayload = {
    /**
     * Pointer on the undo stack. All stack entries from this index (including) up to the last entry will be undone.
     */
    undoDownTo: number;
};
/**
 * A generic undo reducer that works with any UndoEnhancedState and the undo stack stored within. When triggered,
 * it will roll the state back to particular point in history.
 *
 * Note that this reducer is not concerned by the transaction boundaries of command processing. It is responsibility
 * of the caller to create an undo action that
 */
export declare const undoReducer: <TState extends UndoEnhancedState<IDashboardCommand>>(state: Draft<TState>, action: PayloadAction<UndoActionPayload>) => TState;
/**
 * A reducer to reset the undo state. This will clear the undo stack (the 'history').
 *
 * @param state - undo enhanced state whose undo to reset
 */
export declare const resetUndoReducer: <TState extends UndoEnhancedState<IDashboardCommand>>(state: Draft<TState>) => void;
export interface UndoableCommand<TCmd extends IDashboardCommand = IDashboardCommand> {
    /**
     * Command that can be un-done.
     */
    cmd: TCmd;
    /**
     * First occurrence of the command on the undo-stack. A single command processing may potentially create
     * multiple entries in the undo stack. It can 'achieve' this by dispatching multiple undoable reducer actions.
     *
     * Not even batch processing will save us from this (at the moment) because the withUndo wrapping which creates
     * patches is done on particular reducer level (which the batch-actions reducer calls in sequence).
     */
    firstOccurrenceOnStack: number;
}
/**
 * Given the undo information stored in state, this function produces an array of commands that can be un-done. The commands
 * are ordered from the newest (0 index) to the oldest.
 *
 * For each command, the function includes pointer to the undo stack up-to which the undo should be done in order
 * to roll back the command's effects.
 */
export declare function createUndoableCommandsMapping<TCmd extends IDashboardCommand = IDashboardCommand>(state: UndoEnhancedState<TCmd>): UndoableCommand<TCmd>[];
