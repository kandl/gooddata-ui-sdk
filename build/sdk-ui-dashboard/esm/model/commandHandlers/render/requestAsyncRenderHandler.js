import { asyncRenderRequested } from "../../events/render.js";
export function requestAsyncRenderHandler(ctx, cmd) {
    const { payload: { id }, correlationId, } = cmd;
    return asyncRenderRequested(id, ctx, correlationId);
}
//# sourceMappingURL=requestAsyncRenderHandler.js.map