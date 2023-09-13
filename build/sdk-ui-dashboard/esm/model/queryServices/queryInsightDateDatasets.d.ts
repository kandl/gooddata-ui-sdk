import { InsightDateDatasets, QueryInsightDateDatasets } from "../queries/index.js";
export declare const QueryDateDatasetsForInsightService: Required<import("../store/_infra/queryService.js").IDashboardQueryService<QueryInsightDateDatasets, InsightDateDatasets>>;
/**
 * Selector that will return date datasets for insight. The input to the selector is the dashboard query that is used
 * to obtain and cache the data.
 *
 * This selector will return undefined if the query to obtain the data for particular insight was not yet fired or
 * processed. Otherwise will return object containing `status` of the data retrieval; if the `status` is
 * `'success'` then the `result` prop will contain the data.
 *
 * @remarks see {@link QueryInsightDateDatasets}
 * @internal
 */
export declare const selectDateDatasetsForInsight: (query: QueryInsightDateDatasets) => (state: import("../index.js").DashboardState, ...params: any[]) => import("../store/_infra/queryService.js").QueryCacheEntryResult<InsightDateDatasets> | undefined;
