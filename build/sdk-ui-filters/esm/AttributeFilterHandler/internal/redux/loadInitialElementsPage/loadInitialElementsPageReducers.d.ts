import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { Correlation, ILoadElementsResult } from "../../../types/index.js";
import { AttributeFilterReducer } from "../store/state.js";
/**
 * @internal
 */
export declare const loadInitialElementsPageReducers: {
    loadInitialElementsPageRequest: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    loadInitialElementsPageStart: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    loadInitialElementsPageSuccess: AttributeFilterReducer<{
        payload: ILoadElementsResult & {
            correlation: Correlation;
        };
        type: string;
    }>;
    loadInitialElementsPageError: AttributeFilterReducer<{
        payload: {
            error: GoodDataSdkError;
            correlation: Correlation;
        };
        type: string;
    }>;
    loadInitialElementsPageCancelRequest: AttributeFilterReducer;
    loadInitialElementsPageCancel: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
};
