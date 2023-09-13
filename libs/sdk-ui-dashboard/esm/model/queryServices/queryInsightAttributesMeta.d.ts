import { InsightAttributesMeta, QueryInsightAttributesMeta } from "../queries/index.js";
export declare const QueryInsightAttributesMetaService: Required<import("../store/_infra/queryService.js").IDashboardQueryService<QueryInsightAttributesMeta, InsightAttributesMeta>>;
/**
 * Selector that will return attribute metadata for an insight. The input to the selector is the dashboard query that is used
 * to obtain and cache the data.
 *
 * This selector will return undefined if the query to obtain the data for particular insight was not yet fired or
 * processed. Otherwise will return object containing `status` of the data retrieval; if the `status` is
 * `'success'` then the `result` prop will contain the data.
 *
 * @remarks see {@link QueryInsightAttributesMeta}
 * @internal
 */
export declare const selectInsightAttributesMeta: (query: QueryInsightAttributesMeta) => (state: import("../index.js").DashboardState, ...params: any[]) => import("../store/_infra/queryService.js").QueryCacheEntryResult<InsightAttributesMeta> | undefined;
