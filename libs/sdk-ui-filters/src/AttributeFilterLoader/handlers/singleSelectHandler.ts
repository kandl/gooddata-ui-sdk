// (C) 2022 GoodData Corporation
import {
    IAttributeElement,
    filterObjRef,
    newNegativeAttributeFilter,
    newPositiveAttributeFilter,
    filterAttributeElements,
    isAttributeElementsByRef,
    isPositiveAttributeFilter,
} from "@gooddata/sdk-model";
import { actions } from "../internal";
import { CallbackRegistration, IStagedSingleSelectionAttributeFilterHandler } from "../types";
import { AttributeFilterHandlerBase, IAttributeFilterHandlerConfig } from "./base";
import { newCallbackHandler } from "./common";

/**
 * @alpha
 */
export class StagedSingleSelectionAttributeFilterHandler
    extends AttributeFilterHandlerBase
    implements IStagedSingleSelectionAttributeFilterHandler
{
    private static sanitizeConfig(config: IAttributeFilterHandlerConfig): IAttributeFilterHandlerConfig {
        // TODO: move to redux store?
        const elements = filterAttributeElements(config.filter);
        const items = isAttributeElementsByRef(elements) ? elements.uris : elements.values;
        const firstItem = items[0];
        const sanitizedItems = isAttributeElementsByRef(elements)
            ? { uris: [firstItem] }
            : { values: [firstItem] };
        return {
            ...config,
            filter: isPositiveAttributeFilter(config.filter)
                ? newPositiveAttributeFilter(filterObjRef(config.filter), sanitizedItems)
                : newNegativeAttributeFilter(filterObjRef(config.filter), sanitizedItems),
        };
    }

    // TODO: does this clash with AttributeFilterHandlerBase callbacks?
    private selectionCallbacks = {
        selectionChanged: newCallbackHandler<{ selection: string | undefined }>(),
        selectionCommited: newCallbackHandler<{ selection: string | undefined }>(),
    };

    constructor(config: IAttributeFilterHandlerConfig) {
        super(StagedSingleSelectionAttributeFilterHandler.sanitizeConfig(config));
    }

    changeSelection = (_selection: string | undefined): void => {
        // return this.stagedSelectionHandler.changeSelection({
        //     isInverted: false,
        //     items: selection ? [selection] : [],
        // });
        this.redux.dispatch(actions.changeSelection());
    };

    revertSelection = (): void => {
        this.redux.dispatch(actions.revertSelection());
    };

    // TODO: remove?
    commitSelection = (): void => {
        this.redux.dispatch(actions.commitSelection());
    };

    getWorkingSelection = (): string | undefined => {
        // TODO: return this.redux.select();
        // return this.stagedSelectionHandler.getWorkingSelection().items[0];
        return undefined;
    };

    getCommittedSelection = (): string | undefined => {
        // TODO: return this.redux.select();
        // return this.stagedSelectionHandler.getCommittedSelection().items[0];
        return undefined;
    };

    getSelectedItem = (): IAttributeElement | undefined => {
        // TODO: return this.redux.select();
        // return this.getSelectedItemsBase().elements[0];
        return undefined;
    };

    onSelectionChanged: CallbackRegistration<{ selection: string | undefined }> = (cb) => {
        // stagedSelectionHandler.onSelectionChanged((selection) => {
        //     cb({ selection: selection.selection.items[0] });
        // });
        return this.selectionCallbacks.selectionChanged.subscribe(cb); // TODO: single selection
    };

    onSelectionCommitted: CallbackRegistration<{ selection: string | undefined }> = (cb) => {
        // return this.stagedSelectionHandler.onSelectionCommitted((selection) => {
        //     cb({ selection: selection.selection.items[0] });
        // });
        return this.selectionCallbacks.selectionCommited.subscribe(cb); // TODO: single selection
    };
}
