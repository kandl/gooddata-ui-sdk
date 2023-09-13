import { eventGuard } from "./util.js";
/**
 * @public
 */
export function renderRequested(ctx, correlationId) {
    return {
        type: "GDC.DASH/EVT.RENDER.REQUESTED",
        correlationId,
        ctx,
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardRenderRequested}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardRenderRequested = eventGuard("GDC.DASH/EVT.RENDER.REQUESTED");
/**
 * @public
 */
export function asyncRenderRequested(id, ctx, correlationId) {
    return {
        type: "GDC.DASH/EVT.RENDER.ASYNC.REQUESTED",
        correlationId,
        ctx,
        payload: {
            id,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAsyncRenderRequested}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardAsyncRenderRequested = eventGuard("GDC.DASH/EVT.RENDER.ASYNC.REQUESTED");
/**
 * @public
 */
export function asyncRenderResolved(id, ctx, correlationId) {
    return {
        type: "GDC.DASH/EVT.RENDER.ASYNC.RESOLVED",
        correlationId,
        ctx,
        payload: {
            id,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAsyncRenderResolved}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardAsyncRenderResolved = eventGuard("GDC.DASH/EVT.RENDER.ASYNC.RESOLVED");
/**
 * This event is emitted as soon as the dashboard component is fully rendered,
 * and asynchronous rendering of each component is complete.
 *
 * @public
 */
export function renderResolved(ctx, correlationId) {
    return {
        type: "GDC.DASH/EVT.RENDER.RESOLVED",
        correlationId,
        ctx,
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardRenderResolved}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardRenderResolved = eventGuard("GDC.DASH/EVT.RENDER.RESOLVED");
//# sourceMappingURL=render.js.map