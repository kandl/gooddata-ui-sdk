import { GridApi } from "@ag-grid-community/all-modules";
import { IGroupingProvider } from "./data/rowGroupingProvider.js";
import ApiWrapper from "./base/agApiWrapper.js";
export interface IScrollPosition {
    readonly top: number;
    readonly left: number;
}
export declare function initializeStickyRow(gridApi: GridApi): void;
export declare function updateStickyRowPosition(gridApi: GridApi | null, apiWrapper?: any): void;
export declare function stickyRowExists(gridApi: GridApi, apiWrapper?: any): boolean;
export declare function updateStickyRowContentClassesAndData(currentScrollPosition: IScrollPosition, lastScrollPosition: IScrollPosition, rowHeight: number, gridApi: GridApi | null, groupingProvider: IGroupingProvider, apiWrapper: typeof ApiWrapper): void;
//# sourceMappingURL=stickyRowHandler.d.ts.map