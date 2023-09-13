/// <reference types="react" />
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IInsight, ObjRef } from "@gooddata/sdk-model";
import { UseCancelablePromiseState, GoodDataSdkError } from "../base/index.js";
/**
 * @internal
 */
export interface IUseInsightConfig {
    /**
     * Insight reference - when the reference is not provided, hook is locked in a "pending" state.
     */
    insight?: ObjRef;
    /**
     * Backend to work with.
     *
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace where execution should be executed.
     *
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;
}
/**
 * @internal
 */
export declare function useInsight(config: IUseInsightConfig, deps?: React.DependencyList): UseCancelablePromiseState<IInsight, GoodDataSdkError>;
//# sourceMappingURL=useInsight.d.ts.map