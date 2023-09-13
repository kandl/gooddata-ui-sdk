import { UseCancelablePromiseState, UseCancelablePromiseStatus } from "./useCancelablePromise.js";
/**
 * Resolve status of multiple {@link useCancelablePromise} hooks.
 *
 * @remarks
 * This is useful for useCancelablePromise composition - when you want to wrap multiple useCancelablePromise hooks in another hook,
 * and keep the return value shape of the hook same as for useCancelablePromise.
 *
 * You can choose between 2 strategies to resolve the status (default strategy is "serial"):
 * - serial: Short-circuits to the first pending/loading/error status, and returns the last status
 *   only when all previous statuses are "success".
 * - parallel: Is resolved to the status which has the highest priority.
 *   Priority of the statuses has the following order (from highest to lowest): pending, loading, error, success.
 *   Examples:
 *     - ["pending", "loading"] will be resolved to "pending"
 *     - ["loading", "error"] will be resolved to "loading"
 *     - ["error", "success"] will be resolved to "error"
 *     - ["success", "success"] will be resolved to "success"
 *
 * @param states - cancelable promise states (useCancelablePromise return values)
 * @param options - specify options for resolving the status
 * @returns resolved status
 * @public
 */
export declare function resolveUseCancelablePromisesStatus(cancelablePromisesStates: UseCancelablePromiseState<unknown, unknown>[], options?: {
    strategy?: "serial" | "parallel";
}): UseCancelablePromiseStatus;
/**
 * Resolve error of multiple {@link useCancelablePromise} hooks - gets first error in the sequence of cancelable promise states.
 *
 * @remarks
 * This is useful for useCancelablePromise composition - when you want to wrap multiple useCancelablePromise hooks in another hook,
 * and keep the return value shape of the hook same as for useCancelablePromise.
 *
 * @param states - cancelable promise states (useCancelablePromise return values)
 * @returns first error
 * @public
 */
export declare function resolveUseCancelablePromisesError<TError>(states: UseCancelablePromiseState<unknown, TError>[]): TError | undefined;
/**
 * @internal
 */
export declare function resolveUseCancelablePromisesStatusSerial(statuses: UseCancelablePromiseStatus[]): UseCancelablePromiseStatus;
/**
 * @internal
 */
export declare function resolveUseCancelablePromisesStatusParallel(statuses: UseCancelablePromiseStatus[]): UseCancelablePromiseStatus;
//# sourceMappingURL=useCancelablePromiseUtils.d.ts.map