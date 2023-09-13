import { emptyHeaderTitleFromIntl, getMappingHeaderFormattedName, BucketNames, } from "@gooddata/sdk-ui";
import { valueWithEmptyHandling } from "@gooddata/sdk-ui-vis-commons";
import { ROW_SUBTOTAL, ROW_TOTAL } from "../base/constants.js";
import { isResultAttributeHeader, isResultTotalHeader, isResultMeasureHeader, isMeasureDescriptor, bucketsFind, isAttribute, attributeLocalId, isAttributeDescriptor, isTotalDescriptor, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { isSeriesCol, } from "../structure/tableDescriptorTypes.js";
import { getSubtotalStyles } from "./dataSourceUtils.js";
import fill from "lodash/fill.js";
import findIndex from "lodash/findIndex.js";
import { messages } from "../../locales.js";
function getSubtotalLabelCellIndex(resultHeaderItems, rowIndex) {
    return findIndex(resultHeaderItems, (headerItem) => isResultTotalHeader(headerItem[rowIndex]));
}
function getMinimalRowData(dv) {
    const data = dv.rawData().twoDimData();
    const rowHeaders = dv.meta().allHeaders()[0];
    const numberOfRowHeaderItems = (rowHeaders[0] || []).length;
    return data.length > 0
        ? data
        : // if there are no measures only attributes
            // create array of [null] of length equal to the number of row dimension headerItems
            fill(Array(numberOfRowHeaderItems), [null]);
}
function getMeasureHeaders(rowHeaderData) {
    var _a;
    return (_a = rowHeaderData
        .find((headers) => isResultMeasureHeader(headers[0]))) === null || _a === void 0 ? void 0 : _a.filter(isMeasureDescriptor);
}
function getTotalLinkValue(measureHeaders, totalLink) {
    var _a, _b;
    return ((_b = (_a = measureHeaders === null || measureHeaders === void 0 ? void 0 : measureHeaders.find((m) => m.measureHeaderItem.order === totalLink)) === null || _a === void 0 ? void 0 : _a.measureHeaderItem.name) !== null && _b !== void 0 ? _b : null);
}
function getCell(rowHeaderData, rowIndex, rowHeader, rowHeaderIndex, intl) {
    const rowHeaderDataItem = rowHeaderData[rowHeaderIndex][rowIndex];
    const cell = {
        field: rowHeader.id,
        rowHeaderDataItem,
        isSubtotal: false,
    };
    if (isResultAttributeHeader(rowHeaderDataItem) || isResultMeasureHeader(rowHeaderDataItem)) {
        return Object.assign(Object.assign({}, cell), { value: valueWithEmptyHandling(getMappingHeaderFormattedName(rowHeaderDataItem), emptyHeaderTitleFromIntl(intl)) });
    }
    else if (isResultTotalHeader(rowHeaderDataItem)) {
        const totalName = rowHeaderDataItem.totalHeaderItem.name;
        const totalLink = rowHeaderDataItem.totalHeaderItem.measureIndex;
        if (totalLink !== undefined) {
            const measureHeaders = getMeasureHeaders(rowHeaderData);
            const value = getTotalLinkValue(measureHeaders, totalLink);
            return Object.assign(Object.assign({}, cell), { isSubtotal: true, value });
        }
        return Object.assign(Object.assign({}, cell), { isSubtotal: true, value: getSubtotalLabelCellIndex(rowHeaderData, rowIndex) === rowHeaderIndex
                ? intl.formatMessage(messages[totalName])
                : null });
    }
    else {
        invariant(false, "row header is not of type IResultAttributeHeaderItem or IResultTotalHeaderItem");
    }
}
export function getRow(tableDescriptor, cellData, rowIndex, rowHeaderData, subtotalStyles, intl) {
    const row = {
        headerItemMap: {},
    };
    tableDescriptor.headers.sliceCols.forEach((rowHeader, rowHeaderIndex) => {
        var _a;
        const { isSubtotal, field, value, rowHeaderDataItem } = getCell(rowHeaderData, rowIndex, rowHeader, rowHeaderIndex, intl);
        if (isSubtotal) {
            row.type = ROW_SUBTOTAL;
            if (!row.subtotalStyle) {
                row.subtotalStyle = (_a = subtotalStyles[rowHeaderIndex]) !== null && _a !== void 0 ? _a : undefined;
            }
        }
        row[field] = value;
        row.headerItemMap[field] = rowHeaderDataItem;
    });
    tableDescriptor.headers.sliceMeasureCols.forEach((rowHeader) => {
        const { field, value, rowHeaderDataItem } = getCell(rowHeaderData, rowIndex, rowHeader, rowHeader.index, intl);
        row[field] = value;
        row.headerItemMap[field] = rowHeaderDataItem;
        // when metrics in rows store measureDescriptor as part of each row
        if (isResultMeasureHeader(rowHeaderDataItem)) {
            row.measureDescriptor = tableDescriptor.getMeasures()[rowHeaderDataItem.measureHeaderItem.order];
        }
        else if (isResultTotalHeader(rowHeaderDataItem)) {
            const totalLink = rowHeaderDataItem.totalHeaderItem.measureIndex;
            if (totalLink !== undefined) {
                row.measureDescriptor = tableDescriptor.getMeasures()[totalLink];
            }
        }
    });
    tableDescriptor.headers.mixedValuesCols.forEach((measureValueHeader, headerIndex) => {
        row[measureValueHeader.id] = cellData[headerIndex];
    });
    if (!tableDescriptor.hasDataLeafCols()) {
        // table has no leaf columns - it is a row-only table listing a bunch of
        // attribute element values. no point in going further as there is no additional
        // data to show
        return row;
    }
    cellData.forEach((cell, cellIndex) => {
        var _a;
        const colId = (_a = tableDescriptor.headers.leafDataCols[cellIndex]) === null || _a === void 0 ? void 0 : _a.id;
        row[colId] = cell;
    });
    return row;
}
function getGrandTotalAttribute(definition) {
    var _a;
    const rowBucket = bucketsFind(definition.buckets, BucketNames.ATTRIBUTE);
    const firstItem = (_a = rowBucket === null || rowBucket === void 0 ? void 0 : rowBucket.items) === null || _a === void 0 ? void 0 : _a[0];
    return isAttribute(firstItem) ? attributeLocalId(firstItem) : "";
}
function getMeasureItem(tableDescriptor, localIdentifier) {
    return tableDescriptor
        .getMeasures()
        .find((measure) => measure.measureHeaderItem.localIdentifier === localIdentifier);
}
function getEffectiveTotals(tableDescriptor, dv) {
    var _a;
    const grandTotalColDescriptor = tableDescriptor.getGrandTotalCol();
    const grandTotalAttributeId = getGrandTotalAttribute(dv.definition);
    const colGrandTotalDefs = dv.definition.dimensions[0].totals;
    const colGrandTotalDefsOuter = (_a = colGrandTotalDefs === null || colGrandTotalDefs === void 0 ? void 0 : colGrandTotalDefs.filter((total) => total.attributeIdentifier === grandTotalAttributeId)) !== null && _a !== void 0 ? _a : [];
    // effective totals do not contain duplicities (e.g. when 'sum' is defined on multiple measures). This is fine
    // when measures are in columns (only one row is needed for each grand total), but when measures are in rows,
    // we need a row for each total definition => take from total definitions and prepare header items.
    return tableDescriptor.isTransposed()
        ? colGrandTotalDefsOuter.map((def) => ({
            totalHeaderItem: { name: def.type, measureIdentifier: def.measureIdentifier },
        }))
        : grandTotalColDescriptor.effectiveTotals;
}
export function getRowTotals(tableDescriptor, dv, intl) {
    if (!dv.rawData().hasRowTotals()) {
        return null;
    }
    const rowTotals = dv.rawData().rowTotals();
    invariant(rowTotals && rowTotals.length > 0);
    const colGrandTotals = rowTotals;
    const colGrandTotalDefs = dv.definition.dimensions[0].totals;
    if (!colGrandTotalDefs) {
        return null;
    }
    const effectiveTotals = getEffectiveTotals(tableDescriptor, dv);
    const grandTotalColDescriptor = tableDescriptor.getGrandTotalCol();
    const grandTotalAttrDescriptor = grandTotalColDescriptor.attributeDescriptor;
    const leafColumns = tableDescriptor.zippedLeaves;
    const totalOfTotals = dv.rawData().totalOfTotals();
    return colGrandTotals.map((totalsPerLeafColumn, totalIdx) => {
        var _a, _b;
        const effectiveTotal = effectiveTotals[totalIdx];
        const grandTotalName = effectiveTotal === null || effectiveTotal === void 0 ? void 0 : effectiveTotal.totalHeaderItem.name;
        const measureCells = {};
        const calculatedForColumns = [];
        const calculatedForMeasures = colGrandTotalDefs
            .filter((total) => {
            return (grandTotalName === total.type &&
                total.attributeIdentifier === grandTotalAttrDescriptor.attributeHeader.localIdentifier);
        })
            .map((total) => total.measureIdentifier);
        const mergedTotals = totalOfTotals
            ? [...totalsPerLeafColumn, ...totalOfTotals[0][totalIdx]]
            : totalsPerLeafColumn;
        mergedTotals.forEach((value, idx) => {
            const leafColumn = leafColumns[idx];
            const leafDescriptor = leafColumn ? leafColumn[0] : tableDescriptor.headers.mixedValuesCols[idx];
            measureCells[leafDescriptor.id] = value;
            if (!isSeriesCol(leafDescriptor) ||
                calculatedForMeasures.indexOf(leafDescriptor.seriesDescriptor.measureDescriptor.measureHeaderItem
                    .localIdentifier) > -1) {
                calculatedForColumns.push(leafDescriptor.id);
            }
        });
        let measuresDefInGrandTotals = {};
        if (tableDescriptor.isTransposed()) {
            const mixedCol = tableDescriptor.headers.sliceMeasureCols[0];
            const effectiveMeasureId = (_a = effectiveTotal === null || effectiveTotal === void 0 ? void 0 : effectiveTotal.totalHeaderItem) === null || _a === void 0 ? void 0 : _a.measureIdentifier;
            const effectiveMeasureItem = getMeasureItem(tableDescriptor, effectiveMeasureId);
            measuresDefInGrandTotals = {
                [mixedCol.id]: (_b = effectiveMeasureItem === null || effectiveMeasureItem === void 0 ? void 0 : effectiveMeasureItem.measureHeaderItem) === null || _b === void 0 ? void 0 : _b.name,
                measureDescriptor: effectiveMeasureItem,
            };
        }
        return Object.assign(Object.assign(Object.assign(Object.assign({ colSpan: {
                count: tableDescriptor.sliceColCount() - tableDescriptor.sliceMeasureColCount(),
                headerKey: grandTotalColDescriptor.id,
            } }, measureCells), { [grandTotalColDescriptor.id]: intl.formatMessage({
                id: `visualizations.totals.dropdown.title.${grandTotalName}`,
            }) }), measuresDefInGrandTotals), { calculatedForColumns, type: ROW_TOTAL });
    });
}
/**
 * Given data view with a page of data and a table descriptor, this factory function creates page for consumption
 * by ag-grid.
 *
 * @param dv - data view with data to process (OK if its empty and has no data)
 * @param tableDescriptor - table descriptor
 * @param intl - intl bundle to get localized subtotal names
 */
export function createAgGridPage(dv, tableDescriptor, intl) {
    const headerItems = dv.meta().allHeaders();
    const dimensions = dv.definition.dimensions;
    const minimalRowData = getMinimalRowData(dv);
    if (tableDescriptor.headers.mixedHeadersCols.length > 0 && tableDescriptor.isTransposed()) {
        const columnTotalsData = dv.rawData().columnTotals();
        const mergedColumnTotalsData = minimalRowData;
        const rowData = [];
        if (columnTotalsData) {
            columnTotalsData.forEach((_m, index) => {
                mergedColumnTotalsData[index].push(...columnTotalsData[index]);
            });
        }
        // rows with attribute values
        headerItems[1].forEach((attributes, rowIndex) => {
            const headerColumn = tableDescriptor.headers.mixedHeadersCols[0];
            const attributeDescriptor = dv.data().slices().descriptors.filter(isAttributeDescriptor);
            const attributeName = attributeDescriptor[rowIndex].attributeHeader.formOf.name;
            const row = {
                [headerColumn.id]: attributeName,
                columnAttributeDescriptor: attributeDescriptor[rowIndex],
                headerItemMap: {},
            };
            tableDescriptor.headers.mixedValuesCols.forEach((column, columnIndex) => {
                var _a;
                const header = attributes[columnIndex];
                const value = valueWithEmptyHandling(getMappingHeaderFormattedName(header), emptyHeaderTitleFromIntl(intl));
                if (isResultAttributeHeader(header)) {
                    row[column.id] = value;
                    row.headerItemMap[column.id] = header;
                }
                else if (isResultTotalHeader(header)) {
                    let title = intl === null || intl === void 0 ? void 0 : intl.formatMessage(messages[value]);
                    if (rowIndex > 0) {
                        const previousRowItem = (_a = headerItems[1][rowIndex - 1]) === null || _a === void 0 ? void 0 : _a[columnIndex];
                        if (isTotalDescriptor(previousRowItem) &&
                            getMappingHeaderFormattedName(previousRowItem) ===
                                getMappingHeaderFormattedName(header)) {
                            title = "";
                        }
                    }
                    row[column.id] = title;
                    row.headerItemMap[column.id] = header;
                }
            });
            rowData.push(row);
        });
        // rows with measure values
        headerItems[0][0].filter(isResultMeasureHeader).map((measureHeader, measureRowIndex) => {
            const headerColumn = tableDescriptor.headers.mixedHeadersCols[0];
            const measureHeaderItem = measureHeader.measureHeaderItem;
            const row = {
                [headerColumn.id]: measureHeaderItem.name,
                measureDescriptor: tableDescriptor.getMeasures()[measureHeaderItem.order],
                headerItemMap: {},
            };
            tableDescriptor.headers.mixedValuesCols.forEach((column, columnIndex) => {
                row[column.id] = mergedColumnTotalsData[measureRowIndex][columnIndex];
            });
            rowData.push(row);
        });
        return {
            rowData,
            rowTotals: [],
        };
    }
    else {
        const columnTotalsData = dv.rawData().columnTotals();
        const subtotalStyles = getSubtotalStyles(dimensions === null || dimensions === void 0 ? void 0 : dimensions[0]);
        const rowData = minimalRowData.map((dataRow, dataRowIndex) => {
            const mergedDataRowWithColumnTotals = dv.rawData().hasColumnTotals()
                ? [...dataRow, ...columnTotalsData[dataRowIndex]]
                : dataRow;
            return getRow(tableDescriptor, mergedDataRowWithColumnTotals, dataRowIndex, headerItems[0], subtotalStyles, intl);
        });
        const rowTotals = getRowTotals(tableDescriptor, dv, intl);
        return {
            rowData,
            rowTotals,
        };
    }
}
//# sourceMappingURL=rowFactory.js.map