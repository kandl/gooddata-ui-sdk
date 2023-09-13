import { IHeaderParams } from "@ag-grid-community/all-modules";
import React from "react";
import { IMenu } from "../../../publicTypes.js";
import { ICommonHeaderParams } from "./HeaderCell.js";
import { SortDirection } from "@gooddata/sdk-model";
export interface IColumnHeaderProps extends ICommonHeaderParams, IHeaderParams {
    className?: string;
    menu?: () => IMenu;
}
export interface IColumnHeaderState {
    sorting?: SortDirection;
}
declare class ColumnHeader extends React.Component<IColumnHeaderProps, IColumnHeaderState> {
    state: IColumnHeaderState;
    UNSAFE_componentWillMount(): void;
    componentWillUnmount(): void;
    getCurrentSortDirection: () => void;
    getDefaultSortDirection(): SortDirection;
    onSortRequested: (sortDir: SortDirection) => void;
    render(): JSX.Element;
    private getColDescriptor;
}
export default ColumnHeader;
//# sourceMappingURL=ColumnHeader.d.ts.map