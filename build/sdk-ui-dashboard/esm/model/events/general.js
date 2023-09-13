// (C) 2021-2023 GoodData Corporation
import { eventGuard } from "./util.js";
export function dashboardCommandStarted(ctx, command) {
    return {
        type: "GDC.DASH/EVT.COMMAND.STARTED",
        ctx,
        correlationId: command.correlationId,
        payload: {
            command,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardCommandStarted}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardCommandStarted = eventGuard("GDC.DASH/EVT.COMMAND.STARTED");
export function internalErrorOccurred(ctx, command, message, error) {
    return {
        type: "GDC.DASH/EVT.COMMAND.FAILED",
        ctx,
        correlationId: command.correlationId,
        payload: {
            reason: "INTERNAL_ERROR",
            command,
            message,
            error,
        },
    };
}
export function invalidArgumentsProvided(ctx, command, message) {
    return {
        type: "GDC.DASH/EVT.COMMAND.FAILED",
        ctx,
        correlationId: command.correlationId,
        payload: {
            reason: "USER_ERROR",
            command,
            message,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardCommandFailed}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardCommandFailed = eventGuard("GDC.DASH/EVT.COMMAND.FAILED");
export function commandRejected(ctx, correlationId) {
    return {
        type: "GDC.DASH/EVT.COMMAND.REJECTED",
        ctx,
        correlationId,
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardCommandRejected}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardCommandRejected = eventGuard("GDC.DASH/EVT.COMMAND.REJECTED");
export function queryRejected(ctx, correlationId) {
    return {
        type: "GDC.DASH/EVT.QUERY.REJECTED",
        ctx,
        correlationId,
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardQueryRejected}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardQueryRejected = eventGuard("GDC.DASH/EVT.QUERY.REJECTED");
export function internalQueryErrorOccurred(ctx, message, error, correlationId) {
    return {
        type: "GDC.DASH/EVT.QUERY.FAILED",
        ctx,
        correlationId,
        payload: {
            reason: "INTERNAL_ERROR",
            message,
            error,
        },
    };
}
export function invalidQueryArguments(ctx, message, correlationId) {
    return {
        type: "GDC.DASH/EVT.QUERY.FAILED",
        ctx,
        correlationId,
        payload: {
            reason: "USER_ERROR",
            message,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardCommandFailed}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardQueryFailed = eventGuard("GDC.DASH/EVT.QUERY.FAILED");
export function queryStarted(ctx, query, correlationId) {
    return {
        type: "GDC.DASH/EVT.QUERY.STARTED",
        ctx,
        correlationId,
        payload: {
            query,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardQueryStarted}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardQueryStarted = eventGuard("GDC.DASH/EVT.QUERY.STARTED");
export function queryCompleted(ctx, query, result, correlationId) {
    return {
        type: "GDC.DASH/EVT.QUERY.COMPLETED",
        ctx,
        correlationId,
        payload: {
            query,
            result,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardQueryCompleted}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardQueryCompleted = eventGuard("GDC.DASH/EVT.QUERY.COMPLETED");
//# sourceMappingURL=general.js.map