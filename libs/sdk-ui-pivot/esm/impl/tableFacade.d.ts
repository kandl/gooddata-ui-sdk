import { TableDescriptor } from "./structure/tableDescriptor.js";
import { IDataView, IExecutionResult, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { DataViewFacade, IAvailableDrillTargets, IExportFunction } from "@gooddata/sdk-ui";
import { Column, ColumnApi, GridApi } from "@ag-grid-community/all-modules";
import { ISortItem } from "@gooddata/sdk-model";
import { IGroupingProvider } from "./data/rowGroupingProvider.js";
import { ColumnResizingConfig, StickyRowConfig, TableDataCallbacks, TableConfigAccessors } from "./privateTypes.js";
import { ICorePivotTableProps } from "../publicTypes.js";
import { IGridRow } from "./data/resultTypes.js";
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
export declare class TableFacade {
    private readonly intl;
    readonly tableDescriptor: TableDescriptor;
    private readonly resizedColumnsStore;
    private readonly originalExecution;
    private readonly config;
    /**
     * When user changes sorts or totals by interacting with the table, the current execution result will
     * be transformed to include these new properties. The transformation creates a new prepared execution
     * which the data source will drive to obtain the new data.
     *
     * This field is set as soon as the new transformed execution gets created and will live until either
     * the execution fails or a first page of the data is sent to ag-grid to render.
     *
     * In all other cases this field be undefined.
     *
     * @internal
     */
    private transformedExecution;
    private currentResult;
    private visibleData;
    private currentFingerprint;
    private autoResizedColumns;
    private growToFittedColumns;
    private resizing;
    private numberOfColumnResizedCalls;
    private agGridDataSource;
    /**
     * GridApi is set in the finishInitialization and cleared up in destroy. This is intentional, the code in the
     * facade and in the components below must be ready that api is not available and must short-circuit. It is
     * especially important to prevent racy-errors in async actions that may be triggered on the facade _after_
     * the table is re-rendered and the gridApi is for a destructed table.
     *
     * Note: see gridApiGuard. Always use the guard to access the GridApi. Never access the field directly.
     *
     * @internal
     */
    private gridApi;
    /**
     * Lifecycle of this field is tied to gridApi. If the gridApiGuard returns an API, then it is for sure
     * that the columnApi is also defined.
     * @internal
     */
    private columnApi;
    private destroyed;
    private onPageLoadedCallback;
    private onExecutionTransformedCallback;
    constructor(result: IExecutionResult, dataView: IDataView, tableMethods: TableDataCallbacks & TableConfigAccessors, props: Readonly<ICorePivotTableProps>);
    finishInitialization: (gridApi: GridApi, columnApi: ColumnApi) => void;
    refreshData: () => void;
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
    destroy: () => void;
    isFullyInitialized: () => boolean;
    /**
     * Tests whether the table's data source is currently undergoing transformation & data loading. This will
     * be return true when for instance sorts or totals change and the table's data source drives new execution
     * with the updated sorts or totals.
     */
    isTransforming: () => boolean;
    clearFittedColumns: () => void;
    /**
     * All functions in the entire table should use this gridApiGuard to access an instance of ag-grid's GridApi.
     *
     * If the table facade is destroyed, the guard always returns false and emits a debug log. Otherwise it just
     * returns the current value of gridApi field.
     */
    private gridApiGuard;
    private updateColumnWidths;
    private createDataSource;
    private onExecutionTransformed;
    private onTransformedExecutionFailed;
    private onPageLoaded;
    createExportFunction: (title: string | undefined) => IExportFunction;
    getAvailableDrillTargets: () => IAvailableDrillTargets;
    refreshHeader: () => void;
    growToFit: (resizingConfig: ColumnResizingConfig) => void;
    private setFittedColumns;
    resetColumnsWidthToDefault: (resizingConfig: ColumnResizingConfig, columns: Column[]) => void;
    applyColumnSizes: (resizingConfig: ColumnResizingConfig) => void;
    autoresizeColumns: (resizingConfig: ColumnResizingConfig, force?: boolean) => Promise<boolean>;
    private autoresizeAllColumns;
    private updateAutoResizedColumns;
    getRowNodes: () => IGridRow[];
    isPivotTableReady: () => boolean;
    private shouldPerformAutoresize;
    private isColumnAutoResized;
    resetResizedColumn: (column: Column) => Promise<void>;
    private autoresizeColumnsByColumnId;
    onColumnsManualReset: (resizingConfig: ColumnResizingConfig, columns: Column[]) => Promise<void>;
    private getAllMeasureOrAnyTotalColumns;
    private getAllMeasureColumns;
    private isAllMeasureOrAnyColumnTotalResizeOperation;
    private isWeakMeasureResizeOperation;
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
    private sizeColumnsToFitWithoutColumnReset;
    private getWidthOfColsInList;
    onColumnsManualResized: (resizingConfig: ColumnResizingConfig, columns: Column[]) => void;
    onManualColumnResize: (resizingConfig: ColumnResizingConfig, columns: Column[]) => Promise<void>;
    private afterOnResizeColumns;
    getGroupingProvider: () => IGroupingProvider;
    createSortItems: (columns: Column[]) => ISortItem[];
    getSortItems: () => ISortItem[];
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
    isMatchingExecution(other: IPreparedExecution): boolean;
    getTotalBodyHeight: () => number;
    updateStickyRowContent: (stickyCtx: StickyRowConfig) => void;
    updateStickyRowPosition: () => void;
    /**
     * Initializes a single empty pinned top row in ag-grid. This is where table code can push sticky row data
     * as user keeps scrolling the table.
     */
    initializeStickyRow: () => void;
    /**
     * Clears the pinned top row in ag-grid.
     */
    clearStickyRow: () => void;
    stickyRowExists: () => boolean;
    getRowCount: () => number;
    getDrillDataContext: () => DataViewFacade;
    isResizing: () => boolean;
    setTooltipFields: () => void;
}
//# sourceMappingURL=tableFacade.d.ts.map