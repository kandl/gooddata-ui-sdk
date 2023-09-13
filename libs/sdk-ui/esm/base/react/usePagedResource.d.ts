/// <reference types="react" />
import { IPagedResource } from "@gooddata/sdk-backend-spi";
/**
 * @public
 */
export interface IUsePagedResourceState<TItem> {
    totalItemsCount: number | undefined;
    items: Array<TItem | undefined>;
}
/**
 * @public
 */
export interface IUsePagedResourceResult<TItem> extends IUsePagedResourceState<TItem> {
    isLoading: boolean;
}
/**
 * Hook for getting data from paged resource
 * @public
 */
export declare function usePagedResource<TParams, TItem>(resourceFactory: (params: TParams) => Promise<IPagedResource<TItem>>, fetchParams: TParams[], fetchDeps: React.DependencyList, resetDeps: React.DependencyList, getCacheKey?: (params: TParams) => string, initialState?: IUsePagedResourceState<TItem>, preventResetPromises?: boolean): IUsePagedResourceResult<TItem>;
//# sourceMappingURL=usePagedResource.d.ts.map