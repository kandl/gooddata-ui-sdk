import { convertError, useCancelablePromise, } from "../base/index.js";
/**
 * This hook provides easy way to export data in your preferred format (csv/xlsx/raw) for the provided {@link @gooddata/sdk-backend-spi#IPreparedExecution}.
 *
 * @remarks
 * As a result, you will receive a string with uri, so you can easily create a download link.
 * Be aware that execution is re-executed only on dependency list change, not on execution/exportConfig/callbacks change.
 *
 * @public
 */
export function useDataExport({ execution, exportConfig = {}, onCancel, onError, onLoading, onPending, onSuccess, }, deps) {
    return useCancelablePromise({
        promise: execution
            ? () => execution
                .execute()
                .then((executionResult) => executionResult.export(exportConfig))
                .then((exportResult) => {
                return exportResult.uri;
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
    }, deps);
}
//# sourceMappingURL=useDataExport.js.map