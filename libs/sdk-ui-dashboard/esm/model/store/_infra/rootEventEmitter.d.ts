import { SagaIterator } from "redux-saga";
import { DashboardEventHandler } from "../../eventHandlers/eventHandler.js";
import { DashboardDispatch } from "../types.js";
export interface EventEmitter {
    registerHandler: (handler: DashboardEventHandler) => void;
    unregisterHandler: (handler: DashboardEventHandler) => void;
    eventEmitterSaga: () => SagaIterator<void>;
}
/**
 * Creates root event emitter that will be responsible for emitting events to all registered handlers.
 *
 * The emitter is realized using a saga. This saga has its own dedicated channel through which it receives
 * the events to emit - the event bus. Upon emitter start, it creates the channel and sets it into the
 * `eventEmitterContext` field of the saga context - this way other sagas can get hold of it.
 *
 * @param initialHandlers - event handlers to register at the time of creation
 * @param dispatch - dispatch object
 */
export declare function createRootEventEmitter(initialHandlers: DashboardEventHandler<any>[] | undefined, dispatch: DashboardDispatch): EventEmitter;
