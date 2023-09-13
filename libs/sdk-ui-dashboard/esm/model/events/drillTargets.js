import { eventGuard } from "./util.js";
/**
 * Create DrillTargetsAdded {@link DrillTargetsAdded} event.
 *
 * @param ref - Unique widget ref
 * @param availableDrillTargets - Available widget drill targets {@link @gooddata/sdk-ui#IAvailableDrillTargets}
 * @param correlationId - correlationId
 * @returns - DrillTargetsAdded command
 *
 * @alpha
 */
export function drillTargetsAdded(ctx, ref, availableDrillTargets, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL_TARGETS.ADDED",
        ctx,
        correlationId,
        payload: {
            ref,
            availableDrillTargets,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DrillTargetsAdded}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDrillTargetsAdded = eventGuard("GDC.DASH/EVT.DRILL_TARGETS.ADDED");
//# sourceMappingURL=drillTargets.js.map