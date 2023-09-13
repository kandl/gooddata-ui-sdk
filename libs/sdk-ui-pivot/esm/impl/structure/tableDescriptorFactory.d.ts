import { IntlShape } from "react-intl";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { TableColDefs, TableCols } from "./tableDescriptorTypes.js";
import { IPivotTableConfig } from "../../publicTypes.js";
/**
 * Constructs a table header descriptors and ag-grid colDefs using result metadata contained in the provided DataViewFacade.
 *
 * This function is not intended for stand-alone usage. It used during construction of TableDescriptor.
 *
 * @param dv - data view facade
 * @param emptyHeaderTitle - what to show for title of headers with empty title
 * @param config - optional pivot configuration
 * @internal
 */
export declare function createHeadersAndColDefs(dv: DataViewFacade, emptyHeaderTitle: string, isTransposed: boolean, config?: IPivotTableConfig, intl?: IntlShape): {
    headers: TableCols;
    colDefs: TableColDefs;
};
//# sourceMappingURL=tableDescriptorFactory.d.ts.map