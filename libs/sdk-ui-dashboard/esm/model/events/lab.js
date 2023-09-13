// (C) 2021-2023 GoodData Corporation
import { eventGuard } from "./util.js";
/**
 * Create {@link CreateInsightRequested} event
 *
 * @internal
 */
export function createInsightRequested(correlationId) {
    return {
        type: "GDC.DASH/EVT.CREATE_INSIGHT_REQUESTED",
        correlationId,
    };
}
/**
 * Tests whether the provided object is an instance of {@link CreateInsightRequested}.
 *
 * @param obj - object to test
 * @internal
 */
export const isCreateInsightRequested = eventGuard("GDC.DASH/EVT.CREATE_INSIGHT_REQUESTED");
//# sourceMappingURL=lab.js.map