import { DashboardContext } from "../types/commonTypes.js";
import { IDashboardEvent } from "./base.js";
/**
 * This event is emitted as soon as the dashboard component is mounted,
 * and rendering of its content started.
 *
 * @public
 */
export interface DashboardRenderRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RENDER.REQUESTED";
}
/**
 * @public
 */
export declare function renderRequested(ctx: DashboardContext, correlationId?: string): DashboardRenderRequested;
/**
 * Tests whether the provided object is an instance of {@link DashboardRenderRequested}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardRenderRequested: (obj: unknown) => obj is DashboardRenderRequested;
/**
 * Payload of the {@link DashboardAsyncRenderRequested} event.
 * @public
 */
export interface DashboardAsyncRenderRequestedPayload {
    /**
     * Item identifier.
     */
    readonly id: string;
}
/**
 * This event is emitted when a component on the dashboard requests async rendering.
 *
 * @public
 */
export interface DashboardAsyncRenderRequested extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RENDER.ASYNC.REQUESTED";
    readonly payload: {
        /**
         * Item identifier.
         */
        readonly id: string;
    };
}
/**
 * @public
 */
export declare function asyncRenderRequested(id: string, ctx: DashboardContext, correlationId?: string): DashboardAsyncRenderRequested;
/**
 * Tests whether the provided object is an instance of {@link DashboardAsyncRenderRequested}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardAsyncRenderRequested: (obj: unknown) => obj is DashboardAsyncRenderRequested;
/**
 * Payload of the {@link DashboardAsyncRenderResolved} event.
 * @public
 */
export interface DashboardAsyncRenderResolvedPayload {
    /**
     * Item identifier.
     */
    readonly id: string;
}
/**
 * This event is emitted when a component on the dashboard resolves async rendering.
 *
 * @public
 */
export interface DashboardAsyncRenderResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RENDER.ASYNC.RESOLVED";
    readonly payload: DashboardAsyncRenderResolvedPayload;
}
/**
 * @public
 */
export declare function asyncRenderResolved(id: string, ctx: DashboardContext, correlationId?: string): DashboardAsyncRenderResolved;
/**
 * Tests whether the provided object is an instance of {@link DashboardAsyncRenderResolved}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardAsyncRenderResolved: (obj: unknown) => obj is DashboardAsyncRenderResolved;
/**
 * @public
 */
export interface DashboardRenderResolved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RENDER.RESOLVED";
}
/**
 * This event is emitted as soon as the dashboard component is fully rendered,
 * and asynchronous rendering of each component is complete.
 *
 * @public
 */
export declare function renderResolved(ctx: DashboardContext, correlationId?: string): DashboardRenderResolved;
/**
 * Tests whether the provided object is an instance of {@link DashboardRenderResolved}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isDashboardRenderResolved: (obj: unknown) => obj is DashboardRenderResolved;
