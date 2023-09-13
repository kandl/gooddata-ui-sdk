import { LeafDataCol, TransposedMeasureDataCol } from "./tableDescriptorTypes.js";
import { ColumnLocator, IMeasureColumnLocator } from "../../columnWidths.js";
/**
 * Given a leaf data col, this function will create column locator that can be used in
 * width items.
 *
 * @param col - col definition to get locators for
 */
export declare function createColumnLocator(col: LeafDataCol): ColumnLocator[];
/**
 * Given a transposed slice measure or mixed values data col, this function will create column locator that can be used in
 * width items.
 *
 * @param col - col definition to get locators for
 */
export declare function createTransposedColumnLocator(col: TransposedMeasureDataCol | TransposedMeasureDataCol): IMeasureColumnLocator[];
//# sourceMappingURL=colLocatorFactory.d.ts.map