import { actionChannel, select, take } from "redux-saga/effects";
import { isDashboardEventOrCustomDashboardEvent } from "../../events/index.js";
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
export function createRootEventEmitter(initialHandlers = [], dispatch) {
    let eventHandlers = [...initialHandlers];
    return {
        registerHandler: (handler) => {
            eventHandlers.push(handler);
        },
        unregisterHandler: (handler) => {
            eventHandlers = eventHandlers.filter((h) => h !== handler);
        },
        eventEmitterSaga: function* () {
            const eventChannel = yield actionChannel(isDashboardEventOrCustomDashboardEvent);
            while (true) {
                const event = yield take(eventChannel);
                // snapshot current state to ensure event handlers operate on state relevant to when they were fired
                const stateSnapshot = yield select();
                const selectorEvaluator = (selector) => selector(stateSnapshot);
                try {
                    eventHandlers.forEach((handler) => {
                        if (handler.eval(event)) {
                            handler.handler(event, dispatch, selectorEvaluator);
                        }
                    });
                }
                catch (e) {
                    console.error("Error has occurred while dispatching event", event, e);
                }
            }
        },
    };
}
//# sourceMappingURL=rootEventEmitter.js.map