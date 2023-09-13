// (C) 2021-2023 GoodData Corporation
import { eventGuard } from "./util.js";
/**
 * @beta
 */
export function widgetExecutionStarted(widgetRef, executionDefinition, correlationId) {
    return {
        type: "GDC.DASH/EVT.WIDGET.EXECUTION_STARTED",
        correlationId,
        payload: {
            widgetRef,
            executionDefinition,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardWidgetExecutionStarted}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardWidgetExecutionStarted = eventGuard("GDC.DASH/EVT.WIDGET.EXECUTION_STARTED");
/**
 * @beta
 */
export function widgetExecutionFailed(widgetRef, error, correlationId) {
    return {
        type: "GDC.DASH/EVT.WIDGET.EXECUTION_FAILED",
        correlationId,
        payload: {
            widgetRef,
            error,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardWidgetExecutionFailed}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardWidgetExecutionFailed = eventGuard("GDC.DASH/EVT.WIDGET.EXECUTION_FAILED");
/**
 * @beta
 */
export function widgetExecutionSucceeded(widgetRef, dataView, correlationId) {
    return {
        type: "GDC.DASH/EVT.WIDGET.EXECUTION_SUCCEEDED",
        correlationId,
        payload: {
            dataView,
            widgetRef,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardWidgetExecutionSucceeded}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardWidgetExecutionSucceeded = eventGuard("GDC.DASH/EVT.WIDGET.EXECUTION_SUCCEEDED");
//# sourceMappingURL=widget.js.map