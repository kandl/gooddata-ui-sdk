import { IDashboardQuery } from "../../queries/index.js";
import { SagaIterator } from "redux-saga";
/**
 * Runs the provided query and returns its result.
 *
 * @param q - query to run
 * @param refresh - indicates whether the query should ignore cached results and re-load data from backend
 */
export declare function query<TQuery extends IDashboardQuery, TQueryResult>(q: TQuery, refresh?: boolean): SagaIterator<TQueryResult>;
/**
 * Runs the provided query, forcing refresh of any results that may be cached in the state, and returns its result.
 *
 * @param q - query to run
 */
export declare function queryFresh<TResult>(q: IDashboardQuery): SagaIterator<TResult>;
