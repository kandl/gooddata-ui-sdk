// (C) 2022-2023 GoodData Corporation
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
export function changeRenderMode(renderMode, renderModeChangeOptions = { resetDashboard: true }, correlationId) {
    return {
        type: "GDC.DASH/CMD.CHANGE_RENDER_MODE",
        correlationId,
        payload: {
            renderMode,
            renderModeChangeOptions,
        },
    };
}
/**
 * Creates the ChangeRenderMode command for switch to edit mode.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function switchToEditRenderMode(correlationId) {
    return changeRenderMode("edit", { resetDashboard: true }, correlationId);
}
/**
 * Creates the ChangeRenderMode command for cancel edit mode.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function cancelEditRenderMode(correlationId) {
    return changeRenderMode("view", { resetDashboard: true }, correlationId);
}
//# sourceMappingURL=renderMode.js.map