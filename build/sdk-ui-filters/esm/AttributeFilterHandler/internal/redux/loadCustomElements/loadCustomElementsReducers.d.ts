import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { Correlation, ILoadElementsOptions, ILoadElementsResult } from "../../../types/index.js";
import { AttributeFilterReducer } from "../store/state.js";
/**
 * @internal
 */
export declare const loadCustomElementsReducers: {
    loadCustomElementsRequest: AttributeFilterReducer<{
        payload: {
            options: ILoadElementsOptions;
            correlation: Correlation | undefined;
        };
        type: string;
    }>;
    loadCustomElementsStart: AttributeFilterReducer<{
        payload: {
            correlation: Correlation | undefined;
        };
        type: string;
    }>;
    loadCustomElementsSuccess: AttributeFilterReducer<{
        payload: ILoadElementsResult & {
            correlation?: Correlation;
        };
        type: string;
    }>;
    loadCustomElementsError: AttributeFilterReducer<{
        payload: {
            error: GoodDataSdkError;
            correlation: Correlation | undefined;
        };
        type: string;
    }>;
    loadCustomElementsCancelRequest: AttributeFilterReducer<{
        payload: {
            correlation: Correlation | undefined;
        };
        type: string;
    }>;
    loadCustomElementsCancel: AttributeFilterReducer<{
        payload: {
            correlation: Correlation | undefined;
        };
        type: string;
    }>;
};
