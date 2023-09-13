import { MeasureDateDatasets, QueryMeasureDateDatasets } from "../queries/kpis.js";
export declare const QueryDateDatasetsForMeasureService: Required<import("../store/_infra/queryService.js").IDashboardQueryService<QueryMeasureDateDatasets, MeasureDateDatasets>>;
/**
 * Selector that will return date datasets for a measure. The input to the selector is the dashboard query that is used
 * to obtain and cache the data.
 *
 * This selector will return undefined if the query to obtain the data for a particular measure was not yet fired or
 * processed. Otherwise will return object containing `status` of the data retrieval; if the `status` is
 * `'success'` then the `result` prop will contain the data.
 *
 * @remarks see {@link QueryMeasureDateDatasets}
 * @internal
 */
export declare const selectDateDatasetsForMeasure: (query: QueryMeasureDateDatasets) => (state: import("../index.js").DashboardState, ...params: any[]) => import("../store/_infra/queryService.js").QueryCacheEntryResult<MeasureDateDatasets> | undefined;
