import { IHeaderGroupParams } from "@ag-grid-community/all-modules";
import React from "react";
import { IMenu } from "../../../publicTypes.js";
import { ICommonHeaderParams } from "./HeaderCell.js";
export interface IProps extends ICommonHeaderParams, IHeaderGroupParams {
    menu?: () => IMenu;
}
export default class ColumnGroupHeader extends React.Component<IProps> {
    render(): JSX.Element;
}
//# sourceMappingURL=ColumnGroupHeader.d.ts.map