// (C) 2021-2023 GoodData Corporation
/**
 * Creates an {@link TriggerEvent} command.
 *
 * @beta
 */
export function triggerEvent(eventBody, correlationId) {
    return {
        type: "GDC.DASH/CMD.EVENT.TRIGGER",
        correlationId,
        payload: {
            eventBody,
        },
    };
}
//# sourceMappingURL=events.js.map