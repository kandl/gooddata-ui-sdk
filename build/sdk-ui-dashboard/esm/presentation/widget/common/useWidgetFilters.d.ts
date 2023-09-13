import { IFilter, IInsightDefinition } from "@gooddata/sdk-model";
import { ExtendedDashboardWidget, QueryProcessingState } from "../../../model/index.js";
/**
 * Hook for obtaining the effective filters for a widget.
 *
 * @remarks
 * The filters returned should be used with {@link @gooddata/sdk-model#insightSetFilters} to obtain
 * insight that is ready for execution.
 *
 * @param widget - widget to get effective filters for
 * @param insight - insight to evaluate the filters for in context of the widget
 * @returns set of filters that should be used to execute the given widget
 *
 * @public
 */
export declare function useWidgetFilters(widget: ExtendedDashboardWidget | undefined, insight?: IInsightDefinition): QueryProcessingState<IFilter[]>;
