import React from "react";
import cx from "classnames";
import HeaderCell, { ALIGN_LEFT, ALIGN_RIGHT } from "./HeaderCell.js";
import { isEmptyScopeCol, isSliceCol, isSliceMeasureCol, isMixedHeadersCol, isMixedValuesCol, } from "../tableDescriptorTypes.js";
class ColumnHeader extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            sorting: undefined,
        };
        this.getCurrentSortDirection = () => {
            const currentSort = this.props.column.getSort();
            this.setState({
                sorting: currentSort,
            });
        };
        this.onSortRequested = (sortDir) => {
            const multiSort = false; // Enable support for multisort with CMD key with 'event.shiftKey';
            /**
             * Header needs to be refreshed otherwise the grid will throw error.
             *
             * The whole grid is reinitialized during sorting and ag-grid expects
             * that the grid dom is there.
             */
            this.props.api.refreshHeader();
            this.props.setSort(sortDir, multiSort);
        };
    }
    UNSAFE_componentWillMount() {
        this.props.column.addEventListener("sortChanged", this.getCurrentSortDirection);
        this.setState({
            sorting: this.props.column.getSort(),
        });
    }
    componentWillUnmount() {
        this.props.column.removeEventListener("sortChanged", this.getCurrentSortDirection);
    }
    getDefaultSortDirection() {
        return isSliceCol(this.getColDescriptor()) ? "asc" : "desc";
    }
    render() {
        const { className, getTableDescriptor, displayName, enableSorting, menu, column } = this.props;
        const col = this.getColDescriptor();
        const textAlign = isSliceCol(col) ||
            isEmptyScopeCol(col) ||
            isSliceMeasureCol(col) ||
            isMixedValuesCol(col) ||
            isMixedHeadersCol(col)
            ? ALIGN_LEFT
            : ALIGN_RIGHT;
        const isColumnAttribute = isEmptyScopeCol(col);
        const isSortingEnabled = !isColumnAttribute &&
            !isSliceMeasureCol(col) &&
            !isMixedValuesCol(col) &&
            !isMixedHeadersCol(col) &&
            enableSorting;
        const tableDescriptor = getTableDescriptor();
        const showMenu = tableDescriptor.isTransposed()
            ? (isSliceMeasureCol(col) && displayName) || isMixedHeadersCol(col)
            : true;
        return (React.createElement(HeaderCell, { className: cx("s-pivot-table-column-header", className), textAlign: textAlign, displayText: displayName, enableSorting: isSortingEnabled, sortDirection: this.state.sorting, defaultSortDirection: this.getDefaultSortDirection(), onSortClick: this.onSortRequested, onMenuAggregationClick: this.props.onMenuAggregationClick, menu: showMenu ? menu === null || menu === void 0 ? void 0 : menu() : undefined, colId: column.getColDef().field, getTableDescriptor: getTableDescriptor, getExecutionDefinition: this.props.getExecutionDefinition, getColumnTotals: this.props.getColumnTotals, getRowTotals: this.props.getRowTotals, intl: this.props.intl }));
    }
    getColDescriptor() {
        return this.props.getTableDescriptor().getCol(this.props.column);
    }
}
export default ColumnHeader;
//# sourceMappingURL=ColumnHeader.js.map