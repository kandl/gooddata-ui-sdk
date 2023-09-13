import { DataViewFacade, GoodDataSdkError, IExecutionConfiguration, UseCancelablePromiseCallbacks, UseCancelablePromiseState } from "@gooddata/sdk-ui";
import { ICustomWidget } from "../../../model/index.js";
/**
 * Configuration options for the {@link useCustomWidgetExecutionDataView} hook.
 *
 * @public
 */
export interface IUseCustomWidgetExecutionDataViewConfig {
    /**
     * Custom widget in the context of which the execution should be run. This affects which filters will be used.
     */
    widget: ICustomWidget;
    /**
     * Definition of the execution to execute (without filters). The filters will be filled automatically.
     *
     * @remarks
     * Note: When the execution is not provided, hook is locked in a "pending" state.
     */
    execution?: Exclude<IExecutionConfiguration, "filters">;
}
/**
 * Callbacks for {@link useCustomWidgetExecutionDataView} hook.
 *
 * @public
 */
export type UseCustomWidgetExecutionDataViewCallbacks = UseCancelablePromiseCallbacks<DataViewFacade, GoodDataSdkError>;
/**
 * This hook provides an easy way to read a data view from a custom widget. It resolves the appropriate filters
 * for the widget based on the filters currently set on the whole dashboard.
 *
 * @public
 */
export declare function useCustomWidgetExecutionDataView({ widget, execution, onCancel, onError, onLoading, onPending, onSuccess, }: IUseCustomWidgetExecutionDataViewConfig & UseCustomWidgetExecutionDataViewCallbacks): UseCancelablePromiseState<DataViewFacade, GoodDataSdkError>;
