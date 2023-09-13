// (C) 2007-2022 GoodData Corporation
import { TableDescriptor } from "./structure/tableDescriptor.js";
import { createExportFunction, DataViewFacade, emptyHeaderTitleFromIntl, } from "@gooddata/sdk-ui";
import { AUTO_SIZED_MAX_WIDTH, autoresizeAllColumns, getAutoResizedColumns, isColumnAutoResized, MANUALLY_SIZED_MAX_WIDTH, resetColumnsWidthToDefault, resizeAllMeasuresColumns, ResizedColumnsStore, resizeWeakMeasureColumns, syncSuppressSizeToFitOnColumns, updateColumnDefinitionsWithWidths, isColumnAutoresizeEnabled, } from "./resizing/columnSizing.js";
import { UIClick } from "../columnWidths.js";
import { createAgGridDatasource } from "./data/dataSource.js";
import { defFingerprint } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { setColumnMaxWidth, setColumnMaxWidthIf } from "./base/agColumnWrapper.js";
import { agColIds, isMeasureColumn, isMeasureOrAnyColumnTotal } from "./base/agUtils.js";
import { agColId } from "./structure/tableDescriptorTypes.js";
import { sleep } from "./utils.js";
import { DEFAULT_AUTOSIZE_PADDING, DEFAULT_ROW_HEIGHT } from "./base/constants.js";
import { getAvailableDrillTargets } from "./drilling/drillTargets.js";
import identity from "lodash/identity.js";
import ApiWrapper from "./base/agApiWrapper.js";
import { initializeStickyRow, stickyRowExists, updateStickyRowContentClassesAndData, updateStickyRowPosition, } from "./stickyRowHandler.js";
const HEADER_CELL_BORDER = 1;
const COLUMN_RESIZE_TIMEOUT = 300;
/**
 * This class is a collection of higher-level operations with the table. On top of that the facade keeps track
 * of the state of the data rendered by the table (currentResult, visibleData etc).
 *
 * The facade uses different other sub-modules to get the job done. Most notable are:
 *
 * -  table descriptor
 * -  ag-grid data source
 * -  column resizing store & functions related to it
 * -  sticky row handler and the related ag-grid API Wrapper
 *
 * TODO: This class requires further refactoring. The state maintained by the table is problematic. It needs
 *  to belong to something else. The data related stuff should likely go into the data source and for the
 *  resizing we need some additional higher-level component on top of the resized column store & friends.
 */
export class TableFacade {
    constructor(result, dataView, tableMethods, props) {
        this.destroyed = false;
        this.finishInitialization = (gridApi, columnApi) => {
            invariant(this.gridApi === undefined);
            invariant(this.agGridDataSource);
            this.gridApi = gridApi;
            this.columnApi = columnApi;
            this.gridApi.setDatasource(this.agGridDataSource);
        };
        this.refreshData = () => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return;
            }
            // make ag-grid refresh data
            // see: https://www.ag-grid.com/javascript-grid-infinite-scrolling/#changing-the-datasource
            gridApi.setDatasource(this.agGridDataSource);
        };
        /**
         * Destroys the facade; this must do any essential cleanup of the resources and state so as to ensure
         * that any asynchronous processing that may be connected to this facade will be muted.
         *
         * This is essential to prevent this error from happening: https://github.com/ag-grid/ag-grid/issues/3334
         *
         * The error (while manifesting in ag-grid) is related to operating with a gridApi that is not connected
         * to a currently rendered table. Various errors occur in ag-grid but those are all symptoms of working
         * with a zombie.
         *
         * As is, destroy will clean up all references to gridApi & column api, so that no code that already relies
         * on their existence gets short-circuited.
         */
        this.destroy = () => {
            // in spirit of cleaning up the table & the old state, facade should call destroy() on
            // the gridApi. The table never did that so i'm not going to temp the 'luck' at the moment
            this.gridApi = undefined;
            this.columnApi = undefined;
            this.destroyed = true;
        };
        this.isFullyInitialized = () => {
            return this.gridApi !== undefined;
        };
        /**
         * Tests whether the table's data source is currently undergoing transformation & data loading. This will
         * be return true when for instance sorts or totals change and the table's data source drives new execution
         * with the updated sorts or totals.
         */
        this.isTransforming = () => {
            return this.transformedExecution !== undefined;
        };
        this.clearFittedColumns = () => {
            this.growToFittedColumns = {};
        };
        /**
         * All functions in the entire table should use this gridApiGuard to access an instance of ag-grid's GridApi.
         *
         * If the table facade is destroyed, the guard always returns false and emits a debug log. Otherwise it just
         * returns the current value of gridApi field.
         */
        this.gridApiGuard = () => {
            if (!this.destroyed) {
                return this.gridApi;
            }
            // eslint-disable-next-line no-console
            console.debug("Attempting to obtain gridApi for a destructed table.");
            return undefined;
        };
        this.updateColumnWidths = (resizingConfig) => {
            this.resizedColumnsStore.updateColumnWidths(resizingConfig.widths);
            updateColumnDefinitionsWithWidths(this.tableDescriptor, this.resizedColumnsStore, this.autoResizedColumns, resizingConfig.defaultWidth, resizingConfig.growToFit, this.growToFittedColumns);
        };
        this.createDataSource = (tableMethods) => {
            this.onPageLoadedCallback = tableMethods.onPageLoaded;
            return createAgGridDatasource({
                tableDescriptor: this.tableDescriptor,
                getGroupRows: tableMethods.getGroupRows,
                getColumnTotals: tableMethods.getColumnTotals,
                getRowTotals: tableMethods.getRowTotals,
                getColumnHeadersPosition: tableMethods.getColumnHeadersPosition,
                onPageLoaded: this.onPageLoaded,
                onExecutionTransformed: this.onExecutionTransformed,
                onTransformedExecutionFailed: this.onTransformedExecutionFailed,
                dataViewTransform: identity,
            }, this.visibleData, this.gridApiGuard, this.intl);
        };
        this.onExecutionTransformed = (newExecution) => {
            var _a;
            // eslint-disable-next-line no-console
            console.debug("onExecutionTransformed", newExecution.definition);
            this.transformedExecution = newExecution;
            (_a = this.onExecutionTransformedCallback) === null || _a === void 0 ? void 0 : _a.call(this, newExecution);
        };
        this.onTransformedExecutionFailed = () => {
            this.transformedExecution = undefined;
        };
        this.onPageLoaded = (dv) => {
            var _a;
            const oldResult = this.currentResult;
            this.transformedExecution = undefined;
            this.currentResult = dv.result();
            this.visibleData = dv;
            this.currentFingerprint = defFingerprint(this.currentResult.definition);
            (_a = this.onPageLoadedCallback) === null || _a === void 0 ? void 0 : _a.call(this, dv, !(oldResult === null || oldResult === void 0 ? void 0 : oldResult.equals(this.currentResult)));
        };
        this.createExportFunction = (title) => {
            return createExportFunction(this.currentResult, title);
        };
        this.getAvailableDrillTargets = () => {
            var _a, _b;
            return getAvailableDrillTargets(this.visibleData, (_a = this.config) === null || _a === void 0 ? void 0 : _a.measureGroupDimension, (_b = this.config) === null || _b === void 0 ? void 0 : _b.columnHeadersPosition);
        };
        this.refreshHeader = () => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return;
            }
            gridApi.refreshHeader();
        };
        this.growToFit = (resizingConfig) => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return;
            }
            invariant(this.columnApi);
            const columns = this.columnApi.getAllColumns();
            invariant(columns);
            this.resetColumnsWidthToDefault(resizingConfig, columns);
            this.clearFittedColumns();
            const widths = columns.map((column) => column.getActualWidth());
            const sumOfWidths = widths.reduce((a, b) => a + b, 0);
            if (sumOfWidths < resizingConfig.clientWidth) {
                const columnIds = agColIds(columns);
                setColumnMaxWidth(this.columnApi, columnIds, undefined);
                this.sizeColumnsToFitWithoutColumnReset(resizingConfig);
                setColumnMaxWidthIf(this.columnApi, columnIds, MANUALLY_SIZED_MAX_WIDTH, (column) => column.getActualWidth() <= MANUALLY_SIZED_MAX_WIDTH);
                this.setFittedColumns();
            }
        };
        this.setFittedColumns = () => {
            invariant(this.columnApi);
            const columns = this.columnApi.getAllColumns();
            invariant(columns);
            columns.forEach((col) => {
                const id = agColId(col);
                this.growToFittedColumns[id] = {
                    width: col.getActualWidth(),
                };
            });
        };
        this.resetColumnsWidthToDefault = (resizingConfig, columns) => {
            invariant(this.columnApi);
            resetColumnsWidthToDefault(this.columnApi, columns, this.resizedColumnsStore, this.autoResizedColumns, resizingConfig.defaultWidth);
        };
        this.applyColumnSizes = (resizingConfig) => {
            invariant(this.columnApi);
            this.resizedColumnsStore.updateColumnWidths(resizingConfig.widths);
            syncSuppressSizeToFitOnColumns(this.resizedColumnsStore, this.columnApi);
            if (resizingConfig.growToFit) {
                this.growToFit(resizingConfig); // calls resetColumnsWidthToDefault internally too
            }
            else {
                const columns = this.columnApi.getAllColumns();
                invariant(columns);
                this.resetColumnsWidthToDefault(resizingConfig, columns);
            }
        };
        this.autoresizeColumns = async (resizingConfig, force = false) => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return false;
            }
            invariant(this.columnApi);
            if (this.resizing && !force) {
                return false;
            }
            const alreadyResized = () => this.resizing;
            if (this.isPivotTableReady() && (!alreadyResized() || (alreadyResized() && force))) {
                this.resizing = true;
                // we need to know autosize width for each column, even manually resized ones, to support removal of columnWidth def from props
                await this.autoresizeAllColumns(resizingConfig);
                // after that we need to reset manually resized columns back to its manually set width by growToFit or by helper. See UT resetColumnsWidthToDefault for width priorities
                if (resizingConfig.growToFit) {
                    this.growToFit(resizingConfig);
                }
                else if (isColumnAutoresizeEnabled(resizingConfig.columnAutoresizeOption) &&
                    this.shouldPerformAutoresize()) {
                    const columns = this.columnApi.getAllColumns();
                    invariant(columns);
                    this.resetColumnsWidthToDefault(resizingConfig, columns);
                }
                this.resizing = false;
                return true;
            }
            return false;
        };
        this.autoresizeAllColumns = async (resizingConfig) => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return;
            }
            invariant(this.columnApi);
            if (!this.shouldPerformAutoresize() ||
                !isColumnAutoresizeEnabled(resizingConfig.columnAutoresizeOption)) {
                return Promise.resolve();
            }
            await sleep(COLUMN_RESIZE_TIMEOUT);
            /*
             * Ensures correct autoResizeColumns
             */
            this.updateAutoResizedColumns(resizingConfig);
            await autoresizeAllColumns(this.columnApi, this.autoResizedColumns);
        };
        this.updateAutoResizedColumns = (resizingConfig) => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return;
            }
            invariant(this.columnApi);
            invariant(resizingConfig.containerRef);
            this.autoResizedColumns = getAutoResizedColumns(this.tableDescriptor, gridApi, this.columnApi, this.currentResult, resizingConfig, this.resizedColumnsStore, {
                measureHeaders: true,
                padding: 2 * DEFAULT_AUTOSIZE_PADDING + HEADER_CELL_BORDER,
                separators: resizingConfig.separators,
            }, this.getGroupingProvider());
        };
        this.getRowNodes = () => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return [];
            }
            const rowData = [];
            gridApi.forEachNode((node) => rowData.push(node.data));
            return rowData;
        };
        this.isPivotTableReady = () => {
            if (!this.gridApi || this.destroyed) {
                return false;
            }
            const api = this.gridApi;
            const noRowHeadersOrRows = () => {
                return Boolean(this.visibleData.rawData().isEmpty() && this.visibleData.meta().hasNoHeadersInDim(0));
            };
            const dataRendered = () => {
                return noRowHeadersOrRows() || api.getRenderedNodes().length > 0;
            };
            const tablePagesLoaded = () => {
                const pages = api.getCacheBlockState();
                return (pages &&
                    Object.keys(pages).every((pageId) => pages[pageId].pageStatus === "loaded" || pages[pageId].pageStatus === "failed"));
            };
            return tablePagesLoaded() && dataRendered();
        };
        this.shouldPerformAutoresize = () => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return false;
            }
            const horizontalPixelRange = gridApi.getHorizontalPixelRange();
            const verticalPixelRange = gridApi.getVerticalPixelRange();
            return horizontalPixelRange.left === 0 && verticalPixelRange.top === 0;
        };
        this.isColumnAutoResized = (resizedColumnId) => {
            return isColumnAutoResized(this.autoResizedColumns, resizedColumnId);
        };
        this.resetResizedColumn = async (column) => {
            var _a;
            if (!this.tableDescriptor) {
                return;
            }
            const id = agColId(column);
            if (this.resizedColumnsStore.isColumnManuallyResized(column)) {
                this.resizedColumnsStore.removeFromManuallyResizedColumn(column);
            }
            column.getColDef().suppressSizeToFit = false;
            if (this.isColumnAutoResized(id)) {
                (_a = this.columnApi) === null || _a === void 0 ? void 0 : _a.setColumnWidth(column, this.autoResizedColumns[id].width);
                return;
            }
            this.autoresizeColumnsByColumnId(this.columnApi, agColIds([column]));
            this.resizedColumnsStore.addToManuallyResizedColumn(column, true);
        };
        this.autoresizeColumnsByColumnId = (columnApi, columnIds) => {
            setColumnMaxWidth(columnApi, columnIds, AUTO_SIZED_MAX_WIDTH);
            columnApi.autoSizeColumns(columnIds);
            setColumnMaxWidth(columnApi, columnIds, MANUALLY_SIZED_MAX_WIDTH);
        };
        this.onColumnsManualReset = async (resizingConfig, columns) => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return;
            }
            invariant(this.columnApi);
            let columnsToReset = columns;
            if (this.isAllMeasureOrAnyColumnTotalResizeOperation(resizingConfig, columns)) {
                this.resizedColumnsStore.removeAllMeasureColumns();
                columnsToReset = this.getAllMeasureOrAnyTotalColumns();
            }
            if (this.isWeakMeasureResizeOperation(resizingConfig, columns)) {
                columnsToReset = this.resizedColumnsStore.getMatchingColumnsByMeasure(columns[0], this.getAllMeasureColumns());
                this.resizedColumnsStore.removeWeakMeasureColumn(columns[0]);
            }
            for (const column of columnsToReset) {
                await this.resetResizedColumn(column);
            }
            this.afterOnResizeColumns(resizingConfig);
        };
        this.getAllMeasureOrAnyTotalColumns = () => {
            invariant(this.columnApi);
            const columns = this.columnApi.getAllColumns();
            invariant(columns);
            return columns.filter((col) => isMeasureOrAnyColumnTotal(col));
        };
        this.getAllMeasureColumns = () => {
            invariant(this.columnApi);
            const columns = this.columnApi.getAllColumns();
            invariant(columns);
            return columns.filter((col) => isMeasureColumn(col));
        };
        this.onColumnsManualResized = (resizingConfig, columns) => {
            if (this.isAllMeasureOrAnyColumnTotalResizeOperation(resizingConfig, columns)) {
                resizeAllMeasuresColumns(this.columnApi, this.resizedColumnsStore, columns[0]);
            }
            else if (this.isWeakMeasureResizeOperation(resizingConfig, columns)) {
                resizeWeakMeasureColumns(this.tableDescriptor, this.columnApi, this.resizedColumnsStore, columns[0]);
            }
            else {
                columns.forEach((column) => {
                    this.resizedColumnsStore.addToManuallyResizedColumn(column);
                });
            }
            this.afterOnResizeColumns(resizingConfig);
        };
        this.onManualColumnResize = async (resizingConfig, columns) => {
            this.numberOfColumnResizedCalls++;
            await sleep(COLUMN_RESIZE_TIMEOUT);
            if (this.numberOfColumnResizedCalls === UIClick.DOUBLE_CLICK) {
                this.numberOfColumnResizedCalls = 0;
                await this.onColumnsManualReset(resizingConfig, columns);
            }
            else if (this.numberOfColumnResizedCalls === UIClick.CLICK) {
                this.numberOfColumnResizedCalls = 0;
                this.onColumnsManualResized(resizingConfig, columns);
            }
        };
        this.afterOnResizeColumns = (resizingConfig) => {
            var _a;
            if (resizingConfig.growToFit) {
                this.growToFit(resizingConfig);
            }
            const columnWidths = this.resizedColumnsStore.getColumnWidthsFromMap();
            (_a = resizingConfig.onColumnResized) === null || _a === void 0 ? void 0 : _a.call(resizingConfig, columnWidths);
        };
        this.getGroupingProvider = () => {
            invariant(this.agGridDataSource);
            return this.agGridDataSource.getGroupingProvider();
        };
        this.createSortItems = (columns) => {
            return this.tableDescriptor.createSortItems(columns, this.currentResult.definition.sortBy);
        };
        this.getSortItems = () => {
            return this.currentResult.definition.sortBy;
        };
        this.getTotalBodyHeight = () => {
            var _a, _b, _c;
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return 0;
            }
            const dv = this.visibleData;
            const rowCount = dv.rawData().firstDimSize();
            let headerRowsMovedToDataRowsCount = 0;
            if (((_a = this.config) === null || _a === void 0 ? void 0 : _a.columnHeadersPosition) === "left" && this.tableDescriptor.isTransposed()) {
                headerRowsMovedToDataRowsCount = dv.meta().attributeHeadersForDim(1).length; // count of column attributes now rendered in normal rows
            }
            const rowAggregationCount = (_c = (_b = dv.rawData().rowTotals()) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
            const headerHeight = ApiWrapper.getHeaderHeight(gridApi);
            // add small room for error to avoid scrollbars that scroll one, two pixels
            // increased in order to resolve issue BB-1509
            const leeway = 2;
            const bodyHeight = (rowCount + headerRowsMovedToDataRowsCount) * DEFAULT_ROW_HEIGHT + leeway;
            const footerHeight = rowAggregationCount * DEFAULT_ROW_HEIGHT;
            return headerHeight + bodyHeight + footerHeight;
        };
        this.updateStickyRowContent = (stickyCtx) => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return;
            }
            updateStickyRowContentClassesAndData(stickyCtx.scrollPosition, stickyCtx.lastScrollPosition, DEFAULT_ROW_HEIGHT, gridApi, this.getGroupingProvider(), ApiWrapper);
        };
        this.updateStickyRowPosition = () => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return;
            }
            updateStickyRowPosition(gridApi);
        };
        /**
         * Initializes a single empty pinned top row in ag-grid. This is where table code can push sticky row data
         * as user keeps scrolling the table.
         */
        this.initializeStickyRow = () => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return;
            }
            initializeStickyRow(gridApi);
        };
        /**
         * Clears the pinned top row in ag-grid.
         */
        this.clearStickyRow = () => {
            //
            this.initializeStickyRow();
        };
        this.stickyRowExists = () => {
            const gridApi = this.gridApiGuard();
            if (!gridApi) {
                return false;
            }
            return stickyRowExists(gridApi);
        };
        this.getRowCount = () => {
            var _a;
            if (((_a = this.config) === null || _a === void 0 ? void 0 : _a.columnHeadersPosition) === "left" && this.tableDescriptor.isTransposed()) {
                /**
                 * in case of metrics in rows and column attributes on left
                 * the table has no header and its elements hierarchy is rendered in normal rows.
                 * It completely messes up ag-grid approach and data loading via dataSource. Only benefit is to have all rows scrollable instead of sticky header.
                 */
                return (this.visibleData.rawData().firstDimSize() +
                    this.visibleData.meta().attributeHeadersForDim(1).length);
            }
            return this.visibleData.rawData().firstDimSize();
        };
        this.getDrillDataContext = () => {
            return this.visibleData;
        };
        this.isResizing = () => {
            return this.resizing;
        };
        this.setTooltipFields = () => {
            invariant(this.columnApi);
            const columns = this.columnApi.getAllColumns();
            invariant(columns);
            columns.forEach((col) => {
                const colDef = col.getColDef();
                colDef.tooltipField = colDef.field;
            });
        };
        this.intl = props.intl;
        this.currentResult = result;
        this.visibleData = DataViewFacade.for(dataView);
        this.currentFingerprint = defFingerprint(this.currentResult.definition);
        this.tableDescriptor = TableDescriptor.for(this.visibleData, emptyHeaderTitleFromIntl(props.intl), props.config, props.intl);
        this.autoResizedColumns = {};
        this.growToFittedColumns = {};
        this.resizing = false;
        this.resizedColumnsStore = new ResizedColumnsStore(this.tableDescriptor);
        this.numberOfColumnResizedCalls = 0;
        this.agGridDataSource = this.createDataSource(tableMethods);
        this.onExecutionTransformedCallback = tableMethods.onExecutionTransformed;
        this.updateColumnWidths(tableMethods.getResizingConfig());
        this.originalExecution = props.execution;
        this.config = props.config;
    }
    isAllMeasureOrAnyColumnTotalResizeOperation(resizingConfig, columns) {
        return (resizingConfig.isMetaOrCtrlKeyPressed &&
            columns.length === 1 &&
            isMeasureOrAnyColumnTotal(columns[0]));
    }
    isWeakMeasureResizeOperation(resizingConfig, columns) {
        return resizingConfig.isAltKeyPressed && columns.length === 1 && isMeasureColumn(columns[0]);
    }
    /**
     * Do what ag-grid used to do in sizeColumnsToFit in version 22.
     *
     * In ag-grid 25 the sizeColumnsToFit unfortunately calls resetWidth on all columns at the start, which in effect
     * resets all of our autosizing values and makes the growToFit unusable with defaultWidth: "autoresizeAll".
     * There is no parameter or other way to opt-out of this newly added reset.
     *
     * So we use the same logic as ag-grid 22 did in order to make both growToFit and autoresizeAll work together.
     * Ideally, this would not be needed and we should devise some other way of working around the fact
     * that ag-grid 25 resets column widths here.
     *
     * The comments in code are original from the ag-grid 22 code base.
     */
    sizeColumnsToFitWithoutColumnReset(resizingConfig) {
        var _a;
        invariant(this.columnApi);
        const source = "sizeColumnsToFit";
        const gridWidth = resizingConfig.clientWidth;
        // avoid divide by zero
        const allDisplayedColumns = (_a = this.columnApi) === null || _a === void 0 ? void 0 : _a.getAllDisplayedColumns();
        if (gridWidth <= 0 || !allDisplayedColumns.length) {
            return;
        }
        let colsToSpread = [];
        const colsToNotSpread = [];
        allDisplayedColumns.forEach(function (column) {
            if (column.getColDef().suppressSizeToFit === true) {
                colsToNotSpread.push(column);
            }
            else {
                colsToSpread.push(column);
            }
        });
        let finishedResizing = false;
        function moveToNotSpread(column) {
            colsToSpread = colsToSpread.filter((col) => col != column);
            colsToNotSpread.push(column);
        }
        while (!finishedResizing) {
            finishedResizing = true;
            const availablePixels = gridWidth - this.getWidthOfColsInList(colsToNotSpread);
            if (availablePixels <= 0) {
                // no width, set everything to minimum
                colsToSpread.forEach(function (column) {
                    column.setMinimum(source);
                });
            }
            else {
                const scale = availablePixels / this.getWidthOfColsInList(colsToSpread);
                // we set the pixels for the last col based on what's left, as otherwise
                // we could be a pixel or two short or extra because of rounding errors.
                let pixelsForLastCol = availablePixels;
                // backwards through loop, as we are removing items as we go
                for (let i = colsToSpread.length - 1; i >= 0; i--) {
                    const column = colsToSpread[i];
                    const newWidth = Math.round(column.getActualWidth() * scale);
                    if (newWidth < column.getMinWidth()) {
                        column.setMinimum(source);
                        moveToNotSpread(column);
                        finishedResizing = false;
                    }
                    else if (column.isGreaterThanMax(newWidth)) {
                        column.setActualWidth(column.getMaxWidth(), source);
                        moveToNotSpread(column);
                        finishedResizing = false;
                    }
                    else {
                        const onLastCol = i === 0;
                        if (onLastCol) {
                            column.setActualWidth(pixelsForLastCol, source);
                        }
                        else {
                            column.setActualWidth(newWidth, source);
                        }
                    }
                    pixelsForLastCol -= newWidth;
                }
            }
        }
        // DANGER: using ag-grid internals
        this.columnApi.columnModel.setLeftValues(source);
        this.columnApi.columnModel.updateBodyWidths();
    }
    getWidthOfColsInList(columnList) {
        return columnList.reduce((width, col) => width + col.getActualWidth(), 0);
    }
    /**
     * Tests whether the provided prepared execution matches the execution that is used to obtain data for this
     * table facade.
     *
     * This is slightly trickier as it needs to accommodate for situations where the underlying execution
     * is being transformed to include new server side sorts / totals. If that operation is in progress, then
     * the transformedExecution will be defined. The code should only compare against this 'soon to be next'
     * execution. This is essential to 'sink' any unneeded full reinits that may happen in some contexts (such as AD)
     * which also listen to sort/total changes and prepare execution for the table from outside. Since
     * the transformation is already in progress, there is no point to reacting to these external stimuli.
     *
     * If the transformation is not happening, then the table is showing data for an existing execution result - in that
     * case the matching goes against the definition backing that result.
     */
    isMatchingExecution(other) {
        if (this.originalExecution.fingerprint() === other.fingerprint()) {
            return true;
        }
        else {
            // eslint-disable-next-line no-console
            console.debug("Original execution fingerprint does not match.");
        }
        if (this.transformedExecution) {
            const matchingTransformed = this.transformedExecution.fingerprint() === other.fingerprint();
            if (!matchingTransformed) {
                // eslint-disable-next-line no-console
                console.debug("transformed execution does not match", this.transformedExecution.definition, other.definition);
            }
            return matchingTransformed;
        }
        const matchingCurrentlyRendered = this.currentFingerprint === other.fingerprint();
        if (!matchingCurrentlyRendered) {
            // eslint-disable-next-line no-console
            console.debug("current result does not match", this.currentResult.definition, other.definition);
        }
        return matchingCurrentlyRendered;
    }
}
//# sourceMappingURL=tableFacade.js.map