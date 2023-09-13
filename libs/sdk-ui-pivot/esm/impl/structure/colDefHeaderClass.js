import cx from "classnames";
import { agColId, ColumnGroupingDescriptorId, isMixedHeadersCol, isScopeCol, isSeriesCol, isSliceCol, isSliceMeasureCol, } from "./tableDescriptorTypes.js";
import { isResultTotalHeader } from "@gooddata/sdk-model";
import { COLUMN_TOTAL, COLUMN_SUBTOTAL, COLUMN_ATTRIBUTE_COLUMN } from "../base/constants.js";
export function headerClassFactory(table, _props, classList) {
    return (headerClassParams) => {
        const { tableDescriptor } = table;
        const colDef = headerClassParams.colDef;
        const colId = agColId(colDef);
        if (!colId) {
            return cx(classList);
        }
        if (colId === ColumnGroupingDescriptorId) {
            // This is the special, presentation-only ColGroupDef which communicates to the user
            // what attributes are used for grouping the column header.
            const noColumnBefore = !tableDescriptor.sliceColCount() &&
                !tableDescriptor.sliceMeasureColCount() &&
                !tableDescriptor.hasHeadersOnLeft();
            return cx(classList, "gd-column-group-header", "s-table-column-group-header-descriptor", noColumnBefore ? "gd-column-group-header--first" : null);
        }
        else {
            const colDesc = tableDescriptor.getCol(colId);
            const treeIndexes = colDesc.fullIndexPathToHere;
            const indexWithinGroup = treeIndexes ? treeIndexes[treeIndexes.length - 1] : undefined;
            const noLeftBorder = tableDescriptor.isFirstCol(colId) || !tableDescriptor.hasScopingCols();
            const noBottomBorder = getNoBottomBorderGroupHeader(colDesc, tableDescriptor) ||
                hasEmptyChild(colDef, colDesc);
            const topBottomSolidTotal = isScopeCol(colDesc) &&
                isResultTotalHeader(colDesc.header) &&
                colDesc.headersToHere.length === 0;
            const isColumnTotal = getColumnTotals(colDef, colDesc, tableDescriptor);
            const isColumnSubtotal = getColumnSubTotals(colDef, colDesc, tableDescriptor);
            const absoluteColIndex = isSeriesCol(colDesc)
                ? tableDescriptor.getAbsoluteLeafColIndex(colDesc)
                : undefined;
            const isTransposedHeader = isScopeCol(colDesc) &&
                tableDescriptor.isTransposed() &&
                colDef.type === COLUMN_ATTRIBUTE_COLUMN;
            const isSliceMeasure = isSliceMeasureCol(colDesc);
            return cx(classList, "gd-column-group-header", 
            // Funny stuff begin
            // NOTE: this funny stuff is here to mimic how selectors were originally created.it does not seem
            //  to make much sense :)
            indexWithinGroup !== undefined ? `gd-column-group-header-${indexWithinGroup}` : null, indexWithinGroup !== undefined
                ? `s-table-measure-column-header-group-cell-${indexWithinGroup}`
                : null, 
            // Funny stuff end
            indexWithinGroup !== undefined && !isSliceCol(colDesc)
                ? `s-table-measure-column-header-cell-${indexWithinGroup}`
                : null, absoluteColIndex !== undefined
                ? `s-table-measure-column-header-index-${absoluteColIndex}`
                : null, noLeftBorder ? "gd-column-group-header--first" : null, noBottomBorder ? "gd-column-group-header--subtotal" : null, topBottomSolidTotal
                ? "gd-column-group-header-total--first s-column-group-header-total--first"
                : null, !colDef.headerName && !noBottomBorder && !tableDescriptor.isTransposed()
                ? "gd-column-group-header--empty"
                : null, isColumnTotal ? "gd-column-total" : null, isColumnSubtotal ? "gd-column-subtotal" : null, isTransposedHeader ? "gd-transpose-header" : null, isSliceMeasure ? "gd-row-slice-measure-header" : null);
        }
    };
}
function getColumnTotals(colDef, colDesc, tableDescriptor) {
    if (tableDescriptor.isTransposed()) {
        return isScopeCol(colDesc) && colDesc.isTotal === true;
    }
    else {
        return colDef.type === COLUMN_TOTAL;
    }
}
function getColumnSubTotals(colDef, colDesc, tableDescriptor) {
    if (tableDescriptor.isTransposed()) {
        return isScopeCol(colDesc) && colDesc.isSubtotal === true;
    }
    else {
        return colDef.type === COLUMN_SUBTOTAL;
    }
}
function getNoBottomBorderGroupHeader(colDesc, tableDescriptor) {
    var _a;
    if (tableDescriptor.isTransposed()) {
        return (isScopeCol(colDesc) &&
            isResultTotalHeader(colDesc.header) &&
            colDesc.headersToHere.length === 0 &&
            ((_a = colDesc.children) === null || _a === void 0 ? void 0 : _a.length) > 0);
    }
    else {
        return isScopeCol(colDesc) && isResultTotalHeader(colDesc.header);
    }
}
function hasEmptyChild(colDef, colDesc) {
    var _a, _b;
    return isMixedHeadersCol(colDesc) && ((_b = (_a = colDef.children) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.headerName) === "";
}
//# sourceMappingURL=colDefHeaderClass.js.map