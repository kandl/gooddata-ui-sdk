import { eventGuard } from "./util.js";
export function scheduledEmailCreated(ctx, scheduledEmail, correlationId) {
    return {
        type: "GDC.DASH/EVT.SCHEDULED_EMAIL.CREATED",
        ctx,
        correlationId,
        payload: {
            scheduledEmail,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardScheduledEmailCreated}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardScheduledEmailCreated = eventGuard("GDC.DASH/EVT.SCHEDULED_EMAIL.CREATED");
export function scheduledEmailSaved(ctx, correlationId) {
    return {
        type: "GDC.DASH/EVT.SCHEDULED_EMAIL.SAVED",
        ctx,
        correlationId,
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardScheduledEmailSaved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardScheduledEmailSaved = eventGuard("GDC.DASH/EVT.SCHEDULED_EMAIL.SAVED");
//# sourceMappingURL=scheduledEmail.js.map