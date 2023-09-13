import { eventGuard } from "./util.js";
export function alertCreated(ctx, alert, correlationId) {
    return {
        type: "GDC.DASH/EVT.ALERT.CREATED",
        ctx,
        correlationId,
        payload: {
            alert,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAlertCreated}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardAlertCreated = eventGuard("GDC.DASH/EVT.ALERT.CREATED");
export function alertsRemoved(ctx, alerts, correlationId) {
    return {
        type: "GDC.DASH/EVT.ALERTS.REMOVED",
        ctx,
        correlationId,
        payload: {
            alerts,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAlertsRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardAlertsRemoved = eventGuard("GDC.DASH/EVT.ALERTS.REMOVED");
export function alertUpdated(ctx, updated, correlationId) {
    return {
        type: "GDC.DASH/EVT.ALERT.UPDATED",
        ctx,
        correlationId,
        payload: {
            updated,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAlertUpdated}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardAlertUpdated = eventGuard("GDC.DASH/EVT.ALERT.UPDATED");
//# sourceMappingURL=alerts.js.map