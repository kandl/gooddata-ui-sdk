import { fork, take, race } from "redux-saga/effects";
import { loadAttributeSaga } from "../loadAttribute/loadAttributeSaga.js";
import { actions } from "../store/slice.js";
/**
 * @internal
 */
export function* initAttributeSaga(correlation) {
    yield fork(loadAttributeSaga, actions.loadAttributeRequest({ correlation }));
    const { error, } = yield race({
        success: take((a) => actions.loadAttributeSuccess.match(a) && a.payload.correlation === correlation),
        error: take((a) => actions.loadAttributeError.match(a) && a.payload.correlation === correlation),
        cancel: take((a) => actions.loadAttributeCancel.match(a) && a.payload.correlation === correlation),
    });
    if (error) {
        throw error.payload.error;
    }
}
//# sourceMappingURL=initAttributeSaga.js.map