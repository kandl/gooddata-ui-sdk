import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { Correlation, ILoadElementsResult } from "../../../types/index.js";
import { AttributeFilterReducer } from "../store/state.js";
/**
 * @internal
 */
export declare const loadNextElementsPageReducers: {
    loadNextElementsPageRequest: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    loadNextElementsPageStart: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    loadNextElementsPageSuccess: AttributeFilterReducer<{
        payload: ILoadElementsResult & {
            correlation: Correlation;
        };
        type: string;
    }>;
    loadNextElementsPageError: AttributeFilterReducer<{
        payload: {
            error: GoodDataSdkError;
            correlation: Correlation;
        };
        type: string;
    }>;
    loadNextElementsPageCancelRequest: AttributeFilterReducer;
    loadNextElementsPageCancel: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
};
