import { ColDef, GridApi } from "@ag-grid-community/all-modules";
import { IGridTotalsRow } from "./resultTypes.js";
import { IDimension } from "@gooddata/sdk-model";
export declare function areTotalsChanged(gridApi: GridApi | undefined, newTotals: IGridTotalsRow[] | null): boolean;
export declare function isInvalidGetRowsRequest(startRow: number, gridApi: GridApi | undefined): boolean;
export declare function isSomeTotal(rowType: string | undefined): boolean;
export declare function isSomeColumnTotal(colDef: ColDef): boolean;
export declare function isColumnTotal(colDef: ColDef): boolean;
export declare function isColumnSubtotal(colDef: ColDef): boolean;
export declare function getSubtotalStyles(dimension: IDimension | undefined): (string | null)[];
//# sourceMappingURL=dataSourceUtils.d.ts.map