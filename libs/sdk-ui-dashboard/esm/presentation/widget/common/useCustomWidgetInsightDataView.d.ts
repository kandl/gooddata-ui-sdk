import { IInsightDefinition, ObjRef } from "@gooddata/sdk-model";
import { DataViewFacade, GoodDataSdkError, UseCancelablePromiseCallbacks, UseCancelablePromiseState } from "@gooddata/sdk-ui";
import { ICustomWidget } from "../../../model/index.js";
/**
 * Configuration options for the {@link useCustomWidgetInsightDataView} hook.
 *
 * @public
 */
export interface IUseCustomWidgetInsightDataViewConfig {
    /**
     * Custom widget in the context of which the execution should be run. This affects which filters will be used.
     */
    widget: ICustomWidget;
    /**
     * Insight to execute or a reference to it.
     *
     * @remarks
     * The filters will be automatically merged with the filters on the dashboard.
     * Note: When the insight is not provided, hook is locked in a "pending" state.
     */
    insight?: IInsightDefinition | ObjRef;
}
/**
 * Callbacks for {@link useCustomWidgetInsightDataView} hook.
 *
 * @public
 */
export type UseCustomWidgetInsightDataViewCallbacks = UseCancelablePromiseCallbacks<DataViewFacade, GoodDataSdkError>;
/**
 * This hook provides an easy way to read a data view for an insight from a custom widget.
 * It resolves the appropriate filters for the widget based on the filters currently set on the whole dashboard.
 *
 * @public
 */
export declare function useCustomWidgetInsightDataView({ widget, insight, onCancel, onError, onLoading, onPending, onSuccess, }: IUseCustomWidgetInsightDataViewConfig & UseCustomWidgetInsightDataViewCallbacks): UseCancelablePromiseState<DataViewFacade, GoodDataSdkError>;
