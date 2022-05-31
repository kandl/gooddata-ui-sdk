// (C) 2022 GoodData Corporation
import { v4 as uuid } from "uuid";
import { AttributeElementSelection, Correlation } from "../types/common";
import { IAttributeElementsSelectionHandler, IStagedAttributeElementsSelectionHandler } from "../types";
import { newCallbackHandler } from "./common";

/**
 * @internal
 */
export class DefaultAttributeElementsSelectionHandler implements IAttributeElementsSelectionHandler {
    private selection: AttributeElementSelection;

    constructor(selection?: AttributeElementSelection) {
        this.selection = selection ?? { isInverted: true, items: [] };
    }

    // manipulators
    changeSelection = (selection: AttributeElementSelection): void => {
        this.selection = selection;
    };

    invertSelection = (): void => {
        const current = this.getSelection();
        this.changeSelection({ ...current, isInverted: !current.isInverted });
    };

    clearSelection = (): void => {
        this.changeSelection({ isInverted: true, items: [] });
    };

    // selectors
    getSelection = (): AttributeElementSelection => {
        return this.selection;
    };
}

/**
 * @internal
 */
export class DefaultStagedAttributeElementsSelectionHandler
    implements IStagedAttributeElementsSelectionHandler
{
    protected committedSelectionHandler: IAttributeElementsSelectionHandler;
    protected workingSelectionHandler: IAttributeElementsSelectionHandler;

    private onSelectionChangedHandler = newCallbackHandler<{ selection: AttributeElementSelection }>();
    private onSelectionConfirmedHandler = newCallbackHandler<{ selection: AttributeElementSelection }>();

    constructor(initialSelection: AttributeElementSelection = { isInverted: true, items: [] }) {
        this.committedSelectionHandler = new DefaultAttributeElementsSelectionHandler(initialSelection);
        this.workingSelectionHandler = new DefaultAttributeElementsSelectionHandler(initialSelection);
    }

    // manipulators
    commitSelection = (correlation: Correlation = uuid()): void => {
        this.committedSelectionHandler = { ...this.workingSelectionHandler };
        this.onSelectionConfirmedHandler.triggerAll({
            correlation,
            selection: this.committedSelectionHandler.getSelection(),
        });
    };

    revertSelection = (correlation: Correlation = uuid()): void => {
        this.workingSelectionHandler = { ...this.committedSelectionHandler };
        this.onSelectionChangedHandler.triggerAll({
            correlation,
            selection: this.committedSelectionHandler.getSelection(),
        });
    };

    changeSelection = (selection: AttributeElementSelection, correlation: Correlation = uuid()): void => {
        this.workingSelectionHandler.changeSelection(selection);
        this.onSelectionChangedHandler.triggerAll({
            correlation,
            selection: this.workingSelectionHandler.getSelection(),
        });
    };

    invertSelection = (): void => {
        const current = this.getWorkingSelection();
        this.changeSelection({
            ...current,
            isInverted: !current.isInverted,
        });
    };

    clearSelection = (): void => {
        this.changeSelection({ isInverted: true, items: [] });
    };

    // selectors
    getWorkingSelection = (): AttributeElementSelection => {
        return this.workingSelectionHandler.getSelection();
    };

    getCommittedSelection = (): AttributeElementSelection => {
        return this.committedSelectionHandler.getSelection();
    };

    // callbacks
    onSelectionChanged = this.onSelectionChangedHandler.subscribe;
    onSelectionCommitted = this.onSelectionChangedHandler.subscribe;
}
