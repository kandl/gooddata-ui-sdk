// (C) 2021-2023 GoodData Corporation
import { eventGuard } from "./util.js";
export function dashboardInitialized(ctx, dashboard, insights, config, permissions, correlationId) {
    return {
        type: "GDC.DASH/EVT.INITIALIZED",
        ctx,
        correlationId,
        payload: {
            dashboard,
            insights,
            config,
            permissions,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInitialized}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardInitialized = eventGuard("GDC.DASH/EVT.INITIALIZED");
export function dashboardDeinitialized(ctx, dashboard, correlationId) {
    return {
        type: "GDC.DASH/EVT.DEINITIALIZED",
        ctx,
        correlationId,
        payload: {
            dashboard,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDeinitialized}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardDeinitialized = eventGuard("GDC.DASH/EVT.DEINITIALIZED");
export function dashboardSaved(ctx, dashboard, newDashboard, correlationId) {
    return {
        type: "GDC.DASH/EVT.SAVED",
        ctx,
        correlationId,
        payload: {
            dashboard,
            newDashboard,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardSaved}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardSaved = eventGuard("GDC.DASH/EVT.SAVED");
export function dashboardCopySaved(ctx, dashboard, isOriginalDashboardLocked, correlationId) {
    return {
        type: "GDC.DASH/EVT.COPY_SAVED",
        ctx,
        correlationId,
        payload: {
            dashboard,
            isOriginalDashboardLocked,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardCopySaved}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardCopySaved = eventGuard("GDC.DASH/EVT.COPY_SAVED");
export function dashboardRenamed(ctx, newTitle, correlationId) {
    return {
        type: "GDC.DASH/EVT.RENAMED",
        ctx,
        correlationId,
        payload: {
            newTitle,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardRenamed}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardRenamed = eventGuard("GDC.DASH/EVT.RENAMED");
export function dashboardWasReset(ctx, dashboard, correlationId) {
    return {
        type: "GDC.DASH/EVT.RESET",
        ctx,
        correlationId,
        payload: {
            dashboard,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardWasReset}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardWasReset = eventGuard("GDC.DASH/EVT.RESET");
export function dashboardDeleted(ctx, dashboard, correlationId) {
    return {
        type: "GDC.DASH/EVT.DELETED",
        ctx,
        correlationId,
        payload: {
            dashboard,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDeleted}
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardDeleted = eventGuard("GDC.DASH/EVT.DELETED");
export function dateFilterValidationFailed(ctx, result, correlationId) {
    return {
        type: "GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.VALIDATION.FAILED",
        ctx,
        correlationId,
        payload: {
            result,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DateFilterValidationFailed}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDateFilterValidationFailed = eventGuard("GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.VALIDATION.FAILED");
export function dashboardExportToPdfRequested(ctx, correlationId) {
    return {
        type: "GDC.DASH/EVT.EXPORT.PDF.REQUESTED",
        ctx,
        correlationId,
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardExportToPdfRequested}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardExportToPdfRequested = eventGuard("GDC.DASH/EVT.EXPORT.PDF.REQUESTED");
export function dashboardExportToPdfResolved(ctx, result, correlationId) {
    return {
        type: "GDC.DASH/EVT.EXPORT.PDF.RESOLVED",
        ctx,
        correlationId,
        payload: {
            resultUri: result.uri,
            result,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardExportToPdfResolved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardExportToPdfResolved = eventGuard("GDC.DASH/EVT.EXPORT.PDF.RESOLVED");
export function dashboardSharingChanged(ctx, newSharingProperties, correlationId) {
    return {
        type: "GDC.DASH/EVT.SHARING.CHANGED",
        ctx,
        correlationId,
        payload: {
            newSharingProperties,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardSharingChanged}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardSharingChanged = eventGuard("GDC.DASH/EVT.SHARING.CHANGED");
//# sourceMappingURL=dashboard.js.map