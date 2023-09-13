// (C) 2007-2022 GoodData Corporation
import { AllCommunityModules, } from "@ag-grid-community/all-modules";
import { v4 as uuidv4 } from "uuid";
import { AgGridReact } from "@ag-grid-community/react";
import React from "react";
import { injectIntl } from "react-intl";
import cx from "classnames";
import { BucketNames, createExportErrorFunction, ErrorCodes, ErrorComponent, IntlWrapper, LoadingComponent, newErrorMapping, } from "@gooddata/sdk-ui";
import { ThemeContextProvider, withTheme } from "@gooddata/sdk-ui-theme-provider";
import { getUpdatedColumnOrRowTotals } from "./impl/structure/headers/aggregationsMenuHelper.js";
import { getScrollbarWidth, sanitizeDefTotals, getTotalsForColumnsBucket } from "./impl/utils.js";
import isEqual from "lodash/isEqual.js";
import noop from "lodash/noop.js";
import debounce from "lodash/debounce.js";
import { invariant } from "ts-invariant";
import { isManualResizing, scrollBarExists } from "./impl/base/agUtils.js";
import { createGridOptions } from "./impl/gridOptions.js";
import { TableFacadeInitializer } from "./impl/tableFacadeInitializer.js";
import { InternalTableState } from "./tableState.js";
import { isColumnAutoresizeEnabled } from "./impl/resizing/columnSizing.js";
import cloneDeep from "lodash/cloneDeep.js";
const DEFAULT_COLUMN_WIDTH = 200;
const WATCHING_TABLE_RENDERED_INTERVAL = 500;
const AGGRID_ON_RESIZE_TIMEOUT = 300;
/**
 * This class implements pivot table using the community version of ag-grid.
 *
 * Bear in mind that this is not a typical, standard React component implementation; the main reason
 * behind that is that while ag-grid comes with a React component the ag-grid itself is not a React component
 * and vast majority of its APIs are non-React as well. You will therefore find that there is a lot of non-react
 * state flying around.
 *
 * Instead of looking at this implementation as a typical React component, look at it like a adapter between
 * React and ag-grid which is used to render data obtained using GD executions.
 *
 * The code in this class is built to reflect the adapter nature of the integration. The responsibility of this
 * component is to correctly handle the component lifecycle and orchestrate integration of React and ag-grid, React
 * and GoodData, React and GoodData and ag-grid.
 *
 * Lifecycle
 * ---------
 *
 * The goal of the table is to render data that it obtains from GD platform by driving an execution. To this end
 * the prop 'execution' contains an instance of Prepared Execution which is all set up and ready to run.
 *
 * Before rendering anything, the code must first drive this prepared execution completion in order to figure out
 * how the actual table should look like header-wise.
 *
 * Once the execution completes successfully code will process the result and the metadata included within
 * to construct table headers for ag-grid and prepare an ag-grid data source that the ag-grid will use to read
 * pages of data from backend. Note: while constructing table headers, the code will also apply manual column
 * sizing settings.
 *
 * With this ready, the component can render the actual ag-grid table. It will create ag-grid options with
 * all the necessary metadata and customizations.
 *
 * After the table is successfully rendered, the code may (depending on props) apply grow-to-width and auto-resizing
 * logic on the table columns. And then finally it will determine and set the sticky row contents.
 *
 * At this point when the table is rendered, the users may interact with it and change sorting or add totals
 * or subtotals. All of this is handled outside of React. These changes are handled in the ag-grid data source
 * implementation. As it discovers that different sorts or totals are needed, it will transform the original
 * prepared execution, add the extra settings and re-drive the execution. Once done, it will update the internal
 * state and ping ag-grid API to re-render the table.
 *
 * In case the client changes props (say modifying the prepared execution) the componentDidUpdate will determine
 * whether the full reinitialization is in order. If so the entire existing ag-grid and all our internal state
 * is thrown out and table is initialized from scratch.
 *
 * Notable sub-components
 * ----------------------
 *
 * All custom logic that we build on top of ag-grid has the entry point in `TableFacade`. The code in this component
 * relies on the facade to drive our custom table logic. This facade further delegates complex pieces of work
 * to other components. The most important are `TableDescriptor` and `ResizedColumnStore` + its friends.
 *
 * The `TableDescriptor` is responsible for figuring out how the table should look like and prepare column
 * descriptors and ag-grid ColDefs.
 *
 * The `ResizedColumnStore` & functions in its vicinity are responsible for implementation of our custom
 * table column resizing logic.
 *
 * Apart from these main components there is also our custom implementation of ag-grid data source - this is responsible
 * for getting correct data and transforming it to form that can be consumed by ag-gird. It is the data source where
 * our code has to figure out whether the sorts or totals have changed and if so update the execution to perform
 * the correct execution.
 *
 * Finally there is the sticky row handling which contains some nasty code & at times works with ag-grid internals
 * to get the job done.
 *
 * Control flow
 * ------------
 *
 * To maintain some kind of sanity in this complex component there are two general rules:
 *
 * 1.  TableMethods or its subtypes are the only way how pivot table component passes down its essential functions
 *     to sub-components.
 *
 * 2.  All table functionality and features MUST be orchestrated from the pivot table component itself.
 *     The facade or other subcomponents merely _do the work_ but they do not make 'high level decisions' of
 *     what the table should be doing.
 *
 * These rules are in place to try and get to 'top-down' control flow.
 *
 *
 * Known flaws
 * -----------
 *
 * -  The initial render & subsequent table column resizing is brittle and includes a async functions, timeouts, intervals
 *    etc.
 *
 *    This can be currently knocked out of balance if during initial table render the data source determines
 *    it needs to transform the execution (to include sorts for instance; this was often the case if AD sent execution
 *    definition with invalid sorts).
 *
 * -  The reinitialization of entire table is too aggressive at the moment. There are two most notable cases:
 *
 *    1.  Client changes drills; this will lead to reinit to correctly mark cells as drillable. Perhaps all we
 *        need it to trigger some kind of ag-grid cell refresh?
 *
 *    2.  Client changes prepared execution that comes in props. Any change means reinit. This is not really needed
 *        if only sorts or totals were added but the shape of the table looks the same.
 *
 * Debugging hints
 * ---------------
 *
 * Nothing renders: check out the problem with resizing & data source interplay.
 *
 *
 * @internal
 */
class CorePivotTableAgImpl extends React.Component {
    constructor(props) {
        super(props);
        //
        // Lifecycle
        //
        /**
         * Starts initialization of table that will show results of the provided prepared execution. If there is
         * already an initialization in progress for the table, this will abandon the previous initialization
         * and start a new one.
         *
         * During the initialization the code drives the execution and obtains the first page of data. Once that
         * is done, the initializer will construct the {@link TableFacade} with all the essential non-react
         * table & data state in it.
         *
         * After the initializer completes this, the table facade and the table itself is ready to render the
         * ag-grid component.
         *
         * @param execution - prepared execution to drive
         */
        this.initialize = (execution) => {
            this.internal.abandonInitialization();
            const initializer = new TableFacadeInitializer(execution, this.getTableMethods(), this.props);
            initializer.initialize().then((result) => {
                if (!result || this.internal.initializer !== result.initializer) {
                    /*
                     * This particular initialization was abandoned.
                     */
                    return;
                }
                this.internal.initializer = undefined;
                this.internal.table = result.table;
                this.setState({ readyToRender: true });
            });
            return initializer;
        };
        /**
         * Completely re-initializes the table in order to show data for the provided prepared execution. At this point
         * code has determined that the table layout for the other prepared execution differs from what is currently
         * shown and the only reasonable thing to do is to throw everything away and start from scratch.
         *
         * This will reset all React state and non-react state and start table initialization process.
         */
        this.reinitialize = (execution) => {
            this.setState({
                readyToRender: false,
                columnTotals: cloneDeep(sanitizeDefTotals(execution.definition)),
                rowTotals: getTotalsForColumnsBucket(execution.definition),
                error: undefined,
                desiredHeight: this.props.config.maxHeight,
                resized: false,
            }, () => {
                this.internal.destroy();
                this.internal = new InternalTableState();
                this.boundAgGridCallbacks = this.createBoundAgGridCallbacks();
                this.internal.initializer = this.initialize(execution);
            });
        };
        //
        // Render
        //
        this.setContainerRef = (container) => {
            this.containerRef = container;
            if (this.containerRef) {
                this.containerRef.addEventListener("mousedown", this.onContainerMouseDown);
            }
        };
        //
        // event handlers
        //
        this.onGridReady = (event) => {
            invariant(this.internal.table);
            this.internal.table.finishInitialization(event.api, event.columnApi);
            this.updateDesiredHeight();
            if (this.getGroupRows()) {
                this.internal.table.initializeStickyRow();
            }
            this.internal.table.setTooltipFields();
        };
        this.onFirstDataRendered = async (_event) => {
            invariant(this.internal.table);
            if (this.internal.firstDataRendered) {
                console.error("onFirstDataRendered called multiple times");
            }
            this.internal.firstDataRendered = true;
            // Since issue here is not resolved, https://github.com/ag-grid/ag-grid/issues/3263,
            // work-around by using 'setInterval'
            this.internal.startWatching(this.startWatchingTableRendered, WATCHING_TABLE_RENDERED_INTERVAL);
            /*
             * At this point data from backend is available, some of it is rendered and auto-resize can be done.
             *
             * See: https://www.ag-grid.com/javascript-grid-resizing/#resize-after-data
             *
             * I suspect now that the table life-cycle is somewhat more sane, we can follow the docs. For a good
             * measure, let's throw in a mild timeout. I have observed different results (slightly less space used)
             * when the timeout was not in place.
             */
            if (this.isColumnAutoresizeEnabled()) {
                await this.autoresizeColumns();
            }
            else if (this.isGrowToFitEnabled()) {
                this.growToFit();
            }
            this.updateStickyRow();
        };
        this.onModelUpdated = () => {
            this.updateStickyRow();
        };
        this.onGridColumnsChanged = () => {
            this.updateStickyRow();
        };
        this.onGridSizeChanged = (gridSizeChangedEvent) => {
            if (!this.internal.firstDataRendered) {
                // ag-grid does emit the grid size changed even before first data gets rendered (i suspect this is
                // to cater for the initial render where it goes from nothing to something that has the headers, and then
                // it starts rendering the data itself)
                //
                // Don't do anything, the resizing will be triggered after the first data is rendered
                return;
            }
            if (!this.internal.table) {
                return;
            }
            if (this.internal.table.isResizing()) {
                // don't do anything if the table is already resizing. this copies what we have in v7 line however
                // I think it opens room for racy/timing behavior. if the window is resized _while_ the table is resizing
                // it is likely that it will not respect current window size.
                //
                // keeping it like this for now. if needed, we can enqueue an auto-resize request somewhere and process
                // it after resizing finishes.
                return;
            }
            if (this.internal.checkAndUpdateLastSize(gridSizeChangedEvent.clientWidth, gridSizeChangedEvent.clientHeight)) {
                this.autoresizeColumns(true);
            }
        };
        this.onGridColumnResized = async (columnEvent) => {
            invariant(this.internal.table);
            if (!columnEvent.finished) {
                return; // only update the height once the user is done setting the column size
            }
            this.updateDesiredHeight();
            if (isManualResizing(columnEvent)) {
                this.internal.table.onManualColumnResize(this.getResizingConfig(), columnEvent.columns);
            }
        };
        this.onSortChanged = (event) => {
            if (!this.internal.table) {
                console.warn("changing sorts without prior execution cannot work");
                return;
            }
            const sortItems = this.internal.table.createSortItems(event.columnApi.getAllColumns());
            // Changing sort may cause subtotals to no longer be reasonably placed - remove them if that is the case
            // This applies only to totals in ATTRIBUTE bucket, column totals are not affected by sorting
            const executionDefinition = this.getExecutionDefinition();
            const totals = sanitizeDefTotals(executionDefinition, sortItems);
            // eslint-disable-next-line no-console
            console.debug("onSortChanged", sortItems);
            this.pushDataGuard({
                properties: {
                    sortItems,
                    totals,
                    bucketType: BucketNames.ATTRIBUTE,
                },
            });
            this.setState({ columnTotals: totals }, () => {
                var _a;
                (_a = this.internal.table) === null || _a === void 0 ? void 0 : _a.refreshData();
            });
        };
        this.onPinnedRowDataChanged = async (event) => {
            if ((event === null || event === void 0 ? void 0 : event.api.getPinnedBottomRowCount()) > 0) {
                await this.autoresizeColumns(true);
            }
        };
        this.onBodyScroll = (event) => {
            const scrollPosition = {
                top: Math.max(event.top, 0),
                left: event.left,
            };
            this.updateStickyRowContent(scrollPosition);
        };
        this.onContainerMouseDown = (event) => {
            this.internal.isMetaOrCtrlKeyPressed = event.metaKey || event.ctrlKey;
            this.internal.isAltKeyPressed = event.altKey;
        };
        this.onPageLoaded = (_dv, newResult) => {
            var _a, _b;
            if (!this.internal.table) {
                return;
            }
            if (newResult) {
                (_b = (_a = this.props).onExportReady) === null || _b === void 0 ? void 0 : _b.call(_a, this.internal.table.createExportFunction(this.props.exportTitle));
            }
            this.updateStickyRow();
            this.updateDesiredHeight();
        };
        /**
         * This will be called when user changes sorts or adds totals. This means complete re-execution with
         * new sorts or totals. Loading indicators will be shown instead of all rendered rows thanks to the
         * LoadingRenderer used in all cells of the left-most column.
         *
         * The table must take care to remove the sticky (top-pinned) row - it is treated differently by
         * ag-grid and will be literally sticking there on its own with the loading indicators.
         *
         * Once transformation finishes - indicated by call to onPageLoaded, table can re-instance the sticky row.
         *
         * @param _newExecution - the new execution which is being run and will be used to populate the table
         */
        this.onExecutionTransformed = (_newExecution) => {
            if (!this.internal.table) {
                return;
            }
            this.internal.table.clearStickyRow();
        };
        this.onMenuAggregationClick = (menuAggregationClickConfig) => {
            var _a;
            const sortItems = (_a = this.internal.table) === null || _a === void 0 ? void 0 : _a.getSortItems();
            const { isColumn } = menuAggregationClickConfig;
            if (isColumn) {
                const newColumnTotals = sanitizeDefTotals(this.getExecutionDefinition(), sortItems, getUpdatedColumnOrRowTotals(this.getColumnTotals(), menuAggregationClickConfig));
                this.pushDataGuard({
                    properties: {
                        totals: newColumnTotals,
                        bucketType: BucketNames.ATTRIBUTE,
                    },
                });
                this.setState({ columnTotals: newColumnTotals }, () => {
                    var _a;
                    (_a = this.internal.table) === null || _a === void 0 ? void 0 : _a.refreshData();
                });
            }
            else {
                const newRowTotals = getUpdatedColumnOrRowTotals(this.getRowTotals(), menuAggregationClickConfig);
                this.setState({ rowTotals: newRowTotals }, () => {
                    var _a;
                    (_a = this.internal.table) === null || _a === void 0 ? void 0 : _a.refreshData();
                });
                this.pushDataGuard({
                    properties: {
                        totals: newRowTotals,
                        bucketType: BucketNames.COLUMNS,
                    },
                });
            }
        };
        this.onLoadingChanged = (loadingState) => {
            const { onLoadingChanged } = this.props;
            if (onLoadingChanged) {
                onLoadingChanged(loadingState);
            }
        };
        this.onError = (error, execution = this.props.execution) => {
            var _a, _b;
            const { onExportReady } = this.props;
            if (this.props.execution.fingerprint() === execution.fingerprint()) {
                this.setState({ error: error.getMessage() });
                // update loading state when an error occurs
                this.onLoadingChanged({ isLoading: false });
                onExportReady(createExportErrorFunction(error));
                (_b = (_a = this.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, error);
            }
        };
        //
        // Table resizing
        //
        this.growToFit = () => {
            invariant(this.internal.table);
            if (!this.isGrowToFitEnabled()) {
                return;
            }
            this.internal.table.growToFit(this.getResizingConfig());
            if (!this.state.resized && !this.internal.table.isResizing()) {
                this.setState({
                    resized: true,
                });
            }
        };
        this.autoresizeColumns = async (force = false) => {
            var _a;
            if (this.state.resized && !force) {
                return;
            }
            const didResize = await ((_a = this.internal.table) === null || _a === void 0 ? void 0 : _a.autoresizeColumns(this.getResizingConfig(), force));
            if (didResize) {
                // after column resizing, horizontal scroolbar may change and table height may need resizing
                this.updateDesiredHeight();
            }
            if (didResize && !this.state.resized) {
                this.setState({
                    resized: true,
                });
            }
        };
        this.shouldAutoResizeColumns = () => {
            const columnAutoresize = this.isColumnAutoresizeEnabled();
            const growToFit = this.isGrowToFitEnabled();
            return columnAutoresize || growToFit;
        };
        this.startWatchingTableRendered = () => {
            if (!this.internal.table) {
                return;
            }
            const missingContainerRef = !this.containerRef; // table having no data will be unmounted, it causes ref null
            const isTableRendered = this.shouldAutoResizeColumns()
                ? this.state.resized
                : this.internal.table.isPivotTableReady();
            const shouldCallAutoresizeColumns = this.internal.table.isPivotTableReady() &&
                !this.state.resized &&
                !this.internal.table.isResizing();
            if (this.shouldAutoResizeColumns() && shouldCallAutoresizeColumns) {
                this.autoresizeColumns();
            }
            if (missingContainerRef || isTableRendered) {
                this.stopWatchingTableRendered();
            }
        };
        this.stopWatchingTableRendered = () => {
            this.internal.stopWatching();
            this.props.afterRender();
        };
        //
        // Sticky row handling
        //
        this.isStickyRowAvailable = () => {
            invariant(this.internal.table);
            return Boolean(this.getGroupRows() && this.internal.table.stickyRowExists());
        };
        this.updateStickyRow = () => {
            if (!this.internal.table) {
                return;
            }
            if (this.isStickyRowAvailable()) {
                const scrollPosition = Object.assign({}, this.internal.lastScrollPosition);
                this.internal.lastScrollPosition = {
                    top: 0,
                    left: 0,
                };
                this.updateStickyRowContent(scrollPosition);
            }
        };
        this.updateStickyRowContent = (scrollPosition) => {
            invariant(this.internal.table);
            if (this.isStickyRowAvailable()) {
                // Position update was moved here because in some complicated cases with totals,
                // it was not behaving properly. This was mainly visible in storybook, but it may happen
                // in other environments as well.
                this.internal.table.updateStickyRowPosition();
                this.internal.table.updateStickyRowContent({
                    scrollPosition,
                    lastScrollPosition: this.internal.lastScrollPosition,
                });
            }
            this.internal.lastScrollPosition = Object.assign({}, scrollPosition);
        };
        //
        // Desired height updating
        //
        this.getScrollBarPadding = () => {
            var _a;
            if (!((_a = this.internal.table) === null || _a === void 0 ? void 0 : _a.isFullyInitialized())) {
                return 0;
            }
            if (!this.containerRef) {
                return 0;
            }
            // check for scrollbar presence
            return scrollBarExists(this.containerRef) ? getScrollbarWidth() : 0;
        };
        this.calculateDesiredHeight = () => {
            var _a, _b;
            const { maxHeight } = this.props.config;
            if (!maxHeight) {
                return;
            }
            const bodyHeight = (_b = (_a = this.internal.table) === null || _a === void 0 ? void 0 : _a.getTotalBodyHeight()) !== null && _b !== void 0 ? _b : 0;
            const totalHeight = bodyHeight + this.getScrollBarPadding();
            return Math.min(totalHeight, maxHeight);
        };
        this.updateDesiredHeight = () => {
            if (!this.internal.table) {
                return;
            }
            const desiredHeight = this.calculateDesiredHeight();
            /*
             * For some mysterious reasons, there sometimes is exactly 2px discrepancy between the current height
             * and the maxHeight coming from the config. This 2px seems to be unrelated to any CSS property (border,
             * padding, etc.) not even the leeway variable in getTotalBodyHeight.
             * In these cases there is a positive feedback loop between the maxHeight and the config:
             *
             * increase in desiredHeight -> increase in config.maxHeight -> increase in desiredHeight -> ...
             *
             * This causes the table to grow in height in 2px increments until it reaches its full size - then
             * the resizing stops as bodyHeight of the table gets smaller than the maxHeight and "wins"
             * in calculateDesiredHeight)...
             *
             * So we ignore changes smaller than those 2px to break the loop as it is quite unlikely that such a small
             * change would be legitimate (and if it is, a mismatch of 2px should not have practical consequences).
             *
             * Ideally, this maxHeight would not be needed at all (if I remove it altogether, the problem goes away),
             * however, it is necessary for ONE-4322 (there seems to be no native way of doing this in ag-grid itself).
             */
            const HEIGHT_CHANGE_TOLERANCE = 2;
            if (this.state.desiredHeight === undefined ||
                (desiredHeight !== undefined &&
                    Math.abs(this.state.desiredHeight - desiredHeight) > HEIGHT_CHANGE_TOLERANCE)) {
                this.setState({ desiredHeight });
            }
        };
        //
        // Table configuration accessors
        //
        this.getColumnTotals = () => {
            return this.state.columnTotals;
        };
        this.getRowTotals = () => {
            return this.state.rowTotals;
        };
        this.getExecutionDefinition = () => {
            return this.props.execution.definition;
        };
        this.getGroupRows = () => {
            var _a, _b;
            return (_b = (_a = this.props.config) === null || _a === void 0 ? void 0 : _a.groupRows) !== null && _b !== void 0 ? _b : true;
        };
        this.getMeasureGroupDimension = () => {
            var _a, _b;
            return (_b = (_a = this.props.config) === null || _a === void 0 ? void 0 : _a.measureGroupDimension) !== null && _b !== void 0 ? _b : "columns";
        };
        this.getColumnHeadersPosition = () => {
            var _a, _b;
            return (_b = (_a = this.props.config) === null || _a === void 0 ? void 0 : _a.columnHeadersPosition) !== null && _b !== void 0 ? _b : "top";
        };
        this.getMenuConfig = () => {
            var _a, _b;
            return (_b = (_a = this.props.config) === null || _a === void 0 ? void 0 : _a.menu) !== null && _b !== void 0 ? _b : {};
        };
        this.getDefaultWidth = () => {
            return DEFAULT_COLUMN_WIDTH;
        };
        this.isColumnAutoresizeEnabled = () => {
            const defaultWidth = this.getDefaultWidthFromProps(this.props);
            return isColumnAutoresizeEnabled(defaultWidth);
        };
        this.isGrowToFitEnabled = (props = this.props) => {
            var _a, _b;
            return ((_b = (_a = props.config) === null || _a === void 0 ? void 0 : _a.columnSizing) === null || _b === void 0 ? void 0 : _b.growToFit) === true;
        };
        this.getColumnWidths = (props) => {
            var _a;
            return (_a = props.config.columnSizing) === null || _a === void 0 ? void 0 : _a.columnWidths;
        };
        this.hasColumnWidths = () => {
            return !!this.getColumnWidths(this.props);
        };
        this.getDefaultWidthFromProps = (props) => {
            var _a, _b, _c;
            return (_c = (_b = (_a = props.config) === null || _a === void 0 ? void 0 : _a.columnSizing) === null || _b === void 0 ? void 0 : _b.defaultWidth) !== null && _c !== void 0 ? _c : "unset";
        };
        /**
         * All pushData calls done by the table must go through this guard.
         *
         * TODO: The guard should ensure a 'disconnect' between push data handling and the calling function processing.
         *  When the pushData is handled by the application, it MAY (and in our case it DOES) trigger processing that
         *  lands back in the table. This opens additional set of invariants to check / be prepared for in order to
         *  optimize the renders and re-renders.
         */
        this.pushDataGuard = (data) => {
            var _a, _b;
            (_b = (_a = this.props).pushData) === null || _b === void 0 ? void 0 : _b.call(_a, data);
            /*
             * TODO: Switch to this on in FET-715.
            setTimeout(() => {
                this.props.pushData?.(data);
            }, 0);
             */
        };
        /**
         * Wraps the provided callback function with a guard that checks whether the current table state is the same
         * as the state snapshot at the time of callback creation. If the state differs, the wrapped function WILL NOT
         * be called.
         *
         * @param callback - function to wrap with state guard
         */
        // eslint-disable-next-line @typescript-eslint/ban-types
        this.stateBoundCallback = (callback) => {
            const forInternalState = this.internal;
            return ((...args) => {
                if (this.internal !== forInternalState) {
                    return;
                }
                return callback(...args);
            });
        };
        /**
         * All callback functions that the table passes to ag-grid must be bound to the current internal state of the table. The
         * callback functions MUST be noop if the internal state at the time of call is different from the internal state
         * at the time of creation.
         *
         * This is essential to prevent errors stemming for racy behavior triggered by ag-grid. ag-grid often triggers
         * event callbacks using setTimeout(). It can happen, that once the event is actually processed the ag-grid table
         * which caused it is unmounted. Doing anything with the unmounted table's gridApi leads to errors.
         *
         * Without this, table may trigger ag-grid errors such as this:
         *
         * https://github.com/ag-grid/ag-grid/issues/3457
         *
         * or this:
         *
         * https://github.com/ag-grid/ag-grid/issues/3334
         */
        this.createBoundAgGridCallbacks = () => {
            const debouncedGridSizeChanged = debounce(this.stateBoundCallback(this.onGridSizeChanged), AGGRID_ON_RESIZE_TIMEOUT);
            return {
                onGridReady: this.stateBoundCallback(this.onGridReady),
                onFirstDataRendered: this.stateBoundCallback(this.onFirstDataRendered),
                onBodyScroll: this.stateBoundCallback(this.onBodyScroll),
                onModelUpdated: this.stateBoundCallback(this.onModelUpdated),
                onGridColumnsChanged: this.stateBoundCallback(this.onGridColumnsChanged),
                onGridColumnResized: this.stateBoundCallback(this.onGridColumnResized),
                onSortChanged: this.stateBoundCallback(this.onSortChanged),
                onGridSizeChanged: debouncedGridSizeChanged,
                onPinnedRowDataChanged: this.stateBoundCallback(this.onPinnedRowDataChanged),
            };
        };
        this.getTableMethods = () => {
            var _a;
            return Object.assign({ hasColumnWidths: this.hasColumnWidths(), getExecutionDefinition: this.getExecutionDefinition, getMenuConfig: this.getMenuConfig, getGroupRows: this.getGroupRows, getColumnTotals: this.getColumnTotals, getRowTotals: this.getRowTotals, getColumnHeadersPosition: this.getColumnHeadersPosition, getMeasureGroupDimension: this.getMeasureGroupDimension, getResizingConfig: this.getResizingConfig, onLoadingChanged: this.onLoadingChanged, onError: this.onError, onExportReady: (_a = this.props.onExportReady) !== null && _a !== void 0 ? _a : noop, pushData: this.pushDataGuard, onPageLoaded: this.onPageLoaded, onExecutionTransformed: this.onExecutionTransformed, onMenuAggregationClick: this.onMenuAggregationClick }, this.boundAgGridCallbacks);
        };
        this.getResizingConfig = () => {
            var _a, _b, _c, _d, _e;
            return {
                defaultWidth: this.getDefaultWidth(),
                growToFit: this.isGrowToFitEnabled(),
                columnAutoresizeOption: this.getDefaultWidthFromProps(this.props),
                widths: this.getColumnWidths(this.props),
                isAltKeyPressed: this.internal.isAltKeyPressed,
                isMetaOrCtrlKeyPressed: this.internal.isMetaOrCtrlKeyPressed,
                // use clientWidth of the viewport container to accommodate for vertical scrollbars if needed
                clientWidth: (_c = (_b = (_a = this.containerRef) === null || _a === void 0 ? void 0 : _a.getElementsByClassName("ag-body-viewport")[0]) === null || _b === void 0 ? void 0 : _b.clientWidth) !== null && _c !== void 0 ? _c : 0,
                containerRef: this.containerRef,
                separators: (_e = (_d = this.props) === null || _d === void 0 ? void 0 : _d.config) === null || _e === void 0 ? void 0 : _e.separators,
                onColumnResized: this.props.onColumnResized,
            };
        };
        const { execution, config } = props;
        this.state = {
            readyToRender: false,
            columnTotals: cloneDeep(sanitizeDefTotals(execution.definition)),
            rowTotals: getTotalsForColumnsBucket(execution.definition),
            desiredHeight: config.maxHeight,
            resized: false,
        };
        this.errorMap = newErrorMapping(props.intl);
        this.internal = new InternalTableState();
        this.boundAgGridCallbacks = this.createBoundAgGridCallbacks();
        this.pivotTableId = uuidv4().replace(/-/g, "");
        this.onLoadingChanged = this.onLoadingChanged.bind(this);
    }
    componentDidMount() {
        this.alertParentWrapperMissingHeight();
        this.internal.initializer = this.initialize(this.props.execution);
    }
    componentWillUnmount() {
        if (this.containerRef) {
            this.containerRef.removeEventListener("mousedown", this.onContainerMouseDown);
        }
        // this ensures any events emitted during the async initialization will be sunk. they are no longer needed.
        this.internal.destroy();
    }
    componentDidUpdate(prevProps) {
        var _a, _b, _c, _d, _e;
        if (this.isReinitNeeded(prevProps)) {
            /*
             * This triggers when execution changes (new measures / attributes). In that case,
             * a complete re-init of the table is in order.
             *
             * Everything is thrown out of the window including all the ag-grid data sources and instances and
             * a completely new table will be initialized to the current props.
             *
             * Note: compared to v7 version of the table, this only happens if someone actually changes the
             * execution-related props of the table. This branch will not hit any other time.
             */
            // eslint-disable-next-line no-console
            console.debug("triggering reinit", this.props.execution.definition, prevProps.execution.definition);
            this.reinitialize(this.props.execution);
        }
        else {
            /*
             * When in this branch, the ag-grid instance is up and running and is already showing some data and
             * it _should_ be possible to normally use the ag-grid APIs.
             *
             * The currentResult and visibleData _will_ be available at this point because the component is definitely
             * after a successful execution and initialization.
             */
            if (this.shouldRefreshHeader(this.props, prevProps)) {
                (_a = this.internal.table) === null || _a === void 0 ? void 0 : _a.refreshHeader();
            }
            if (this.isGrowToFitEnabled() && !this.isGrowToFitEnabled(prevProps)) {
                this.growToFit();
            }
            const prevColumnWidths = this.getColumnWidths(prevProps);
            const columnWidths = this.getColumnWidths(this.props);
            if (!isEqual(prevColumnWidths, columnWidths)) {
                (_b = this.internal.table) === null || _b === void 0 ? void 0 : _b.applyColumnSizes(this.getResizingConfig());
            }
            if (((_c = this.props.config) === null || _c === void 0 ? void 0 : _c.maxHeight) &&
                !isEqual((_d = this.props.config) === null || _d === void 0 ? void 0 : _d.maxHeight, (_e = prevProps.config) === null || _e === void 0 ? void 0 : _e.maxHeight)) {
                this.updateDesiredHeight();
            }
        }
    }
    /**
     * Tests whether reinitialization of ag-grid is needed after the update. Currently there are two
     * conditions:
     *
     * - drilling has changed
     *
     * OR
     *
     * - prepared execution has changed AND the new prep execution definition does not match currently shown
     *   data.
     */
    isReinitNeeded(prevProps) {
        var _a, _b;
        const drillingIsSame = isEqual(prevProps.drillableItems, this.props.drillableItems);
        const columnHeadersPositionIsSame = isEqual((_a = prevProps.config) === null || _a === void 0 ? void 0 : _a.columnHeadersPosition, (_b = this.props.config) === null || _b === void 0 ? void 0 : _b.columnHeadersPosition);
        if (!drillingIsSame) {
            // eslint-disable-next-line no-console
            console.debug("drilling is different", prevProps.drillableItems, this.props.drillableItems);
            return true;
        }
        if (!columnHeadersPositionIsSame) {
            return true;
        }
        if (!this.internal.table) {
            // Table is not yet fully initialized. See if the initialization is in progress. If so, see if
            // the init is for same execution or not. Otherwise fall back to compare props vs props.
            if (this.internal.initializer) {
                const initializeForSameExec = this.internal.initializer.isSameExecution(this.props.execution);
                if (!initializeForSameExec) {
                    // eslint-disable-next-line no-console
                    console.debug("initializer for different execution", this.props.execution, prevProps.execution);
                }
                return !initializeForSameExec;
            }
            else {
                const prepExecutionSame = this.props.execution.fingerprint() === prevProps.execution.fingerprint();
                if (!prepExecutionSame) {
                    // eslint-disable-next-line no-console
                    console.debug("have to reinit table", this.props.execution, prevProps.execution);
                }
                return !prepExecutionSame;
            }
        }
        return !this.internal.table.isMatchingExecution(this.props.execution);
    }
    /**
     * Tests whether ag-grid's refreshHeader should be called. At the moment this is necessary when user
     * turns on/off the aggregation menus through the props. The menus happen to appear in the table column headers
     * so the refresh is essential to show/hide them.
     *
     * @param props - current table props
     * @param prevProps - previous table props
     * @internal
     */
    shouldRefreshHeader(props, prevProps) {
        const propsRequiringAgGridRerender = [
            (props) => { var _a; return (_a = props === null || props === void 0 ? void 0 : props.config) === null || _a === void 0 ? void 0 : _a.menu; },
        ];
        return propsRequiringAgGridRerender.some((propGetter) => !isEqual(propGetter(props), propGetter(prevProps)));
    }
    /**
     * Checks DOM if height has been set on PivotTable parent wrapper. If height has not been set,
     * PivotTable will not be rendered correctly. Therefore, we need to inform the user at least on the console
     * on what is happening.
     *
     * @internal
     */
    alertParentWrapperMissingHeight() {
        var _a, _b;
        const parentWrapper = (_a = document.getElementById(this.pivotTableId)) === null || _a === void 0 ? void 0 : _a.parentElement;
        const parentHeight = (_b = parentWrapper === null || parentWrapper === void 0 ? void 0 : parentWrapper.offsetHeight) !== null && _b !== void 0 ? _b : 0;
        if (parentHeight < 20) {
            console.warn(`The wrapper height of the pivot table has not been set or is suspiciously small. This might cause pivot table rendering issues. If so, please set an appropriate height for the wrapper. Use document.getElementById("${this.pivotTableId}") to find the PivotTable element in the DOM, which will help you to identify its wrapper.`);
        }
    }
    stopEventWhenResizeHeader(e) {
        var _a, _b, _c;
        // Do not propagate event when it originates from the table resizer.
        // This means for example that we can resize columns without triggering drag in the application.
        if ((_c = (_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.className) === null || _b === void 0 ? void 0 : _b.includes) === null || _c === void 0 ? void 0 : _c.call(_b, "ag-header-cell-resize")) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    renderLoading() {
        var _a, _b, _c, _d, _e;
        const { LoadingComponent, theme } = this.props;
        const color = (_e = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.table) === null || _a === void 0 ? void 0 : _a.loadingIconColor) !== null && _b !== void 0 ? _b : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c6) !== null && _e !== void 0 ? _e : undefined;
        return (React.createElement("div", { className: "s-loading gd-table-loading" }, LoadingComponent ? React.createElement(LoadingComponent, { color: color }) : null));
    }
    render() {
        var _a;
        const { ErrorComponent } = this.props;
        const { desiredHeight, error } = this.state;
        if (error) {
            const errorProps = this.errorMap[Object.prototype.hasOwnProperty.call(this.errorMap, error)
                ? error
                : ErrorCodes.UNKNOWN_ERROR];
            return ErrorComponent ? React.createElement(ErrorComponent, Object.assign({ code: error }, errorProps)) : null;
        }
        const style = {
            height: desiredHeight || "100%",
            position: "relative",
            overflow: "hidden",
        };
        if (!this.state.readyToRender) {
            return (React.createElement("div", { className: "gd-table-component", style: style, id: this.pivotTableId }, this.renderLoading()));
        }
        // when table is ready, then the table facade must be set. if this bombs then there is a bug
        // in the initialization logic
        invariant(this.internal.table);
        if (!this.internal.gridOptions) {
            this.internal.gridOptions = createGridOptions(this.internal.table, this.getTableMethods(), this.props);
        }
        /*
         * Show loading overlay until all the resizing is done. This is because the various resizing operations
         * have to happen asynchronously - they must wait until ag-grid fires onFirstDataRendered, before our code
         * can start reliably interfacing with the autosizing features.
         */
        const shouldRenderLoadingOverlay = (this.isColumnAutoresizeEnabled() || this.isGrowToFitEnabled()) && !this.state.resized;
        const classNames = cx("gd-table-component", {
            "gd-table-header-hide": ((_a = this.props.config) === null || _a === void 0 ? void 0 : _a.columnHeadersPosition) === "left" &&
                this.internal.table.tableDescriptor.isTransposed(),
        });
        return (React.createElement("div", { className: classNames, style: style, id: this.pivotTableId, onMouseDown: this.stopEventWhenResizeHeader, onDragStart: this.stopEventWhenResizeHeader },
            React.createElement("div", { className: "gd-table ag-theme-balham s-pivot-table", style: style, ref: this.setContainerRef },
                React.createElement(AgGridReact, Object.assign({}, this.internal.gridOptions, { modules: AllCommunityModules })),
                shouldRenderLoadingOverlay ? this.renderLoading() : null)));
    }
}
CorePivotTableAgImpl.defaultProps = {
    locale: "en-US",
    drillableItems: [],
    afterRender: noop,
    pushData: noop,
    onExportReady: noop,
    onLoadingChanged: noop,
    onError: noop,
    onDrill: () => true,
    ErrorComponent,
    LoadingComponent,
    pageSize: 100,
    config: {},
    onColumnResized: noop,
};
export { CorePivotTableAgImpl };
const CorePivotTableWithIntl = injectIntl(withTheme(CorePivotTableAgImpl));
/**
 * @internal
 */
export const CorePivotTable = (props) => (React.createElement(ThemeContextProvider, { theme: props.theme || {}, themeIsLoading: false },
    React.createElement(IntlWrapper, { locale: props.locale },
        React.createElement(CorePivotTableWithIntl, Object.assign({}, props)))));
//# sourceMappingURL=CorePivotTable.js.map