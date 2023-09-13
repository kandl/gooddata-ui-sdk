import { AttributeFilterReducer } from "../store/state.js";
/**
 * @internal
 */
export declare const selectionReducers: {
    changeSelection: AttributeFilterReducer<{
        payload: {
            selection: string[];
            isInverted?: boolean;
        };
        type: string;
    }>;
    revertSelection: AttributeFilterReducer;
    commitSelection: AttributeFilterReducer;
    invertSelection: AttributeFilterReducer;
    clearSelection: AttributeFilterReducer;
};
