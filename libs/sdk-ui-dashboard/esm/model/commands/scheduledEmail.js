// (C) 2021-2023 GoodData Corporation
/**
 * Creates the CreateScheduledEmail command.
 *
 * Dispatching this command will result in the creating scheduled email on the backend.
 *
 * @param scheduledEmail - specify scheduled email to create.
 * @param filterContext - specify filter context to use for the scheduled email. If no filter context is provided, stored dashboard filter context will be used.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing

 * @beta
 */
export function createScheduledEmail(scheduledEmail, filterContext, correlationId) {
    return {
        type: "GDC.DASH/CMD.SCHEDULED_EMAIL.CREATE",
        correlationId,
        payload: {
            scheduledEmail,
            filterContext,
        },
    };
}
/**
 * Saves existing SaveScheduledEmail command. Dispatching this command will result in saving scheduled email on the backend.
 *
 * @param scheduledEmail - specify scheduled email to save.
 * @param filterContextRef - optionally specify existing filter context reference to be used for all attachments
 * @param correlationId - optionally specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing

 * @beta
 */
export function saveScheduledEmail(scheduledEmail, filterContextRef, correlationId) {
    return {
        type: "GDC.DASH/CMD.SCHEDULED_EMAIL.SAVE",
        correlationId,
        payload: {
            scheduledEmail,
            filterContextRef,
        },
    };
}
//# sourceMappingURL=scheduledEmail.js.map