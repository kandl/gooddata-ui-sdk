import { SortDirection } from "@gooddata/sdk-model";
import { ColDef, Column } from "@ag-grid-community/all-modules";
/**
 * This interface pin-points the sort-specific props in ag-grid ColDef.
 */
export type SortIndicator = {
    colId: string;
    sort: SortDirection;
};
export declare function createSortIndicators(columns: Array<Column> | Array<ColDef>): SortIndicator[];
//# sourceMappingURL=tableDescriptorSorting.d.ts.map