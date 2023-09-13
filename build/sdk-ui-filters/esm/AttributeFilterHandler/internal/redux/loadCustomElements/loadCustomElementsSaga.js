import { race, put, call, take, takeEvery, cancelled } from "redux-saga/effects";
import { elementsSaga } from "../elements/elementsSaga.js";
import { actions } from "../store/slice.js";
/**
 * @internal
 */
export function* loadCustomElementsWorker() {
    yield takeEvery([actions.loadCustomElementsRequest.match], loadCustomElementsSaga);
}
/**
 * @internal
 */
export function* loadCustomElementsSaga(action) {
    const { payload: { correlation, options }, } = action;
    try {
        yield put(actions.loadCustomElementsStart({ correlation }));
        const { result, canceled, anotherRequest, } = yield race({
            result: call(elementsSaga, options),
            anotherRequest: take((a) => actions.loadCustomElementsRequest.match(a) &&
                (correlation ? a.payload.correlation === correlation : true)),
            canceled: take((a) => actions.loadCustomElementsCancelRequest.match(a) &&
                (correlation ? a.payload.correlation === correlation : true)),
        });
        if (result) {
            yield put(actions.loadCustomElementsSuccess(Object.assign(Object.assign({}, result), { correlation })));
            return result;
        }
        else if (canceled || anotherRequest) {
            yield put(actions.loadCustomElementsCancel({ correlation }));
        }
    }
    catch (error) {
        yield put(actions.loadCustomElementsError({
            error,
            correlation,
        }));
    }
    finally {
        if (yield cancelled()) {
            yield put(actions.loadCustomElementsCancel({ correlation }));
        }
    }
}
//# sourceMappingURL=loadCustomElementsSaga.js.map