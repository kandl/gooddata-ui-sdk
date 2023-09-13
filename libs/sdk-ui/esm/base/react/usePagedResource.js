// (C) 2007-2021 GoodData Corporation
import { useState, useEffect } from "react";
import { usePromiseCache } from "./usePromiseCache.js";
/**
 * Hook for getting data from paged resource
 * @public
 */
export function usePagedResource(resourceFactory, fetchParams, fetchDeps, resetDeps, getCacheKey, initialState = {
    totalItemsCount: undefined,
    items: [],
}, preventResetPromises) {
    const [state, setState] = useState(initialState);
    const reset = () => setState(initialState);
    const mergeResult = (result) => setState((state) => {
        const isFirstResult = typeof state.totalItemsCount === "undefined";
        const items = isFirstResult ? new Array(result.totalCount) : [...state.items];
        items.splice(result.offset, result.limit, ...result.items);
        return {
            totalItemsCount: result.totalCount,
            items,
        };
    });
    const { isLoading, results } = usePromiseCache(resourceFactory, fetchParams, fetchDeps, resetDeps, getCacheKey, preventResetPromises);
    useEffect(() => {
        // We want to reset state only after resetDeps are changed, not on first run
        return () => {
            reset();
        };
    }, resetDeps);
    useEffect(() => {
        results.forEach(mergeResult);
    }, [results]);
    const { items, totalItemsCount } = state;
    return {
        isLoading,
        items,
        totalItemsCount,
    };
}
//# sourceMappingURL=usePagedResource.js.map