import { AnyCol, ScopeCol, SeriesCol, SliceCol, MixedValuesCol } from "../structure/tableDescriptorTypes.js";
import { IMappingHeader } from "@gooddata/sdk-ui";
import { IGridRow } from "../data/resultTypes.js";
import { ColumnHeadersPosition } from "../../publicTypes.js";
export declare function createDataColLeafHeaders(col: SeriesCol): IMappingHeader[];
/**
 * For transposed table add metric descriptor from row
 */
export declare function createScopeColWithMetricHeaders(col: ScopeCol, includeColGroupHeaders: boolean, row?: IGridRow): IMappingHeader[];
export declare function createMixedValuesColHeaders(col: MixedValuesCol, row: IGridRow): IMappingHeader[];
export declare function createSliceColHeaders(col: SliceCol, row: IGridRow): IMappingHeader[];
/**
 * Given column and optionally a grid row, this function will collect all descriptors and headers
 * to create 'mapping headers' that can be used for matching the column against drill predicates.
 *
 * Note: the row is optional and will only be needed when constructing headers for slicing columns (e.g. columns
 * that contain slicing attribute elements) - as the attribute element headers are in the row data.
 *
 * @param col - column to get mapping headers for
 * @param row - row
 */
export declare function createDrillHeaders(col: AnyCol, row: IGridRow, columnHeadersPosition: ColumnHeadersPosition, isTransposed: boolean): IMappingHeader[];
//# sourceMappingURL=colDrillHeadersFactory.d.ts.map