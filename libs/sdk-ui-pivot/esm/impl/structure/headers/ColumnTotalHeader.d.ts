import { IHeaderParams } from "@ag-grid-community/all-modules";
import React from "react";
import { IMenu } from "../../../publicTypes.js";
import { ICommonHeaderParams } from "./HeaderCell.js";
export interface IColumnHeaderProps extends ICommonHeaderParams, IHeaderParams {
    menu?: () => IMenu;
}
declare class ColumnTotalHeader extends React.Component<IColumnHeaderProps> {
    render(): JSX.Element;
    private getColDescriptor;
}
export default ColumnTotalHeader;
//# sourceMappingURL=ColumnTotalHeader.d.ts.map