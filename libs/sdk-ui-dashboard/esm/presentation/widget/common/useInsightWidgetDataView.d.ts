import { DataViewFacade, GoodDataSdkError, UseCancelablePromiseCallbacks, UseCancelablePromiseState } from "@gooddata/sdk-ui";
import { IInsightWidget } from "@gooddata/sdk-model";
/**
 * Configuration for the `useInsightWidgetDataView` hook.
 *
 * @public
 */
export interface IUseInsightWidgetDataView {
    /**
     * Insight widget to get data view for.
     *
     * @remarks
     * Note: When the insight widget is not provided, hook is locked in a "pending" state.
     */
    insightWidget?: IInsightWidget;
}
/**
 * Callbacks for {@link useInsightWidgetDataView} hook.
 *
 * @public
 */
export type UseInsightWidgetInsightDataViewCallbacks = UseCancelablePromiseCallbacks<DataViewFacade, GoodDataSdkError>;
/**
 * This hook provides an easy way to read a data view from insight widget.
 *
 * @param config - configuration of the hook
 *
 * @public
 */
export declare function useInsightWidgetDataView(config: IUseInsightWidgetDataView & UseInsightWidgetInsightDataViewCallbacks): UseCancelablePromiseState<DataViewFacade, GoodDataSdkError>;
