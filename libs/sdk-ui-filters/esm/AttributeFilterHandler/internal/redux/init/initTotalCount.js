import { put, fork, race, take, call, select } from "redux-saga/effects";
import { loadCustomElementsSaga } from "../loadCustomElements/loadCustomElementsSaga.js";
import { actions } from "../store/slice.js";
import { getAttributeFilterContext } from "../common/sagas.js";
import { selectElementsForm } from "../common/selectors.js";
/**
 * @internal
 */
export function* initTotalCountSaga(correlation) {
    const initTotalCountCorrelation = `initTotalCount_${correlation}`;
    const context = yield call(getAttributeFilterContext);
    const elementsForm = yield select(selectElementsForm);
    yield fork(loadCustomElementsSaga, actions.loadCustomElementsRequest({
        options: {
            limit: 1,
            includeTotalCountWithoutFilters: true,
            excludePrimaryLabel: !context.backend.capabilities.supportsElementUris && elementsForm === "values",
        },
        correlation: initTotalCountCorrelation,
    }));
    const { success, error, } = yield race({
        success: take((a) => actions.loadCustomElementsSuccess.match(a) &&
            a.payload.correlation === initTotalCountCorrelation),
        error: take((a) => actions.loadCustomElementsError.match(a) &&
            a.payload.correlation === initTotalCountCorrelation),
        cancel: take((a) => actions.loadCustomElementsCancel.match(a) &&
            a.payload.correlation === initTotalCountCorrelation),
    });
    if (error) {
        throw error.payload.error;
    }
    else if (success) {
        yield put(actions.setElementsTotalCount({
            totalCount: success.payload.totalCount,
        }));
    }
}
//# sourceMappingURL=initTotalCount.js.map