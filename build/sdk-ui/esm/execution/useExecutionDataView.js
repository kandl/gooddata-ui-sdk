import { DataViewFacade, useBackendStrict, useWorkspaceStrict, useResolveValuesWithPlaceholders, useCancelablePromise, convertError, } from "../base/index.js";
import isEmpty from "lodash/isEmpty.js";
import { createExecution } from "./createExecution.js";
/**
 * @internal
 */
function isExecutionConfiguration(obj) {
    return !isEmpty(obj) && !!(obj === null || obj === void 0 ? void 0 : obj.seriesBy);
}
/**
 * React hook to get data for a specific execution.
 *
 * @public
 */
export function useExecutionDataView(config, deps) {
    var _a, _b, _c;
    const { execution, window, onCancel, onError, onLoading, onPending, onSuccess } = config;
    const backend = useBackendStrict(config.backend, "useExecutionDataView");
    const workspace = useWorkspaceStrict(config.workspace, "useExecutionDataView");
    const effectiveDeps = deps !== null && deps !== void 0 ? deps : [];
    const propsToResolve = getExecutionConfigurationProps(config.execution);
    const [seriesBy, slicesBy, totals, filters, sortBy] = useResolveValuesWithPlaceholders([
        propsToResolve.seriesBy,
        propsToResolve.slicesBy,
        propsToResolve.totals,
        propsToResolve.filters,
        propsToResolve.sortBy,
    ], propsToResolve.placeholdersResolutionContext);
    const preparedExecution = isExecutionConfiguration(execution)
        ? createExecution(Object.assign(Object.assign({}, execution), { seriesBy: seriesBy, slicesBy,
            totals,
            filters,
            sortBy,
            backend,
            workspace }))
        : execution;
    return useCancelablePromise({
        promise: preparedExecution
            ? () => preparedExecution
                .execute()
                .then((executionResult) => window
                ? executionResult.readWindow(window.offset, window.size)
                : executionResult.readAll())
                .then((dataView) => {
                return DataViewFacade.for(dataView);
            })
                .catch((error) => {
                throw convertError(error);
            })
            : null,
        onCancel,
        onError,
        onLoading,
        onPending,
        onSuccess,
    }, [
        backend,
        workspace,
        (_a = preparedExecution === null || preparedExecution === void 0 ? void 0 : preparedExecution.fingerprint()) !== null && _a !== void 0 ? _a : "__executionFingerprint__",
        (_b = window === null || window === void 0 ? void 0 : window.offset) !== null && _b !== void 0 ? _b : "__offset__",
        (_c = window === null || window === void 0 ? void 0 : window.size) !== null && _c !== void 0 ? _c : "__size__",
        ...effectiveDeps,
    ]);
}
/**
 * @internal
 */
function getExecutionConfigurationProps(execution) {
    if (isExecutionConfiguration(execution)) {
        return execution;
    }
    return {};
}
//# sourceMappingURL=useExecutionDataView.js.map