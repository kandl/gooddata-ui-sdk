import { fork, race, take } from "redux-saga/effects";
import { loadInitialElementsPageSaga } from "../loadInitialElementsPage/loadInitialElementsPageSaga.js";
import { actions } from "../store/slice.js";
/**
 * @internal
 */
export function* initAttributeElementsPageSaga(correlation) {
    yield fork(loadInitialElementsPageSaga, actions.loadInitialElementsPageRequest({ correlation }));
    const { error, } = yield race({
        success: take((a) => actions.loadInitialElementsPageSuccess.match(a) && a.payload.correlation === correlation),
        error: take((a) => actions.loadInitialElementsPageError.match(a) && a.payload.correlation === correlation),
        cancel: take((a) => actions.loadInitialElementsPageCancel.match(a) && a.payload.correlation === correlation),
    });
    if (error) {
        throw error.payload.error;
    }
}
//# sourceMappingURL=initElementsPageSaga.js.map