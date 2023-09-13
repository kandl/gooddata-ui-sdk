import { IExecutionResult } from "@gooddata/sdk-backend-spi";
import { IResultWarning, ObjRef } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { IExecutionResultEnvelope } from "../store/executionResults/types.js";
import { IDashboardCommand } from "./base.js";
/**
 * Triggers an event.
 *
 * @beta
 */
export interface UpsertExecutionResult extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.EXECUTION_RESULT.UPSERT";
    readonly payload: IExecutionResultEnvelope;
}
/**
 * Creates an {@link UpsertExecutionResult} command that makes the relevant execution result indicate it is loading.
 *
 * @beta
 */
export declare function setExecutionResultLoading(id: ObjRef | string, correlationId?: string): UpsertExecutionResult;
/**
 * Creates an {@link UpsertExecutionResult} command that makes the relevant execution result indicate an error and stop loading.
 *
 * @beta
 */
export declare function setExecutionResultError(id: ObjRef | string, error: GoodDataSdkError, correlationId?: string): UpsertExecutionResult;
/**
 * Creates an {@link UpsertExecutionResult} command that makes the relevant execution result set new result data and stop loading.
 *
 * @beta
 */
export declare function setExecutionResultData(id: ObjRef | string, executionResult: IExecutionResult, executionWarnings: IResultWarning[] | undefined, correlationId?: string): UpsertExecutionResult;
