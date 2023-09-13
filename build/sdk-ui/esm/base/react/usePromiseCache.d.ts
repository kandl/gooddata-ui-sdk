/// <reference types="react" />
/**
 * @internal
 */
interface IUsePromiseCacheState<TResult, TError> {
    isLoading: boolean;
    results: TResult[];
    errors: TError[];
}
/**
 * Hook for promise caching
 * It caches promises by params passed to provided factory function
 * It returns only new results
 * @internal
 */
export declare function usePromiseCache<TParams, TResult, TError>(promiseFactory: (params: TParams) => Promise<TResult>, fetchParams: TParams[], fetchDeps: React.DependencyList, resetDeps: React.DependencyList, getCacheKey?: (params: TParams) => string, preventResetPromises?: boolean): IUsePromiseCacheState<TResult, TError>;
export {};
//# sourceMappingURL=usePromiseCache.d.ts.map