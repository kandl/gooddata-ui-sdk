import { all, fork } from "redux-saga/effects";
import { initWorker, loadAttributeWorker, loadInitialElementsPageWorker, loadNextElementsPageWorker, loadCustomElementsWorker, initTotalCountWorker, } from "./sagas.js";
export function* rootSaga() {
    try {
        yield all([
            loadAttributeWorker,
            loadInitialElementsPageWorker,
            loadNextElementsPageWorker,
            loadCustomElementsWorker,
            initWorker,
            initTotalCountWorker,
        ].map((worker) => fork(worker)));
    }
    catch (e) {
        console.error("Root saga failed", e);
    }
}
//# sourceMappingURL=rootSaga.js.map