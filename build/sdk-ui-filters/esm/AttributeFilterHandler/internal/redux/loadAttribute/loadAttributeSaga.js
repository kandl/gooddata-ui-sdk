import { put, call, select, takeLatest, cancelled } from "redux-saga/effects";
import { actions } from "../store/slice.js";
import { getAttributeFilterContext } from "../common/sagas.js";
import { selectAttributeFilterDisplayForm } from "../filter/filterSelectors.js";
import { loadAttributeByDisplayForm } from "./loadAttributeByDisplayForm.js";
import { selectAttribute } from "./loadAttributeSelectors.js";
/**
 * @internal
 */
export function* loadAttributeWorker() {
    yield takeLatest([actions.loadAttributeRequest.match, actions.loadAttributeCancelRequest.match], loadAttributeSaga);
}
/*
 * @internal
 */
export function* loadAttributeSaga(action) {
    if (actions.loadAttributeCancelRequest.match(action)) {
        // Saga was triggered by loadAttributeCancelRequest - do nothing, finally statement was already called, because takeLatest can run only one saga at a time === the previous one was canceled
        return;
    }
    const { payload: { correlation }, } = action;
    try {
        const displayFormRef = yield select(selectAttributeFilterDisplayForm);
        const context = yield call(getAttributeFilterContext);
        yield put(actions.loadAttributeStart({ correlation }));
        let attribute;
        const preloadedAttribute = yield select(selectAttribute);
        if (preloadedAttribute) {
            attribute = preloadedAttribute;
        }
        else {
            attribute = yield call(loadAttributeByDisplayForm, context, displayFormRef);
        }
        yield put(actions.loadAttributeSuccess({ attribute, correlation }));
        return attribute;
    }
    catch (error) {
        yield put(actions.loadAttributeError({ error, correlation }));
    }
    finally {
        if (yield cancelled()) {
            yield put(actions.loadAttributeCancel({ correlation }));
        }
    }
}
//# sourceMappingURL=loadAttributeSaga.js.map