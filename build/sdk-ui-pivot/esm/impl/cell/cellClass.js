import isEmpty from "lodash/isEmpty.js";
import cx from "classnames";
import { invariant } from "ts-invariant";
import { isSeriesCol, isRootCol, isScopeCol, isMixedValuesCol, } from "../structure/tableDescriptorTypes.js";
import { convertDrillableItemsToPredicates } from "@gooddata/sdk-ui";
import { isResultTotalHeader } from "@gooddata/sdk-model";
import { ROW_SUBTOTAL, ROW_TOTAL, MEASURE_COLUMN, ROW_MEASURE_COLUMN, COLUMN_TOTAL, COLUMN_SUBTOTAL, } from "../base/constants.js";
import { isCellDrillable } from "../drilling/cellDrillabilityPredicate.js";
import last from "lodash/last.js";
import { getCellClassNames } from "./cellUtils.js";
export function cellClassFactory(table, props, classList) {
    return (cellClassParams) => {
        var _a, _b;
        const { rowIndex, data } = cellClassParams;
        const row = data;
        const isEmptyCell = !cellClassParams.value;
        // hide empty sticky cells
        const isTopPinned = cellClassParams.node.rowPinned === "top";
        if (isEmpty(row)) {
            // ag-grid calls getCellClass before the data is available & rows are created - there will be no
            // data in the cellClassParams. not sure what is the purpose or whether that is a bug. anyway it
            // does not make sense to proceed further.
            //
            // ag-grid may call this with either data undefined or data being empty object
            // empty row data are also possible for pinned row, when no cell should be visible
            return cx(classList, isTopPinned && isEmptyCell ? "gd-hidden-sticky-column" : null);
        }
        const dv = table.getDrillDataContext();
        const colDef = cellClassParams.colDef;
        const col = table.tableDescriptor.getCol(colDef);
        invariant(!isRootCol(col));
        const columnHeadersPosition = (_b = (_a = props.config) === null || _a === void 0 ? void 0 : _a.columnHeadersPosition) !== null && _b !== void 0 ? _b : "top";
        const isTransposed = table.tableDescriptor.isTransposed();
        const drillablePredicates = convertDrillableItemsToPredicates(props.drillableItems);
        const isRowTotal = row.type === ROW_TOTAL;
        const isRowSubtotal = row.type === ROW_SUBTOTAL;
        const { isColumnTotal, isColumnSubtotal } = getColumnTotalOrSubTotalInfo(colDef, col, row, isTransposed, columnHeadersPosition);
        const isRowMetric = colDef.type === ROW_MEASURE_COLUMN;
        let hasDrillableHeader = false;
        const cellAllowsDrill = !isEmptyCell || colDef.type === MEASURE_COLUMN;
        const cellIsNotTotalSubtotal = !isRowTotal && !isRowSubtotal && !isColumnTotal && !isColumnSubtotal;
        if (cellIsNotTotalSubtotal && !isRowMetric && cellAllowsDrill) {
            hasDrillableHeader = isCellDrillable(col, row, dv, drillablePredicates, columnHeadersPosition, isTransposed);
        }
        const colIndex = table.tableDescriptor.getAbsoluteLeafColIndex(col);
        const measureIndex = isSeriesCol(col) ? last(col.fullIndexPathToHere) : undefined;
        const isPinnedRow = cellClassParams.node.isRowPinned();
        const hiddenCell = !isPinnedRow && table.getGroupingProvider().isRepeatedValue(col.id, rowIndex);
        const rowSeparator = !hiddenCell && table.getGroupingProvider().isGroupBoundary(rowIndex);
        const subtotalStyle = row === null || row === void 0 ? void 0 : row.subtotalStyle;
        const belongsToRowMetric = !!(row === null || row === void 0 ? void 0 : row.measureDescriptor);
        // All new totals combinations
        const isColAndRowSubtotal = subtotalStyle && isColumnSubtotal;
        const isRowTotalAndColSubtotal = isRowTotal && isColumnSubtotal;
        const isRowAndColumnTotal = isRowTotal && isColumnTotal;
        const isRowSubtotalColumnTotal = isRowSubtotal && isColumnTotal;
        return cx(classList, measureIndex !== undefined ? `gd-column-measure-${measureIndex}` : null, getCellClassNames(rowIndex, colIndex, hasDrillableHeader), `gd-column-index-${colIndex}`, isRowTotal ? "gd-row-total" : null, isColumnTotal ? "gd-column-total" : null, isColumnSubtotal ? "gd-column-subtotal" : null, subtotalStyle ? `gd-table-row-subtotal gd-table-row-subtotal-${subtotalStyle}` : null, hiddenCell ? "gd-cell-hide s-gd-cell-hide" : null, rowSeparator ? "gd-table-row-separator s-gd-table-row-separator" : null, isTopPinned && isEmptyCell ? "gd-hidden-sticky-column" : null, 
        // All new totals combinations
        isColAndRowSubtotal
            ? "gd-table-row-subtotal-column-subtotal s-table-row-subtotal-column-subtotal"
            : null, isRowTotalAndColSubtotal
            ? "gd-table-row-total-column-subtotal s-table-row-total-column-subtotal"
            : null, isRowAndColumnTotal ? "gd-table-row-total-column-total s-table-row-total-column-total" : null, isRowSubtotalColumnTotal
            ? "gd-table-row-subtotal-column-total s-table-row-subtotal-column-total"
            : null, belongsToRowMetric ? "gd-table-row-metric-cell" : null, isTransposed ? "gd-transpose" : null);
    };
}
function getColumnTotalOrSubTotalInfo(colDef, col, row, isTransposed, columnHeadersPosition) {
    if (columnHeadersPosition === "left" && isTransposed) {
        if (Object.keys(row.headerItemMap).length > 0) {
            return {
                isColumnTotal: isMixedValuesCol(col) &&
                    isResultTotalHeader(row.headerItemMap[col.id]) &&
                    col.isTotal === true,
                isColumnSubtotal: isMixedValuesCol(col) &&
                    isResultTotalHeader(row.headerItemMap[col.id]) &&
                    col.isSubtotal === true,
            };
        }
        else {
            return {
                isColumnTotal: isMixedValuesCol(col) && col.isTotal === true,
                isColumnSubtotal: isMixedValuesCol(col) && col.isSubtotal === true,
            };
        }
    }
    else if (isTransposed) {
        return {
            isColumnTotal: isScopeCol(col) && col.isTotal === true,
            isColumnSubtotal: isScopeCol(col) && col.isSubtotal === true,
        };
    }
    else {
        return {
            isColumnTotal: colDef.type === COLUMN_TOTAL,
            isColumnSubtotal: colDef.type === COLUMN_SUBTOTAL,
        };
    }
}
//# sourceMappingURL=cellClass.js.map