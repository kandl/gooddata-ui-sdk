import React from "react";
import { IListProps } from "../List/index.js";
import { ITab } from "../Tabs/index.js";
/**
 * @internal
 */
export interface IDropdownListNoDataRenderProps {
    hasNoMatchingData: boolean;
}
/**
 * @internal
 */
export interface IDropdownListProps<T> extends IListProps<T> {
    className?: string;
    height?: number;
    width?: number;
    isLoading?: boolean;
    showSearch?: boolean;
    disableAutofocus?: boolean;
    searchFieldSize?: "small" | "normal";
    searchPlaceholder?: string;
    searchString?: string;
    onSearch?: (searchString: string) => void;
    showTabs?: boolean;
    tabs?: ITab[];
    selectedTabId?: string;
    onTabSelect?: (tab: ITab) => void;
    mobileItemHeight?: number;
    isMobile?: boolean;
    renderNoData?: (props: IDropdownListNoDataRenderProps) => React.ReactNode;
    footer?: React.ReactNode | ((closeDropdown: () => void) => React.ReactNode);
    closeDropdown?: () => void;
    scrollToItem?: T;
}
/**
 * @internal
 */
export declare const LOADING_HEIGHT = 100;
/**
 * @internal
 */
export declare const DEFAULT_ITEM_HEIGHT = 28;
/**
 * @internal
 */
export declare const DEFAULT_MOBILE_ITEM_HEIGHT = 40;
/**
 * @internal
 */
export declare function DropdownList<T>(props: IDropdownListProps<T>): JSX.Element;
//# sourceMappingURL=DropdownList.d.ts.map