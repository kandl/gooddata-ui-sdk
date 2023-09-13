/// <reference types="react" />
import { IRenderListItemProps } from "./List.js";
/**
 * @internal
 */
export interface IAsyncListProps<T> {
    className?: string;
    width?: number;
    height?: number;
    items: T[];
    itemHeight?: number;
    renderItem: (props: IRenderListItemProps<T>) => JSX.Element;
    /**
     * Set to true to render the loading indicator instead of the list.
     * Usually, you want to use this property during initialization / loading first page of the items.
     */
    isLoading?: boolean;
    /**
     * Number of loading item placeholders to render at the end of the list.
     * When the user scrolls to the placeholders, the onLoadNextPage() callback will be called.
     * You should set this value to 0 when all items are loaded and there is no other page to load.
     */
    nextPageItemPlaceholdersCount?: number;
    /**
     * When true, onLoadNextPage callback will be disabled.
     */
    isLoadingNextPage?: boolean;
    /**
     * Callback that is called when the user scrolls to the loading item placeholders.
     * It won't be called, if isLoadingNextPage is set to true.
     */
    onLoadNextPage?: () => void;
}
/**
 * @internal
 */
export declare function AsyncList<T>(props: IAsyncListProps<T>): JSX.Element;
//# sourceMappingURL=AsyncList.d.ts.map