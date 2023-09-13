import { objRefToString } from "@gooddata/sdk-model";
import { useBackendStrict, useWorkspaceStrict, useCancelablePromise, } from "../base/index.js";
/**
 * @internal
 */
export function useInsight(config, deps) {
    const { insight } = config;
    const backend = useBackendStrict(config.backend, "useInsight");
    const workspace = useWorkspaceStrict(config.workspace, "useInsight");
    const promise = insight ? () => backend.workspace(workspace).insights().getInsight(insight) : null;
    return useCancelablePromise({ promise }, [
        backend,
        workspace,
        insight ? objRefToString(insight) : "__insightRef__",
        ...(deps !== null && deps !== void 0 ? deps : []),
    ]);
}
//# sourceMappingURL=useInsight.js.map