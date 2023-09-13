// (C) 2007-2023 GoodData Corporation
import { invariant, InvariantError } from "ts-invariant";
import omit from "lodash/omit.js";
import omitBy from "lodash/omitBy.js";
import chunk from "lodash/chunk.js";
import { isMeasureColumn, isMeasureOrAnyColumnTotal } from "../base/agUtils.js";
import { COLUMN_SUBTOTAL_CLASS, DEFAULT_HEADER_FONT, DEFAULT_ROW_FONT, DEFAULT_SUBTOTAL_FONT, DEFAULT_TOTAL_FONT, HEADER_LABEL_CLASS, ROW_SUBTOTAL_CLASS, ROW_TOTAL_CLASS, VALUE_CLASS, COLUMN_TOTAL_CLASS, } from "../base/constants.js";
import { isAbsoluteColumnWidth, isAllMeasureColumnWidthItem, isAttributeColumnWidthItem, isMeasureColumnWidthItem, isMixedValuesColumnWidthItem, isSliceMeasureColumnWidthItem, isWeakMeasureColumnWidthItem, } from "../../columnWidths.js";
import isEmpty from "lodash/isEmpty.js";
import { agColId, isScopeCol, isSeriesCol, isSliceCol, isSliceMeasureCol, isMixedValuesCol, } from "../structure/tableDescriptorTypes.js";
import { createColumnLocator, createTransposedColumnLocator } from "../structure/colLocatorFactory.js";
import { colMeasureLocalId } from "../structure/colAccessors.js";
import { isColumnSubtotal, isColumnTotal, isSomeTotal } from "../data/dataSourceUtils.js";
import { isStrongColumnWidthItem } from "../utils.js";
export const MIN_WIDTH = 60;
export const MANUALLY_SIZED_MAX_WIDTH = 2000;
export const AUTO_SIZED_MAX_WIDTH = 500;
export const SORT_ICON_WIDTH = 12;
const COLUMN_RESIZE_CHUNK_SIZE = 50;
//
//
//
function isColumnWidthAuto(columnWidth) {
    return columnWidth.value === "auto";
}
export class ResizedColumnsStore {
    constructor(tableDescriptor, manuallyResizedColumns = {}, allMeasureColumnWidth = null, weakMeasuresColumnWidths = {}) {
        this.getManuallyResizedColumn2 = (col) => {
            if (this.manuallyResizedColumns[col.id]) {
                return this.convertItem(this.manuallyResizedColumns[col.id]);
            }
            const weakColumnWidth = this.getMatchedWeakMeasuresColumnWidth(col);
            if (weakColumnWidth) {
                return this.getWeakMeasureColumMapItem(weakColumnWidth);
            }
            if (isSeriesCol(col) && this.isAllMeasureColumWidthUsed()) {
                return this.getAllMeasureColumMapItem();
            }
        };
        this.getManuallyResizedColumn = (item) => {
            const colId = agColId(item);
            const col = this.tableDescriptor.getCol(colId);
            return this.getManuallyResizedColumn2(col);
        };
        this.isColumnManuallyResized = (item) => {
            return !!this.getManuallyResizedColumn(item);
        };
        this.addToManuallyResizedColumn = (column, allowGrowToFit = false) => {
            this.manuallyResizedColumns[agColId(column)] = {
                width: Object.assign({ value: column.getActualWidth() }, getAllowGrowToFitProp(allowGrowToFit)),
            };
            column.getColDef().suppressSizeToFit = !allowGrowToFit;
        };
        /**
         * Sets width for all column measures.
         *
         * Here Be Dragons 1: this also mutates input columns and sets supressSizeToFit prop to true.
         *
         * @param columnWidth - column width
         * @param allColumns - all columns in table
         */
        this.addAllMeasureColumn = (columnWidth, allColumns) => {
            this.allMeasureColumnWidth = columnWidth;
            allColumns.forEach((col) => {
                if (isMeasureColumn(col)) {
                    const colId = agColId(col);
                    if (this.manuallyResizedColumns[colId]) {
                        this.manuallyResizedColumns = omit(this.manuallyResizedColumns, colId);
                    }
                    col.getColDef().suppressSizeToFit = true;
                }
            });
            this.weakMeasuresColumnWidths = {};
        };
        this.addWeekMeasureColumn = (column) => {
            const width = column.getActualWidth();
            const measureHeaderLocalIdentifier = colMeasureLocalId(this.tableDescriptor.getCol(column));
            if (measureHeaderLocalIdentifier) {
                this.weakMeasuresColumnWidths[measureHeaderLocalIdentifier] = {
                    measureColumnWidthItem: {
                        width: {
                            value: width,
                        },
                        locator: {
                            measureLocatorItem: {
                                measureIdentifier: measureHeaderLocalIdentifier,
                            },
                        },
                    },
                };
                const shouldBeRemoved = (resizedColumnItem) => resizedColumnItem.measureIdentifier === measureHeaderLocalIdentifier;
                this.manuallyResizedColumns = omitBy(this.manuallyResizedColumns, shouldBeRemoved);
            }
        };
        this.removeAllMeasureColumns = () => {
            this.allMeasureColumnWidth = null;
            const shouldBeRemoved = (resizedColumnItem) => isColumnWidthAuto(resizedColumnItem.width);
            this.manuallyResizedColumns = omitBy(this.manuallyResizedColumns, shouldBeRemoved);
            this.weakMeasuresColumnWidths = {};
        };
        this.removeWeakMeasureColumn = (column) => {
            const col = this.tableDescriptor.getCol(agColId(column));
            const weakColumnWidth = this.getMatchedWeakMeasuresColumnWidth(col);
            if (weakColumnWidth) {
                this.weakMeasuresColumnWidths = omit(this.weakMeasuresColumnWidths, weakColumnWidth.measureColumnWidthItem.locator.measureLocatorItem.measureIdentifier);
                const shouldBeRemoved = (resizedColumnItem) => {
                    return (isColumnWidthAuto(resizedColumnItem.width) &&
                        this.isMatchingWeakWidth(resizedColumnItem, weakColumnWidth) &&
                        !this.isAllMeasureColumWidthUsed());
                };
                this.manuallyResizedColumns = omitBy(this.manuallyResizedColumns, shouldBeRemoved);
            }
        };
        /**
         * Removes manual sizing setting from the store.
         *
         * Here Be Dragons 1: This method may be modifying the suppressSizeToFit setting
         * of the columns (e.g. mutating one of the inputs).
         *
         * Here Be Dragons 2: This method is adding what appears like 'dummy garage placeholder'
         * 'auto' widths when all measure width is used and then measure column is
         * removed. Not sure why.
         */
        this.removeFromManuallyResizedColumn = (column) => {
            const col = this.tableDescriptor.getCol(agColId(column));
            const item = this.manuallyResizedColumns[col.id];
            if (item) {
                this.manuallyResizedColumns = omit(this.manuallyResizedColumns, col.id);
                if (!this.isAllMeasureColumWidthUsed() || !isMeasureColumn(column)) {
                    column.getColDef().suppressSizeToFit = false;
                }
            }
            if (isSeriesCol(col) &&
                (this.isAllMeasureColumWidthUsed() || this.getMatchedWeakMeasuresColumnWidth(col))) {
                // TODO INE: consider creating weakItem with width: "auto" when alt+DC over allMeasure
                this.manuallyResizedColumns[col.id] = this.getAutoSizeItem(column);
                column.getColDef().suppressSizeToFit = false;
            }
        };
        this.getColumnWidthsFromMap = () => {
            const result = getColumnWidthsFromMap(this.manuallyResizedColumns, this.tableDescriptor);
            if (this.isAllMeasureColumWidthUsed()) {
                result.push(this.getAllMeasureColumnWidth());
            }
            const weakColumnWidthItems = getWeakColumnWidthsFromMap(this.weakMeasuresColumnWidths);
            return result.concat(weakColumnWidthItems);
        };
        this.updateColumnWidths = (columnWidths) => {
            const allMeasureWidthItem = this.filterAllMeasureColumnWidthItem(columnWidths);
            if (allMeasureWidthItem && isAllMeasureColumnWidthItem(allMeasureWidthItem)) {
                const validatedAllMeasureColumnWidth = defaultWidthValidator(allMeasureWidthItem.measureColumnWidthItem.width);
                this.allMeasureColumnWidth = isAbsoluteColumnWidth(validatedAllMeasureColumnWidth)
                    ? validatedAllMeasureColumnWidth.value
                    : null;
            }
            else {
                this.allMeasureColumnWidth = null;
            }
            this.weakMeasuresColumnWidths = this.filterWeakColumnWidthItems(columnWidths);
            const columnWidthItems = this.filterStrongColumnWidthItems(columnWidths);
            const columnWidthsByField = convertColumnWidthsToMap(this.tableDescriptor, columnWidthItems);
            this.manuallyResizedColumns = columnWidthsByField;
        };
        this.getMatchingColumnsByMeasure = (targetColumn, allColumns) => {
            const targetMeasureLocalIdentifier = colMeasureLocalId(this.tableDescriptor.getCol(targetColumn));
            if (targetMeasureLocalIdentifier) {
                return allColumns.filter((col) => {
                    const measureLocalIdentifier = colMeasureLocalId(this.tableDescriptor.getCol(col));
                    return targetMeasureLocalIdentifier === measureLocalIdentifier;
                });
            }
            return [];
        };
        this.getMatchedWeakMeasuresColumnWidth = (col) => {
            if (!isSeriesCol(col)) {
                return;
            }
            const measureHeaderLocalIdentifier = col.seriesDescriptor.measureDescriptor.measureHeaderItem.localIdentifier;
            if (measureHeaderLocalIdentifier) {
                return this.weakMeasuresColumnWidths[measureHeaderLocalIdentifier];
            }
        };
        this.filterWeakColumnWidthItems = (columnWidths) => {
            if (columnWidths) {
                const onlyWeakWidthItems = columnWidths.filter(isWeakMeasureColumnWidthItem);
                return onlyWeakWidthItems.reduce((map, weakWidthItem) => {
                    const validatedWidth = defaultWidthValidator(weakWidthItem.measureColumnWidthItem.width);
                    if (isAbsoluteColumnWidth(validatedWidth)) {
                        map[weakWidthItem.measureColumnWidthItem.locator.measureLocatorItem.measureIdentifier] = {
                            measureColumnWidthItem: Object.assign(Object.assign({}, weakWidthItem.measureColumnWidthItem), { width: Object.assign(Object.assign({}, weakWidthItem.measureColumnWidthItem.width), { value: validatedWidth.value }) }),
                        };
                    }
                    return map;
                }, {});
            }
            return {};
        };
        this.isAllMeasureColumWidthUsed = () => {
            return this.allMeasureColumnWidth !== null;
        };
        this.getAutoSizeItem = (column) => {
            const measureHeaderLocalIdentifier = colMeasureLocalId(this.tableDescriptor.getCol(column));
            const result = { width: { value: "auto" } };
            if (measureHeaderLocalIdentifier) {
                result.measureIdentifier = measureHeaderLocalIdentifier;
            }
            return result;
        };
        this.getAllMeasureColumMapItem = () => {
            return { width: this.allMeasureColumnWidth };
        };
        this.getAllMeasureColumnWidth = () => {
            return {
                measureColumnWidthItem: {
                    width: {
                        value: this.allMeasureColumnWidth,
                    },
                },
            };
        };
        this.tableDescriptor = tableDescriptor;
        this.manuallyResizedColumns = manuallyResizedColumns;
        this.allMeasureColumnWidth = allMeasureColumnWidth;
        this.weakMeasuresColumnWidths = weakMeasuresColumnWidths;
    }
    filterAllMeasureColumnWidthItem(columnWidths) {
        if (columnWidths) {
            return columnWidths.filter(isAllMeasureColumnWidthItem)[0];
        }
    }
    filterStrongColumnWidthItems(columnWidths) {
        if (columnWidths) {
            return columnWidths.filter(isStrongColumnWidthItem);
        }
        return [];
    }
    convertItem(item) {
        // columns with width.value = auto are hidden
        if (isAbsoluteColumnWidth(item.width)) {
            const { width } = item;
            return Object.assign({ width: width.value }, getAllowGrowToFitProp(width.allowGrowToFit));
        }
    }
    getWeakMeasureColumMapItem(item) {
        return {
            width: item.measureColumnWidthItem.width.value,
        };
    }
    isMatchingWeakWidth(item, weakColumnWidth) {
        return (item.measureIdentifier ===
            weakColumnWidth.measureColumnWidthItem.locator.measureLocatorItem.measureIdentifier);
    }
}
//
//
//
export function convertColumnWidthsToMap(tableDescriptor, columnWidths, widthValidator = defaultWidthValidator) {
    if (!columnWidths) {
        return {};
    }
    const columnWidthsMap = {};
    columnWidths.forEach((columnWidth) => {
        if (isAttributeColumnWidthItem(columnWidth)) {
            const [field, width] = getAttributeColumnWidthItemFieldAndWidth(tableDescriptor, columnWidth);
            columnWidthsMap[field] = {
                width: widthValidator(width),
            };
        }
        if (isMeasureColumnWidthItem(columnWidth)) {
            const result = getMeasureColumnWidthItemFieldAndWidth(tableDescriptor, columnWidth);
            if (!result) {
                return;
            }
            const [col, width] = result;
            columnWidthsMap[col.id] = {
                width: widthValidator(width),
                measureIdentifier: colMeasureLocalId(col),
            };
        }
        if (isSliceMeasureColumnWidthItem(columnWidth) || isMixedValuesColumnWidthItem(columnWidth)) {
            const result = getSliceMeasureOrMixedValuesColumnWidthItemFieldAndWidth(tableDescriptor, columnWidth);
            if (!result) {
                return;
            }
            const [col, width] = result;
            columnWidthsMap[col.id] = {
                width: widthValidator(width),
                measureIdentifier: colMeasureLocalId(col),
            };
        }
    });
    return columnWidthsMap;
}
function getAttributeColumnWidthItemFieldAndWidth(tableDescriptor, columnWidthItem) {
    const col = tableDescriptor.matchAttributeWidthItem(columnWidthItem);
    invariant(col, `Could not find column descriptor for width item for attribute "${columnWidthItem.attributeColumnWidthItem.attributeIdentifier}"`);
    return [col.id, columnWidthItem.attributeColumnWidthItem.width];
}
function getMeasureColumnWidthItemFieldAndWidth(tableDescriptor, columnWidthItem) {
    const col = tableDescriptor.matchMeasureWidthItem(columnWidthItem);
    if (!col) {
        // it is a valid case that no column matches locators. data may change, elements are no longer there etc..
        return undefined;
    }
    return [col, columnWidthItem.measureColumnWidthItem.width];
}
function getSliceMeasureOrMixedValuesColumnWidthItemFieldAndWidth(tableDescriptor, columnWidthItem) {
    const col = isSliceMeasureColumnWidthItem(columnWidthItem)
        ? tableDescriptor.matchSliceMeasureWidthItem(columnWidthItem)
        : tableDescriptor.matchMixedValuesWidthItem(columnWidthItem);
    if (!col) {
        // it is a valid case that no column matches locators. data may change, elements are no longer there etc..
        return undefined;
    }
    const width = isSliceMeasureColumnWidthItem(columnWidthItem)
        ? columnWidthItem.sliceMeasureColumnWidthItem.width
        : columnWidthItem.mixedValuesColumnWidthItem.width;
    return [col, width];
}
function getSizeItemByColId(col, width) {
    if (isSliceCol(col)) {
        const attributeIdentifier = col.attributeDescriptor.attributeHeader.localIdentifier;
        if (isAbsoluteColumnWidth(width)) {
            return {
                attributeColumnWidthItem: {
                    width,
                    attributeIdentifier,
                },
            };
        }
        else {
            throw new InvariantError(`width value for attributeColumnWidthItem has to be number ${col.id}`);
        }
    }
    else if (isScopeCol(col) || isSeriesCol(col)) {
        return {
            measureColumnWidthItem: {
                width,
                locators: createColumnLocator(col),
            },
        };
    }
    else if (isSliceMeasureCol(col)) {
        return {
            sliceMeasureColumnWidthItem: {
                width,
                locators: createTransposedColumnLocator(col),
            },
        };
    }
    else if (isMixedValuesCol(col)) {
        return {
            mixedValuesColumnWidthItem: {
                width,
                locators: createTransposedColumnLocator(col),
            },
        };
    }
    throw new InvariantError(`could not find header matching ${col.id}`);
}
export function getColumnWidthsFromMap(map, tableDescriptor) {
    return Object.keys(map).map((colId) => {
        const { width } = map[colId];
        const col = tableDescriptor.getCol(colId);
        const sizeItem = getSizeItemByColId(col, width);
        invariant(sizeItem, `unable to find size item by filed ${colId}`);
        return sizeItem;
    });
}
export function getWeakColumnWidthsFromMap(map) {
    return Object.keys(map).map((measureIdentifier) => {
        return map[measureIdentifier];
    });
}
function defaultWidthValidator(width) {
    if (isAbsoluteColumnWidth(width)) {
        return Object.assign(Object.assign({}, width), { value: Math.min(Math.max(width.value, MIN_WIDTH), MANUALLY_SIZED_MAX_WIDTH) });
    }
    return width;
}
/**
 * This function _mutates_ the incoming column defs according to the sizing rules.
 */
export function updateColumnDefinitionsWithWidths(tableDescriptor, resizedColumnsStore, autoResizedColumns, defaultColumnWidth, isGrowToFitEnabled, growToFittedColumns = {}) {
    const sliceCols = tableDescriptor.zippedSliceCols;
    const leaves = tableDescriptor.zippedLeaves;
    const allSizableCols = [];
    allSizableCols.push(...sliceCols);
    allSizableCols.push(...leaves);
    allSizableCols.forEach(([colDesc, colDef]) => {
        const colId = colDesc.id;
        const manualSize = resizedColumnsStore.getManuallyResizedColumn2(colDesc);
        const autoResizeSize = autoResizedColumns[colId];
        colDef.maxWidth = MANUALLY_SIZED_MAX_WIDTH;
        if (manualSize) {
            colDef.width = manualSize.width;
            colDef.suppressSizeToFit = !manualSize.allowGrowToFit;
        }
        else {
            colDef.suppressSizeToFit = false;
            colDef.width = autoResizeSize ? autoResizeSize.width : defaultColumnWidth;
            if (isGrowToFitEnabled) {
                const growToFittedColumn = growToFittedColumns[colId];
                if (growToFittedColumn) {
                    colDef.width = growToFittedColumn.width;
                    if (growToFittedColumn.width > MANUALLY_SIZED_MAX_WIDTH) {
                        colDef.maxWidth = undefined;
                    }
                }
            }
        }
    });
}
export function syncSuppressSizeToFitOnColumns(resizedColumnsStore, columnApi) {
    if (!columnApi) {
        return;
    }
    const columns = columnApi.getAllColumns();
    columns === null || columns === void 0 ? void 0 : columns.forEach((col) => {
        const resizedColumn = resizedColumnsStore.getManuallyResizedColumn(col);
        resizedColumn
            ? (col.getColDef().suppressSizeToFit = !resizedColumn.allowGrowToFit)
            : (col.getColDef().suppressSizeToFit = false);
    });
}
export function isColumnAutoResized(autoResizedColumns, resizedColumnId) {
    return Boolean(resizedColumnId && autoResizedColumns[resizedColumnId]);
}
export function resetColumnsWidthToDefault(columnApi, columns, resizedColumnsStore, autoResizedColumns, defaultWidth) {
    const resizeData = columns.reduce((acc, col) => {
        const id = agColId(col);
        if (resizedColumnsStore.isColumnManuallyResized(col)) {
            const manuallyResizedColumn = resizedColumnsStore.getManuallyResizedColumn(col);
            if (manuallyResizedColumn) {
                acc.push({ key: col, newWidth: manuallyResizedColumn.width });
            }
        }
        else if (isColumnAutoResized(autoResizedColumns, id)) {
            acc.push({ key: col, newWidth: autoResizedColumns[id].width });
        }
        else {
            acc.push({ key: col, newWidth: defaultWidth });
        }
        return acc;
    }, []);
    columnApi.setColumnWidths(resizeData);
}
export function resizeAllMeasuresColumns(columnApi, resizedColumnsStore, column) {
    const columnWidth = column.getActualWidth();
    const allColumns = columnApi.getAllColumns();
    const resizeData = allColumns === null || allColumns === void 0 ? void 0 : allColumns.filter(isMeasureOrAnyColumnTotal).map((col) => {
        return {
            key: col,
            newWidth: columnWidth,
        };
    });
    if (resizeData === null || resizeData === void 0 ? void 0 : resizeData.length) {
        columnApi.setColumnWidths(resizeData);
    }
    resizedColumnsStore.addAllMeasureColumn(columnWidth, allColumns !== null && allColumns !== void 0 ? allColumns : []);
}
export function resizeWeakMeasureColumns(tableDescriptor, columnApi, resizedColumnsStore, column) {
    const allColumns = columnApi.getAllColumns();
    resizedColumnsStore.addWeekMeasureColumn(column);
    allColumns === null || allColumns === void 0 ? void 0 : allColumns.forEach((col) => {
        const colDesc = tableDescriptor.getCol(col);
        const weakColumnWidth = resizedColumnsStore.getMatchedWeakMeasuresColumnWidth(colDesc);
        if (isMeasureColumn(col) && weakColumnWidth) {
            columnApi.setColumnWidth(col, weakColumnWidth.measureColumnWidthItem.width.value);
            col.getColDef().suppressSizeToFit = true;
        }
    });
}
function getAllowGrowToFitProp(allowGrowToFit) {
    return allowGrowToFit ? { allowGrowToFit } : {};
}
export function getMaxWidth(context, text, hasSort, maxWidth, font) {
    if (!text) {
        return;
    }
    context.font = font;
    const width = hasSort
        ? context.measureText(text).width + SORT_ICON_WIDTH
        : context.measureText(text).width;
    return maxWidth === undefined || width > maxWidth ? width : undefined;
}
export function getMaxWidthCached(context, text, maxWidth, widthsCache, font) {
    const cacheKey = font ? `${font}:${text}` : text;
    const cachedWidth = widthsCache.get(cacheKey);
    let width;
    if (cachedWidth === undefined) {
        context.font = font;
        width = context.measureText(text).width;
        widthsCache.set(cacheKey, width);
    }
    else {
        width = cachedWidth;
    }
    return maxWidth === undefined || width > maxWidth ? width : undefined;
}
const shouldApplyFormatting = (col, config) => {
    const transposed = config.tableDescriptor.isTransposed();
    return isSeriesCol(col) || (transposed && isScopeCol(col)) || isMixedValuesCol(col);
};
function collectWidths(config, row, column, maxWidths, font, rowIndex) {
    var _a;
    const { context, gridApi, columnApi } = config;
    const col = config.tableDescriptor.getCol(column);
    const colDef = column.getColDef();
    if (col && context) {
        const text = row[col.id];
        let formattedText = undefined;
        const valueFormatter = colDef.valueFormatter;
        if (valueFormatter && shouldApplyFormatting(col, config) && typeof valueFormatter === "function") {
            formattedText = valueFormatter({
                data: row,
                value: text,
                column,
                colDef,
                columnApi,
                api: gridApi,
                node: null,
                context: undefined,
            });
        }
        const textForCalculation = formattedText || text;
        const maxWidth = col.id ? maxWidths.get(col.id) : undefined;
        let possibleMaxWidth;
        if (config.cache) {
            // skip repeated (hidden values) from calculation, such can appear in the
            // subtotal row and we don't want to treat/measure them stylled as subtotals
            const isRepeated = (_a = config.groupingProvider) === null || _a === void 0 ? void 0 : _a.isRepeatedValue(col.id, rowIndex);
            if (!isRepeated) {
                possibleMaxWidth = getMaxWidthCached(context, textForCalculation, maxWidth, config.cache, font);
            }
        }
        else {
            possibleMaxWidth = getMaxWidth(context, textForCalculation, false, maxWidth, font);
        }
        if (possibleMaxWidth) {
            maxWidths.set(col.id, possibleMaxWidth);
        }
    }
}
function getColWidth(maxWidth, padding) {
    const newWidth = maxWidth ? Math.ceil(maxWidth + padding) : 0;
    return Math.min(Math.max(MIN_WIDTH, newWidth), AUTO_SIZED_MAX_WIDTH);
}
export function getUpdatedColumnDefs(columns, maxWidths, padding) {
    return columns.reduce((updatedColumnDefs, column) => {
        const colDef = column.getColDef();
        const colId = agColId(colDef);
        if (colId) {
            const maxWidth = maxWidths.get(colId);
            if (maxWidth) {
                updatedColumnDefs.push(Object.assign(Object.assign({}, colDef), { width: getColWidth(maxWidth, padding) }));
            }
        }
        return updatedColumnDefs;
    }, []);
}
const shouldStopCalculation = (config, calculatedColumnsTotalWidth) => config.columnAutoresizeOption === "viewport" &&
    config.clientWidth &&
    calculatedColumnsTotalWidth > config.clientWidth;
function calculateColumnWidths(config, resizedColumnsStore) {
    const { context, tableDescriptor } = config;
    const maxWidths = new Map();
    if (context) {
        let calculatedColumnsTotalWidth = 0;
        for (let i = 0; i < config.columns.length; i++) {
            const column = config.columns[i];
            const colDef = column.getColDef();
            const colId = agColId(colDef);
            const colDesc = tableDescriptor.getCol(colId);
            const maxWidth = colId ? maxWidths.get(colId) : undefined;
            if (shouldStopCalculation(config, calculatedColumnsTotalWidth)) {
                break;
            }
            if (config.measureHeaders) {
                const font = getMeasureHeadersFont(colDef, config);
                const possibleMaxWidth = getMaxWidth(context, colDef.headerName, !!colDef.sort, maxWidth, font);
                if (colId && possibleMaxWidth) {
                    maxWidths.set(colId, possibleMaxWidth);
                }
            }
            config.rowData.forEach((row, index) => {
                const font = getRowDataFont(colDef, row, config, colDesc);
                collectWidths(config, row, column, maxWidths, font, index);
            });
            config.totalData.forEach((row, index) => {
                collectWidths(config, row, column, maxWidths, config.totalFont, index);
            });
            if (config.columnAutoresizeOption === "viewport") {
                const finalMaxWidth = colId ? maxWidths.get(colId) : undefined;
                const manuallyResizedColumn = resizedColumnsStore.getManuallyResizedColumn(column);
                // total width used for stopping calculation should prefer manual width over autowidth
                calculatedColumnsTotalWidth += manuallyResizedColumn
                    ? manuallyResizedColumn.width
                    : getColWidth(finalMaxWidth, config.padding);
            }
        }
    }
    return getUpdatedColumnDefs(config.columns, maxWidths, config.padding);
}
function getDisplayedRowData(gridApi) {
    var _a;
    const rowCount = gridApi.getDisplayedRowCount();
    const rowData = [];
    for (let index = 0; index < rowCount; index++) {
        const item = (_a = gridApi.getDisplayedRowAtIndex(index)) === null || _a === void 0 ? void 0 : _a.data;
        if (item) {
            rowData.push(item);
        }
    }
    return rowData;
}
function getDisplayedTotalData(gridApi) {
    var _a;
    const totalCount = gridApi.getPinnedBottomRowCount();
    const totalData = [];
    for (let index = 0; index < totalCount; index++) {
        const item = (_a = gridApi === null || gridApi === void 0 ? void 0 : gridApi.getPinnedBottomRow(index)) === null || _a === void 0 ? void 0 : _a.data;
        if (item) {
            totalData.push(item);
        }
    }
    return totalData;
}
function getTableFont(containerRef, className, defaultFont) {
    const element = containerRef.getElementsByClassName(className)[0];
    if (!element) {
        return defaultFont;
    }
    const { font, fontWeight, fontSize, fontFamily } = window.getComputedStyle(element);
    return isEmpty(font) ? `${fontWeight} ${fontSize} ${fontFamily}` : font;
}
function getTableFonts(containerRef) {
    /**
     * All fonts are gotten from first element with given class. Once we will have font different for each cell/header/row this will not work
     */
    const headerFont = getTableFont(containerRef, HEADER_LABEL_CLASS, DEFAULT_HEADER_FONT);
    const rowFont = getTableFont(containerRef, VALUE_CLASS, DEFAULT_ROW_FONT);
    const subtotalFont = getTableFont(containerRef, ROW_SUBTOTAL_CLASS, DEFAULT_SUBTOTAL_FONT);
    const totalFont = getTableFont(containerRef, ROW_TOTAL_CLASS, DEFAULT_TOTAL_FONT);
    const subtotalColumnFont = getTableFont(containerRef, COLUMN_SUBTOTAL_CLASS, DEFAULT_SUBTOTAL_FONT);
    const totalColumnFont = getTableFont(containerRef, COLUMN_TOTAL_CLASS, DEFAULT_TOTAL_FONT);
    return { headerFont, rowFont, subtotalFont, totalFont, subtotalColumnFont, totalColumnFont };
}
function getMeasureHeadersFont(colDef, config) {
    if (isColumnTotal(colDef)) {
        return config.totalColumnFont;
    }
    else if (isColumnSubtotal(colDef)) {
        return config.subtotalColumnFont;
    }
    else {
        return config.headerFont;
    }
}
function getRowDataFont(colDef, row, config, colDesc) {
    const isScopeOrMixedValuesCol = isScopeCol(colDesc) || isMixedValuesCol(colDesc);
    if (isColumnTotal(colDef) || (isScopeOrMixedValuesCol && colDesc.isTotal)) {
        return config.totalColumnFont;
    }
    else if (isColumnSubtotal(colDef) || (isScopeOrMixedValuesCol && colDesc.isSubtotal)) {
        return config.subtotalColumnFont;
    }
    else if (isSomeTotal(row.type)) {
        return config.subtotalFont;
    }
    else {
        return config.rowFont;
    }
}
/**
 * Ag-Grid API set desired column sizes (it *mutates* pivot table columns data).
 */
export async function autoresizeAllColumns(columnApi, autoResizedColumns) {
    if (columnApi) {
        const columns = columnApi.getPrimaryColumns();
        // Resizing large number of columns is performance-intensive, so split the processing
        // to async chunks to not block main thread until the whole resizing is completed.
        const chunks = chunk(columns, COLUMN_RESIZE_CHUNK_SIZE);
        for (const ch of chunks) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    const resizeData = ch.reduce((acc, column) => {
                        const columnDef = column.getColDef();
                        const colId = agColId(columnDef);
                        const autoResizedColumn = autoResizedColumns[colId];
                        if (colId && autoResizedColumn && autoResizedColumn.width) {
                            acc.push({ key: colId, newWidth: autoResizedColumn.width });
                        }
                        return acc;
                    }, []);
                    columnApi.setColumnWidths(resizeData);
                    resolve();
                });
            });
        }
    }
}
/**
 * Custom implementation of columns autoresizing according content: https://en.morzel.net/post/resizing-all-ag-gird-react-columns
 * Calculate the width of text for each grid cell and collect the minimum width needed for each of the gird columns.
 * Text width calculation is done efficiently with measureText method on Canvas.
 */
export function getAutoResizedColumns(tableDescriptor, gridApi, columnApi, execution, resizingConfig, resizedColumnsStore, options, groupingProvider) {
    var _a;
    const { containerRef, columnAutoresizeOption, clientWidth } = resizingConfig;
    if (tableDescriptor && gridApi && columnApi && execution && containerRef) {
        const columns = (_a = columnApi.getPrimaryColumns()) !== null && _a !== void 0 ? _a : [];
        const { headerFont, rowFont, subtotalFont, totalFont, subtotalColumnFont, totalColumnFont } = getTableFonts(containerRef);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const rowData = getDisplayedRowData(gridApi);
        const totalData = getDisplayedTotalData(gridApi);
        const autoResizedColumns = {};
        const updatedColumDefs = calculateColumnWidths({
            tableDescriptor,
            context,
            columns,
            rowData,
            totalData,
            measureHeaders: options.measureHeaders,
            headerFont,
            subtotalFont,
            totalFont,
            subtotalColumnFont,
            totalColumnFont,
            rowFont,
            padding: options.padding,
            separators: options.separators,
            cache: new Map(),
            columnAutoresizeOption,
            clientWidth,
            groupingProvider,
            gridApi,
            columnApi,
        }, resizedColumnsStore);
        updatedColumDefs.forEach((columnDef) => {
            if (agColId(columnDef) && columnDef.width !== undefined) {
                autoResizedColumns[agColId(columnDef)] = {
                    width: columnDef.width,
                };
            }
        });
        return autoResizedColumns;
    }
    return {};
}
export const isColumnAutoresizeEnabled = (columnAutoresizeOption) => columnAutoresizeOption === "viewport" || columnAutoresizeOption === "autoresizeAll";
//# sourceMappingURL=columnSizing.js.map