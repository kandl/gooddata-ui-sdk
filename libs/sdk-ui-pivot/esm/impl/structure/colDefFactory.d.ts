import { IntlShape } from "react-intl";
import { TableColDefs, TableCols } from "./tableDescriptorTypes.js";
import { ISortItem } from "@gooddata/sdk-model";
import { IPivotTableConfig } from "../../publicTypes.js";
/**
 * Given table column descriptors & list of sort items, this function will create ag-grid ColDefs which mirror
 * the column descriptor. Any ColDefs whose descriptors match the sortItems will have the sorts set according
 * to the matching sort item.
 *
 * @param table - table col descriptors
 * @param initialSorts - initial table sorting definition
 * @param emptyHeaderTitle - what to show for title of headers with empty title
 * @param config - optional pivot config
 */
export declare function createColDefsFromTableDescriptor(table: TableCols, initialSorts: ISortItem[], emptyHeaderTitle: string, isTransposed: boolean, config?: IPivotTableConfig, intl?: IntlShape): TableColDefs;
//# sourceMappingURL=colDefFactory.d.ts.map