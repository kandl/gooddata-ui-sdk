import isString from "lodash/isString.js";
import { eventGuard } from "./util.js";
/**
 * Creates the {@link DashboardUserInteractionTriggered} event body.
 *
 * @param interactionPayloadOrType - interaction payload or a type of a user interaction without extra data (for convenience)
 * @param correlationId - specify correlation id to use for this event. this can be used to correlate this event to a command that caused it.
 * @beta
 */
export function userInteractionTriggered(interactionPayloadOrType, correlationId) {
    const payload = isString(interactionPayloadOrType)
        ? { interaction: interactionPayloadOrType }
        : interactionPayloadOrType;
    return {
        type: "GDC.DASH/EVT.USER_INTERACTION.TRIGGERED",
        correlationId,
        payload,
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardUserInteractionTriggered}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardUserInteractionTriggered = eventGuard("GDC.DASH/EVT.USER_INTERACTION.TRIGGERED");
//# sourceMappingURL=userInteraction.js.map