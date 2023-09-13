import findIndex from "lodash/findIndex.js";
import { COLUMN_SUBTOTAL, COLUMN_TOTAL, COLUMN_ATTRIBUTE_COLUMN, COLUMN_GROUPING_DELIMITER, MEASURE_COLUMN, MIXED_VALUES_COLUMN, ROW_ATTRIBUTE_COLUMN, ROW_MEASURE_COLUMN, MIXED_HEADERS_COLUMN, } from "../base/constants.js";
import { agColId, ColumnGroupingDescriptorId, } from "./tableDescriptorTypes.js";
import { isResultTotalHeader, sortDirection } from "@gooddata/sdk-model";
import { attributeSortMatcher, measureSortMatcher } from "./colSortItemMatching.js";
import { valueWithEmptyHandling } from "@gooddata/sdk-ui-vis-commons";
import { getMappingHeaderFormattedName } from "@gooddata/sdk-ui";
import { ColumnTotalGroupHeader } from "./headers/ColumnTotalGroupHeader.js";
import { messages } from "../../locales.js";
function getSortProp(initialSorts, predicate) {
    const sortIndex = findIndex(initialSorts, (s) => predicate(s));
    const sort = initialSorts[sortIndex];
    return sort
        ? {
            sort: sortDirection(sort),
            // use sortedAt to make sure the order of sorts is the same as the order of columns
            sortedAt: sortIndex,
        }
        : {};
}
function createAndAddSliceColDefs(rows, measureCols, state) {
    for (const row of rows) {
        const sortProp = getSortProp(state.initialSorts, (s) => attributeSortMatcher(row, s));
        const headerName = row.attributeDescriptor.attributeHeader.formOf.name;
        const colDef = Object.assign({ type: ROW_ATTRIBUTE_COLUMN, colId: row.id, field: row.id, headerName, headerTooltip: headerName }, sortProp);
        state.rowColDefs.push(colDef);
        state.allColDefs.push(colDef);
    }
    for (const col of measureCols) {
        const colDef = {
            type: ROW_MEASURE_COLUMN,
            colId: col.id,
            field: col.id,
            headerName: "",
            headerTooltip: undefined,
        };
        state.rowColDefs.push(colDef);
        state.allColDefs.push(colDef);
    }
}
function createAndAddMixedValuesColDefs(mixedValuesCol, state) {
    for (const col of mixedValuesCol) {
        const colDef = {
            type: MIXED_VALUES_COLUMN,
            colId: col.id,
            field: col.id,
            headerName: "",
            headerTooltip: undefined,
        };
        state.rowColDefs.push(colDef);
        state.allColDefs.push(colDef);
    }
}
function createAndAddMixedHeadersColDefs(mixedHeadersCol, state, isTransposed) {
    for (const col of mixedHeadersCol) {
        if (isTransposed) {
            const colDef = {
                type: MIXED_HEADERS_COLUMN,
                colId: col.id,
                field: col.id,
                headerName: "",
                headerTooltip: undefined,
            };
            state.rowColDefs.push(colDef);
            state.allColDefs.push(colDef);
        } // else branch would be needed when column header position starts to be independent on measures in rows
    }
}
function getTotalHeaderName(col, intl, headerName) {
    const isTotalSubGroup = col.headersToHere.some((header) => isResultTotalHeader(header));
    return isTotalSubGroup ? "" : intl === null || intl === void 0 ? void 0 : intl.formatMessage(messages[headerName]);
}
function createColumnGroupColDef(col, state, intl) {
    const children = createColumnHeadersFromDescriptors(col.children, state, intl);
    const headerName = valueWithEmptyHandling(getMappingHeaderFormattedName(col.header), state.emptyHeaderTitle);
    if (children.length === 0) {
        const mappedHeaderName = isResultTotalHeader(col.header)
            ? getTotalHeaderName(col, intl, headerName)
            : headerName;
        const colDef = {
            type: COLUMN_ATTRIBUTE_COLUMN,
            colId: col.id,
            field: col.id,
            headerName: mappedHeaderName,
            headerTooltip: mappedHeaderName,
        };
        state.allColDefs.push(colDef);
        state.leafColDefs.push(colDef);
        return colDef;
    }
    else {
        let colGroup;
        if (isResultTotalHeader(col.header)) {
            const isTotal = col.isTotal;
            const isTotalSubGroup = col.headersToHere.some((header) => isResultTotalHeader(header));
            const totalHeaderName = !isTotalSubGroup ? intl.formatMessage(messages[headerName]) : "";
            colGroup = {
                type: isTotal ? COLUMN_TOTAL : COLUMN_SUBTOTAL,
                colId: col.id,
                headerName: totalHeaderName,
                headerTooltip: totalHeaderName,
                children,
                headerGroupComponent: ColumnTotalGroupHeader,
            };
        }
        else {
            colGroup = {
                groupId: col.id,
                headerName,
                headerTooltip: headerName,
                children,
            };
        }
        state.allColDefs.push(colGroup);
        return colGroup;
    }
}
function createColumnHeadersFromDescriptors(cols, state, intl) {
    const colDefs = [];
    for (const col of cols) {
        switch (col.type) {
            case "rootCol": {
                const headerName = col.groupingAttributes
                    .map((attr) => attr.attributeHeader.formOf.name)
                    .join(COLUMN_GROUPING_DELIMITER);
                const colDef = {
                    groupId: ColumnGroupingDescriptorId,
                    children: createColumnHeadersFromDescriptors(col.children, state, intl),
                    headerName,
                    headerTooltip: headerName,
                };
                colDefs.push(colDef);
                state.allColDefs.push(colDef);
                break;
            }
            case "scopeCol": {
                colDefs.push(createColumnGroupColDef(col, state, intl));
                break;
            }
            case "seriesCol": {
                const sortProp = getSortProp(state.initialSorts, (s) => measureSortMatcher(col, s));
                const headerName = col.seriesDescriptor.measureTitle();
                const isTotal = col.seriesDescriptor.isTotal;
                const isSubtotal = col.seriesDescriptor.isSubtotal;
                const colDefType = isTotal ? COLUMN_TOTAL : isSubtotal ? COLUMN_SUBTOTAL : MEASURE_COLUMN;
                const colDef = Object.assign({ type: colDefType, colId: col.id, field: col.id, headerName, headerTooltip: headerName }, sortProp);
                colDefs.push(colDef);
                state.leafColDefs.push(colDef);
                state.allColDefs.push(colDef);
                break;
            }
        }
    }
    return colDefs;
}
function createAndAddDataColDefs(table, state, intl) {
    const cols = createColumnHeadersFromDescriptors(table.rootDataCols, state, intl);
    state.rootColDefs.push(...cols);
}
//
//
//
/**
 * Given table column descriptors & list of sort items, this function will create ag-grid ColDefs which mirror
 * the column descriptor. Any ColDefs whose descriptors match the sortItems will have the sorts set according
 * to the matching sort item.
 *
 * @param table - table col descriptors
 * @param initialSorts - initial table sorting definition
 * @param emptyHeaderTitle - what to show for title of headers with empty title
 * @param config - optional pivot config
 */
export function createColDefsFromTableDescriptor(table, initialSorts, emptyHeaderTitle, isTransposed, config, intl) {
    const state = {
        initialSorts,
        rootColDefs: [],
        allColDefs: [],
        leafColDefs: [],
        rowColDefs: [],
        emptyHeaderTitle,
    };
    createAndAddSliceColDefs(table.sliceCols, table.sliceMeasureCols, state);
    createAndAddDataColDefs(table, state, intl);
    if ((config === null || config === void 0 ? void 0 : config.columnHeadersPosition) === "left") {
        createAndAddMixedHeadersColDefs(table.mixedHeadersCols, state, isTransposed);
    }
    // outside of columnHeadersPosition === "left" condition to handle also metrics in rows and no column attribute case
    createAndAddMixedValuesColDefs(table.mixedValuesCols, state);
    const idToColDef = {};
    state.allColDefs.forEach((colDef) => (idToColDef[agColId(colDef)] = colDef));
    return {
        sliceColDefs: state.rowColDefs,
        rootDataColDefs: state.rootColDefs,
        leafDataColDefs: state.leafColDefs,
        idToColDef,
    };
}
//# sourceMappingURL=colDefFactory.js.map