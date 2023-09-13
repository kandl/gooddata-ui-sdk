import { SagaIterator } from "redux-saga";
import { IAttributeMetadataObject } from "@gooddata/sdk-model";
import { actions } from "../store/slice.js";
/**
 * @internal
 */
export declare function loadAttributeWorker(): SagaIterator<void>;
export declare function loadAttributeSaga(action: ReturnType<typeof actions.loadAttributeRequest> | ReturnType<typeof actions.loadAttributeRequest>): SagaIterator<IAttributeMetadataObject>;
