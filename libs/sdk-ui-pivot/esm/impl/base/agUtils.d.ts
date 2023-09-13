import { ColDef, Column, ColumnResizedEvent } from "@ag-grid-community/all-modules";
export declare function getGridIndex(position: number, gridDistance: number): number;
export declare function isColumn(item: Column | ColDef): item is Column;
export declare function isMeasureColumn(item: Column | ColDef): boolean;
export declare function isMeasureOrAnyColumnTotal(item: Column): boolean;
export declare function agColIds(columns: Column[]): string[];
export declare function isHeaderResizer(target: HTMLElement): boolean;
export declare function isManualResizing(columnEvent: ColumnResizedEvent): boolean;
export declare function scrollBarExists(target: HTMLDivElement): boolean;
//# sourceMappingURL=agUtils.d.ts.map