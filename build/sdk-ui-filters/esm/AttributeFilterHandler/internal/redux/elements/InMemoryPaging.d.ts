import { IElementsQueryResult } from "@gooddata/sdk-backend-spi";
import { IAttributeElement } from "@gooddata/sdk-model";
export declare class InMemoryPaging implements IElementsQueryResult {
    protected readonly allItems: IAttributeElement[];
    readonly items: IAttributeElement[];
    readonly limit: number;
    readonly offset: number;
    readonly totalCount: number;
    constructor(allItems: IAttributeElement[], limit?: number, offset?: number);
    next(): Promise<IElementsQueryResult>;
    goTo(pageIndex: number): Promise<IElementsQueryResult>;
    all(): Promise<IAttributeElement[]>;
    allSorted(compareFn: (a: IAttributeElement, b: IAttributeElement) => number): Promise<IAttributeElement[]>;
}
