import { CallbackRegistration, IMultiSelectAttributeFilterHandler, InvertableAttributeElementSelection, OnSelectionChangedCallbackPayload, OnSelectionCommittedCallbackPayload } from "../types/index.js";
import { AttributeFilterLoader } from "./loader.js";
import { AttributeFilterHandlerConfig } from "./types.js";
/**
 * @internal
 */
export declare class MultiSelectAttributeFilterHandler extends AttributeFilterLoader implements IMultiSelectAttributeFilterHandler {
    constructor(config: AttributeFilterHandlerConfig);
    changeSelection: (selection: InvertableAttributeElementSelection) => void;
    revertSelection: () => void;
    commitSelection: () => void;
    invertSelection: () => void;
    clearSelection: () => void;
    getWorkingSelection: () => InvertableAttributeElementSelection;
    isWorkingSelectionEmpty: () => boolean;
    isWorkingSelectionChanged: () => boolean;
    getCommittedSelection: () => InvertableAttributeElementSelection;
    onSelectionChanged: CallbackRegistration<OnSelectionChangedCallbackPayload<InvertableAttributeElementSelection>>;
    onSelectionCommitted: CallbackRegistration<OnSelectionCommittedCallbackPayload<InvertableAttributeElementSelection>>;
}
