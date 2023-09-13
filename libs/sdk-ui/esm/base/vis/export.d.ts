import { IExecutionResult } from "@gooddata/sdk-backend-spi";
import { IExportFunction } from "./Events.js";
import { GoodDataSdkError } from "../errors/GoodDataSdkError.js";
/**
 * Creates function to export data in the provided result. This function is typically passed by visualization
 * components via the onExportReady callback.
 *
 * @param result - data view that will be exported
 * @param exportTitle - specify title
 * @internal
 */
export declare function createExportFunction(result: IExecutionResult, exportTitle?: string): IExportFunction;
/**
 * Creates function that should be passed to onExportReady in the event that the backend execution
 * fails and export is not possible.
 *
 * @param error - the execution error
 * @internal
 */
export declare function createExportErrorFunction(error: GoodDataSdkError): IExportFunction;
//# sourceMappingURL=export.d.ts.map