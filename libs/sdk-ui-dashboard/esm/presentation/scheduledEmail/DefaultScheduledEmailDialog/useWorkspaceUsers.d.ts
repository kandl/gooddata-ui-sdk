import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IWorkspaceUser } from "@gooddata/sdk-model";
import { GoodDataSdkError, UseCancelablePromiseCallbacks, UseCancelablePromiseState } from "@gooddata/sdk-ui";
interface IUseWorkspaceUsersConfig extends UseCancelablePromiseCallbacks<IWorkspaceUser[], GoodDataSdkError> {
    /**
     * Option to filter users by the provided string.
     */
    search?: string;
    /**
     * Backend to work with.
     *
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the hook MUST be called within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace to work with.
     *
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the hook MUST be called within an existing WorkspaceContext.
     */
    workspace?: string;
}
/**
 * Hook allowing to download workspace users
 * @param config - configuration of the hook
 * @internal
 */
export declare function useWorkspaceUsers({ search, backend, workspace, onCancel, onError, onLoading, onPending, onSuccess, }: IUseWorkspaceUsersConfig): UseCancelablePromiseState<IWorkspaceUser[], any>;
export {};
