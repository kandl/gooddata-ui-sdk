import { ColDef, Column, ColumnApi, GridApi } from "@ag-grid-community/all-modules";
import { ColumnWidth, ColumnWidthItem, IManuallyResizedColumnsItem, IResizedColumns, IWeakMeasureColumnWidthItem } from "../../columnWidths.js";
import { IExecutionResult } from "@gooddata/sdk-backend-spi";
import { AnyCol } from "../structure/tableDescriptorTypes.js";
import { TableDescriptor } from "../structure/tableDescriptor.js";
import { ColumnResizingConfig } from "../privateTypes.js";
import { DefaultColumnWidth } from "../../publicTypes.js";
import { IGroupingProvider } from "../data/rowGroupingProvider.js";
export declare const MIN_WIDTH = 60;
export declare const MANUALLY_SIZED_MAX_WIDTH = 2000;
export declare const AUTO_SIZED_MAX_WIDTH = 500;
export declare const SORT_ICON_WIDTH = 12;
export interface IResizedColumnsCollection {
    [columnIdentifier: string]: IResizedColumnsCollectionItem;
}
export interface IResizedColumnsCollectionItem {
    width: ColumnWidth;
    measureIdentifier?: string;
}
export interface IWeakMeasureColumnWidthItemsMap {
    [measureIdentifier: string]: IWeakMeasureColumnWidthItem;
}
export declare class ResizedColumnsStore {
    private readonly tableDescriptor;
    private manuallyResizedColumns;
    private allMeasureColumnWidth;
    private weakMeasuresColumnWidths;
    constructor(tableDescriptor: TableDescriptor, manuallyResizedColumns?: IResizedColumnsCollection, allMeasureColumnWidth?: number | null, weakMeasuresColumnWidths?: IWeakMeasureColumnWidthItemsMap);
    getManuallyResizedColumn2: (col: AnyCol) => IManuallyResizedColumnsItem | undefined;
    getManuallyResizedColumn: (item: Column | ColDef) => IManuallyResizedColumnsItem | undefined;
    isColumnManuallyResized: (item: Column | ColDef) => boolean;
    addToManuallyResizedColumn: (column: Column, allowGrowToFit?: boolean) => void;
    /**
     * Sets width for all column measures.
     *
     * Here Be Dragons 1: this also mutates input columns and sets supressSizeToFit prop to true.
     *
     * @param columnWidth - column width
     * @param allColumns - all columns in table
     */
    addAllMeasureColumn: (columnWidth: number, allColumns: Column[]) => void;
    addWeekMeasureColumn: (column: Column) => void;
    removeAllMeasureColumns: () => void;
    removeWeakMeasureColumn: (column: Column) => void;
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
    removeFromManuallyResizedColumn: (column: Column) => void;
    getColumnWidthsFromMap: () => ColumnWidthItem[];
    updateColumnWidths: (columnWidths: ColumnWidthItem[] | undefined) => void;
    getMatchingColumnsByMeasure: (targetColumn: Column, allColumns: Column[]) => Column[];
    getMatchedWeakMeasuresColumnWidth: (col: AnyCol) => IWeakMeasureColumnWidthItem | undefined;
    private filterAllMeasureColumnWidthItem;
    private filterStrongColumnWidthItems;
    private filterWeakColumnWidthItems;
    private convertItem;
    private getWeakMeasureColumMapItem;
    private isAllMeasureColumWidthUsed;
    private getAutoSizeItem;
    private getAllMeasureColumMapItem;
    private getAllMeasureColumnWidth;
    private isMatchingWeakWidth;
}
export declare function convertColumnWidthsToMap(tableDescriptor: TableDescriptor, columnWidths: ColumnWidthItem[], widthValidator?: (width: ColumnWidth) => ColumnWidth): IResizedColumnsCollection;
export declare function getColumnWidthsFromMap(map: IResizedColumnsCollection, tableDescriptor: TableDescriptor): ColumnWidthItem[];
export declare function getWeakColumnWidthsFromMap(map: IWeakMeasureColumnWidthItemsMap): ColumnWidthItem[];
/**
 * This function _mutates_ the incoming column defs according to the sizing rules.
 */
export declare function updateColumnDefinitionsWithWidths(tableDescriptor: TableDescriptor, resizedColumnsStore: ResizedColumnsStore, autoResizedColumns: IResizedColumns, defaultColumnWidth: number, isGrowToFitEnabled: boolean, growToFittedColumns?: IResizedColumns): void;
export declare function syncSuppressSizeToFitOnColumns(resizedColumnsStore: ResizedColumnsStore, columnApi: ColumnApi): void;
export declare function isColumnAutoResized(autoResizedColumns: IResizedColumns, resizedColumnId: string): boolean;
export declare function resetColumnsWidthToDefault(columnApi: ColumnApi, columns: Column[], resizedColumnsStore: ResizedColumnsStore, autoResizedColumns: IResizedColumns, defaultWidth: number): void;
export declare function resizeAllMeasuresColumns(columnApi: ColumnApi, resizedColumnsStore: ResizedColumnsStore, column: Column): void;
export declare function resizeWeakMeasureColumns(tableDescriptor: TableDescriptor, columnApi: ColumnApi, resizedColumnsStore: ResizedColumnsStore, column: Column): void;
export declare function getMaxWidth(context: CanvasRenderingContext2D, text: string | undefined, hasSort: boolean, maxWidth: number | undefined, font: string): number | undefined;
export declare function getMaxWidthCached(context: CanvasRenderingContext2D, text: string, maxWidth: number | undefined, widthsCache: Map<string, number>, font: string): number | undefined;
export declare function getUpdatedColumnDefs(columns: Column[], maxWidths: Map<string, number>, padding: number): ColDef[];
/**
 * Ag-Grid API set desired column sizes (it *mutates* pivot table columns data).
 */
export declare function autoresizeAllColumns(columnApi: ColumnApi | null, autoResizedColumns: IResizedColumns): Promise<void>;
/**
 * Custom implementation of columns autoresizing according content: https://en.morzel.net/post/resizing-all-ag-gird-react-columns
 * Calculate the width of text for each grid cell and collect the minimum width needed for each of the gird columns.
 * Text width calculation is done efficiently with measureText method on Canvas.
 */
export declare function getAutoResizedColumns(tableDescriptor: TableDescriptor | null, gridApi: GridApi | null, columnApi: ColumnApi | null, execution: IExecutionResult | null, resizingConfig: ColumnResizingConfig, resizedColumnsStore: ResizedColumnsStore, options: {
    measureHeaders: boolean;
    padding: number;
    separators: any;
}, groupingProvider: IGroupingProvider): IResizedColumns;
export declare const isColumnAutoresizeEnabled: (columnAutoresizeOption: DefaultColumnWidth) => boolean;
//# sourceMappingURL=columnSizing.d.ts.map