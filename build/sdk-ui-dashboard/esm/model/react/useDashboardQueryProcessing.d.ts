import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { DashboardQueries } from "../queries/index.js";
import { DashboardQueryFailed, DashboardQueryRejected } from "../events/index.js";
/**
 * @public
 */
export interface QueryProcessingPendingState {
    status: "pending";
    error: undefined;
    result: undefined;
}
/**
 * @public
 */
export interface QueryProcessingRunningState {
    status: "running";
    error: undefined;
    result: undefined;
}
/**
 * @public
 */
export interface QueryProcessingErrorState {
    status: "error";
    error: GoodDataSdkError;
    result: undefined;
}
/**
 * @public
 */
export interface QueryProcessingRejectedState {
    status: "rejected";
    error: undefined;
    result: undefined;
}
/**
 * @public
 */
export interface QueryProcessingSuccessState<TResult> {
    status: "success";
    error: undefined;
    result: TResult;
}
/**
 * @public
 */
export type QueryProcessingState<TResult> = QueryProcessingPendingState | QueryProcessingRunningState | QueryProcessingErrorState | QueryProcessingRejectedState | QueryProcessingSuccessState<TResult>;
/**
 * @internal
 */
export type UseDashboardQueryProcessingResult<TQueryCreatorArgs extends any[], TQueryResult> = QueryProcessingState<TQueryResult> & {
    run: (...args: TQueryCreatorArgs) => void;
};
/**
 * @internal
 */
export type QueryProcessingStatus = QueryProcessingState<any>["status"];
/**
 * @internal
 */
export declare const useDashboardQueryProcessing: <TQuery extends DashboardQueries, TQueryResult, TQueryCreatorArgs extends any[]>({ queryCreator, onSuccess, onError, onRejected, onBeforeRun, }: {
    queryCreator: (...args: TQueryCreatorArgs) => TQuery;
    onSuccess?: ((result: TQueryResult) => void) | undefined;
    onError?: ((event: DashboardQueryFailed) => void) | undefined;
    onRejected?: ((event: DashboardQueryRejected) => void) | undefined;
    onBeforeRun?: ((query: TQuery) => void) | undefined;
}) => UseDashboardQueryProcessingResult<TQueryCreatorArgs, TQueryResult>;
