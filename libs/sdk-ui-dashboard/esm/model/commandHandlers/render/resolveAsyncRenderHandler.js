import { asyncRenderResolved } from "../../events/render.js";
export function resolveAsyncRenderHandler(ctx, cmd) {
    const { payload: { id }, correlationId, } = cmd;
    return asyncRenderResolved(id, ctx, correlationId);
}
//# sourceMappingURL=resolveAsyncRenderHandler.js.map