import { IAttribute, IAttributeOrMeasure, INullableFilter, ISortItem, ITotal } from "@gooddata/sdk-model";
import { IAnalyticalBackend, IPreparedExecution } from "@gooddata/sdk-backend-spi";
/**
 * @internal
 */
export type CreateExecutionOptions = {
    /**
     * Backend to execute against.
     *
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace in whose context to perform the execution.
     *
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;
    /**
     * Data series will be built using the provided measures that are further scoped for
     * elements of the specified attributes.
     */
    seriesBy?: IAttributeOrMeasure[];
    /**
     * Slice all data series by elements of these attributes.
     */
    slicesBy?: IAttribute[];
    /**
     * Include these totals among the data slices.
     */
    totals?: ITotal[];
    /**
     * Filters to apply on server side.
     */
    filters?: INullableFilter[];
    /**
     * Sorting to apply on server side.
     */
    sortBy?: ISortItem[];
    /**
     * Informative name of the component.
     *
     * @remarks
     * This value is sent as telemetry information together
     * with the actual execution request. We recommend to set this because it can be useful for diagnostic
     * purposes.
     *
     * Defaults 'Execute'.
     */
    componentName?: string;
};
/**
 * Given execute props, this will prepare execution to send to backend.
 *
 * @param options - create execution options
 * @internal
 */
export declare function createExecution(options: CreateExecutionOptions): IPreparedExecution;
//# sourceMappingURL=createExecution.d.ts.map