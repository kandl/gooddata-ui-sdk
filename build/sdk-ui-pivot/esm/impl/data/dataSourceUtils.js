import ApiWrapper from "../base/agApiWrapper.js";
import isEqual from "lodash/isEqual.js";
import { ROW_SUBTOTAL, ROW_TOTAL, COLUMN_SUBTOTAL, COLUMN_TOTAL } from "../base/constants.js";
export function areTotalsChanged(gridApi, newTotals) {
    var _a, _b, _c;
    const totals = newTotals !== null && newTotals !== void 0 ? newTotals : [];
    const currentTotalsCount = (_a = gridApi === null || gridApi === void 0 ? void 0 : gridApi.getPinnedBottomRowCount()) !== null && _a !== void 0 ? _a : 0;
    const newTotalsCount = (_b = newTotals === null || newTotals === void 0 ? void 0 : newTotals.length) !== null && _b !== void 0 ? _b : 0;
    if (currentTotalsCount !== newTotalsCount) {
        return true;
    }
    for (let i = 0; i < currentTotalsCount; i++) {
        if (!isEqual((_c = gridApi === null || gridApi === void 0 ? void 0 : gridApi.getPinnedBottomRow(i)) === null || _c === void 0 ? void 0 : _c.data, totals[i])) {
            return true;
        }
    }
    return false;
}
export function isInvalidGetRowsRequest(startRow, gridApi) {
    const bottomRowIndex = gridApi ? ApiWrapper.getPaginationBottomRowIndex(gridApi) : null;
    if (bottomRowIndex !== null) {
        return startRow > bottomRowIndex;
    }
    return false;
}
export function isSomeTotal(rowType) {
    const isRowTotal = rowType === ROW_TOTAL;
    const isRowSubtotal = rowType === ROW_SUBTOTAL;
    return isRowTotal || isRowSubtotal;
}
export function isSomeColumnTotal(colDef) {
    return isColumnTotal(colDef) || isColumnSubtotal(colDef);
}
export function isColumnTotal(colDef) {
    const { type } = colDef;
    return type === COLUMN_TOTAL;
}
export function isColumnSubtotal(colDef) {
    const { type } = colDef;
    return type === COLUMN_SUBTOTAL;
}
export function getSubtotalStyles(dimension) {
    if (!(dimension === null || dimension === void 0 ? void 0 : dimension.totals)) {
        return [];
    }
    let even = false;
    const subtotalStyles = dimension.itemIdentifiers.slice(1).map((attributeIdentifier) => {
        var _a, _b;
        const hasSubtotal = (_b = (_a = dimension.totals) === null || _a === void 0 ? void 0 : _a.some((total) => total.attributeIdentifier === attributeIdentifier)) !== null && _b !== void 0 ? _b : false;
        if (hasSubtotal) {
            even = !even;
            return even ? "even" : "odd";
        }
        return null;
    });
    // Grand total (first) has no styles
    return [null, ...subtotalStyles];
}
//# sourceMappingURL=dataSourceUtils.js.map