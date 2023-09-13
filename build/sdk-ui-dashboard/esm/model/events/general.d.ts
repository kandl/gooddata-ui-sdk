import { IDashboardEvent } from "./base.js";
import { DashboardContext } from "../types/commonTypes.js";
import { IDashboardQuery } from "../queries/index.js";
import { IDashboardCommand } from "../commands/index.js";
/**
 * Payload of the {@link DashboardCommandStarted} event.
 * @beta
 */
export interface DashboardCommandStartedPayload<TCommand extends IDashboardCommand> {
    /**
     * The command that started processing.
     */
    readonly command: TCommand;
}
/**
 * This event is emitted when a particular command processing starts.
 *
 * @beta
 */
export interface DashboardCommandStarted<TCommand extends IDashboardCommand> extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.COMMAND.STARTED";
    readonly payload: DashboardCommandStartedPayload<TCommand>;
}
export declare function dashboardCommandStarted<TCommand extends IDashboardCommand>(ctx: DashboardContext, command: TCommand): DashboardCommandStarted<TCommand>;
/**
 * Tests whether the provided object is an instance of {@link DashboardCommandStarted}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardCommandStarted: (obj: unknown) => obj is DashboardCommandStarted<any>;
/**
 * @beta
 */
export type ActionFailedErrorReason = "USER_ERROR" | "INTERNAL_ERROR";
/**
 * Payload of the {@link DashboardCommandFailed} event.
 * @beta
 */
export interface DashboardCommandFailedPayload<TCommand extends IDashboardCommand> {
    /**
     * Reason for the failure.
     */
    readonly reason: ActionFailedErrorReason;
    /**
     * Message explaining the nature of the failure.
     */
    readonly message: string;
    /**
     * Error that has occurred and caused the command to fail.
     */
    readonly error?: Error;
    /**
     * The command that failed.
     */
    readonly command: TCommand;
}
/**
 * This event is emitted if a particular command processing fails. The failure may be for two general reasons:
 *
 * -  A user error was made; dispatched command is found to have bad payload or the dispatched command is not applicable
 *    in the current state of the dashboard
 *
 * -  An internal error has occurred in the dashboard component - highly likely due to a bug.
 *
 * @beta
 */
export interface DashboardCommandFailed<TCommand extends IDashboardCommand = IDashboardCommand> extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.COMMAND.FAILED";
    readonly payload: DashboardCommandFailedPayload<TCommand>;
}
export declare function internalErrorOccurred<TCommand extends IDashboardCommand>(ctx: DashboardContext, command: TCommand, message: string, error?: Error): DashboardCommandFailed<TCommand>;
export declare function invalidArgumentsProvided<TCommand extends IDashboardCommand>(ctx: DashboardContext, command: TCommand, message: string): DashboardCommandFailed<TCommand>;
/**
 * Tests whether the provided object is an instance of {@link DashboardCommandFailed}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardCommandFailed: (obj: unknown) => obj is DashboardCommandFailed<any>;
/**
 * This event is emitted when the submitted command has been rejected by the dashboard component because it does
 * not know how to handle the command.
 *
 * This typically indicates user error, perhaps a typo in the command type name.
 *
 * @beta
 */
export interface DashboardCommandRejected extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.COMMAND.REJECTED";
}
export declare function commandRejected(ctx: DashboardContext, correlationId?: string): DashboardCommandRejected;
/**
 * Tests whether the provided object is an instance of {@link DashboardCommandRejected}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardCommandRejected: (obj: unknown) => obj is DashboardCommandRejected;
/**
 * This event is emitted when the submitted query has been rejected by the dashboard component because it does
 * not know how to handle the query.
 *
 * @beta
 */
export interface DashboardQueryRejected extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.QUERY.REJECTED";
}
export declare function queryRejected(ctx: DashboardContext, correlationId?: string): DashboardQueryRejected;
/**
 * Tests whether the provided object is an instance of {@link DashboardQueryRejected}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardQueryRejected: (obj: unknown) => obj is DashboardQueryRejected;
/**
 * Payload of the {@link DashboardQueryFailed} event.
 * @beta
 */
export interface DashboardQueryFailedPayload {
    /**
     * Reason for the failure.
     */
    readonly reason: ActionFailedErrorReason;
    /**
     * Message explaining the nature of the failure.
     */
    readonly message: string;
    /**
     * Error that has occurred and caused the command to fail.
     */
    readonly error?: Error;
}
/**
 * This event is emitted if a particular query processing fails. The failure may be for two general reasons:
 *
 * -  A user error was made; dispatched query is found to have bad payload or the dispatched query is not applicable
 *    in the current state of the dashboard
 *
 * -  An internal error has occurred in the dashboard component - highly likely due to a bug.
 *
 * @beta
 */
export interface DashboardQueryFailed extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.QUERY.FAILED";
    readonly payload: DashboardQueryFailedPayload;
}
export declare function internalQueryErrorOccurred(ctx: DashboardContext, message: string, error?: Error, correlationId?: string): DashboardQueryFailed;
export declare function invalidQueryArguments(ctx: DashboardContext, message: string, correlationId?: string): DashboardQueryFailed;
/**
 * Tests whether the provided object is an instance of {@link DashboardCommandFailed}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardQueryFailed: (obj: unknown) => obj is DashboardQueryFailed;
/**
 * Payload of the {@link DashboardQueryStarted} event.
 * @beta
 */
export interface DashboardQueryStartedPayload {
    /**
     * The query that is starting to be run.
     */
    readonly query: IDashboardQuery;
}
/**
 * This event is emitted when query processing starts.
 *
 * @beta
 */
export interface DashboardQueryStarted extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.QUERY.STARTED";
    readonly payload: DashboardQueryStartedPayload;
}
export declare function queryStarted(ctx: DashboardContext, query: IDashboardQuery, correlationId?: string): DashboardQueryStarted;
/**
 * Tests whether the provided object is an instance of {@link DashboardQueryStarted}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardQueryStarted: (obj: unknown) => obj is DashboardQueryStarted;
/**
 * Payload of the {@link DashboardQueryCompleted} event.
 * @beta
 */
export interface DashboardQueryCompletedPayload<TQuery extends IDashboardQuery, TResult> {
    /**
     * The query that was run to get the given result.
     */
    readonly query: TQuery;
    /**
     * The result of the query.
     */
    readonly result: TResult;
}
/**
 * This event is emitted when query processing completes with success. Both the query payload and the result are
 * included.
 *
 * @beta
 */
export interface DashboardQueryCompleted<TQuery extends IDashboardQuery, TResult> extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.QUERY.COMPLETED";
    readonly payload: DashboardQueryCompletedPayload<TQuery, TResult>;
}
export declare function queryCompleted<TQuery extends IDashboardQuery, TResult>(ctx: DashboardContext, query: TQuery, result: TResult, correlationId?: string): DashboardQueryCompleted<TQuery, TResult>;
/**
 * Tests whether the provided object is an instance of {@link DashboardQueryCompleted}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardQueryCompleted: (obj: unknown) => obj is DashboardQueryCompleted<any, any>;
