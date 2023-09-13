import { put } from "redux-saga/effects";
import { executionResultsActions } from "../../store/executionResults/index.js";
export function* upsertExecutionResultHandler(_ctx, cmd) {
    yield put(executionResultsActions.upsertExecutionResult(cmd.payload));
}
//# sourceMappingURL=upsertExecutionResultHandler.js.map