import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { Correlation } from "../../../types/index.js";
import { AttributeFilterReducer } from "../store/state.js";
/**
 * @internal
 */
export declare const initReducers: {
    init: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    initStart: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    initSuccess: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    initError: AttributeFilterReducer<{
        payload: {
            error: GoodDataSdkError;
            correlation: Correlation;
        };
        type: string;
    }>;
    initCancel: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
};
