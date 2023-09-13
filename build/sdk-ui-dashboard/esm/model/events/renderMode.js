// (C) 2022-2023 GoodData Corporation
import { eventGuard } from "./util.js";
/**
 * @beta
 */
export function renderModeChanged(ctx, renderMode, correlationId) {
    return {
        type: "GDC.DASH/EVT.RENDER_MODE.CHANGED",
        ctx,
        correlationId,
        payload: {
            renderMode,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardRenderModeChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardRenderModeChanged = eventGuard("GDC.DASH/EVT.RENDER_MODE.CHANGED");
//# sourceMappingURL=renderMode.js.map