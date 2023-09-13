import { DashboardContext } from "../../types/commonTypes.js";
import { SagaIterator } from "redux-saga";
import { CaseReducer, CaseReducerActions, EntityId, EntityState, Selector, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { DashboardQueryType, IDashboardQuery } from "../../queries/base.js";
import { DashboardState } from "../types.js";
/**
 * Describes the result part of the cache entry.
 *
 * @internal
 */
export type QueryCacheEntryResult<TResult> = {
    /**
     *
     */
    status: "loading" | "success" | "error";
    result?: TResult;
    error?: string;
};
/**
 * Entry in the per-query cache. The entry must also contain the query itself; this is because code uses
 * the entity adapter. The adapter needs to calculate cache key (string) from the entity it stores. Query is the
 * only reasonable candidate here.
 *
 * @internal
 */
export type QueryCacheEntry<TQuery extends IDashboardQuery, TResult> = QueryCacheEntryResult<TResult> & {
    query: TQuery;
};
/**
 * Each slice reducer is typed as toolkit's CaseReducer. This type specializes the case reducer to the purpose of
 * doing reductions on state that holds results for particular query type.
 *
 * @internal
 */
export type QueryCacheReducer<TQuery extends IDashboardQuery, TResult, TPayload> = CaseReducer<EntityState<QueryCacheEntry<TQuery, TResult>>, PayloadAction<TPayload>>;
/**
 * This defines all possible reducers for the cache slice.
 *
 * @internal
 */
export type AllQueryCacheReducers<TQuery extends IDashboardQuery, TResult> = {
    /**
     * Sets value of cache entry.
     */
    set: QueryCacheReducer<TQuery, TResult, QueryCacheEntry<TQuery, TResult>>;
    /**
     * Removes cache entry by cache key
     */
    remove: QueryCacheReducer<TQuery, TResult, string>;
    /**
     * Removes all entries from cache.
     */
    removeAll: QueryCacheReducer<TQuery, TResult, void>;
};
/**
 * This is a specialization of toolkit's CaseReducerActions to correctly type the action creators.
 *
 * @internal
 */
export type QueryActions<TQuery extends IDashboardQuery, TResult> = CaseReducerActions<AllQueryCacheReducers<TQuery, TResult>, string>;
/**
 * Contains all essentials of query cache that can be integrated into redux store and redux sagas.
 *
 * @internal
 */
export type QueryCache<TQuery extends IDashboardQuery, TResult> = {
    /**
     * A name to use as key in _queryCache part of the redux state.
     */
    cacheName: string;
    /**
     * Cache's slice reducer. This needs to be integrated into the dashboard store.
     */
    reducer: Reducer<EntityState<QueryCacheEntry<TQuery, TResult>>>;
    /**
     * Cache's action creators.
     */
    actions: QueryActions<TQuery, TResult>;
    /**
     * Factory for selectors to get cache entry by its identifier.
     *
     * Important: the use-case for this selector is purely internal. It is intended to be used by the internal
     * sagas that add caching layer on top of the actual query processing saga.
     *
     * @param id - cache key
     */
    selectById: (id: EntityId) => Selector<DashboardState, QueryCacheEntryResult<TResult> | undefined>;
    /**
     * Factory for selectors that obtain query result stored in state. This is intended for consumption by presentational components.
     *
     * The selected result may be undefined - which means that query to obtain the result has not (yet) started:
     * it has never even been dispatched or it is on its way to be processed. Once the query is running the status in the
     * result will change to `loading` and then eventually to either `success` or `error`.
     *
     * @param query - query to get result of
     * @internal
     */
    selectQueryResult: (query: TQuery) => Selector<DashboardState, QueryCacheEntryResult<TResult> | undefined>;
};
/**
 * Given query name, this function will create name to use for the slice that will hold the cache with query results.
 *
 * For slice name, the function drops the "GDC.DASH/QUERY." prefix and then the rest is camel-cased with the word 'Cache' appended at the end.
 *
 * @param queryName - query name in format GDC.DASH/QUERY.SOME.THING
 */
export declare function createSliceNameForQueryCache(queryName: string): string;
/**
 * Describes dashboard component's query service.
 *
 * Query service is registered into the dashboard component's store and will be used to process actions
 * of type equal to the query name.
 *
 * The responsibility of query service is to perform complex, asynchronous domain logic that spans across the
 * component state and the data or metadata stored on the analytical backend - and then return a result.
 *
 * The dashboard component's infrastructure and hooks ensure that the query result (or query error) will be
 * pushed to the caller code.
 *
 * @internal
 */
export interface IDashboardQueryService<TQuery extends IDashboardQuery, TResult> {
    name: DashboardQueryType;
    generator: (ctx: DashboardContext, query: TQuery, refresh: boolean) => SagaIterator<TResult>;
    cache?: QueryCache<TQuery, TResult>;
}
/**
 * Creates a query service whose results will be stored in the dashboard component's state. Cached query
 * services are useful when the query itself requires expensive operation backend.
 *
 * The dashboard store takes care of everything related to
 *
 * @param queryName - name of the query
 * @param generator - the generator function that processes the query
 * @param queryToCacheKey - function to map query into a cache key under which to store the results
 */
export declare function createCachedQueryService<TQuery extends IDashboardQuery, TResult>(queryName: DashboardQueryType, generator: (ctx: DashboardContext, query: TQuery) => SagaIterator<TResult>, queryToCacheKey: (query: TQuery) => EntityId): Required<IDashboardQueryService<TQuery, TResult>>;
/**
 * Creates a non-cached query service.
 *
 * @param queryName - name of the query
 * @param generator - the generator function that processes the query
 */
export declare function createQueryService<TQuery extends IDashboardQuery, TResult>(queryName: DashboardQueryType, generator: (ctx: DashboardContext, query: TQuery) => SagaIterator<TResult>): IDashboardQueryService<TQuery, TResult>;
