import { IDashboardEvent } from "./base.js";
import { RenderMode } from "../../types.js";
import { DashboardContext } from "../types/commonTypes.js";
/**
 * Payload of the {@link DashboardRenderModeChanged} event.
 * @beta
 */
export interface DashboardRenderModeChangedPayload {
    /**
     * Current render mode value
     */
    renderMode: RenderMode;
}
/**
 * This event is emitted after render mode change.
 *
 * @beta
 */
export interface DashboardRenderModeChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.RENDER_MODE.CHANGED";
    readonly payload: DashboardRenderModeChangedPayload;
}
/**
 * @beta
 */
export declare function renderModeChanged(ctx: DashboardContext, renderMode: RenderMode, correlationId?: string): DashboardRenderModeChanged;
/**
 * Tests whether the provided object is an instance of {@link DashboardRenderModeChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardRenderModeChanged: (obj: unknown) => obj is DashboardRenderModeChanged;
