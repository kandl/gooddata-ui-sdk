import { AttributeFilterHandlerStoreContext } from "./redux/index.js";
/**
 * Configuration for attribute filter handler initialization.
 *
 * @internal
 */
export type AttributeFilterHandlerConfig = Omit<AttributeFilterHandlerStoreContext, "eventListener">;
