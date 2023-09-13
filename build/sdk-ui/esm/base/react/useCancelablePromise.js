// (C) 2019-2022 GoodData Corporation
import { useEffect, useState } from "react";
import { makeCancelable } from "./CancelablePromise.js";
import noop from "lodash/noop.js";
import { UnexpectedSdkError } from "../errors/GoodDataSdkError.js";
import { safeSerialize } from "./safeSerialize.js";
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
export function useCancelablePromise(options, deps) {
    const { promise, onLoading = noop, onPending = noop, onCancel = noop, onSuccess = noop, onError = noop, } = options;
    const getInitialState = () => ({
        result: undefined,
        error: undefined,
        status: promise ? "loading" : "pending",
    });
    const [state, setState] = useState(getInitialState());
    useEffect(() => {
        if (!promise) {
            if (state.status !== "pending") {
                setState({
                    status: "pending",
                    result: undefined,
                    error: undefined,
                });
            }
            onPending();
            return;
        }
        else {
            if (state.status !== "loading") {
                setState({
                    result: undefined,
                    error: undefined,
                    status: "loading",
                });
            }
            onLoading();
        }
        const cancelablePromise = makeCancelable(promise());
        cancelablePromise.promise
            .then((result) => {
            // Because promises have their own lifecycle independent on react lifecycle,
            // we need to check if cancelable promise was not canceled before it's resolution
            // and our results are still relevant.
            if (!cancelablePromise.getHasCanceled()) {
                setState({
                    status: "success",
                    result,
                    error: undefined,
                });
                onSuccess(result);
            }
        })
            .catch((error) => {
            // Because promises have their own lifecycle independent on react lifecycle,
            // we need to check if cancelable promise was not canceled before it's resolution
            // and our results are still relevant.
            if (!cancelablePromise.getHasCanceled()) {
                setState({
                    status: "error",
                    result: undefined,
                    error,
                });
                onError(error);
            }
        });
        return () => {
            // If promise was not fulfilled before dependencies change, cancel it.
            // Important notice - request itself is not canceled - we just don't care about unrelevant results anymore.
            if (!cancelablePromise.getHasFulfilled()) {
                cancelablePromise.cancel();
                onCancel();
            }
        };
    }, deps);
    // We want to avoid the return of the old state when some dependency has changed,
    // before another useEffect hook round starts.
    const [prevDeps, setDeps] = useState(deps);
    if ((prevDeps === null || prevDeps === void 0 ? void 0 : prevDeps.length) !== (deps === null || deps === void 0 ? void 0 : deps.length)) {
        throw new UnexpectedSdkError(`The final argument passed to useCancelablePromise changed size between renders. The order and size of this array must remain constant.

Previous: ${safeSerialize(prevDeps)}
Incoming: ${safeSerialize(deps)}`);
    }
    if (deps === null || deps === void 0 ? void 0 : deps.some((dep, i) => dep !== (prevDeps === null || prevDeps === void 0 ? void 0 : prevDeps[i]))) {
        setDeps(deps);
        const currentState = getInitialState();
        setState(currentState);
        return currentState;
    }
    return state;
}
//# sourceMappingURL=useCancelablePromise.js.map