import { MEASURE_COLUMN, COLUMN_TOTAL, COLUMN_SUBTOTAL } from "./constants.js";
import { agColId } from "../structure/tableDescriptorTypes.js";
import { ColumnEventSourceType } from "../../columnWidths.js";
/*
 * Assorted utility functions used in our Pivot Table -> ag-grid integration.
 */
export function getGridIndex(position, gridDistance) {
    return Math.floor(position / gridDistance);
}
export function isColumn(item) {
    return !!item.getColDef;
}
export function isMeasureColumn(item) {
    if (isColumn(item)) {
        return item.getColDef().type === MEASURE_COLUMN;
    }
    return item.type === MEASURE_COLUMN;
}
export function isMeasureOrAnyColumnTotal(item) {
    const type = item.getColDef().type;
    return type === MEASURE_COLUMN || type === COLUMN_TOTAL || type === COLUMN_SUBTOTAL;
}
export function agColIds(columns) {
    return columns.map(agColId);
}
export function isHeaderResizer(target) {
    return target.classList.contains("ag-header-cell-resize");
}
export function isManualResizing(columnEvent) {
    return Boolean((columnEvent === null || columnEvent === void 0 ? void 0 : columnEvent.source) === ColumnEventSourceType.UI_DRAGGED && columnEvent.columns);
}
export function scrollBarExists(target) {
    const { scrollWidth, clientWidth } = target.getElementsByClassName("ag-body-horizontal-scroll-viewport")[0];
    return scrollWidth > clientWidth;
}
//# sourceMappingURL=agUtils.js.map