/// <reference types="react" />
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IDimension, IExecutionDefinition, INullableFilter, ISortItem, ObjRef } from "@gooddata/sdk-model";
import { UseCancelablePromiseState, DataViewFacade, GoodDataSdkError, UseCancelablePromiseCallbacks } from "../base/index.js";
import { DataViewWindow } from "./withExecutionLoading.js";
/**
 * Configuration for {@link useInsightDataView} hook.
 *
 * @public
 */
export interface IUseInsightDataViewConfig {
    /**
     * Reference to the insight for which you want to get the data view.
     *
     * @remarks
     * Note: When the reference or identifier is not provided, hook is locked in a "pending" state.
     */
    insight?: ObjRef;
    /**
     * Modify sorts on prepared insight execution, before it's executed.
     */
    sorts?: ISortItem[] | ((def: IExecutionDefinition) => ISortItem[]);
    /**
     * Modify dimensions on prepared insight execution, before it's executed.
     */
    dimensions?: IDimension[] | ((def: IExecutionDefinition) => IDimension[]);
    /**
     * Modify date formatting on prepared insight execution, before it's executed.
     */
    dateFormat?: string | ((def: IExecutionDefinition) => string);
    /**
     * Specify filters to merge with filters already defined in the insight.
     */
    filters?: INullableFilter[];
    /**
     * You can define only a specific "window" of data to load.
     *
     * @remarks
     * This is useful if you want to page data.
     */
    window?: DataViewWindow;
    /**
     * Indicates that the execution to obtain the data for the insight should be an 'execution by reference'.
     *
     * Execution by reference means that the useInsightDataView will ask analytical backend to compute results for an insight
     * which is stored on the backend by specifying link to the insight, additional filters and description how
     * to organize the data.
     *
     * Otherwise, a freeform execution is done, in which the InsightView will send to backend the full execution
     * definition of what to compute.
     *
     * This distinction is in place because some backends MAY want to prohibit users from doing freeform executions
     * and only allow computing data for set of insights created by admins.
     *
     * Note: the need for execute by reference is rare. You will typically be notified by the solution admin to use
     * this mode.
     */
    executeByReference?: boolean;
    /**
     * Backend to work with.
     *
     * @remarks
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace where execution should be executed.
     *
     * @remarks
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;
}
/**
 * Callbacks for {@link useInsightDataView} hook.
 *
 * @public
 */
export type UseInsightDataViewCallbacks = UseCancelablePromiseCallbacks<DataViewFacade, GoodDataSdkError>;
/**
 * React hook to get data for a specific insight.
 *
 * @public
 */
export declare function useInsightDataView(config: IUseInsightDataViewConfig & UseInsightDataViewCallbacks, deps?: React.DependencyList): UseCancelablePromiseState<DataViewFacade, GoodDataSdkError>;
//# sourceMappingURL=useInsightDataView.d.ts.map