import { EnhancedStore, Middleware } from "@reduxjs/toolkit";
import { SagaIterator, Task } from "redux-saga";
import { DashboardEventHandler } from "../eventHandlers/eventHandler.js";
import { DashboardContext, PrivateDashboardContext } from "../types/commonTypes.js";
import { DashboardDispatch, DashboardState } from "./types.js";
import { IDashboardQueryService } from "./_infra/queryService.js";
import { RenderMode } from "../../types.js";
/**
 * @internal
 */
export type DashboardStore = EnhancedStore<DashboardState>;
export interface DashboardStoreEventing {
    /**
     * Specify event handlers to register during the initialization.
     */
    initialEventHandlers?: DashboardEventHandler[];
    /**
     * Specify callback that will be called each time the state changes.
     */
    onStateChange?: (state: DashboardState, dispatch: DashboardDispatch) => void;
    /**
     * Specify callback that will be called when the dashboard eventing subsystem initializes and
     * it is possible to register new or unregister existing event handlers.
     *
     * @remarks
     * Note: these callbacks allow modification of event handlers on an existing, initialized dashboard. See
     * {@link IDashboardEventing.eventHandlers} prop if you want to register handlers _before_ the dashboard
     * initialization starts.
     */
    onEventingInitialized?: (registerEventHandler: (handler: DashboardEventHandler) => void, unregisterEventHandler: (handler: DashboardEventHandler) => void) => void;
}
export interface DashboardStoreConfig {
    /**
     * Specifies context that will be hammered into the saga middleware.
     *
     * @remarks
     * All sagas can then access the values from the context.
     *
     * Remember: `DashboardContext` is part of the public API. Do not store internals in here. If need
     * to have internals in the context, then use the privateContext.
     *
     * This context is automatically passed to all command handlers, query processors and background workers.
     * If you need to obtain the context from some other place, use the `getDashboardContext` generator
     */
    dashboardContext: DashboardContext;
    /**
     * Specify private context that will be hammered into the saga middleware.
     *
     * @remarks
     * Private context may contain internal global configuration / customization that needs to be available
     * in the different parts of the model.
     *
     * The private context is not passed around by the infrastructure. To obtain it, use the `getPrivateContext`
     * generator.
     */
    privateContext?: PrivateDashboardContext;
    /**
     * Specify redux middleware to register into the store.
     */
    additionalMiddleware?: Middleware<any>;
    /**
     * Eventing configuration to apply during store initialization.
     */
    eventing?: DashboardStoreEventing;
    /**
     * Specify query service implementations.
     *
     * @remarks
     * These will be used to override the default implementations and add new services.
     */
    queryServices?: IDashboardQueryService<any, any>[];
    /**
     * Specify background workers implementations.
     *
     * @remarks
     * Workers are redux-saga iterators that run on the background, they can listen to dashboard events and fire dashboard commands.
     * All the provided workers will run in parallel on the background.
     * Background workers are processed last in the chain of all command and event processing.
     */
    backgroundWorkers: ((context: DashboardContext) => SagaIterator<void>)[];
    /**
     * @internal
     *
     * Specify which render mode will be used for initial rendering.
     *
     * @remarks
     * If you do not specify initialRenderMode, the dashboard component will be display in view mode.
     */
    initialRenderMode: RenderMode;
}
/**
 * Fully configured and initialized dashboard store realized by redux and with redux-sagas.
 */
export interface ReduxedDashboardStore {
    store: DashboardStore;
    registerEventHandler: (handler: DashboardEventHandler) => void;
    unregisterEventHandler: (handler: DashboardEventHandler) => void;
    rootSagaTask: Task;
}
/**
 * Creates a new store for a dashboard.
 *
 * @param config - runtime configuration to apply on the middlewares and the store
 */
export declare function createDashboardStore(config: DashboardStoreConfig): ReduxedDashboardStore;
