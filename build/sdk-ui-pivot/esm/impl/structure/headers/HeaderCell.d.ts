import React from "react";
import { IntlShape } from "react-intl";
import { IExecutionDefinition, ITotal, SortDirection } from "@gooddata/sdk-model";
import { IMenu } from "../../../publicTypes.js";
import { TableDescriptor } from "../tableDescriptor.js";
import { IMenuAggregationClickConfig } from "../../privateTypes.js";
export type AlignPositions = "left" | "right" | "center";
export declare const ALIGN_LEFT = "left";
export declare const ALIGN_RIGHT = "right";
export interface ICommonHeaderParams {
    getTableDescriptor: () => TableDescriptor;
    onMenuAggregationClick?: (config: IMenuAggregationClickConfig) => void;
    getExecutionDefinition?: () => IExecutionDefinition;
    getColumnTotals?: () => ITotal[];
    getRowTotals?: () => ITotal[];
    intl?: IntlShape;
}
export interface IHeaderCellProps extends ICommonHeaderParams {
    displayText: string;
    className?: string;
    enableSorting?: boolean;
    defaultSortDirection?: SortDirection;
    menuPosition?: AlignPositions;
    textAlign?: AlignPositions;
    sortDirection?: SortDirection | null;
    onSortClick?: (direction: SortDirection) => void;
    menu?: IMenu | null;
    colId?: string;
}
export interface IHeaderCellState {
    isMenuOpen: boolean;
    isMenuButtonVisible: boolean;
    currentSortDirection: SortDirection | null;
}
export default class HeaderCell extends React.Component<IHeaderCellProps, IHeaderCellState> {
    static defaultProps: Pick<IHeaderCellProps, "sortDirection" | "textAlign" | "menuPosition" | "defaultSortDirection" | "menu" | "enableSorting" | "onMenuAggregationClick" | "onSortClick">;
    private resetSortDirection;
    state: IHeaderCellState;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IHeaderCellProps): void;
    render(): JSX.Element;
    private renderMenu;
    private renderText;
    private renderSorting;
    private onMouseEnterHeaderCell;
    private onMouseLeaveHeaderCell;
    private onMouseEnterHeaderCellText;
    private onMouseLeaveHeaderCellText;
    private onTextClick;
    private showMenuButton;
    private hideMenuButton;
    private hideAndCloseMenu;
    private menuItemClick;
    private handleMenuOpenedChange;
}
//# sourceMappingURL=HeaderCell.d.ts.map