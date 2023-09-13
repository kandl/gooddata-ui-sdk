import React, { Component } from "react";
import { ScrollCallback } from "./List.js";
/**
 * @internal
 */
export interface ILegacyListProps {
    className?: string;
    compensateBorder?: boolean;
    dataSource: any;
    height?: number;
    itemHeight: number;
    itemHeightGetter?: () => number;
    onScroll?: ScrollCallback;
    onScrollStart?: ScrollCallback;
    onSelect?: (item: any) => void;
    scrollToSelected?: boolean;
    rowItem: React.ReactElement;
    width?: number;
}
/**
 * @internal
 */
export interface ILegacyListState {
    selected: number;
}
/**
 * @deprecated  This component is deprecated use List instead
 * @internal
 */
export declare class LegacyList extends Component<ILegacyListProps, ILegacyListState> {
    static defaultProps: Pick<ILegacyListProps, "className" | "onScroll" | "onScrollStart" | "onSelect" | "width" | "height" | "itemHeight" | "itemHeightGetter" | "compensateBorder" | "scrollToSelected">;
    constructor(props: ILegacyListProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onSelect;
    private onScroll;
    private onScrollStart;
    private onScrollEnd;
    private getClassNames;
    private disablePageScrolling;
    private enablePageScrolling;
    private renderCell;
    render(): JSX.Element;
}
//# sourceMappingURL=LegacyList.d.ts.map