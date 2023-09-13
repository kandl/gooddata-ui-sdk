import { SagaIterator } from "redux-saga";
import { ILoadElementsResult } from "../../../types/index.js";
import { actions } from "../store/slice.js";
/**
 * @internal
 */
export declare function loadCustomElementsWorker(): SagaIterator<void>;
/**
 * @internal
 */
export declare function loadCustomElementsSaga(action: ReturnType<typeof actions.loadCustomElementsRequest>): SagaIterator<ILoadElementsResult>;
