/// <reference types="react" />
/**
 * Properties of List item component implementation
 *
 * @internal
 */
export interface IInvertableSelectRenderItemProps<T> {
    /**
     * Item of list
     */
    item: T;
    /**
     * Indicate that item is selected
     */
    isSelected: boolean;
    /**
     * Add item to selection callback
     */
    onSelect: () => void;
    /**
     * Remove item from selection
     */
    onDeselect: () => void;
    /**
     * Select item only
     */
    onSelectOnly: () => void;
}
/**
 * @internal
 */
export interface IInvertableSelectRenderLoadingProps {
    height?: number;
}
/**
 * @internal
 */
export interface IInvertableSelectRenderErrorProps {
    error?: any;
    height?: number;
}
/**
 * @internal
 */
export interface IInvertableSelectRenderNoDataProps {
    error?: any;
    height?: number;
}
/**
 * @internal
 */
export interface IInvertableSelectRenderSearchBarProps {
    searchString?: string;
    searchPlaceholder?: string;
    onSearch: (searchString: string) => void;
}
/**
 * @internal
 */
export interface IInvertableSelectRenderStatusBarProps<T> {
    isInverted: boolean;
    getItemTitle: (item: T) => string;
    selectedItems: T[];
    selectedItemsLimit?: number;
}
/**
 * @internal
 */
export interface IInvertableSelectRenderActionsProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    onToggle: () => void;
    totalItemsCount: number;
    isFiltered: boolean;
    isPartialSelection: boolean;
    isVisible: boolean;
}
/**
 * @internal
 */
export interface IInvertableSelectProps<T> {
    className?: string;
    width?: number;
    height?: number;
    adaptiveWidth?: boolean;
    adaptiveHeight?: boolean;
    isSingleSelect?: boolean;
    items: T[];
    totalItemsCount?: number;
    itemHeight?: number;
    getItemTitle: (item: T) => string;
    getItemKey: (item: T) => string;
    isInverted: boolean;
    selectedItems: T[];
    selectedItemsLimit?: number;
    onSelect?: (items: T[], isInverted: boolean) => void;
    searchString?: string;
    searchPlaceholder?: string;
    onSearch?: (search: string) => void;
    error?: any;
    isLoading?: boolean;
    nextPageItemPlaceholdersCount?: number;
    isLoadingNextPage?: boolean;
    onLoadNextPage?: () => void;
    renderError?: (props: IInvertableSelectRenderErrorProps) => JSX.Element;
    renderLoading?: (props: IInvertableSelectRenderLoadingProps) => JSX.Element;
    renderSearchBar?: (props: IInvertableSelectRenderSearchBarProps) => JSX.Element;
    renderNoData?: (props: IInvertableSelectRenderNoDataProps) => JSX.Element;
    renderItem?: (props: IInvertableSelectRenderItemProps<T>) => JSX.Element;
    renderStatusBar?: (props: IInvertableSelectRenderStatusBarProps<T>) => JSX.Element;
    renderActions?: (props: IInvertableSelectRenderActionsProps) => JSX.Element;
}
/**
 * @internal
 */
export declare function InvertableSelect<T>(props: IInvertableSelectProps<T>): JSX.Element;
//# sourceMappingURL=InvertableSelect.d.ts.map