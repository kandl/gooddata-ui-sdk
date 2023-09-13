import { TableDescriptor } from "../structure/tableDescriptor.js";
import { DataValue } from "@gooddata/sdk-model";
import { IGridRow } from "../data/resultTypes.js";
export type DrilledSliceDetail = {
    /**
     * Identifier of the attribute element for this slice.
     *
     * NOTE:
     *
     * @deprecated use URI instead; ID does not hold full information about the attribute element
     */
    id: string | null;
    /**
     * This is an URI exactly identifying attribute element. It is essentially a primary key of the
     * attribute element.
     */
    uri: string | null;
    /**
     * Name of the attribute element.
     */
    name: string | null;
};
export type DrilledRow = Array<DrilledSliceDetail | DataValue>;
/**
 * Given row in an ag-grid table and the table's descriptor, this function will create a drilled row. Drilled
 * row is an array with cols ordered in the same way as they appear in the table. The information about slice
 * columns appear first, followed by values of data columns.
 *
 * The the information about slice column contains both
 */
export declare function createDrilledRow(row: IGridRow, tableDescriptor: TableDescriptor): DrilledRow;
//# sourceMappingURL=drilledRowFactory.d.ts.map