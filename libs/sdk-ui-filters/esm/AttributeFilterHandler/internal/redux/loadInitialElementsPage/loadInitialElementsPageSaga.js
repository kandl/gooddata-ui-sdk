import { put, call, takeLatest, select, cancelled } from "redux-saga/effects";
import { getAttributeFilterContext } from "../common/sagas.js";
import { selectElementsForm } from "../common/selectors.js";
import { elementsSaga } from "../elements/elementsSaga.js";
import { selectLoadElementsOptions } from "../elements/elementsSelectors.js";
import { actions } from "../store/slice.js";
import { loadLimitingAttributeFiltersAttributes } from "./loadLimitingAttributeFiltersAttributes.js";
/**
 * @internal
 */
export function* loadInitialElementsPageWorker() {
    yield takeLatest([actions.loadInitialElementsPageRequest.match, actions.loadInitialElementsPageCancelRequest.match], loadInitialElementsPageSaga);
}
/**
 * @internal
 */
export function* loadInitialElementsPageSaga(action) {
    var _a;
    if (actions.loadInitialElementsPageCancelRequest.match(action)) {
        // Saga was triggered by cancel request - do nothing - do nothing, finally statement was already called, because takeLatest can run only one saga at a time === the previous one was canceled
        return;
    }
    const context = yield call(getAttributeFilterContext);
    const abortController = new AbortController();
    const { payload: { correlation }, } = action;
    try {
        yield put(actions.loadInitialElementsPageStart({ correlation }));
        const loadOptions = yield select(selectLoadElementsOptions);
        const elementsForm = yield select(selectElementsForm);
        const loadOptionsWithExcludePrimaryLabel = Object.assign(Object.assign({}, loadOptions), { signal: abortController.signal, excludePrimaryLabel: !context.backend.capabilities.supportsElementUris && elementsForm === "values" });
        const result = yield call(elementsSaga, loadOptionsWithExcludePrimaryLabel);
        const limitingAttributeFiltersAttributes = yield call(loadLimitingAttributeFiltersAttributes, context, (_a = loadOptions.limitingAttributeFilters) !== null && _a !== void 0 ? _a : []);
        yield put(actions.setLimitingAttributeFiltersAttributes({ attributes: limitingAttributeFiltersAttributes }));
        yield put(actions.loadInitialElementsPageSuccess(Object.assign(Object.assign({}, result), { correlation })));
    }
    catch (error) {
        yield put(actions.loadInitialElementsPageError({
            error,
            correlation,
        }));
    }
    finally {
        if (yield cancelled()) {
            abortController.abort();
            yield put(actions.loadInitialElementsPageCancel({ correlation }));
        }
    }
}
//# sourceMappingURL=loadInitialElementsPageSaga.js.map