// (C) 2021-2023 GoodData Corporation
import { useCallback } from "react";
import { useDispatchDashboardCommand } from "./useDispatchDashboardCommand.js";
import { setExecutionResultData, setExecutionResultError, setExecutionResultLoading, } from "../commands/index.js";
/**
 * Provides callbacks to integrate with the executionResults slice.
 * @internal
 */
export function useWidgetExecutionsHandler(widgetRef) {
    const startLoading = useDispatchDashboardCommand(setExecutionResultLoading);
    const setData = useDispatchDashboardCommand(setExecutionResultData);
    const setError = useDispatchDashboardCommand(setExecutionResultError);
    const onError = useCallback((error) => {
        setError(widgetRef, error);
    }, [setError, widgetRef]);
    const onSuccess = useCallback((executionResult, warnings) => {
        setData(widgetRef, executionResult, warnings);
    }, [setData, widgetRef]);
    const onPushData = useCallback((data) => {
        if (data.dataView) {
            onSuccess(data.dataView.result, data.dataView.warnings);
        }
    }, [onSuccess]);
    const onLoadingChanged = useCallback(({ isLoading }) => {
        if (isLoading) {
            startLoading(widgetRef);
        }
    }, [startLoading, widgetRef]);
    return {
        onLoadingChanged,
        onError,
        onSuccess,
        onPushData,
    };
}
//# sourceMappingURL=useWidgetExecutionsHandler.js.map