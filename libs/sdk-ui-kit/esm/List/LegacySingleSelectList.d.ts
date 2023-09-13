import React, { Component } from "react";
import { LegacySingleSelectListItem } from "./LegacySingleSelectListItem.js";
import { guidFor } from "./guid.js";
/**
 * @internal
 */
export interface ILegacySingleSelectListProps<T> {
    className?: string;
    getItemKey?: (item: T) => string;
    height: number;
    itemHeight: number;
    items?: T[];
    itemsCount?: number;
    listItemClass?: React.ElementType;
    onItemMouseOut?: () => void;
    onItemMouseOver?: () => void;
    onItemMouseEnter?: (id: string) => void;
    onItemMouseLeave?: () => void;
    onRangeChange?: () => void;
    onScrollStart?: () => void;
    onSelect?: (item: T) => void;
    scrollToSelected?: boolean;
    rowItem?: React.ReactElement;
    selection?: T;
    width: number;
}
/**
 * @internal
 * @deprecated This component is deprecated use SingleSelectList instead
 */
export declare class LegacySingleSelectList<T> extends Component<ILegacySingleSelectListProps<T>> {
    static defaultProps: {
        className: string;
        getItemKey: typeof guidFor;
        items: any[];
        itemsCount: number;
        listItemClass: typeof LegacySingleSelectListItem;
        onItemMouseOut: (...args: any[]) => void;
        onItemMouseOver: (...args: any[]) => void;
        onItemMouseEnter: (...args: any[]) => void;
        onItemMouseLeave: (...args: any[]) => void;
        onRangeChange: (...args: any[]) => void;
        onScrollStart: (...args: any[]) => void;
        onSelect: (...args: any[]) => void;
        rowItem: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
        scrollToSelected: boolean;
        selection: {};
    };
    private getSelectableItems;
    private getClassNames;
    private getRowItem;
    private getDataSource;
    render(): JSX.Element;
}
//# sourceMappingURL=LegacySingleSelectList.d.ts.map