import { DataCol, ScopeCol, SeriesCol, TransposedMeasureDataCol } from "./tableDescriptorTypes.js";
import { ColumnLocator } from "../../columnWidths.js";
/**
 * Given data sheet columns, this function will traverse them in order to attempt to match the provided
 * column locators. This function works recursively, if the cols are composite (root col or scope col) then
 * after successfully matching locator, the code proceed further to search through the children.
 *
 * @param cols - columns to search
 * @param locators - column locators to match
 */
export declare function searchForLocatorMatch(cols: DataCol[], locators: ColumnLocator[]): SeriesCol | ScopeCol | undefined;
/**
 *
 * @param cols - columns to search
 * @param locators - column locators to match
 */
export declare function searchForTransposedLocatorMatch(cols: TransposedMeasureDataCol[], locators: ColumnLocator[]): TransposedMeasureDataCol | undefined;
//# sourceMappingURL=colLocatorMatching.d.ts.map