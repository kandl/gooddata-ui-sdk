import { IntlShape } from "react-intl";
import { AnyCol, SliceCol, TableColDefs, TableCols, LeafDataCol, SliceMeasureCol, MixedValuesCol, MixedHeadersCol, TransposedMeasureDataCol } from "./tableDescriptorTypes.js";
import { ColDef, ColGroupDef, Column } from "@ag-grid-community/all-modules";
import { IAttributeColumnWidthItem, IMeasureColumnWidthItem, ISliceMeasureColumnWidthItem, IMixedValuesColumnWidthItem } from "../../columnWidths.js";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { ISortItem, IMeasureDescriptor, IAttributeDescriptor } from "@gooddata/sdk-model";
import { IPivotTableConfig } from "../../publicTypes.js";
/**
 * Table Descriptor is the entry point to all table structure data and metadata. It contains exhaustive information
 * about all table columns (column descriptors) and their respective ag-grid column definitions.
 *
 * On top of this data and metadata, the table descriptor provides convenience and added value methods.
 *
 * Column Descriptors vs ag-grid ColDefs | ColGroupDefs
 * ----------------------------------------------------
 *
 * Column Descriptors (shortened to `Col` for sakes of brevity) are our implementation-specific descriptors for
 * the table columns and their grouping into column groups. They contain all the essential GD-specific metadata about
 * the content of the respective table column (attribute descriptors, headers, measure descriptors) and additional
 * structural information.
 *
 * The ag-grid ColDefs and ColGroupDefs are (naturally) used to construct the ag-grid table :) They are built to
 * reflect the column descriptors but only contain the information needed by ag-grid itself.
 *
 * The important thing to remember is that ColDefs and ColGroupDefs have same colId/groupId as their column descriptor
 * counterparts.
 *
 * @alpha
 */
export declare class TableDescriptor {
    private readonly dv;
    readonly headers: TableCols;
    readonly colDefs: TableColDefs;
    /**
     * This field contains slice column descriptors zipped with their respective ColDef that should
     * be used for ag-grid.
     */
    readonly zippedSliceCols: Array<[SliceCol | SliceMeasureCol | MixedValuesCol, ColDef]>;
    /**
     * This field contains descriptors of leaf columns zipped with their respective ColDef that should
     * be used for ag-grid.
     */
    readonly zippedLeaves: Array<[LeafDataCol, ColDef]>;
    private readonly _seriesColsCount;
    private constructor();
    private static _getMeasureGroupDimensionIndex;
    /**
     * Creates a new table descriptor from the provided data view facade.
     *
     * @param dv - data view facade
     * @param emptyHeaderTitle - what to show for title of headers with empty title
     * @param config - optional pivot configuration
     */
    static for(dv: DataViewFacade, emptyHeaderTitle: string, config?: IPivotTableConfig, intl?: IntlShape): TableDescriptor;
    /**
     * Creates a new table descriptor from the provided data view facade.
     *
     * @param dv - data view facade
     */
    static isTransposed(dv: DataViewFacade): boolean;
    private _initializeZippedLeaves;
    private _zipOneCol;
    private _initializeZippedSliceCols;
    /**
     * Gets column descriptor for column with the provided ID. This method will raise error if there is no such
     * col: this is to draw out possible errors in the rest of table code that uses the cols and ColDefs.
     *
     * @param c - column id, Column, ColDef or ColGroupDef from ag-grid
     */
    getCol(c: string | Column | ColDef | ColGroupDef): AnyCol;
    /**
     * Gets ColDef or ColGroupDef for column with the provided ID. This method will raise error if there is no such
     * col: this is to draw out possible errors in the rest of table code that uses the cols and ColDefs.
     *
     * @param c - column id, Column, ColDef or ColGroupDef from ag-grid
     */
    getColDef(c: string | Column | ColDef | ColGroupDef): ColDef | ColGroupDef;
    /**
     * Gets descriptors of all attributes that are used to slice the table into columns. Note that it is perfectly
     * OK that table has no scoping attributes.
     *
     * @returns empty if there are no scoping attributes
     */
    getScopingAttributes(): IAttributeDescriptor[];
    /**
     * Gets descriptors of all attributes that are used to slice the table into rows. Note that it is perfectly
     * OK that table has no slicing attributes.
     *
     * @returns empty if there are no slicing attributes
     */
    getSlicingAttributes(): IAttributeDescriptor[];
    /**
     *
     */
    sliceColCount(): number;
    /**
     *
     */
    sliceMeasureColCount(): number;
    /**
     * whether metrics are moved to rows or not
     */
    isTransposed(): boolean;
    mixedHeadersColsCount(): number;
    /**
     * Gets count of scoping attributes (columns).
     */
    scopingColCount(): number;
    /**
     * Gets all descriptors of all measures that were used to compute data values for this table. Note that it is
     * perfectly OK that table has no measures. If the table has slicing attributes, then it will be listing out
     * all available attribute values.
     *
     * Also note that table MAY have more data leaf columns than there are number of measures. If the measures
     * are further scoped for values of some attribute's elements, then there will be one series col for each combination
     * of measure X attribute element.
     *
     * @returns empty if there are no measures
     */
    getMeasures(): IMeasureDescriptor[];
    /**
     * Returns count of leaf data cols. This represents the actual width of the data sheet holding the computed metric
     * values.
     */
    seriesColsCount(): number;
    /**
     * Tests whether the column with the provided id is the first (e.g. left-most) column in the table. Table with
     * slicing attributes has first col a SliceCol. Table without slicing attributes starts with either SeriesCol or
     * with ScopeCol (in case table does not contain measures)
     *
     * @param c - column id, Column, ColDef or ColGroupDef from ag-grid
     */
    isFirstCol(c: string | Column | ColDef | ColGroupDef): boolean;
    /**
     * Tests whether the column with the provided id is the first (e.g. left-most) column of the data sheet part of the table.
     *
     * Note that for table that uses column groups, there will be multiple first columns: the grouping root and recursively
     * its first children down to the first leaf col..
     *
     * @param c - column id, Column, ColDef or ColGroupDef from ag-grid
     */
    isFirstDataCol(c: string | Column | ColDef | ColGroupDef): boolean;
    /**
     * Tests whether the table has scoping cols. Scoping cols mean table's data cols are organizes into a tree hierarchy.
     */
    hasScopingCols(): boolean;
    /**
     * Tests whether the table has any leaf data cols - in other words whether there any computed data values to show
     * in the table. It is OK for table not to have any data leaf cols - it may be just a table with slicing cols listing
     * elements of an attribute.
     */
    hasDataLeafCols(): boolean;
    /**
     * Tests whether the table has column headers moved to the
     */
    hasHeadersOnLeft(): boolean;
    /**
     * Given a column that may appear as a leaf of table headers this method returns its absolute index in the table.
     *
     * This takes into account that the table columns go from left-to-right, starting with slicing columns first then
     * followed by leaf data columns.
     *
     * @param col - column to get absolute index of
     */
    getAbsoluteLeafColIndex(col: SliceCol | SliceMeasureCol | LeafDataCol | MixedHeadersCol | MixedValuesCol): number;
    /**
     * Attempts to match the provided attribute column width item to a SliceCol descriptor.
     *
     * @param columnWidthItem - item to match
     */
    matchAttributeWidthItem(columnWidthItem: IAttributeColumnWidthItem): SliceCol | undefined;
    /**
     * Attempts to match the provided measure width item to a leaf data col. The locators in the item
     * will be used to traverse the column structure.
     *
     * @param measureWidthItem - item to match
     */
    matchMeasureWidthItem(measureWidthItem: IMeasureColumnWidthItem): LeafDataCol | undefined;
    /**
     * Attempts to match the provided slice measure width item to a transposed measure data col. The locators in the item
     * will be used to traverse the column structure.
     *
     * @param measureWidthItem - item to match
     */
    matchSliceMeasureWidthItem(sliceMeasureWidthItem: ISliceMeasureColumnWidthItem): TransposedMeasureDataCol | undefined;
    /**
     * Attempts to match the provided mixed values measure width item to a tranposed measure data col. The locators in the item
     * will be used to traverse the column structure.
     *
     * @param measureWidthItem - item to match
     */
    matchMixedValuesWidthItem(mixedValuesWidhItem: IMixedValuesColumnWidthItem): TransposedMeasureDataCol | undefined;
    /**
     * Tests whether the table can be enriched by row totals. Tables that do not have any measures, do not have any
     * slicing attributes cannot have row totals. Because by definition they either have exactly 1 row with all measure grant total
     * sum or have no rows whatsoever.
     */
    canTableHaveRowTotals(): boolean;
    /**
     * Tests whether the table can be enriched by column totals. Tables that do not have any measures, do not have any
     * scoping attribute cannot have column totals. Because by definition they either have exactly 1 column with all measure grant total
     * sum or have no columns whatseover.
     */
    canTableHaveColumnTotals(): boolean;
    /**
     * Returns slice col against which grant totals can be defined. This is essentially the left-most slicing column.
     * This method will raise invariant error if there are no slicing cols. Rationale being that inclusion of grand
     * totals requires more checks anyway and calling this blindly does not make much sense.
     *
     * @remarks see {@link TableDescriptor.canTableHaveTotals}
     */
    getGrandTotalCol(): SliceCol;
    /**
     * Given a col, this function determines all slice cols that are effective up to and including
     * the col. In other words, it returns all slice cols 'to the left' of the provided col.
     *
     * Note: the col can be of any type. If a data col is provided, then by definition all slice cols are
     * effective. if col is a slice col, then slice cols from start up to and including the provided col
     * are returned.
     */
    getSliceColsUpToIncludingCol(col: AnyCol): SliceCol[];
    /**
     * Given ag-grid columns or coldefs and a list of initial sort items, this function will create
     * sort items that reflect current table sorting configuration. The sorting configuration is obtained from the
     * Column/ColDef `getSort`/`sort` property.
     *
     * Note: the initial sort items are passed to here to ensure that attribute area sort setting is reused
     * correctly when sort direction for the respective column changes.
     *
     * @param columns - ag-grid columns / coldefs to obtain sorting information from
     * @param originalSorts - original sorts
     */
    createSortItems(columns: Array<Column> | Array<ColDef>, originalSorts?: ISortItem[]): ISortItem[];
    /**
     * Updates effective totals for the slice cols using the new total descriptors included for their respective
     * attributes in the new data view facade.
     *
     * @param dv - data view with same attribute structure but with added totals
     */
    updateEffectiveTotals(dv: DataViewFacade): void;
}
//# sourceMappingURL=tableDescriptor.d.ts.map