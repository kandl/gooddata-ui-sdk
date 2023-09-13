import { SagaIterator } from "redux-saga";
import { CancelableOptions } from "@gooddata/sdk-backend-spi";
import { ILoadElementsResult, ILoadElementsOptions } from "../../../types/index.js";
/**
 * @internal
 */
export declare function elementsSaga(options: ILoadElementsOptions & CancelableOptions): SagaIterator<ILoadElementsResult>;
