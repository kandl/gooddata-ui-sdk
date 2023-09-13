// (C) 2022 GoodData Corporation
import noop from "lodash/noop.js";
import { createDashboardStore } from "../store/dashboardStore.js";
import { queryEnvelopeWithPromise } from "../store/_infra/queryProcessing.js";
/**
 * @internal
 */
export class HeadlessDashboard {
    constructor(ctx, config) {
        this.monitoredActions = {};
        this.capturedActions = [];
        this.capturedEvents = [];
        this.getOrCreateMonitoredAction = (actionType) => {
            const existingAction = this.monitoredActions[actionType];
            if (existingAction) {
                return existingAction;
            }
            const partialAction = {
                calls: 0,
                resolve: noop,
                reject: noop,
            };
            const promise = new Promise((resolve, reject) => {
                partialAction.resolve = resolve;
                partialAction.reject = reject;
            });
            const newAction = Object.assign(Object.assign({}, partialAction), { promise });
            this.monitoredActions[actionType] = newAction;
            return newAction;
        };
        this.onActionCaptured = (action) => {
            this.capturedActions.push(action);
            const monitoredAction = this.getOrCreateMonitoredAction(action.type);
            monitoredAction.calls += 1;
            monitoredAction.resolve(action);
        };
        this.eventHandler = (evt) => {
            this.capturedEvents.push(evt);
        };
        this.commandFailedRejectsWaitFor = () => {
            const commandFailed = this.getOrCreateMonitoredAction("GDC.DASH/EVT.COMMAND.FAILED");
            return commandFailed.promise.then((evt) => {
                console.error(`Command processing failed: ${evt.payload.reason} - ${evt.payload.message}`);
                throw evt.payload.error;
            });
        };
        this.commandRejectedEndsWaitFor = () => {
            const commandRejected = this.getOrCreateMonitoredAction("GDC.DASH/EVT.COMMAND.REJECTED");
            return commandRejected.promise.then((evt) => {
                console.error("Command was rejected because dashboard does not know how to handle it. " +
                    "This is likely because the handler for the rejected command is not registered in the system. See root command handler.");
                throw evt;
            });
        };
        // Middleware to store the actions and create promises
        const actionsMiddleware = () => (next) => (action) => {
            if (action.type.startsWith("@@redux/")) {
                //
            }
            else {
                this.onActionCaptured(action);
            }
            return next(action);
        };
        this.reduxedStore = createDashboardStore({
            dashboardContext: ctx,
            additionalMiddleware: actionsMiddleware,
            eventing: {
                initialEventHandlers: [
                    {
                        eval: () => true,
                        handler: this.eventHandler,
                    },
                ],
            },
            queryServices: config === null || config === void 0 ? void 0 : config.queryServices,
            backgroundWorkers: (config === null || config === void 0 ? void 0 : config.backgroundWorkers) || [],
            privateContext: config === null || config === void 0 ? void 0 : config.customizationFns,
            initialRenderMode: "view",
        });
    }
    dispatch(action) {
        /*
         * Clearing monitored actions is essential to allow sane usage in tests that need fire a command and wait
         * for the same type of event multiple times. Monitored actions is what is used to wait in the `waitFor`
         * method. Without the clearing, the second `waitFor` would bail out immediately and return the very first
         * captured event.
         */
        this.monitoredActions = {};
        this.reduxedStore.store.dispatch(action);
    }
    /**
     * Convenience function that combines both {@link HeadlessDashboard.dispatch} and {@link HeadlessDashboard.waitFor}.
     *
     * @param action - action (typically a command) to dispatch
     * @param actionType - type of action (typically an event type) to wait for
     * @param timeout - timeout after which the wait fails, default is 1000
     */
    dispatchAndWaitFor(action, actionType, timeout = 1000) {
        this.dispatch(action);
        return this.waitFor(actionType, timeout);
    }
    /**
     * Starts a dashboard query.
     *
     * @param action - query action
     */
    query(action) {
        const { envelope, promise } = queryEnvelopeWithPromise(action);
        this.reduxedStore.store.dispatch(envelope);
        return promise;
    }
    /**
     * Wait for action to occur. The wait is bounded by a timeout that is 1s by default.
     *
     * @param actionType - action type to wait for
     * @param timeout - timeout after which the wait fails, default is 1000
     */
    waitFor(actionType, timeout = 1000) {
        const includeErrorHandler = actionType !== "GDC.DASH/EVT.COMMAND.FAILED";
        return Promise.race([
            this.getOrCreateMonitoredAction(actionType).promise,
            ...(includeErrorHandler ? [this.commandFailedRejectsWaitFor()] : []),
            this.commandRejectedEndsWaitFor(),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error(`Wait for action '${actionType}' timed out after ${timeout}ms`));
                }, timeout);
            }),
        ]);
    }
    /**
     * select data from the state
     */
    select(selectorFactory) {
        return selectorFactory(this.state());
    }
    /**
     * Returns dashboard state.
     */
    state() {
        return this.reduxedStore.store.getState();
    }
}
//# sourceMappingURL=HeadlessDashboard.js.map