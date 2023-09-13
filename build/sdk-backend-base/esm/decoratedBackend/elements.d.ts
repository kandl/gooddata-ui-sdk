import { IElementsQuery, IElementsQueryFactory, FilterWithResolvableElements, IFilterElementsQuery, IElementsQueryAttributeFilter, IElementsQueryOptions, IElementsQueryResult, IPagedResource } from "@gooddata/sdk-backend-spi";
import { IMeasure, IRelativeDateFilter, ObjRef, IAttributeElement } from "@gooddata/sdk-model";
/**
 * @alpha
 */
export declare abstract class DecoratedElementsQueryFactory implements IElementsQueryFactory {
    protected readonly decorated: IElementsQueryFactory;
    protected constructor(decorated: IElementsQueryFactory);
    forDisplayForm(ref: ObjRef): IElementsQuery;
    forFilter(filter: FilterWithResolvableElements, dateFilterDisplayForm?: ObjRef): IFilterElementsQuery;
}
/**
 * @alpha
 */
export declare abstract class DecoratedElementsQuery implements IElementsQuery {
    protected readonly decorated: IElementsQuery;
    protected readonly settings: {
        limit?: number;
        offset?: number;
        options?: IElementsQueryOptions;
        attributeFilters?: IElementsQueryAttributeFilter[];
        dateFilters?: IRelativeDateFilter[];
        measures?: IMeasure[];
    };
    protected constructor(decorated: IElementsQuery, settings?: {
        limit?: number;
        offset?: number;
        options?: IElementsQueryOptions;
        attributeFilters?: IElementsQueryAttributeFilter[];
        dateFilters?: IRelativeDateFilter[];
        measures?: IMeasure[];
    });
    withLimit(limit: number): IElementsQuery;
    withOffset(offset: number): IElementsQuery;
    withAttributeFilters(attributeFilters: IElementsQueryAttributeFilter[]): IElementsQuery;
    withMeasures(measures: IMeasure[]): IElementsQuery;
    withOptions(options: IElementsQueryOptions): IElementsQuery;
    query(): Promise<IElementsQueryResult>;
    withDateFilters(dateFilters: IRelativeDateFilter[]): IElementsQuery;
    withSignal(signal: AbortSignal): IElementsQuery;
    protected abstract createNew(decorated: IElementsQuery, settings: {
        limit?: number;
        offset?: number;
        options?: IElementsQueryOptions;
        attributeFilters?: IElementsQueryAttributeFilter[];
        dateFilters?: IRelativeDateFilter[];
        measures?: IMeasure[];
    }): IElementsQuery;
}
/**
 * @alpha
 */
export declare abstract class DecoratedElementsQueryResult implements IElementsQueryResult {
    protected readonly decorated: IElementsQueryResult;
    readonly items: IAttributeElement[];
    readonly limit: number;
    readonly offset: number;
    readonly totalCount: number;
    protected constructor(decorated: IElementsQueryResult, items: IAttributeElement[], limit: number, offset: number, totalCount: number);
    next(): Promise<IPagedResource<IAttributeElement>>;
    goTo(pageIndex: number): Promise<IPagedResource<IAttributeElement>>;
    all(): Promise<IAttributeElement[]>;
    allSorted(compareFn: (a: IAttributeElement, b: IAttributeElement) => number): Promise<IAttributeElement[]>;
    protected abstract createNew(decorated: IElementsQueryResult, items: IAttributeElement[], limit: number, offset: number, totalCount: number): IElementsQueryResult;
}
//# sourceMappingURL=elements.d.ts.map