import { all, call, cancelled, put, select, takeLatest } from "redux-saga/effects";
import { actions } from "../store/slice.js";
import { selectHiddenElements } from "../filter/filterSelectors.js";
import { initAttributeSaga } from "./initAttributeSaga.js";
import { initSelectionSaga } from "./initSelectionSaga.js";
import { initAttributeElementsPageSaga } from "./initElementsPageSaga.js";
import { initTotalCountSaga } from "./initTotalCount.js";
import { selectLimitingAttributeFilters } from "../elements/elementsSelectors.js";
import { isLimitingAttributeFiltersEmpty } from "../../../utils.js";
/**
 * @internal
 */
export function* initWorker() {
    yield takeLatest(actions.init.match, initSaga);
}
function* initSaga(action) {
    const { payload: { correlation }, } = action;
    try {
        yield put(actions.initStart({ correlation }));
        const hiddenElements = yield select(selectHiddenElements);
        const limitingFilters = yield select(selectLimitingAttributeFilters);
        const loadTotal = !isLimitingAttributeFiltersEmpty(limitingFilters);
        const sagas = [initSelectionSaga, initAttributeElementsPageSaga];
        if ((hiddenElements === null || hiddenElements === void 0 ? void 0 : hiddenElements.length) > 0) {
            // the rest need the attribute already loaded for the hiddenElements to work
            yield call(initAttributeSaga, correlation);
        }
        else {
            sagas.unshift(initAttributeSaga);
        }
        if (loadTotal) {
            // total count without applying parent filter needs to be fetched separately.
            // It is because the fact that when elements fetched filtered by parent selection, the includeTotalCountWithoutFilters: true option does not work, despite its name
            sagas.push(initTotalCountSaga);
        }
        yield all(sagas.map((saga) => call(saga, correlation)));
        yield put(actions.initSuccess({ correlation: correlation }));
    }
    catch (error) {
        yield put(actions.initError({ error, correlation: correlation }));
    }
    finally {
        if (yield cancelled()) {
            yield all([put(actions.initCancel({ correlation: correlation }))]);
        }
    }
}
//# sourceMappingURL=initSaga.js.map