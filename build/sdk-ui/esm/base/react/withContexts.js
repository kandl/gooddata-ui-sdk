// (C) 2019-2020 GoodData Corporation
import compose from "lodash/flowRight.js";
import { withBackend } from "./BackendContext.js";
import { withWorkspace } from "./WorkspaceContext.js";
import { wrapDisplayName } from "./wrapDisplayName.js";
/**
 * Injects backend and workspace provided by BackendProvider & WorkspaceProvider to a component
 * @internal
 */
export function withContexts(Chart) {
    return compose(wrapDisplayName("withContexts"), withBackend, withWorkspace)(Chart);
}
//# sourceMappingURL=withContexts.js.map