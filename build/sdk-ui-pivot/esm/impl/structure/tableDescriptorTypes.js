export const ColumnGroupingDescriptorId = "root";
export function isSliceCol(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.type) === "sliceCol";
}
export function isSliceMeasureCol(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.type) === "sliceMeasureCol";
}
export function isMixedHeadersCol(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.type) === "mixedHeadersCol";
}
export function isMixedValuesCol(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.type) === "mixedValuesCol";
}
export function isSeriesCol(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.type) == "seriesCol";
}
export function isScopeCol(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.type) === "scopeCol";
}
/**
 * Tests whether the provided col is a {@link ScopeCol} with no children - which implies that it is the bottom
 * most group that is not linked to any measure columns, which in turn means the table is not defined with any measures.
 *
 * @param col - col to test
 */
export function isEmptyScopeCol(col) {
    return isScopeCol(col) && col.children.length === 0;
}
export function isRootCol(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.type) === "rootCol";
}
function isColDef(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.colId) !== undefined;
}
function isColumn(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.getColDef) !== undefined;
}
/**
 * Convenience accessor of ag-grid column identifier. This can take either string itself or the
 * different type of col flying around ag-grid API (ColDef, ColGroupDef or Column).
 *
 * For purposes of our table, column ID for ag-grid groups is the groupId.
 *
 * @param colOrId - column id (returned as is) or one of the ag-grid's column types
 */
export function agColId(colOrId) {
    if (typeof colOrId === "string") {
        return colOrId;
    }
    if (isColDef(colOrId)) {
        return colOrId.colId;
    }
    else if (isColumn(colOrId)) {
        return agColId(colOrId.getColDef());
    }
    else {
        return colOrId.groupId;
    }
}
//# sourceMappingURL=tableDescriptorTypes.js.map