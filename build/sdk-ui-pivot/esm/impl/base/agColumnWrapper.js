export function setColumnMaxWidth(columnApi, columnIds, newMaxWidth) {
    setColumnMaxWidthIf(columnApi, columnIds, newMaxWidth, () => true);
}
export function setColumnMaxWidthIf(columnApi, columnIds, newMaxWidth, condition) {
    columnIds.forEach((colId) => {
        const column = columnApi.getColumn(colId);
        if (column && condition(column)) {
            // We need set maxWidth dynamically before/after autoresize/growToFit.
            // Set this only on column.getColDef().maxWidth not working
            // so we need to set it also on column's private member
            column.maxWidth = newMaxWidth;
            column.getColDef().maxWidth = newMaxWidth;
        }
    });
}
//# sourceMappingURL=agColumnWrapper.js.map