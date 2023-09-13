// (C) 2007-2021 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { v4 as uuid } from "uuid";
import { decoratedBackend } from "../decoratedBackend/index.js";
import { DecoratedExecutionFactory, DecoratedExecutionResult, DecoratedPreparedExecution, } from "../decoratedBackend/execution.js";
class WithExecutionEventing extends DecoratedPreparedExecution {
    constructor(decorated, callbacks) {
        super(decorated);
        this.callbacks = callbacks;
        this.execute = () => {
            const { beforeExecute, successfulExecute, failedExecute } = this.callbacks;
            const executionId = uuid();
            beforeExecute === null || beforeExecute === void 0 ? void 0 : beforeExecute(this.definition, executionId);
            return super
                .execute()
                .then((result) => {
                successfulExecute === null || successfulExecute === void 0 ? void 0 : successfulExecute(result, executionId);
                return new WithExecutionResultEventing(result, this.createNew, this.callbacks, executionId);
            })
                .catch((error) => {
                failedExecute === null || failedExecute === void 0 ? void 0 : failedExecute(error, executionId);
                throw error;
            });
        };
        this.createNew = (decorated) => {
            return new WithExecutionEventing(decorated, this.callbacks);
        };
    }
}
class WithExecutionResultEventing extends DecoratedExecutionResult {
    constructor(decorated, wrapper, callbacks, executionId) {
        super(decorated, wrapper);
        this.callbacks = callbacks;
        this.executionId = executionId;
        this.readAll = () => {
            const { successfulResultReadAll, failedResultReadAll } = this.callbacks;
            const promisedDataView = super.readAll();
            return promisedDataView
                .then((res) => {
                successfulResultReadAll === null || successfulResultReadAll === void 0 ? void 0 : successfulResultReadAll(res, this.executionId);
                return res;
            })
                .catch((e) => {
                failedResultReadAll === null || failedResultReadAll === void 0 ? void 0 : failedResultReadAll(e, this.executionId);
                throw e;
            });
        };
        this.readWindow = (offset, size) => {
            const { successfulResultReadWindow, failedResultReadWindow } = this.callbacks;
            const promisedDataView = super.readWindow(offset, size);
            return promisedDataView
                .then((res) => {
                successfulResultReadWindow === null || successfulResultReadWindow === void 0 ? void 0 : successfulResultReadWindow(offset, size, res, this.executionId);
                return res;
            })
                .catch((e) => {
                failedResultReadWindow === null || failedResultReadWindow === void 0 ? void 0 : failedResultReadWindow(offset, size, e, this.executionId);
                throw e;
            });
        };
    }
}
/**
 * This implementation of analytical backend decorates another implementation with support for eventing. Events
 * for significant actions are emitted to defined callback functions (event handlers).
 *
 * @param realBackend - backend supplying the actual implementation of SPI
 * @param callbacks - callbacks to event handlers
 * @beta
 */
export function withEventing(realBackend, callbacks) {
    if (isEmpty(callbacks)) {
        return realBackend;
    }
    return decoratedBackend(realBackend, {
        execution: (original) => new DecoratedExecutionFactory(original, (execution) => new WithExecutionEventing(execution, callbacks)),
    });
}
//# sourceMappingURL=index.js.map