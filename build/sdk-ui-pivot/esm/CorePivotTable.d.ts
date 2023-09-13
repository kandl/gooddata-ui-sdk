import React from "react";
import { ICorePivotTableProps } from "./publicTypes.js";
import { ICorePivotTableState } from "./tableState.js";
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
export declare class CorePivotTableAgImpl extends React.Component<ICorePivotTableProps, ICorePivotTableState> {
    static defaultProps: Pick<ICorePivotTableProps, "locale" | "drillableItems" | "afterRender" | "pushData" | "onExportReady" | "onLoadingChanged" | "onError" | "onDrill" | "ErrorComponent" | "LoadingComponent" | "pageSize" | "config" | "onColumnResized">;
    private readonly errorMap;
    private containerRef;
    private pivotTableId;
    private internal;
    private boundAgGridCallbacks;
    constructor(props: ICorePivotTableProps);
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
    private initialize;
    /**
     * Completely re-initializes the table in order to show data for the provided prepared execution. At this point
     * code has determined that the table layout for the other prepared execution differs from what is currently
     * shown and the only reasonable thing to do is to throw everything away and start from scratch.
     *
     * This will reset all React state and non-react state and start table initialization process.
     */
    private reinitialize;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: ICorePivotTableProps): void;
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
    private isReinitNeeded;
    /**
     * Tests whether ag-grid's refreshHeader should be called. At the moment this is necessary when user
     * turns on/off the aggregation menus through the props. The menus happen to appear in the table column headers
     * so the refresh is essential to show/hide them.
     *
     * @param props - current table props
     * @param prevProps - previous table props
     * @internal
     */
    private shouldRefreshHeader;
    /**
     * Checks DOM if height has been set on PivotTable parent wrapper. If height has not been set,
     * PivotTable will not be rendered correctly. Therefore, we need to inform the user at least on the console
     * on what is happening.
     *
     * @internal
     */
    private alertParentWrapperMissingHeight;
    private stopEventWhenResizeHeader;
    private setContainerRef;
    private renderLoading;
    render(): JSX.Element | null;
    private onGridReady;
    private onFirstDataRendered;
    private onModelUpdated;
    private onGridColumnsChanged;
    private onGridSizeChanged;
    private onGridColumnResized;
    private onSortChanged;
    private onPinnedRowDataChanged;
    private onBodyScroll;
    private onContainerMouseDown;
    private onPageLoaded;
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
    private onExecutionTransformed;
    private onMenuAggregationClick;
    private onLoadingChanged;
    private onError;
    private growToFit;
    private autoresizeColumns;
    private shouldAutoResizeColumns;
    private startWatchingTableRendered;
    private stopWatchingTableRendered;
    private isStickyRowAvailable;
    private updateStickyRow;
    private updateStickyRowContent;
    private getScrollBarPadding;
    private calculateDesiredHeight;
    private updateDesiredHeight;
    private getColumnTotals;
    private getRowTotals;
    private getExecutionDefinition;
    private getGroupRows;
    private getMeasureGroupDimension;
    private getColumnHeadersPosition;
    private getMenuConfig;
    private getDefaultWidth;
    private isColumnAutoresizeEnabled;
    private isGrowToFitEnabled;
    private getColumnWidths;
    private hasColumnWidths;
    private getDefaultWidthFromProps;
    /**
     * All pushData calls done by the table must go through this guard.
     *
     * TODO: The guard should ensure a 'disconnect' between push data handling and the calling function processing.
     *  When the pushData is handled by the application, it MAY (and in our case it DOES) trigger processing that
     *  lands back in the table. This opens additional set of invariants to check / be prepared for in order to
     *  optimize the renders and re-renders.
     */
    private pushDataGuard;
    /**
     * Wraps the provided callback function with a guard that checks whether the current table state is the same
     * as the state snapshot at the time of callback creation. If the state differs, the wrapped function WILL NOT
     * be called.
     *
     * @param callback - function to wrap with state guard
     */
    private stateBoundCallback;
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
    private createBoundAgGridCallbacks;
    private getTableMethods;
    private getResizingConfig;
}
/**
 * @internal
 */
export declare const CorePivotTable: React.FC<ICorePivotTableProps>;
//# sourceMappingURL=CorePivotTable.d.ts.map