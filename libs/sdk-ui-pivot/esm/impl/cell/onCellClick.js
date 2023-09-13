import { invariant } from "ts-invariant";
import { isSomeTotal } from "../data/dataSourceUtils.js";
import { isMixedHeadersCol, isMixedValuesCol, isScopeCol, isSeriesCol, isSliceCol, isSliceMeasureCol, } from "../structure/tableDescriptorTypes.js";
import { convertDrillableItemsToPredicates, VisualizationTypes, } from "@gooddata/sdk-ui";
import { isCellDrillable } from "../drilling/cellDrillabilityPredicate.js";
import { createDrilledRow } from "../drilling/drilledRowFactory.js";
import { createDrillIntersection } from "../drilling/drillIntersectionFactory.js";
export function onCellClickedFactory(table, props) {
    return (cellEvent) => {
        var _a, _b, _c, _d;
        invariant(table.tableDescriptor);
        const row = cellEvent.data;
        invariant(row);
        if (isSomeTotal(row.type)) {
            return false;
        }
        const { colDef, data, rowIndex } = cellEvent;
        const col = table.tableDescriptor.getCol(colDef);
        if (isSliceMeasureCol(col) || isMixedHeadersCol(col)) {
            return false;
        }
        // cells belong to either slice column, leaf data column or mixed values column if table is transposed; if cells belong to column of a different
        // type then there must be either something messed up with table construction or a new type of cell
        invariant(isSliceCol(col) ||
            isSeriesCol(col) ||
            (table.tableDescriptor.isTransposed() && isScopeCol(col)) ||
            (table.tableDescriptor.isTransposed() && isMixedValuesCol(col)));
        const { onDrill } = props;
        const dv = table.getDrillDataContext();
        const drillablePredicates = convertDrillableItemsToPredicates(props.drillableItems);
        const isTransposed = table.tableDescriptor.isTransposed();
        const columnHeadersPosition = (_b = (_a = props.config) === null || _a === void 0 ? void 0 : _a.columnHeadersPosition) !== null && _b !== void 0 ? _b : "top";
        const rowNodes = table.getRowNodes().slice(0, rowIndex);
        const areDrillableHeaders = isCellDrillable(col, cellEvent.data, dv, drillablePredicates, columnHeadersPosition, isTransposed);
        if (!areDrillableHeaders) {
            return false;
        }
        const drillContext = {
            type: VisualizationTypes.TABLE,
            element: "cell",
            columnIndex: table.tableDescriptor.getAbsoluteLeafColIndex(col),
            rowIndex: rowIndex,
            row: createDrilledRow(data, table.tableDescriptor),
            intersection: createDrillIntersection(cellEvent, table.tableDescriptor, rowNodes),
        };
        const drillEvent = {
            dataView: dv.dataView,
            drillContext,
        };
        if (onDrill === null || onDrill === void 0 ? void 0 : onDrill(drillEvent)) {
            // This is needed for /analyze/embedded/ drilling with post message
            // More info: https://github.com/gooddata/gdc-analytical-designer/blob/develop/test/drillEventing/drillEventing_page.html
            const event = new CustomEvent("drill", {
                detail: drillEvent,
                bubbles: true,
            });
            (_d = (_c = cellEvent.event) === null || _c === void 0 ? void 0 : _c.target) === null || _d === void 0 ? void 0 : _d.dispatchEvent(event);
            return true;
        }
        return false;
    };
}
//# sourceMappingURL=onCellClick.js.map