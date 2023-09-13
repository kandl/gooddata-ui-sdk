import { GridApi } from "@ag-grid-community/all-modules";
declare function getHeaderHeight(gridApi: GridApi): number;
declare function getCellElement(gridApi: GridApi, attributeId: string, rowIndex: number): HTMLElement | null;
declare function addCellClass(gridApi: GridApi, attributeId: string, rowIndex: number, className: string): void;
declare function removeCellClass(gridApi: GridApi, attributeId: string, rowIndex: number, className: string): void;
declare function getPaginationBottomRowIndex(gridApi: GridApi): number | null;
declare function getPinnedTopRowElement(gridApi: GridApi): HTMLElement | null;
declare function addPinnedTopRowClass(gridApi: GridApi, className: string): void;
declare function removePinnedTopRowClass(gridApi: GridApi, className: string): void;
declare function setPinnedTopRowStyles(gridApi: GridApi, styles: Record<string, string>): void;
declare const _default: {
    getHeaderHeight: typeof getHeaderHeight;
    getCellElement: typeof getCellElement;
    addCellClass: typeof addCellClass;
    removeCellClass: typeof removeCellClass;
    getPinnedTopRowElement: typeof getPinnedTopRowElement;
    addPinnedTopRowClass: typeof addPinnedTopRowClass;
    removePinnedTopRowClass: typeof removePinnedTopRowClass;
    setPinnedTopRowStyles: typeof setPinnedTopRowStyles;
    getPaginationBottomRowIndex: typeof getPaginationBottomRowIndex;
};
export default _default;
//# sourceMappingURL=agApiWrapper.d.ts.map