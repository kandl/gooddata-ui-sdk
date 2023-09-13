import { useBackendStrict, useWorkspaceStrict, resolveUseCancelablePromisesStatus, resolveUseCancelablePromisesError, } from "../base/index.js";
import { useExecutionDataView } from "./useExecutionDataView.js";
import { useInsight } from "./useInsight.js";
/**
 * React hook to get data for a specific insight.
 *
 * @public
 */
export function useInsightDataView(config, deps) {
    const { insight: insightRef, sorts, dateFormat, dimensions, filters, window, executeByReference, onCancel, onError, onLoading, onPending, onSuccess, } = config;
    const backend = useBackendStrict(config.backend, "useInsightDataView");
    const workspace = useWorkspaceStrict(config.workspace, "useInsightDataView");
    const effectiveDeps = deps !== null && deps !== void 0 ? deps : [];
    const insightPromise = useInsight({ insight: insightRef, backend, workspace }, effectiveDeps);
    const executionFactory = backend.workspace(workspace).execution();
    const executeFn = (executeByReference ? executionFactory.forInsightByRef : executionFactory.forInsight).bind(executionFactory);
    let insightExecution = insightPromise.result && executeFn(insightPromise.result, filters);
    if (insightExecution) {
        if (sorts) {
            const resolvedSorts = typeof sorts === "function" ? sorts(insightExecution.definition) : sorts;
            insightExecution = insightExecution.withSorting(...resolvedSorts);
        }
        if (dimensions) {
            const resolvedDimensions = typeof dimensions === "function" ? dimensions(insightExecution.definition) : dimensions;
            insightExecution = insightExecution.withDimensions(...resolvedDimensions);
        }
        if (dateFormat) {
            const resolvedDateFormat = typeof dateFormat === "function" ? dateFormat(insightExecution.definition) : dateFormat;
            insightExecution = insightExecution.withDateFormat(resolvedDateFormat);
        }
    }
    const executionDataViewPromise = useExecutionDataView({
        execution: insightExecution,
        window,
        backend,
        workspace,
        onCancel,
        onError,
        onLoading,
        onPending,
        onSuccess,
    }, deps);
    const cancelablePromises = [insightPromise, executionDataViewPromise];
    return {
        result: executionDataViewPromise.result,
        error: resolveUseCancelablePromisesError(cancelablePromises),
        status: resolveUseCancelablePromisesStatus(cancelablePromises),
    };
}
//# sourceMappingURL=useInsightDataView.js.map