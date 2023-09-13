// (C) 2007-2020 GoodData Corporation
import { useEffect, useState, useRef } from "react";
import { PromiseCache } from "./PromiseCache.js";
const initialState = {
    isLoading: false,
    results: [],
    errors: [],
};
/**
 * Hook for promise caching
 * It caches promises by params passed to provided factory function
 * It returns only new results
 * @internal
 */
export function usePromiseCache(promiseFactory, fetchParams, fetchDeps, resetDeps, getCacheKey, preventResetPromises) {
    const promiseCacheRef = useRef(new PromiseCache(promiseFactory, getCacheKey));
    const [state, setState] = useState(initialState);
    const setInitialState = () => setState(initialState);
    const setResults = (results) => setState((state) => (Object.assign(Object.assign({}, state), { results })));
    const setErrors = (errors) => setState((state) => (Object.assign(Object.assign({}, state), { errors })));
    const setLoading = (isLoading) => setState((state) => (Object.assign(Object.assign({}, state), { isLoading })));
    const preventResetPromisesRef = useRef(false);
    useEffect(() => {
        return () => {
            if (!preventResetPromisesRef.current) {
                promiseCacheRef.current.reset();
                setInitialState();
            }
            preventResetPromisesRef.current = false;
        };
    }, resetDeps);
    useEffect(() => {
        const newParams = fetchParams.filter((params) => !promiseCacheRef.current.getResult(params));
        const newPromises = newParams.map(promiseCacheRef.current.load);
        if (newPromises.length === 0) {
            return;
        }
        // Because promises have their own lifecycle independent on react lifecycle,
        // we need to check if promise cache was not reset before their resolution
        // and our results are still relevant.
        // We do this by storing current promise cache in effect closure
        // so when promises are resolved, we have still access to it
        const usedPromiseCache = promiseCacheRef.current;
        setLoading(true);
        Promise.all(newPromises)
            .then((results) => {
            setLoading(false);
            if (usedPromiseCache === promiseCacheRef.current) {
                setResults(results);
                preventResetPromisesRef.current = false;
            }
        })
            .catch((errors) => {
            if ((errors === null || errors === void 0 ? void 0 : errors.message) === "Canceled") {
                return;
            }
            setLoading(false);
            if (usedPromiseCache === promiseCacheRef.current) {
                setErrors(errors);
            }
        });
        return () => {
            preventResetPromisesRef.current = !!preventResetPromises;
            usedPromiseCache.cancel(newParams[0]);
        };
    }, fetchDeps);
    return state;
}
//# sourceMappingURL=usePromiseCache.js.map