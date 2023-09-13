/// <reference types="react" />
export declare const MAX_VISIBLE_ITEMS_COUNT = 10;
export declare const DEFAULT_ITEM_HEIGHT = 28;
/**
 * @internal
 */
export interface IListProps<T> {
    className?: string;
    compensateBorder?: boolean;
    height?: number;
    width?: number;
    items?: T[];
    itemsCount?: number;
    itemHeight?: number;
    maxVisibleItemsCount?: number;
    itemHeightGetter?: (index: number) => number;
    renderItem: (props: IRenderListItemProps<T>) => JSX.Element;
    scrollToItem?: T;
    onScrollStart?: ScrollCallback;
    onScrollEnd?: ScrollCallback;
}
/**
 * @internal
 */
export interface IRenderListItemProps<T> {
    rowIndex: number;
    item: T;
    width: number;
    height: number;
    isFirst: boolean;
    isLast: boolean;
}
/**
 * @internal
 */
export type ScrollCallback = (visibleRowsStartIndex: number, visibleRowsEndIndex: number) => void;
/**
 * @internal
 */
export declare function List<T>(props: IListProps<T>): JSX.Element;
//# sourceMappingURL=List.d.ts.map