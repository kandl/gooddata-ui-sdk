import { AttributeElementKey, CallbackRegistration, ISingleSelectAttributeFilterHandler, OnSelectionChangedCallbackPayload, OnSelectionCommittedCallbackPayload } from "../types/index.js";
import { AttributeFilterLoader } from "./loader.js";
import { AttributeFilterHandlerConfig } from "./types.js";
/**
 * @internal
 */
export declare class SingleSelectAttributeFilterHandler extends AttributeFilterLoader implements ISingleSelectAttributeFilterHandler {
    private static sanitizeConfig;
    constructor(config: AttributeFilterHandlerConfig);
    changeSelection: (selection: string | undefined) => void;
    revertSelection: () => void;
    commitSelection: () => void;
    getWorkingSelection: () => string | undefined;
    isWorkingSelectionEmpty: () => boolean;
    isWorkingSelectionChanged: () => boolean;
    getCommittedSelection: () => string | undefined;
    onSelectionChanged: CallbackRegistration<OnSelectionChangedCallbackPayload<AttributeElementKey | undefined>>;
    onSelectionCommitted: CallbackRegistration<OnSelectionCommittedCallbackPayload<AttributeElementKey | undefined>>;
}
