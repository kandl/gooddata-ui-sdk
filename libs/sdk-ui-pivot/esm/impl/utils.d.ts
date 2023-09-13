import { IAttributeDescriptor, IExecutionDefinition, ISortItem, ITotal } from "@gooddata/sdk-model";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { ColumnWidthItem } from "../columnWidths.js";
declare function getScrollbarWidthBody(): number;
/**
 * Returns the current actual scrollbar width.
 * For performance reasons this is memoized as the value is highly unlikely to change
 */
export declare const getScrollbarWidth: typeof getScrollbarWidthBody;
export declare function sleep(delay: number): Promise<void>;
/**
 * Get only valid totals from an execution definition given a list of sort items
 * Use provided totals, if not given, use totals from ATTRIBUTE bucket
 *
 * @param definition - an execution definition to sanitize
 * @param sortItems - a specification of the sort, if not provided definition.sortBy will be used
 * @param totals - totals to be sanitized, if not provided ATTRIBUTE bucket totals will be used
 */
export declare function sanitizeDefTotals(definition: IExecutionDefinition, sortItems?: ISortItem[], totals?: ITotal[]): ITotal[];
/**
 * Get totals from an execution definition for COLUMNS bucket
 *
 * @param definition - an execution definition from which totals should be extracted
 */
export declare function getTotalsForColumnsBucket(definition: IExecutionDefinition): ITotal[];
export declare const tableHasRowAttributes: (rowAttributes: IAttributeDescriptor[]) => boolean;
export declare const tableHasColumnAttributes: (columnAttributes: IAttributeDescriptor[]) => boolean;
export declare const isStrongColumnWidthItem: (item: ColumnWidthItem) => boolean;
export declare const getDataViewSeriesDescriptors: (dv: DataViewFacade) => import("@gooddata/sdk-ui").DataSeriesDescriptor[];
export {};
//# sourceMappingURL=utils.d.ts.map