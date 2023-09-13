import React from "react";
import HeaderCell, { ALIGN_LEFT, ALIGN_RIGHT } from "./HeaderCell.js";
import { isEmptyScopeCol, isSliceCol } from "../tableDescriptorTypes.js";
class ColumnTotalHeader extends React.Component {
    render() {
        const { displayName, column } = this.props;
        const col = this.getColDescriptor();
        const textAlign = isSliceCol(col) || isEmptyScopeCol(col) ? ALIGN_LEFT : ALIGN_RIGHT;
        return (React.createElement(HeaderCell, { className: "gd-pivot-table-column-total-header s-pivot-table-column-total-header", textAlign: textAlign, displayText: displayName, enableSorting: false, colId: column.getColDef().field, getTableDescriptor: this.props.getTableDescriptor, getExecutionDefinition: this.props.getExecutionDefinition, getColumnTotals: this.props.getColumnTotals, getRowTotals: this.props.getRowTotals, intl: this.props.intl }));
    }
    getColDescriptor() {
        return this.props.getTableDescriptor().getCol(this.props.column);
    }
}
export default ColumnTotalHeader;
//# sourceMappingURL=ColumnTotalHeader.js.map