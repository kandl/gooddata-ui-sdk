import { DashboardStateChangeCallback, IDashboardEventHandling } from "../customizer.js";
import { DashboardEventHandler, DashboardEventHandlerFn, DashboardEvents, DashboardEventType, ICustomDashboardEvent } from "../../model/index.js";
import { IDashboardEventing } from "../../presentation/index.js";
/**
 * @internal
 */
export declare class DefaultDashboardEventHandling implements IDashboardEventHandling {
    private handlers;
    private initialHandlersSent;
    private pendingRegistration;
    private pendingUnregistration;
    private stateChangesChain;
    private evalCache;
    private readonly rootStateChangesCallback;
    /**
     * This callback will be included in the resulting IDashboardEventing instance returned by {@link getDashboardEventing}. It will thus
     * make its way into the dashboard store initializer. Once the store initializes and the event emitter is up, the ad hoc event
     * registration/unregistration functions will be passed to here.
     *
     * From then on, the methods that add/remove handlers or custom handlers can add handlers directly into active dashboard component.
     */
    private readonly onEventingInitialized;
    private registerHandler;
    private unregisterHandler;
    private getOrCreateEvalFn;
    addEventHandler: <TEvents extends ICustomDashboardEvent<any> | DashboardEvents>(eventType: DashboardEventType | string | "*", callback: DashboardEventHandlerFn<TEvents>) => IDashboardEventHandling;
    removeEventHandler: <TEvents extends ICustomDashboardEvent<any> | DashboardEvents>(eventType: DashboardEventType | string | "*", callback: DashboardEventHandlerFn<TEvents>) => IDashboardEventHandling;
    private doRegister;
    addCustomEventHandler: (handler: DashboardEventHandler) => IDashboardEventHandling;
    private doUnregister;
    removeCustomEventHandler: (handler: DashboardEventHandler) => IDashboardEventHandling;
    subscribeToStateChanges: (callback: DashboardStateChangeCallback) => IDashboardEventHandling;
    unsubscribeFromStateChanges: (callback: DashboardStateChangeCallback) => IDashboardEventHandling;
    getDashboardEventing(): Required<IDashboardEventing>;
}
