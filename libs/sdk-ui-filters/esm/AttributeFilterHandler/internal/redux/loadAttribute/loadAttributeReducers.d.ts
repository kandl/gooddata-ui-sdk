import { IAttributeMetadataObject } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { Correlation } from "../../../types/index.js";
import { AttributeFilterReducer } from "../store/state.js";
/**
 * @internal
 */
export declare const loadAttributeReducers: {
    loadAttributeRequest: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    loadAttributeStart: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
    loadAttributeSuccess: AttributeFilterReducer<{
        payload: {
            attribute: IAttributeMetadataObject;
            correlation: Correlation;
        };
        type: string;
    }>;
    loadAttributeError: AttributeFilterReducer<{
        payload: {
            error: GoodDataSdkError;
            correlation: Correlation;
        };
        type: string;
    }>;
    loadAttributeCancelRequest: AttributeFilterReducer;
    loadAttributeCancel: AttributeFilterReducer<{
        payload: {
            correlation: Correlation;
        };
        type: string;
    }>;
};
