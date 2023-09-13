import { IResultWarning, ObjRef } from "@gooddata/sdk-model";
import { IPushData, OnError, OnLoadingChanged } from "@gooddata/sdk-ui";
import { IExecutionResult } from "@gooddata/sdk-backend-spi";
/**
 * Provides callbacks to integrate with the executionResults slice.
 * @internal
 */
export declare function useWidgetExecutionsHandler(widgetRef: ObjRef): {
    onLoadingChanged: OnLoadingChanged;
    onError: OnError;
    onSuccess: (executionResult: IExecutionResult, warnings: IResultWarning[] | undefined) => void;
    onPushData: (data: IPushData) => void;
};
