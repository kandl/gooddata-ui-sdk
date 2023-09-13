function getHeaderHeight(gridApi) {
    var _a, _b, _c, _d;
    return (_d = (_c = (_b = (_a = gridApi === null || gridApi === void 0 ? void 0 : gridApi.ctrlsService) === null || _a === void 0 ? void 0 : _a.gridHeaderCtrl) === null || _b === void 0 ? void 0 : _b.eGui) === null || _c === void 0 ? void 0 : _c.clientHeight) !== null && _d !== void 0 ? _d : 0;
}
function getCellElement(gridApi, attributeId, rowIndex) {
    var _a, _b, _c;
    const rowRenderer = gridApi.rowRenderer;
    const rowCon = rowRenderer.rowCtrlsByRowIndex[rowIndex];
    const cell = (_b = (_a = rowCon === null || rowCon === void 0 ? void 0 : rowCon.centerCellCtrls) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.find((col) => {
        return col.column.colId === attributeId;
    });
    return (_c = cell === null || cell === void 0 ? void 0 : cell.eGui) !== null && _c !== void 0 ? _c : null;
}
function addCellClass(gridApi, attributeId, rowIndex, className) {
    const cellElement = getCellElement(gridApi, attributeId, rowIndex);
    if (cellElement !== null) {
        cellElement.classList.add(className);
    }
}
function removeCellClass(gridApi, attributeId, rowIndex, className) {
    const cellElement = getCellElement(gridApi, attributeId, rowIndex);
    if (cellElement !== null) {
        cellElement.classList.remove(className);
    }
}
function getPaginationBottomRowIndex(gridApi) {
    var _a, _b;
    const paginationProxy = gridApi.paginationProxy;
    if (paginationProxy) {
        return (_b = (_a = paginationProxy.bottomRowBounds) === null || _a === void 0 ? void 0 : _a.rowIndex) !== null && _b !== void 0 ? _b : null;
    }
    return null;
}
function getPinnedTopRowElement(gridApi) {
    var _a, _b, _c;
    const pinnedTopRow = gridApi.getPinnedTopRow(0);
    if (!pinnedTopRow) {
        return null;
    }
    const rootElement = (_a = gridApi.gridBodyCtrl) === null || _a === void 0 ? void 0 : _a.eGridBody;
    const rowElement = rootElement === null || rootElement === void 0 ? void 0 : rootElement.querySelector(`[row-id=${pinnedTopRow.id}]`);
    return (_c = (_b = rowElement === null || rowElement === void 0 ? void 0 : rowElement.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) !== null && _c !== void 0 ? _c : null;
}
function addPinnedTopRowClass(gridApi, className) {
    const rowElement = getPinnedTopRowElement(gridApi);
    if (rowElement) {
        rowElement.classList.add(className);
    }
}
function removePinnedTopRowClass(gridApi, className) {
    const rowElement = getPinnedTopRowElement(gridApi);
    if (rowElement) {
        rowElement.classList.remove(className);
    }
}
function setPinnedTopRowStyles(gridApi, styles) {
    const rowElement = getPinnedTopRowElement(gridApi);
    if (rowElement) {
        for (const [key, value] of Object.entries(styles)) {
            rowElement.style[key] = value;
        }
    }
}
export default {
    getHeaderHeight,
    // cell element
    getCellElement,
    addCellClass,
    removeCellClass,
    // pinned row element
    getPinnedTopRowElement,
    addPinnedTopRowClass,
    removePinnedTopRowClass,
    setPinnedTopRowStyles,
    // pinned row cell element
    getPaginationBottomRowIndex,
};
//# sourceMappingURL=agApiWrapper.js.map