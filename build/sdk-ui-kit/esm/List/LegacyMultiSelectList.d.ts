import React, { Component } from "react";
import { WrappedComponentProps } from "react-intl";
import { ScrollCallback } from "./List.js";
import { guidFor } from "./guid.js";
/**
 * @internal
 */
export interface ILegacyMultiSelectListProps<T> {
    filtered?: boolean;
    getItemKey?: (item: T) => string;
    height: number;
    isMobile?: boolean;
    isSelected?: (item: T) => boolean;
    isFiltered?: boolean;
    itemHeight: number;
    items: ReadonlyArray<T>;
    itemsCount: number;
    filteredItemsCount?: number;
    listItemClass?: React.ElementType;
    maxSelectionSize?: number;
    onItemMouseOut?: () => void;
    onItemMouseOver?: () => void;
    onRangeChange?: ScrollCallback;
    onSelect?: (item: T) => void;
    onSelectAll?: () => void;
    onSelectNone?: () => void;
    onSelectOnly?: (item: T) => void;
    rowItem?: React.ReactElement;
    width?: number;
    selectAllCheckbox?: boolean;
    selection?: T[];
    isInverted?: boolean;
    isSearching?: boolean;
    tagName?: string;
}
/**
 * @deprecated  This component is deprecated use MultiSelectList
 * @internal
 */
export declare class LegacyMultiSelectList<T> extends Component<ILegacyMultiSelectListProps<T> & WrappedComponentProps> {
    static defaultProps: {
        isInverted: boolean;
        isSearching: boolean;
        selection: string[];
        filtered: boolean;
        getItemKey: typeof guidFor;
        isFiltered: boolean;
        isMobile: boolean;
        isSelected: () => boolean;
        listItemClass: React.FC<import("react-intl").WithIntlProps<import("./LegacyMultiSelectListItem.js").ILegacyMultiSelectListItemProps>> & {
            WrappedComponent: React.ComponentType<import("./LegacyMultiSelectListItem.js").ILegacyMultiSelectListItemProps>;
        };
        maxSelectionSize: number;
        filteredItemsCount: number;
        onItemMouseOut: (...args: any[]) => void;
        onItemMouseOver: (...args: any[]) => void;
        onRangeChange: (...args: any[]) => void;
        onSelect: (...args: any[]) => void;
        onSelectAll: (...args: any[]) => void;
        onSelectNone: (...args: any[]) => void;
        onSelectOnly: (...args: any[]) => void;
        rowItem: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
        selectAllCheckbox: boolean;
        tagName: string;
    };
    private onActionCheckboxChange;
    private getSelectableItems;
    private getRowItem;
    private getSelectionString;
    private getDataSource;
    private isEmpty;
    isPositiveSelection(): boolean;
    private isIndefiniteSelection;
    private isAllSelected;
    private renderSearchResultsLength;
    private renderActions;
    private renderStatusBar;
    render(): JSX.Element;
}
/**
 * @internal
 * @deprecated This component is deprecated use MultiSelectList instead
 */
declare const LegacyMultiSelectListWithIntl: <T>(props: ILegacyMultiSelectListProps<T>) => any;
export default LegacyMultiSelectListWithIntl;
//# sourceMappingURL=LegacyMultiSelectList.d.ts.map