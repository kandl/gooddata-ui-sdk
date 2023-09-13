import { AnyCol } from "./tableDescriptorTypes.js";
import { ISortItem, SortDirection } from "@gooddata/sdk-model";
/**
 * Creates a SortItem for the provided column, sorting in particular direction. Depending on the column type,
 * this factory will create either an attribute sort item or measure sort item with appropriate locators.
 *
 * Note the originalSorts. These are optional, if provided they are used when creating an attribute sort to
 * determine whether to create 'normal' or area sort for that column.
 *
 * @param col - col to get sort item for
 * @param direction - sort direction
 * @param originalSorts - original sorts, optional, to determine if area sort indicator should be transferred.
 */
export declare function createSortItemForCol(col: AnyCol, direction: SortDirection, originalSorts?: ISortItem[]): ISortItem;
//# sourceMappingURL=colSortItemFactory.d.ts.map