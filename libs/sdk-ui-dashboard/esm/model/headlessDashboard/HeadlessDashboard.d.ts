import { PayloadAction } from "@reduxjs/toolkit";
import { DashboardState } from "../store/index.js";
import { DashboardEvents, DashboardEventType } from "../events/index.js";
import { DashboardContext, DashboardModelCustomizationFns } from "../types/commonTypes.js";
import { DashboardCommands, DashboardCommandType } from "../commands/index.js";
import { IDashboardQuery } from "../queries/index.js";
import { SagaIterator } from "redux-saga";
import { IDashboardQueryService } from "../store/_infra/queryService.js";
/**
 * @internal
 */
export interface MonitoredAction {
    calls: number;
    promise: Promise<PayloadAction<any>>;
    resolve: (action: PayloadAction<any>) => void;
    reject: (e: any) => void;
}
/**
 * @internal
 */
export interface HeadlessDashboardConfig {
    queryServices?: IDashboardQueryService<any, any>[];
    backgroundWorkers?: ((context: DashboardContext) => SagaIterator<void>)[];
    customizationFns?: DashboardModelCustomizationFns;
}
/**
 * @internal
 */
export declare class HeadlessDashboard {
    private readonly reduxedStore;
    protected monitoredActions: Record<string, MonitoredAction>;
    protected capturedActions: Array<PayloadAction<any>>;
    protected capturedEvents: Array<DashboardEvents>;
    constructor(ctx: DashboardContext, config?: HeadlessDashboardConfig);
    protected getOrCreateMonitoredAction: (actionType: string) => MonitoredAction;
    private onActionCaptured;
    private eventHandler;
    dispatch(action: DashboardCommands | PayloadAction<any>): void;
    /**
     * Convenience function that combines both {@link HeadlessDashboard.dispatch} and {@link HeadlessDashboard.waitFor}.
     *
     * @param action - action (typically a command) to dispatch
     * @param actionType - type of action (typically an event type) to wait for
     * @param timeout - timeout after which the wait fails, default is 1000
     */
    dispatchAndWaitFor(action: DashboardCommands | PayloadAction<any>, actionType: DashboardEventType | DashboardCommandType | string, timeout?: number): Promise<any>;
    private commandFailedRejectsWaitFor;
    private commandRejectedEndsWaitFor;
    /**
     * Starts a dashboard query.
     *
     * @param action - query action
     */
    query<TQueryResult>(action: IDashboardQuery): Promise<TQueryResult>;
    /**
     * Wait for action to occur. The wait is bounded by a timeout that is 1s by default.
     *
     * @param actionType - action type to wait for
     * @param timeout - timeout after which the wait fails, default is 1000
     */
    waitFor(actionType: DashboardEventType | DashboardCommandType | string, timeout?: number): Promise<any>;
    /**
     * select data from the state
     */
    select<TSelectorFactory extends (...args: any[]) => any>(selectorFactory: TSelectorFactory): ReturnType<TSelectorFactory>;
    /**
     * Returns dashboard state.
     */
    protected state(): DashboardState;
}
