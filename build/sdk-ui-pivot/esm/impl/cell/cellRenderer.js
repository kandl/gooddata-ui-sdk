// (C) 2007-2022 GoodData Corporation
import React from "react";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { isSomeTotal } from "../data/dataSourceUtils.js";
import { VALUE_CLASS, ROW_MEASURE_COLUMN, MIXED_HEADERS_COLUMN } from "../base/constants.js";
import { agColId, isRootCol } from "../structure/tableDescriptorTypes.js";
import { LoadingComponent } from "@gooddata/sdk-ui";
import cx from "classnames";
function hasTotalForCurrentColumn(params) {
    const row = params.data;
    if (!(row === null || row === void 0 ? void 0 : row.calculatedForColumns) || !params.colDef) {
        return false;
    }
    const colId = agColId(params.colDef);
    return row.calculatedForColumns.some((col) => col === colId);
}
/**
 * For measures in rows, update menu aggregation click function to a single measure
 * instead of attaching all measures (all measures are associated with the column by default)
 * Take the info from measureDescriptor associated with the data property on the cell.
 */
function updateMenuAggregationClickForMeasure(headerComponentParams, measureDescriptorHeaderItem) {
    if (!measureDescriptorHeaderItem) {
        return headerComponentParams;
    }
    const onMenuAggregationClick = (config) => {
        return headerComponentParams.onMenuAggregationClick(Object.assign(Object.assign({}, config), { measureIdentifiers: [measureDescriptorHeaderItem.localIdentifier] }));
    };
    return Object.assign(Object.assign({}, headerComponentParams), { onMenuAggregationClick });
}
function shouldShowAggregationsMenu(params) {
    var _a, _b, _c;
    return ((((_a = params.colDef) === null || _a === void 0 ? void 0 : _a.type) === ROW_MEASURE_COLUMN || ((_b = params.colDef) === null || _b === void 0 ? void 0 : _b.type) === MIXED_HEADERS_COLUMN) &&
        ((_c = params.data) === null || _c === void 0 ? void 0 : _c.measureDescriptor));
}
/**
 * Returns common implementation of cell renderer used for normal cells, sticky header cells and totals.
 */
export function createCellRenderer(tableDescriptor) {
    // eslint-disable-next-line react/display-name
    return (params) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const loadingDone = params.node.id !== undefined || params.node.rowPinned === "bottom";
        const theme = useTheme();
        const column = params.colDef && (tableDescriptor === null || tableDescriptor === void 0 ? void 0 : tableDescriptor.getCol(params.colDef));
        const showLoadingComponent = column && !isRootCol(column) && tableDescriptor.getAbsoluteLeafColIndex(column) === 0; // only for first column
        if (!loadingDone && showLoadingComponent) {
            const color = (_e = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.table) === null || _a === void 0 ? void 0 : _a.loadingIconColor) !== null && _b !== void 0 ? _b : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c6) !== null && _e !== void 0 ? _e : undefined;
            return React.createElement(LoadingComponent, { color: color, width: 36, imageHeight: 8, height: 26, speed: 2 });
        }
        const isRowTotalOrSubtotal = isSomeTotal((_f = params.data) === null || _f === void 0 ? void 0 : _f.type);
        const isActiveRowTotal = isRowTotalOrSubtotal && hasTotalForCurrentColumn(params);
        const formattedValue = isRowTotalOrSubtotal && !isActiveRowTotal && !params.value
            ? "" // inactive row total cells should be really empty (no "-") when they have no value (RAIL-1525)
            : params.formatValue(params.value);
        if (shouldShowAggregationsMenu(params)) {
            const HeaderComponent = (_g = params.colDef) === null || _g === void 0 ? void 0 : _g.headerComponent;
            const measureHeaderItem = (_j = (_h = params.data) === null || _h === void 0 ? void 0 : _h.measureDescriptor) === null || _j === void 0 ? void 0 : _j.measureHeaderItem;
            const headerParams = updateMenuAggregationClickForMeasure((_k = params.colDef) === null || _k === void 0 ? void 0 : _k.headerComponentParams, measureHeaderItem);
            // for totals/subtotals, there is the name, but we don't want to render menu for them
            const menuOverride = isRowTotalOrSubtotal ? { menu: null } : {};
            const getMatchingRowTotals = () => headerParams
                .getRowTotals()
                .filter((total) => total.measureIdentifier === (measureHeaderItem === null || measureHeaderItem === void 0 ? void 0 : measureHeaderItem.localIdentifier));
            const getMatchingColTotals = () => headerParams
                .getColumnTotals()
                .filter((total) => total.measureIdentifier === (measureHeaderItem === null || measureHeaderItem === void 0 ? void 0 : measureHeaderItem.localIdentifier));
            const className = cx("gd-row-measure-name", {
                "s-loading-done": loadingDone,
            });
            return (React.createElement(HeaderComponent, Object.assign({}, headerParams, { className: className, column: params.column, displayName: formattedValue, getRowTotals: getMatchingRowTotals, getColumnTotals: getMatchingColTotals }, menuOverride)));
        }
        const className = cx(params.node.rowPinned === "top" ? "gd-sticky-header-value" : VALUE_CLASS, {
            "s-loading-done": loadingDone,
        });
        return React.createElement("span", { className: className }, formattedValue || "");
    };
}
//# sourceMappingURL=cellRenderer.js.map