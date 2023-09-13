import React from "react";
import { ControllerStateAndHelpers } from "downshift";
import { ISelectItem, ISelectItemOption } from "./types.js";
export interface IOptionGetterProps<V> {
    items: Array<ISelectItem<V>>;
    selectedItem: ISelectItemOption<V>;
    highlightedIndex?: number;
    getItemProps: ControllerStateAndHelpers<ISelectItem<V>>["getItemProps"];
    optionClassName?: string;
    visibleItemsRange?: number;
}
export interface ISelectMenuProps<V> extends IOptionGetterProps<V> {
    getMenuProps: ControllerStateAndHelpers<ISelectItem<V>>["getMenuProps"];
    className?: string;
    inputValue: string;
    setHighlightedIndex: (index: number) => void;
}
export declare const defaultVisibleItemsRange = 3;
export declare const getMedianIndex: (array: any[]) => number;
export declare class VirtualizedSelectMenu<V> extends React.Component<ISelectMenuProps<V>> {
    static defaultProps: Partial<ISelectMenuProps<any>>;
    private listRef;
    render(): JSX.Element;
    scrollToIndex: (index?: number) => void;
    scrollToTop: () => void;
    componentDidUpdate: (lastProps: ISelectMenuProps<V>) => void;
    componentDidMount(): void;
}
