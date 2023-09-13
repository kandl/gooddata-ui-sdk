import { __rest } from "tslib";
// (C) 2007-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { getGridIndex } from "./base/agUtils.js";
import ApiWrapper from "./base/agApiWrapper.js";
import { getScrollbarWidth } from "./utils.js";
import { ROW_ATTRIBUTE_COLUMN } from "./base/constants.js";
export function initializeStickyRow(gridApi) {
    gridApi.setPinnedTopRowData([{}]);
}
export function updateStickyRowPosition(gridApi, apiWrapper = ApiWrapper) {
    if (!gridApi) {
        return;
    }
    const headerHeight = apiWrapper.getHeaderHeight(gridApi);
    apiWrapper.setPinnedTopRowStyles(gridApi, {
        top: `${headerHeight}px`,
        "padding-right": `${getScrollbarWidth()}px`,
    });
}
export function stickyRowExists(gridApi, apiWrapper = ApiWrapper) {
    return !!apiWrapper.getPinnedTopRowElement(gridApi);
}
function shouldUpdate(currentScrollPosition, lastScrollPosition, rowHeight) {
    const initialUpdate = currentScrollPosition.top === 0;
    const currentRowIndex = getGridIndex(currentScrollPosition.top, rowHeight);
    const lastRowIndex = getGridIndex(lastScrollPosition.top, rowHeight);
    const differentRow = currentRowIndex !== lastRowIndex;
    // when scrolling horizontally update with the same cadence as rows as we don't know where the column borders are
    const horizontalBreakpointDistance = rowHeight;
    const currentHorizontalBreakpoint = getGridIndex(currentScrollPosition.left, horizontalBreakpointDistance);
    const lastHorizontalBreakpoint = getGridIndex(lastScrollPosition.left, horizontalBreakpointDistance);
    const differentHorizontalBreakpoint = currentHorizontalBreakpoint !== lastHorizontalBreakpoint;
    return initialUpdate || differentRow || differentHorizontalBreakpoint;
}
function areDataDifferent(previousData, currentData) {
    return (Object.keys(previousData).length !== Object.keys(currentData).length ||
        Object.keys(previousData).some((dataItemKey) => {
            return previousData[dataItemKey] !== currentData[dataItemKey];
        }));
}
export function updateStickyRowContentClassesAndData(currentScrollPosition, lastScrollPosition, rowHeight, gridApi, groupingProvider, apiWrapper) {
    var _a, _b;
    if (!gridApi || !shouldUpdate(currentScrollPosition, lastScrollPosition, rowHeight)) {
        return;
    }
    const firstVisibleRowIndex = getGridIndex(currentScrollPosition.top, rowHeight);
    const firstVisibleRow = gridApi.getDisplayedRowAtIndex(firstVisibleRowIndex);
    const firstVisibleNodeData = (_a = firstVisibleRow === null || firstVisibleRow === void 0 ? void 0 : firstVisibleRow.data) !== null && _a !== void 0 ? _a : null;
    if (firstVisibleNodeData === null) {
        apiWrapper.removePinnedTopRowClass(gridApi, "gd-visible-sticky-row");
        return;
    }
    apiWrapper.addPinnedTopRowClass(gridApi, "gd-visible-sticky-row");
    const lastRowIndex = getGridIndex(lastScrollPosition.top, rowHeight);
    // TODO: consider obtaining row-col descriptors from tableDescriptor instead
    const attributeKeys = Object.keys(firstVisibleNodeData).filter((colId) => {
        const colDef = gridApi.getColumnDef(colId);
        return (colDef === null || colDef === void 0 ? void 0 : colDef.type) === ROW_ATTRIBUTE_COLUMN;
    });
    const stickyRowData = {};
    const headerItemMap = {};
    attributeKeys.forEach((columnId) => {
        apiWrapper.removeCellClass(gridApi, columnId, lastRowIndex, "gd-cell-show-hidden");
        // the following value is the same as the current one
        if (groupingProvider.isRepeatedValue(columnId, firstVisibleRowIndex + 1)) {
            // set correct sticky row data
            stickyRowData[columnId] = firstVisibleNodeData[columnId];
            headerItemMap[columnId] = firstVisibleNodeData.headerItemMap[columnId];
        }
        else {
            // if the column has some groups
            if (groupingProvider.isColumnWithGrouping(columnId)) {
                // show the last cell of the group temporarily so it scrolls out of the viewport nicely
                const currentRowIndex = getGridIndex(currentScrollPosition.top, rowHeight);
                apiWrapper.addCellClass(gridApi, columnId, currentRowIndex, "gd-cell-show-hidden");
            }
        }
    });
    const previousRowData = (_b = gridApi.getPinnedTopRow(0)) === null || _b === void 0 ? void 0 : _b.data;
    const { headerItemMap: _ignoredHeaders, type: _ignoredType, subtotalStyle: _ignoredStyle } = previousRowData, previousData = __rest(previousRowData, ["headerItemMap", "type", "subtotalStyle"]);
    // set new rowData only if differen to avoid rerendering and flashing of the sticky row
    if (areDataDifferent(previousData, stickyRowData)) {
        const headerItemMapProp = isEmpty(headerItemMap) ? {} : { headerItemMap };
        gridApi.setPinnedTopRowData([
            Object.assign(Object.assign({}, stickyRowData), headerItemMapProp),
        ]);
    }
}
//# sourceMappingURL=stickyRowHandler.js.map