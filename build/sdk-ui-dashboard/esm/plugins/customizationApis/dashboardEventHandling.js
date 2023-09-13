// (C) 2021-2022 GoodData Corporation
import findIndex from "lodash/findIndex.js";
/**
 * Factory for predicates that compare event handlers. The comparison is somewhat more aggressive to prevent
 * double-registration of same handler code. First, the two DashboardEventHandler objects are compared for
 * reference equality. If different, the handler function and eval functions are compared for equality - if
 * they are same, the entire event handler is declared same.
 */
const sameHandlerPredicateFactory = (other) => {
    return (handler) => {
        return handler === other || (handler.handler === other.handler && handler.eval === other.eval);
    };
};
function createEvalFn(eventType) {
    if (eventType === "*") {
        return () => true;
    }
    return (evt) => {
        return evt.type === eventType;
    };
}
/**
 * @internal
 */
export class DefaultDashboardEventHandling {
    constructor() {
        this.handlers = [];
        this.initialHandlersSent = false;
        this.pendingRegistration = [];
        this.pendingUnregistration = [];
        this.stateChangesChain = [];
        this.evalCache = new Map();
        this.rootStateChangesCallback = (state, dispatch) => {
            this.stateChangesChain.forEach((cb) => {
                try {
                    cb(state, dispatch);
                }
                catch (e) {
                    console.warn(`OnStateChange callback ${cb} threw an exception.`, e);
                }
            });
        };
        /**
         * This callback will be included in the resulting IDashboardEventing instance returned by {@link getDashboardEventing}. It will thus
         * make its way into the dashboard store initializer. Once the store initializes and the event emitter is up, the ad hoc event
         * registration/unregistration functions will be passed to here.
         *
         * From then on, the methods that add/remove handlers or custom handlers can add handlers directly into active dashboard component.
         */
        this.onEventingInitialized = (register, unregister) => {
            this.registerHandler = register;
            this.unregisterHandler = unregister;
            this.pendingRegistration.forEach(this.registerHandler);
            this.pendingUnregistration.forEach(this.unregisterHandler);
            this.pendingRegistration = [];
            this.pendingUnregistration = [];
        };
        this.getOrCreateEvalFn = (eventType) => {
            const evalFn = this.evalCache.get(eventType);
            if (evalFn !== undefined) {
                return evalFn;
            }
            const newEvalFn = createEvalFn(eventType);
            this.evalCache.set(eventType, newEvalFn);
            return newEvalFn;
        };
        this.addEventHandler = (eventType, callback) => {
            const newHandler = {
                eval: this.getOrCreateEvalFn(eventType),
                handler: callback,
            };
            return this.addCustomEventHandler(newHandler);
        };
        this.removeEventHandler = (eventType, callback) => {
            const handler = {
                eval: this.getOrCreateEvalFn(eventType),
                handler: callback,
            };
            return this.removeCustomEventHandler(handler);
        };
        this.doRegister = (handler) => {
            // if engine + plugin initialization is not yet complete, there is nothing extra that has to
            // be done because all known handlers will be sent over as initial event handlers
            if (!this.initialHandlersSent) {
                return;
            }
            // once the initialization is done, code must register or unregister handlers using functions
            // provided by the dashboard component's event emitter
            if (this.registerHandler === undefined) {
                // meh, dashboard component's eventing is not yet up, code must hold onto the handlers so
                // that they can be registered immediately after it comes up
                this.pendingRegistration.push(handler);
                const pendingIdx = findIndex(this.pendingUnregistration, sameHandlerPredicateFactory(handler));
                if (pendingIdx > -1) {
                    this.pendingUnregistration.splice(pendingIdx, 1);
                }
            }
            else {
                // otherwise can proceed to register the handler with the dashboard
                this.registerHandler(handler);
            }
        };
        this.addCustomEventHandler = (handler) => {
            if (findIndex(this.handlers, sameHandlerPredicateFactory(handler)) > -1) {
                console.warn(`Attempting double-registration of the same handler ${handler}. Ignoring.`);
                return this;
            }
            // keep track of all known handlers locally
            this.handlers.push(handler);
            // and if needed register handler with dashboard component event emitter
            this.doRegister(handler);
            return this;
        };
        this.doUnregister = (handler) => {
            // if engine + plugin initialization is not yet complete, there is nothing extra that has to
            // be done because all known handlers will be sent over as initial event handlers
            if (!this.initialHandlersSent) {
                return;
            }
            // same dilemma as with the registration; once the initialization is done, code must register or
            // unregister handlers using functions provided by the dashboard component's event emitter
            if (this.unregisterHandler === undefined) {
                // meh, dashboard component's eventing is not yet up; now the course of action depends on
                // whether the handler to remove was part of handlers added during initialization or
                // after the initialization
                const pendingIdx = findIndex(this.pendingRegistration, sameHandlerPredicateFactory(handler));
                if (pendingIdx > -1) {
                    // handler to remove was added after the initialization; all that is needed is to
                    // remove it from the list of handlers that are pending the registration
                    this.pendingRegistration.splice(pendingIdx, 1);
                }
                else {
                    // handler to remove was among the initially added handler; no other way than to
                    // unregister the handler once the eventing comes up
                    this.pendingUnregistration.push(handler);
                }
            }
            else {
                this.unregisterHandler(handler);
            }
        };
        this.removeCustomEventHandler = (handler) => {
            const idx = findIndex(this.handlers, sameHandlerPredicateFactory(handler));
            if (idx === -1) {
                console.warn(`Attempting remove non-existing handler ${handler}. Ignoring.`);
                return this;
            }
            // get the handler that was originally registered and is effectively the same as the handler
            // to remove
            const actuallyRegistered = this.handlers[idx];
            // remove the handler from list of all known handlers; this is all that is needed if the
            // dashboard is not yet initialized
            this.handlers.splice(idx, 1);
            // and if needed unregister handler from dashboard components event emitter
            this.doUnregister(actuallyRegistered);
            return this;
        };
        this.subscribeToStateChanges = (callback) => {
            if (findIndex(this.stateChangesChain, (fn) => fn === callback) > -1) {
                console.warn(`Attempting double-subscription of the same state change callback ${callback}. Ignoring.`);
                return this;
            }
            this.stateChangesChain.push(callback);
            return this;
        };
        this.unsubscribeFromStateChanges = (callback) => {
            const idx = findIndex(this.stateChangesChain, (fn) => fn === callback);
            if (idx === -1) {
                return this;
            }
            this.stateChangesChain.splice(idx, 1);
            return this;
        };
    }
    getDashboardEventing() {
        // handlers that were registered until this method is called will be part of the initial
        // event handlers; they will be registered with the event emitter immediately when the dashboard
        // component infrastructure gets created
        this.initialHandlersSent = true;
        return {
            eventHandlers: [...this.handlers],
            onStateChange: this.rootStateChangesCallback,
            onEventingInitialized: this.onEventingInitialized,
        };
    }
}
//# sourceMappingURL=dashboardEventHandling.js.map