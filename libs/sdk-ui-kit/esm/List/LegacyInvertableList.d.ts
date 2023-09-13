import React, { Component } from "react";
import { WrappedComponentProps } from "react-intl";
import { guidFor } from "./guid.js";
interface ILimitHitWarningProps {
    limit: number;
    bounce: boolean;
}
/**
 * @internal
 */
export interface ILegacyInvertableListProps<T> {
    className?: string;
    filteredItemsCount: number;
    getItemKey?: (item: T) => string;
    height: number;
    isInverted?: boolean;
    isLoading?: boolean;
    isLoadingClass?: React.ElementType;
    isMobile?: boolean;
    itemHeight: number;
    items: ReadonlyArray<T>;
    itemsCount: number;
    limitHitWarningClass?: React.ElementType;
    listItemClass?: React.ElementType;
    maxSelectionSize: number;
    noItemsFound?: boolean;
    noItemsFoundClass?: React.ElementType;
    onRangeChange?: (searchString: string, start: number, end: number) => void;
    onSearch: (searchString: string) => void;
    onSelect?: (selectedElements: Array<T>, isInverted: boolean) => void;
    searchPlaceholder?: string;
    searchString?: string;
    selection?: Array<T>;
    showSearchField?: boolean;
    smallSearch?: boolean;
    tagName?: string;
    width?: number;
    actionsAsCheckboxes?: boolean;
    selectAllCheckbox?: boolean;
    rowItem?: React.ReactElement;
}
/**
 * @internal
 */
export interface ILegacyInvertableListState {
    notifyLimitHit: boolean;
}
/**
 * @internal
 * @deprecated This component is deprecated use InvertableList instead
 */
export declare class LegacyInvertableList<T> extends Component<ILegacyInvertableListProps<T> & WrappedComponentProps, ILegacyInvertableListState> {
    static defaultProps: {
        actionsAsCheckboxes: boolean;
        className: string;
        getItemKey: typeof guidFor;
        isInverted: boolean;
        isLoading: boolean;
        isLoadingClass: React.FC<{}>;
        isMobile: boolean;
        limitHitWarningClass: React.FC<import("react-intl").WithIntlProps<ILimitHitWarningProps & WrappedComponentProps>> & {
            WrappedComponent: React.ComponentType<ILimitHitWarningProps & WrappedComponentProps>;
        };
        listItemClass: React.FC<import("react-intl").WithIntlProps<import("./LegacyMultiSelectListItem.js").ILegacyMultiSelectListItemProps>> & {
            WrappedComponent: React.ComponentType<import("./LegacyMultiSelectListItem.js").ILegacyMultiSelectListItemProps>;
        };
        noItemsFound: boolean;
        noItemsFoundClass: React.FC<import("react-intl").WithIntlProps<WrappedComponentProps<"intl">>> & {
            WrappedComponent: React.ComponentType<WrappedComponentProps<"intl">>;
        };
        onRangeChange: (...args: any[]) => void;
        onSelect: (...args: any[]) => void;
        searchPlaceholder: string;
        searchString: string;
        selection: any[];
        showSearchField: boolean;
        smallSearch: boolean;
        tagName: string;
        selectAllCheckbox: boolean;
    };
    constructor(props: ILegacyInvertableListProps<T> & WrappedComponentProps);
    private onSelect;
    private onSelectAll;
    private onSelectNone;
    private onSelectOnly;
    private onRangeChange;
    /**
     * Remove selected visible items from selection.
     */
    private shrinkSelection;
    private intersectItems;
    private subtractItems;
    private indexByKey;
    private toggleItemInSelection;
    /**
     * Add unselected visible items to the selection until selection size limit is reached.
     */
    private growSelection;
    /**
     * If change in selection happens to select all or unselect all items it is converted
     * to the respective empty selection.
     */
    private notifyUpstreamOfSelectionChange;
    private isItemChecked;
    private renderLimitHitWarning;
    private renderSearchField;
    private renderList;
    private renderListOrNoItems;
    private renderLoading;
    render(): JSX.Element;
}
/**
 * @internal
 * @deprecated This component is deprecated use InvertableList instead
 */
declare const LegacyInvertableListWithIntl: <T>(props: ILegacyInvertableListProps<T>) => any;
export default LegacyInvertableListWithIntl;
//# sourceMappingURL=LegacyInvertableList.d.ts.map