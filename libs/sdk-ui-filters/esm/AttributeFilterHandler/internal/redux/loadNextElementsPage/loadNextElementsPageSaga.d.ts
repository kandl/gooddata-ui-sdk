import { SagaIterator } from "redux-saga";
import { actions } from "../store/slice.js";
/**
 * @internal
 */
export declare function loadNextElementsPageWorker(): SagaIterator<void>;
/**
 * @internal
 */
export declare function loadNextElementsPageSaga(action: ReturnType<typeof actions.loadNextElementsPageRequest> | ReturnType<typeof actions.loadNextElementsPageCancelRequest> | ReturnType<typeof actions.loadInitialElementsPageRequest>): SagaIterator<void>;
