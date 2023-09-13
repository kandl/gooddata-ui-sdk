import { IntlShape } from "react-intl";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { DataValue, IResultHeader } from "@gooddata/sdk-model";
import { TableDescriptor } from "../structure/tableDescriptor.js";
import { IAgGridPage, IGridRow, IGridTotalsRow } from "./resultTypes.js";
export declare function getRow(tableDescriptor: TableDescriptor, cellData: DataValue[], rowIndex: number, rowHeaderData: IResultHeader[][], subtotalStyles: (string | null)[], intl: IntlShape): IGridRow;
export declare function getRowTotals(tableDescriptor: TableDescriptor, dv: DataViewFacade, intl: IntlShape): IGridTotalsRow[] | null;
/**
 * Given data view with a page of data and a table descriptor, this factory function creates page for consumption
 * by ag-grid.
 *
 * @param dv - data view with data to process (OK if its empty and has no data)
 * @param tableDescriptor - table descriptor
 * @param intl - intl bundle to get localized subtotal names
 */
export declare function createAgGridPage(dv: DataViewFacade, tableDescriptor: TableDescriptor, intl: IntlShape): IAgGridPage;
//# sourceMappingURL=rowFactory.d.ts.map