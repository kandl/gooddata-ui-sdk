import { IFilter, IInsightDefinition } from "@gooddata/sdk-model";
import { QueryWidgetFilters } from "../queries/widgets.js";
export declare const QueryWidgetFiltersService: import("../store/_infra/queryService.js").IDashboardQueryService<QueryWidgetFilters, IFilter[]>;
/**
 * Tests whether dashboard's date filter should not be applied on the insight included in the provided widget.
 *
 * This should happen for insights whose simple measures are all already set up with date filters. I guess ignoring
 * global date filter is desired because otherwise there is a large chance that the intersection of global date filter
 * and measure's date filters would lead to empty set and no data shown for the insight?
 */
export declare function isDashboardDateFilterIgnoredForInsight(insight: IInsightDefinition): boolean;
