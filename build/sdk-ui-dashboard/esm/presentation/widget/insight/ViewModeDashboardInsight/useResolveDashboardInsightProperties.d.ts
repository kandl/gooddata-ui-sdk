import { IInsight, IInsightWidget } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface UseResolveDashboardInsightFiltersProps {
    insight: IInsight;
    widget: IInsightWidget;
}
/**
 * @internal
 */
export declare const useResolveDashboardInsightProperties: (props: UseResolveDashboardInsightFiltersProps) => IInsight;
