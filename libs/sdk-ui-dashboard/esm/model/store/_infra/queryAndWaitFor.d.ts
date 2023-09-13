import { DashboardQueries } from "../../queries/index.js";
import { DashboardDispatch } from "../types.js";
/**
 * Dispatches a query and returns a promise to its result.
 *
 * @param dispatch - dashboard dispatch to use
 * @param query - query to trigger and wait for results of
 * @returns Promise of the query result
 * @alpha
 */
export declare function queryAndWaitFor<TQuery extends DashboardQueries, TQueryResult>(dispatch: DashboardDispatch, query: TQuery): Promise<TQueryResult>;
