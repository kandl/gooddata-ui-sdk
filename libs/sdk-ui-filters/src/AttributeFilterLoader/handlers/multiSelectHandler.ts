// (C) 2022 GoodData Corporation
import { CallbackRegistration } from "../types/common";
import {
    IStagedMultiSelectionAttributeFilterHandler,
    InvertableSelection,
    AttributeElementSelectionFull,
} from "../types";
import { AttributeFilterHandlerBase, IAttributeFilterHandlerConfig } from "./base";
import { actions } from "../internal";
import { newCallbackHandler } from "./common";

/**
 * @alpha
 */
export class StagedMultiSelectionAttributeFilterHandler
    extends AttributeFilterHandlerBase
    implements IStagedMultiSelectionAttributeFilterHandler
{
    private selectionCallbacks = {
        selectionChanged: newCallbackHandler<{ selection: InvertableSelection }>(),
        selectionCommited: newCallbackHandler<{ selection: InvertableSelection }>(),
    };

    constructor(config: IAttributeFilterHandlerConfig) {
        super(config);
    }

    changeSelection = (_selection: InvertableSelection): void => {
        this.redux.dispatch(actions.changeSelection());
    };

    revertSelection = (): void => {
        this.redux.dispatch(actions.revertSelection());
    };

    commitSelection = (): void => {
        this.redux.dispatch(actions.commitSelection());
    };

    invertSelection = (): void => {
        this.redux.dispatch(actions.invertSelection());
    };

    clearSelection = (): void => {
        this.redux.dispatch(actions.clearSelection());
    };

    getWorkingSelection = (): InvertableSelection => {
        // TODO: return this.redux.select();
        return {
            isInverted: false,
            items: [],
        };
    };

    getSelectedItems = (): AttributeElementSelectionFull => {
        // TODO: return this.redux.select();
        return {
            isInverted: false,
            elements: [],
        };
    };

    getCommittedSelection = (): InvertableSelection => {
        // TODO: return this.redux.select();
        return {
            isInverted: true,
            items: [],
        };
    };

    onSelectionChanged: CallbackRegistration<{ selection: InvertableSelection }> = (cb) => {
        return this.selectionCallbacks.selectionChanged.subscribe(cb);
    };

    onSelectionCommitted: CallbackRegistration<{ selection: InvertableSelection }> = (cb) => {
        return this.selectionCallbacks.selectionCommited.subscribe(cb);
    };
}
