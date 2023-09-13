import { isColumn } from "../base/agUtils.js";
function sortIndicatorsFromColDefs(colDefs) {
    return colDefs
        .filter((col) => col.sort !== undefined && col.sort !== null)
        .map((col) => ({
        colId: col.colId,
        sort: col.sort,
    }));
}
function sortIndicatorsFromColumns(columns) {
    return columns
        .filter((col) => col.getSort() !== undefined && col.getSort() !== null)
        .map((col) => ({
        colId: col.getColId(),
        sort: col.getSort(),
    }));
}
export function createSortIndicators(columns) {
    if (isColumn(columns[0])) {
        return sortIndicatorsFromColumns(columns);
    }
    return sortIndicatorsFromColDefs(columns);
}
//# sourceMappingURL=tableDescriptorSorting.js.map