import { DependencyList } from "react";
/**
 * Indicates the current state of the promise inside {@link useCancelablePromise} hook
 * @public
 */
export type UseCancelablePromiseStatus = "success" | "error" | "loading" | "pending";
/**
 * Indicates pending state for {@link useCancelablePromise} hook
 * @public
 */
export type UseCancelablePromisePendingState = {
    result: undefined;
    error: undefined;
    status: "pending";
};
/**
 * Indicates loading state for {@link useCancelablePromise} hook
 * @public
 */
export type UseCancelablePromiseLoadingState = {
    result: undefined;
    error: undefined;
    status: "loading";
};
/**
 * Indicates error state for {@link useCancelablePromise} hook
 * @public
 */
export type UseCancelablePromiseErrorState<TError> = {
    result: undefined;
    error: TError;
    status: "error";
};
/**
 * Indicates success state for {@link useCancelablePromise} hook
 * @public
 */
export type UseCancelablePromiseSuccessState<TResult> = {
    result: TResult;
    error: undefined;
    status: "success";
};
/**
 * Indicates the current state of {@link useCancelablePromise} hook
 * @public
 */
export type UseCancelablePromiseState<TResult, TError> = UseCancelablePromisePendingState | UseCancelablePromiseLoadingState | UseCancelablePromiseErrorState<TError> | UseCancelablePromiseSuccessState<TResult>;
/**
 * Callbacks for {@link useCancelablePromise} hook
 * @public
 */
export type UseCancelablePromiseCallbacks<TResult, TError> = {
    /**
     * onLoading is fired whenever the promise loading starts
     */
    onLoading?: () => void;
    /**
     * onPending is fired whenever the promise is not provided
     */
    onPending?: () => void;
    /**
     * onCancel is fired whenever the dependency list changes before the promise resolution
     */
    onCancel?: () => void;
    /**
     * onSuccess is fired whenever the promise is fulfilled
     */
    onSuccess?: (result: TResult) => void;
    /**
     * onError is fired whenever the promise is rejected
     */
    onError?: (err: TError) => void;
};
/**
 * Options for the {@link useCancelablePromise} hook.
 *
 * @public
 */
export type UseCancelablePromiseOptions<TResult, TError> = UseCancelablePromiseCallbacks<TResult, TError> & {
    promise: (() => Promise<TResult>) | undefined | null;
};
/**
 * This hook provides easy way to work with Promises in React components.
 *
 * @remarks
 * You can:
 * - watch it's status (pending/loading/success/error)
 * - get it's result/error when the Promise is resolved/rejected,
 * - attach convenient callbacks to it
 * - be sure, that when the dependency list changes, result will be still relevant (if previous Promise is still running, it's "canceled").
 *
 * Note that it's not recommended to use this hook for storing data on the backend
 * as it does not cancel requests wrapped in these promises
 * and you have no guarantee about the resolution order of the fired requests.
 *
 * @public
 */
export declare function useCancelablePromise<TResult, TError = any>(options: UseCancelablePromiseOptions<TResult, TError>, deps?: DependencyList): UseCancelablePromiseState<TResult, TError>;
//# sourceMappingURL=useCancelablePromise.d.ts.map