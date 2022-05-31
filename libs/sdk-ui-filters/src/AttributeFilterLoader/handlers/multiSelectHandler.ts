// (C) 2022 GoodData Corporation
import {
    AttributeElementSelection,
    AttributeElementSelectionFull,
    CallbackRegistration,
} from "../types/common";
import { IStagedMultiSelectionAttributeFilterHandler } from "../types";
import { AttributeFilterHandlerBase, IAttributeFilterHandlerConfig } from "./base";

/**
 * @alpha
 */
export class StagedMultiSelectionAttributeFilterHandler
    extends AttributeFilterHandlerBase
    implements IStagedMultiSelectionAttributeFilterHandler
{
    constructor(config: IAttributeFilterHandlerConfig) {
        super(config);
    }

    changeSelection = (selection: AttributeElementSelection): void => {
        return this.stagedSelectionHandler.changeSelection(selection);
    };

    revertSelection = (): void => {
        return this.stagedSelectionHandler.revertSelection();
    };

    commitSelection = (): void => {
        return this.stagedSelectionHandler.commitSelection();
    };

    invertSelection = (): void => {
        return this.stagedSelectionHandler.invertSelection();
    };

    clearSelection = (): void => {
        return this.stagedSelectionHandler.clearSelection();
    };

    getWorkingSelection = (): AttributeElementSelection => {
        return this.stagedSelectionHandler.getWorkingSelection();
    };

    getSelectedItems = (): AttributeElementSelectionFull => {
        return this.getSelectedItemsBase();
    };

    getCommittedSelection = (): AttributeElementSelection => {
        return this.stagedSelectionHandler.getCommittedSelection();
    };

    onSelectionChanged: CallbackRegistration<{ selection: AttributeElementSelection }> = (cb) => {
        return this.stagedSelectionHandler.onSelectionChanged(cb);
    };

    onSelectionCommitted: CallbackRegistration<{ selection: AttributeElementSelection }> = (cb) => {
        return this.stagedSelectionHandler.onSelectionCommitted(cb);
    };
}
