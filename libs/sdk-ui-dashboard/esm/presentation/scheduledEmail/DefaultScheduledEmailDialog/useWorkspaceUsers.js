import { useBackendStrict, useCancelablePromise, useWorkspaceStrict, } from "@gooddata/sdk-ui";
import { useDashboardSelector, selectCanListUsersInWorkspace } from "../../../model/index.js";
/**
 * Hook allowing to download workspace users
 * @param config - configuration of the hook
 * @internal
 */
export function useWorkspaceUsers({ search, backend, workspace, onCancel, onError, onLoading, onPending, onSuccess, }) {
    const effectiveBackend = useBackendStrict(backend);
    const effectiveWorkspace = useWorkspaceStrict(workspace);
    const canListUsersInWorkspace = useDashboardSelector(selectCanListUsersInWorkspace);
    // if the user cannot list the users, do not even try and resolve to an empty array
    const promise = canListUsersInWorkspace
        ? () => {
            let loader = effectiveBackend.workspace(effectiveWorkspace).users();
            if (search) {
                loader = loader.withOptions({ search: `%${search}` });
            }
            return loader.queryAll();
        }
        : () => Promise.resolve([]);
    return useCancelablePromise({ promise, onCancel, onError, onLoading, onPending, onSuccess }, [
        effectiveBackend,
        effectiveWorkspace,
        search,
    ]);
}
//# sourceMappingURL=useWorkspaceUsers.js.map