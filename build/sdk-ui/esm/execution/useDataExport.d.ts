import { DependencyList } from "react";
import { IExportConfig, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { GoodDataSdkError, UseCancelablePromiseCallbacks, UseCancelablePromiseState } from "../base/index.js";
/**
 * Indicates current state of useDataExport hook
 * @public
 */
export type UseDataExportState = UseCancelablePromiseState<string, GoodDataSdkError>;
/**
 * Callbacks for useDataExport hook
 * @public
 */
export type UseDataExportCallbacks = UseCancelablePromiseCallbacks<string, GoodDataSdkError>;
/**
 * This hook provides easy way to export data in your preferred format (csv/xlsx/raw) for the provided {@link @gooddata/sdk-backend-spi#IPreparedExecution}.
 *
 * @remarks
 * As a result, you will receive a string with uri, so you can easily create a download link.
 * Be aware that execution is re-executed only on dependency list change, not on execution/exportConfig/callbacks change.
 *
 * @public
 */
export declare function useDataExport({ execution, exportConfig, onCancel, onError, onLoading, onPending, onSuccess, }: {
    execution: IPreparedExecution | undefined | null;
    exportConfig?: IExportConfig;
} & UseDataExportCallbacks, deps?: DependencyList): UseDataExportState;
//# sourceMappingURL=useDataExport.d.ts.map