import { IDashboardCommand } from "./base.js";
import { RenderMode } from "../../types.js";
/**
 * @beta
 */
export interface RenderModeChangeOptions {
    readonly resetDashboard: boolean;
}
/**
 * Payload of the {@link ChangeRenderMode} command.
 * @beta
 */
export interface ChangeRenderModePayload {
    readonly renderMode: RenderMode;
    readonly renderModeChangeOptions: RenderModeChangeOptions;
}
/**
 * @beta
 */
export interface ChangeRenderMode extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.CHANGE_RENDER_MODE";
    readonly payload: ChangeRenderModePayload;
}
/**
 * Creates the ChangeRenderMode command. Dispatching this command will result in change of the render mode of dashboard component
 *
 * @param renderMode - render mode value
 * @param renderModeChangeOptions - options for render mode change
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function changeRenderMode(renderMode: RenderMode, renderModeChangeOptions?: RenderModeChangeOptions, correlationId?: string): ChangeRenderMode;
/**
 * Creates the ChangeRenderMode command for switch to edit mode.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function switchToEditRenderMode(correlationId?: string): ChangeRenderMode;
/**
 * Creates the ChangeRenderMode command for cancel edit mode.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export declare function cancelEditRenderMode(correlationId?: string): ChangeRenderMode;
