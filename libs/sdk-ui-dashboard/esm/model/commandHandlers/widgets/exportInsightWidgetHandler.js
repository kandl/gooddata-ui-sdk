import { call, put, select } from "redux-saga/effects";
import { serializeObjRef } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { invalidArgumentsProvided } from "../../events/general.js";
import { insightWidgetExportRequested, insightWidgetExportResolved, } from "../../events/insight.js";
import { selectExecutionResultByRef, selectIsExecutionResultReadyForExportByRef, selectIsExecutionResultExportableToCsvByRef, selectIsExecutionResultExportableToXlsxByRef, } from "../../store/executionResults/executionResultsSelectors.js";
import { createExportFunction } from "@gooddata/sdk-ui";
async function performExport(executionResult, config) {
    const exporter = createExportFunction(executionResult);
    return exporter(config);
}
function* validateIsExportable(ctx, cmd, ref) {
    const isExportable = yield select(selectIsExecutionResultReadyForExportByRef(ref));
    if (!isExportable) {
        throw invalidArgumentsProvided(ctx, cmd, `The widget with ref: ${serializeObjRef(ref)} cannot be exported at the moment.`);
    }
}
function* validateSettingsAndPermissions(ctx, cmd) {
    const { config, ref } = cmd.payload;
    let canExport = false;
    if (config.format === "csv") {
        canExport = yield select(selectIsExecutionResultExportableToCsvByRef(ref));
    }
    if (config.format === "xlsx") {
        canExport = yield select(selectIsExecutionResultExportableToXlsxByRef(ref));
    }
    if (!canExport) {
        throw invalidArgumentsProvided(ctx, cmd, `The widget with ref: ${serializeObjRef(ref)} cannot be exported because the feature is disabled or the user does not have the necessary permissions.`);
    }
}
export function* exportInsightWidgetHandler(ctx, cmd) {
    const { config, ref } = cmd.payload;
    yield put(insightWidgetExportRequested(ctx, ref, config, cmd.correlationId));
    yield call(validateIsExportable, ctx, cmd, ref);
    yield call(validateSettingsAndPermissions, ctx, cmd);
    const executionEnvelope = yield select(selectExecutionResultByRef(ref));
    // executionResult must be defined at this point
    invariant(executionEnvelope === null || executionEnvelope === void 0 ? void 0 : executionEnvelope.executionResult);
    const result = yield call(performExport, executionEnvelope.executionResult, config);
    // prepend hostname if provided so that the results are downloaded from there, not from where the app is hosted
    const fullUri = ctx.backend.config.hostname
        ? new URL(result.uri, ctx.backend.config.hostname).href
        : result.uri;
    const sanitizedResult = Object.assign(Object.assign({}, result), { uri: fullUri });
    return insightWidgetExportResolved(ctx, sanitizedResult, cmd.correlationId);
}
//# sourceMappingURL=exportInsightWidgetHandler.js.map