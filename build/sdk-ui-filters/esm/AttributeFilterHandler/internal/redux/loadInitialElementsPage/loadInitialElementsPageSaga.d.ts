import { SagaIterator } from "redux-saga";
import { actions } from "../store/slice.js";
/**
 * @internal
 */
export declare function loadInitialElementsPageWorker(): SagaIterator<void>;
/**
 * @internal
 */
export declare function loadInitialElementsPageSaga(action: ReturnType<typeof actions.loadInitialElementsPageRequest> | ReturnType<typeof actions.loadInitialElementsPageCancelRequest>): SagaIterator<void>;
