import { IPagedResource } from "@gooddata/sdk-backend-spi";
/**
 * This implementation of {@link @gooddata/sdk-backend-spi#IPagedResource} pages over a list of items
 * provided at construction time. The paging is done using pre-configured page limit and starts at particular offset.
 *
 * @internal
 */
export declare class InMemoryPaging<T> implements IPagedResource<T> {
    protected readonly allItems: T[];
    readonly items: T[];
    readonly limit: number;
    readonly offset: number;
    readonly totalCount: number;
    constructor(allItems: T[], limit?: number, offset?: number);
    next(): Promise<IPagedResource<T>>;
    goTo(pageIndex: number): Promise<IPagedResource<T>>;
    all(): Promise<T[]>;
    allSorted(compareFn: (a: T, b: T) => number): Promise<T[]>;
}
/**
 * @internal
 */
export interface IServerPagingResult<T> {
    items: T[];
    totalCount: number;
}
/**
 * @internal
 */
export type IServerPagingParams = {
    offset: number;
    limit: number;
};
/**
 * Common implementation of the {@link @gooddata/sdk-backend-spi#IPagedResource} for the server-side paging.
 *
 * @internal
 */
export declare class ServerPaging<T> implements IPagedResource<T> {
    protected readonly getData: (pagingParams: IServerPagingParams) => Promise<IServerPagingResult<T>>;
    readonly limit: number;
    readonly offset: number;
    readonly totalCount: number;
    readonly items: T[];
    static for<TItem>(getData: (pagingParams: IServerPagingParams) => Promise<IServerPagingResult<TItem>>, limit?: number, offset?: number): Promise<IPagedResource<TItem>>;
    constructor(getData: (pagingParams: IServerPagingParams) => Promise<IServerPagingResult<T>>, limit: number, offset: number, totalCount: number, items: T[]);
    next: () => Promise<IPagedResource<T>>;
    goTo: (pageIndex: number) => Promise<IPagedResource<T>>;
    all: () => Promise<T[]>;
    allSorted: (compareFn: (a: T, b: T) => number) => Promise<T[]>;
}
//# sourceMappingURL=paging.d.ts.map