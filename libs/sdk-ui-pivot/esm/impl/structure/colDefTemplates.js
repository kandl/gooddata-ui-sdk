import { headerClassFactory } from "./colDefHeaderClass.js";
import { AVAILABLE_TOTALS } from "../base/constants.js";
import { getMeasureCellFormattedValue, getMeasureCellStyle } from "../cell/cellUtils.js";
import cx from "classnames";
import { invariant } from "ts-invariant";
import { isSeriesCol } from "./tableDescriptorTypes.js";
import { cellClassFactory } from "../cell/cellClass.js";
import { createCellRenderer } from "../cell/cellRenderer.js";
import ColumnTotalHeader from "./headers/ColumnTotalHeader.js";
import MixedValuesColumnHeader from "./headers/MixedValuesColumnHeader.js";
export function rowAttributeTemplate(table, props) {
    const cellRenderer = createCellRenderer(table.tableDescriptor);
    return {
        cellClass: cellClassFactory(table, props, "gd-row-attribute-column"),
        headerClass: headerClassFactory(table, props, "gd-row-attribute-column-header"),
        colSpan: (params) => {
            var _a;
            if (
            // params.data is undefined when rows are in loading state
            ((_a = params.data) === null || _a === void 0 ? void 0 : _a.colSpan) &&
                AVAILABLE_TOTALS.find((item) => item === params.data[params.data.colSpan.headerKey])) {
                return params.data.colSpan.count;
            }
            return 1;
        },
        valueFormatter: (params) => {
            return params.value === undefined ? null : params.value;
        },
        cellRenderer,
    };
}
export function rowMeasureTemplate(table, props) {
    const cellRenderer = createCellRenderer(table.tableDescriptor);
    return {
        cellClass: cellClassFactory(table, props, "gd-row-measure-column"),
        headerClass: headerClassFactory(table, props, "gd-row-measure-header"),
        colSpan: (_params) => {
            return 1;
        },
        valueFormatter: (params) => {
            return params.value === undefined ? null : params.value;
        },
        cellRenderer,
    };
}
function potentialRowMeasureFormatter(params, separators) {
    var _a, _b;
    if ((_a = params.data) === null || _a === void 0 ? void 0 : _a.measureDescriptor) {
        const measureDescriptor = (_b = params.data) === null || _b === void 0 ? void 0 : _b.measureDescriptor;
        return params.value !== undefined
            ? getMeasureCellFormattedValue(params.value, measureDescriptor.measureHeaderItem.format, separators)
            : null;
    }
    return params.value === undefined ? null : params.value;
}
export function columnAttributeTemplate(table, props) {
    var _a;
    const separators = (_a = props.config) === null || _a === void 0 ? void 0 : _a.separators;
    const cellRenderer = createCellRenderer(table.tableDescriptor);
    return {
        cellClass: cellClassFactory(table, props, "gd-column-attribute-column"),
        headerClass: headerClassFactory(table, props, "gd-column-attribute-column-header"),
        valueFormatter: (params) => {
            return potentialRowMeasureFormatter(params, separators);
        },
        cellStyle: (params) => {
            var _a, _b;
            if ((_a = params.data) === null || _a === void 0 ? void 0 : _a.measureDescriptor) {
                const measureDescriptor = (_b = params.data) === null || _b === void 0 ? void 0 : _b.measureDescriptor;
                return params.value !== undefined
                    ? getMeasureCellStyle(params.value, measureDescriptor.measureHeaderItem.format, separators, true)
                    : null;
            }
            return null;
        },
        cellRenderer,
    };
}
export function mixedHeadersTemplate(table, props) {
    const cellRenderer = createCellRenderer(table.tableDescriptor);
    return {
        cellClass: cellClassFactory(table, props, "gd-mixed-headers-column"),
        headerClass: headerClassFactory(table, props, "gd-mixed-headers-column-header"),
        colSpan: (params) => {
            var _a;
            if (
            // params.data is undefined when rows are in loading state
            ((_a = params.data) === null || _a === void 0 ? void 0 : _a.colSpan) &&
                AVAILABLE_TOTALS.find((item) => item === params.data[params.data.colSpan.headerKey])) {
                return params.data.colSpan.count;
            }
            return 1;
        },
        valueFormatter: (params) => {
            return params.value === undefined ? null : params.value;
        },
        cellRenderer,
    };
}
const AG_NUMERIC_CELL_CLASSNAME = "ag-numeric-cell";
const AG_NUMERIC_HEADER_CLASSNAME = "ag-numeric-header";
export function measureColumnTemplate(table, props) {
    var _a;
    const cellRenderer = createCellRenderer(table.tableDescriptor);
    const separators = (_a = props.config) === null || _a === void 0 ? void 0 : _a.separators;
    return {
        cellClass: cellClassFactory(table, props, cx(AG_NUMERIC_CELL_CLASSNAME, "gd-measure-column")),
        headerClass: headerClassFactory(table, props, cx(AG_NUMERIC_HEADER_CLASSNAME, "gd-measure-column-header")),
        // wrong params type from ag-grid, we need any
        valueFormatter: (params) => {
            const colDesc = table.tableDescriptor.getCol(params.colDef);
            invariant(isSeriesCol(colDesc));
            return params.value !== undefined
                ? getMeasureCellFormattedValue(params.value, colDesc.seriesDescriptor.measureFormat(), separators)
                : null;
        },
        cellStyle: (params) => {
            const colDesc = table.tableDescriptor.getCol(params.colDef);
            invariant(isSeriesCol(colDesc));
            return params.value !== undefined
                ? getMeasureCellStyle(params.value, colDesc.seriesDescriptor.measureFormat(), separators, true)
                : null;
        },
        cellRenderer,
    };
}
export function totalSubTotalColumnTemplate(table, props) {
    var _a;
    const cellRenderer = createCellRenderer(table.tableDescriptor);
    const separators = (_a = props.config) === null || _a === void 0 ? void 0 : _a.separators;
    return {
        headerComponent: ColumnTotalHeader,
        cellClass: cellClassFactory(table, props, cx(AG_NUMERIC_CELL_CLASSNAME, "gd-total-column")),
        headerClass: headerClassFactory(table, props, "gd-total-column-header"),
        valueFormatter: (params) => {
            const colDesc = table.tableDescriptor.getCol(params.colDef);
            invariant(isSeriesCol(colDesc));
            return params.value !== undefined
                ? getMeasureCellFormattedValue(params.value, colDesc.seriesDescriptor.measureFormat(), separators)
                : null;
        },
        cellStyle: (params) => {
            const colDesc = table.tableDescriptor.getCol(params.colDef);
            invariant(isSeriesCol(colDesc));
            return params.value !== undefined
                ? getMeasureCellStyle(params.value, colDesc.seriesDescriptor.measureFormat(), separators, true)
                : null;
        },
        cellRenderer,
    };
}
export function mixedValuesColsTemplate(table, props) {
    var _a;
    const cellRenderer = createCellRenderer(table.tableDescriptor);
    const separators = (_a = props.config) === null || _a === void 0 ? void 0 : _a.separators;
    return {
        headerComponent: MixedValuesColumnHeader,
        cellClass: cellClassFactory(table, props, cx("gd-mixed-values-column")),
        headerClass: headerClassFactory(table, props, "gd-mixed-values-column-header"),
        valueFormatter: (params) => {
            return potentialRowMeasureFormatter(params, separators);
        },
        cellStyle: (params) => {
            var _a, _b;
            if ((_a = params.data) === null || _a === void 0 ? void 0 : _a.measureDescriptor) {
                const measureDescriptor = (_b = params.data) === null || _b === void 0 ? void 0 : _b.measureDescriptor;
                return params.value !== undefined
                    ? getMeasureCellStyle(params.value, measureDescriptor.measureHeaderItem.format, separators, true)
                    : null;
            }
            return {
                textAlign: "left",
            };
        },
        cellRenderer,
    };
}
//# sourceMappingURL=colDefTemplates.js.map