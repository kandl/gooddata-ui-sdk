import { put, call, takeLatest, select, cancelled } from "redux-saga/effects";
import { getAttributeFilterContext } from "../common/sagas.js";
import { selectElementsForm } from "../common/selectors.js";
import { elementsSaga } from "../elements/elementsSaga.js";
import { actions } from "../store/slice.js";
import { selectHasNextPage, selectLoadNextElementsPageOptions } from "./loadNextElementsPageSelectors.js";
/**
 * @internal
 */
export function* loadNextElementsPageWorker() {
    yield takeLatest([
        actions.loadNextElementsPageRequest.match,
        actions.loadNextElementsPageCancelRequest.match,
        actions.loadInitialElementsPageRequest.match,
    ], loadNextElementsPageSaga);
}
/**
 * @internal
 */
export function* loadNextElementsPageSaga(action) {
    const context = yield call(getAttributeFilterContext);
    if (actions.loadNextElementsPageCancelRequest.match(action) ||
        actions.loadInitialElementsPageRequest.match(action)) {
        // Saga was triggered by cancel request - do nothing, finally statement was already called, because takeLatest can run only one saga at a time === the previous one was canceled
        return;
    }
    const { payload: { correlation }, } = action;
    const hasNextPage = yield select(selectHasNextPage);
    if (!hasNextPage) {
        return;
    }
    try {
        yield put(actions.loadNextElementsPageStart({ correlation }));
        const loadOptions = yield select(selectLoadNextElementsPageOptions);
        const elementsForm = yield select(selectElementsForm);
        const loadOptionsWithExcludePrimaryLabel = Object.assign(Object.assign({}, loadOptions), { excludePrimaryLabel: !context.backend.capabilities.supportsElementUris && elementsForm === "values" });
        const result = yield call(elementsSaga, loadOptionsWithExcludePrimaryLabel);
        yield put(actions.loadNextElementsPageSuccess(Object.assign(Object.assign({}, result), { correlation })));
    }
    catch (error) {
        yield put(actions.loadNextElementsPageError({
            error,
            correlation,
        }));
    }
    finally {
        if (yield cancelled()) {
            yield put(actions.loadNextElementsPageCancel({ correlation }));
        }
    }
}
//# sourceMappingURL=loadNextElementsPageSaga.js.map