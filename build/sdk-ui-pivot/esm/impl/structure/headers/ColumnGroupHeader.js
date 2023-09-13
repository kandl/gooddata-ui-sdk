import React from "react";
import HeaderCell, { ALIGN_LEFT } from "./HeaderCell.js";
import { agColId } from "../tableDescriptorTypes.js";
export default class ColumnGroupHeader extends React.Component {
    render() {
        const { menu, intl, getTableDescriptor } = this.props;
        const colGroupDef = this.props.columnGroup.getColGroupDef();
        const colId = agColId(colGroupDef);
        const parent = this.props.columnGroup.getParent();
        // do not show menu for the first group header and empty headers above row attribute column headers
        // and also do not show when table is transposed => handled in rows
        const isTransposed = getTableDescriptor().isTransposed();
        const showMenu = !!parent && !!colGroupDef.headerName && !isTransposed;
        return (React.createElement(HeaderCell, { className: "s-pivot-table-column-group-header", displayText: this.props.displayName, enableSorting: false, menuPosition: ALIGN_LEFT, textAlign: ALIGN_LEFT, menu: showMenu ? menu === null || menu === void 0 ? void 0 : menu() : undefined, onMenuAggregationClick: this.props.onMenuAggregationClick, colId: colId, getTableDescriptor: getTableDescriptor, getExecutionDefinition: this.props.getExecutionDefinition, getColumnTotals: this.props.getColumnTotals, getRowTotals: this.props.getRowTotals, intl: intl }));
    }
}
//# sourceMappingURL=ColumnGroupHeader.js.map