import { IDashboardQueryService } from "./queryService.js";
import { Saga } from "redux-saga";
import { IDashboardQuery } from "../../queries/index.js";
import { CombinedState, Reducer } from "@reduxjs/toolkit";
/**
 * Query processing component has multiple pieces that need to be integrated into the redux store.
 */
export interface QueryProcessingModule {
    /**
     * Query services may store the results in state for caching purposes. All services that use caching implement
     * the cache as a separate slice of the internal `_queryCache` part of the state. This reducer is a combined
     * reducer including all the appropriate slice reducers.
     */
    queryCacheReducer: Reducer<CombinedState<any>>;
    /**
     * A single saga is in place to handle query processing requests. Query requests will be processed concurrently.
     */
    rootQueryProcessor: Saga;
}
/**
 * @internal
 */
export declare const QueryEnvelopeActionPrefix = "__Q";
type QueryEnvelopeEventHandlers<TQuery extends IDashboardQuery, TQueryResult> = {
    onStart: (query: TQuery) => void;
    onSuccess: (result: TQueryResult) => void;
    onError: (err: Error) => void;
};
type QueryEnvelope<TQuery extends IDashboardQuery, TQueryResult> = Readonly<QueryEnvelopeEventHandlers<TQuery, TQueryResult>> & {
    readonly type: string;
    readonly query: IDashboardQuery;
    readonly refresh?: boolean;
};
/**
 * @internal
 */
export declare function queryEnvelope<TQuery extends IDashboardQuery, TQueryResult>(query: TQuery, eventHandlers?: Partial<QueryEnvelopeEventHandlers<TQuery, TQueryResult>>, refresh?: boolean): QueryEnvelope<TQuery, TQueryResult>;
/**
 * @internal
 */
export declare function queryEnvelopeWithPromise<TQuery extends IDashboardQuery, TQueryResult>(query: TQuery, refresh?: boolean): {
    promise: Promise<TQueryResult>;
    envelope: QueryEnvelope<TQuery, TQueryResult>;
};
/**
 * Creates components that should be integrated into the dashboard store in order to facilitate query processing.
 *
 * @param queryServices - query services use to initialize the components
 */
export declare function createQueryProcessingModule(queryServices: IDashboardQueryService<any, any>[]): QueryProcessingModule;
export {};
