// (C) 2021 GoodData Corporation
import { getDrillIntersection } from "@gooddata/sdk-ui";
import { isMixedValuesCol, isScopeCol, isSeriesCol, isSliceCol, } from "../structure/tableDescriptorTypes.js";
import { invariant } from "ts-invariant";
import { createDataColLeafHeaders, createMixedValuesColHeaders, createScopeColWithMetricHeaders, createSliceColHeaders, } from "./colDrillHeadersFactory.js";
/**
 * Given an ag-grid cell event and table descriptor, create a drill intersection that exactly describes
 * coordinates of the clicked cell - by using attribute element headers, attribute descriptors and optionally measure
 * descriptor.
 *
 * @param cellEvent - cell event from ag-grid
 * @param tableDescriptor - table descriptor
 */
export function createDrillIntersection(cellEvent, tableDescriptor, rowNodes) {
    const mappingHeaders = [];
    const col = tableDescriptor.getCol(cellEvent.colDef);
    const row = cellEvent.data;
    invariant(isSliceCol(col) ||
        isSeriesCol(col) ||
        (tableDescriptor.isTransposed() && isScopeCol(col)) ||
        (tableDescriptor.isTransposed() && isMixedValuesCol(col)));
    if (isSeriesCol(col)) {
        mappingHeaders.push(...createDataColLeafHeaders(col));
    }
    if (tableDescriptor.isTransposed()) {
        if (isScopeCol(col)) {
            mappingHeaders.push(...createScopeColWithMetricHeaders(col, true, row));
        }
        else if (isMixedValuesCol(col)) {
            mappingHeaders.push(...createMixedValuesColHeaders(col, row));
            rowNodes.forEach((rowNode) => mappingHeaders.push(...createMixedValuesColHeaders(col, rowNode)));
        }
    }
    const effectiveSliceCols = tableDescriptor.getSliceColsUpToIncludingCol(col);
    effectiveSliceCols.forEach((col) => mappingHeaders.push(...createSliceColHeaders(col, row)));
    return getDrillIntersection(mappingHeaders);
}
//# sourceMappingURL=drillIntersectionFactory.js.map