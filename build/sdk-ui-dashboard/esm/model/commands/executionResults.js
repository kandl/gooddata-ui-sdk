// (C) 2021-2023 GoodData Corporation
import { serializeObjRef } from "@gooddata/sdk-model";
import isString from "lodash/isString.js";
function upsertExecutionResult(id, envelopeData, correlationId) {
    return {
        type: "GDC.DASH/CMD.EXECUTION_RESULT.UPSERT",
        correlationId,
        payload: Object.assign(Object.assign({}, envelopeData), { id: isString(id) ? id : serializeObjRef(id) }),
    };
}
/**
 * Creates an {@link UpsertExecutionResult} command that makes the relevant execution result indicate it is loading.
 *
 * @beta
 */
export function setExecutionResultLoading(id, correlationId) {
    return upsertExecutionResult(id, {
        isLoading: true,
        executionResult: undefined,
        error: undefined,
        warnings: undefined,
    }, correlationId);
}
/**
 * Creates an {@link UpsertExecutionResult} command that makes the relevant execution result indicate an error and stop loading.
 *
 * @beta
 */
export function setExecutionResultError(id, error, correlationId) {
    return upsertExecutionResult(id, {
        isLoading: false,
        error,
        warnings: undefined,
    }, correlationId);
}
/**
 * Creates an {@link UpsertExecutionResult} command that makes the relevant execution result set new result data and stop loading.
 *
 * @beta
 */
export function setExecutionResultData(id, executionResult, executionWarnings, correlationId) {
    return upsertExecutionResult(id, {
        isLoading: false,
        error: undefined,
        executionResult,
        warnings: executionWarnings,
    }, correlationId);
}
//# sourceMappingURL=executionResults.js.map