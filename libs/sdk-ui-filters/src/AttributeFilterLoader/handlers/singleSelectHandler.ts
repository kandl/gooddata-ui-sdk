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
import { CallbackRegistration, IStagedSingleSelectionAttributeFilterHandler } from "../types";
import { AttributeFilterHandlerBase, IAttributeFilterHandlerConfig } from "./base";

/**
 * @internal
 */
export class StagedSingleSelectionAttributeFilterHandler
    extends AttributeFilterHandlerBase
    implements IStagedSingleSelectionAttributeFilterHandler
{
    private static sanitizeConfig(config: IAttributeFilterHandlerConfig): IAttributeFilterHandlerConfig {
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

    constructor(config: IAttributeFilterHandlerConfig) {
        super(StagedSingleSelectionAttributeFilterHandler.sanitizeConfig(config));
    }

    changeSelection = (selection: string | undefined): void => {
        return this.stagedSelectionHandler.changeSelection({
            isInverted: false,
            items: selection ? [selection] : [],
        });
    };

    revertSelection = (): void => {
        return this.stagedSelectionHandler.revertSelection();
    };

    commitSelection = (): void => {
        return this.stagedSelectionHandler.commitSelection();
    };

    getWorkingSelection = (): string | undefined => {
        return this.stagedSelectionHandler.getWorkingSelection().items[0];
    };

    getCommittedSelection = (): string | undefined => {
        return this.stagedSelectionHandler.getCommittedSelection().items[0];
    };

    onSelectionChanged: CallbackRegistration<{ selection: string | undefined }> = (cb) => {
        return this.stagedSelectionHandler.onSelectionChanged((selection) => {
            cb({ selection: selection.selection.items[0] });
        });
    };

    getSelectedItem = (): IAttributeElement | undefined => {
        return this.getSelectedItemsBase().elements[0];
    };

    onSelectionCommitted: CallbackRegistration<{ selection: string | undefined }> = (cb) => {
        return this.stagedSelectionHandler.onSelectionCommitted((selection) => {
            cb({ selection: selection.selection.items[0] });
        });
    };
}
