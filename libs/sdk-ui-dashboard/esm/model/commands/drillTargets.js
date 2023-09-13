// (C) 2021-2022 GoodData Corporation
/**
 * Create AddDrillTargets {@link AddDrillTargets} command.
 *
 * @param ref - Unique widget ref
 * @param availableDrillTargets - Available widget drill targets {@link @gooddata/sdk-ui#IAvailableDrillTargets}
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 * @returns AddDrillTargets command
 *
 * @alpha
 */
export function addDrillTargets(ref, availableDrillTargets, correlationId) {
    return {
        type: "GDC.DASH/CMD.DRILL_TARGETS.ADD",
        correlationId,
        payload: {
            ref,
            availableDrillTargets,
        },
    };
}
//# sourceMappingURL=drillTargets.js.map