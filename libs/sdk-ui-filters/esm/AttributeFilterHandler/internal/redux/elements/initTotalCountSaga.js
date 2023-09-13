import { put, call, takeLatest, cancelled } from "redux-saga/effects";
import { actions } from "../store/slice.js";
import { initTotalCountSaga as initLoadTotalCountSaga } from "../init/initTotalCount.js";
/**
 * @internal
 */
export function* initTotalCountWorker() {
    yield takeLatest(actions.initTotalCount.match, initTotalCountSaga);
}
function* initTotalCountSaga(action) {
    const { payload: { correlation }, } = action;
    try {
        yield put(actions.initTotalCountStart({ correlation }));
        yield call(initLoadTotalCountSaga, correlation);
        yield put(actions.initTotalCountSuccess({ correlation: correlation }));
    }
    catch (error) {
        yield put(actions.initTotalCountError({ error, correlation: correlation }));
    }
    finally {
        if (yield cancelled()) {
            yield put(actions.initTotalCountCancel({ correlation: correlation }));
        }
    }
}
//# sourceMappingURL=initTotalCountSaga.js.map