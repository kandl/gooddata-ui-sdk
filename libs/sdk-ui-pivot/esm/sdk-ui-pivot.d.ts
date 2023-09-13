/**
 * This package provides the PivotTable component that you can use to visualize your data in a table-based manner.
 *
 * @remarks
 * The PivotTable component provides additional capabilities such as totals, automatic column resizing, and more.
 *
 * @packageDocumentation
 */

/// <reference types="react" />

import { AttributesMeasuresOrPlaceholders } from '@gooddata/sdk-ui';
import { AttributesOrPlaceholders } from '@gooddata/sdk-ui';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAttribute } from '@gooddata/sdk-model';
import { IBackendCapabilities } from '@gooddata/sdk-backend-spi';
import { IBucket } from '@gooddata/sdk-model';
import { Identifier } from '@gooddata/sdk-model';
import { IDimension } from '@gooddata/sdk-model';
import { IExecutionConfig } from '@gooddata/sdk-model';
import { IMeasure } from '@gooddata/sdk-model';
import { IPreparedExecution } from '@gooddata/sdk-backend-spi';
import { ISeparators } from '@gooddata/sdk-model';
import { ITheme } from '@gooddata/sdk-model';
import { IVisualizationCallbacks } from '@gooddata/sdk-ui';
import { IVisualizationProps } from '@gooddata/sdk-ui';
import { NullableFiltersOrPlaceholders } from '@gooddata/sdk-ui';
import { default as React_2 } from 'react';
import { SortsOrPlaceholders } from '@gooddata/sdk-ui';
import { TotalsOrPlaceholders } from '@gooddata/sdk-ui';
import { TotalType } from '@gooddata/sdk-model';
import { WrappedComponentProps } from 'react-intl';

/**
 * @public
 */
export declare type ColumnHeadersPosition = "top" | "left";

/**
 * @public
 */
export declare type ColumnLocator = IAttributeColumnLocator | IMeasureColumnLocator | ITotalColumnLocator;

/**
 * @public
 */
export declare type ColumnResizedCallback = (columnWidths: ColumnWidthItem[]) => void;

/**
 * @public
 */
export declare type ColumnWidth = IAbsoluteColumnWidth | IAutoColumnWidth;

/**
 * @public
 */
export declare type ColumnWidthItem = IAttributeColumnWidthItem | IMeasureColumnWidthItem | ISliceMeasureColumnWidthItem | IMixedValuesColumnWidthItem | IAllMeasureColumnWidthItem | IWeakMeasureColumnWidthItem;

/**
 * @internal
 */
export declare const CorePivotTable: React_2.FC<ICorePivotTableProps>;

/**
 * @public
 */
export declare type DefaultColumnWidth = "unset" | "autoresizeAll" | "viewport";

/**
 * Prepares dimensions for pivot table execution from buckets and info if table is transposed or not.
 *
 * @param buckets - table buckets
 * @param isTransposed - whether table is transposed (metrics are in rows)
 * @public
 */
export declare function getPivotTableDimensions(buckets: IBucket[], isTransposed: boolean): IDimension[];

/**
 * @public
 */
export declare interface IAbsoluteColumnWidth {
    value: number;
    allowGrowToFit?: boolean;
}

/**
 * @public
 */
export declare interface IAllMeasureColumnWidthItem {
    measureColumnWidthItem: IAllMeasureColumnWidthItemBody;
}

/**
 * Object defining {@link IAllMeasureColumnWidthItem} object body.
 *
 * @public
 */
export declare interface IAllMeasureColumnWidthItemBody {
    width: IAbsoluteColumnWidth;
}

/**
 * Locates all columns for an attribute or columns for particular attribute element.
 *
 * @public
 */
export declare interface IAttributeColumnLocator {
    attributeLocatorItem: IAttributeColumnLocatorBody;
}

/**
 * Object defining the {@link IAttributeColumnLocator} object body.
 *
 * @public
 */
export declare interface IAttributeColumnLocatorBody {
    /**
     * Local identifier of the attribute
     */
    attributeIdentifier: Identifier;
    /**
     * Attribute element URI / primary key.
     */
    element?: string | null;
}

/**
 * @public
 */
export declare interface IAttributeColumnWidthItem {
    attributeColumnWidthItem: IAttributeColumnWidthItemBody;
}

/**
 * Object defining the {@link IAttributeColumnWidthItem} object body.
 *
 * @public
 */
export declare interface IAttributeColumnWidthItemBody {
    width: IAbsoluteColumnWidth;
    attributeIdentifier: Identifier;
}

/**
 * @public
 */
export declare interface IAutoColumnWidth {
    value: "auto";
}

/**
 * @public
 */
export declare interface IColumnSizing {
    /**
     * Indicate that the table should grow to fit into the allocated space.
     *
     * @remarks
     * Default: false
     */
    growToFit?: boolean;
    /**
     * Specify whether columns should be resized to fill the entire viewport.
     *
     * @remarks
     * Default: unset
     */
    defaultWidth?: DefaultColumnWidth;
    /**
     * Specify custom column widths to apply.
     *
     * @remarks
     * Default: none
     */
    columnWidths?: ColumnWidthItem[];
}

/**
 * @internal
 */
export declare interface ICorePivotTableProps extends IPivotTableBaseProps, WrappedComponentProps {
    execution: IPreparedExecution;
    theme?: ITheme;
}

/**
 * Locates table column by column measure's localId.
 *
 * @public
 */
export declare interface IMeasureColumnLocator {
    measureLocatorItem: IMeasureColumnLocatorBody;
}

/**
 * Object defining the {@link IMeasureColumnLocator} object body.
 *
 * @public
 */
export declare interface IMeasureColumnLocatorBody {
    /**
     * Local identifier of the measure.
     */
    measureIdentifier: Identifier;
}

/**
 * @public
 */
export declare interface IMeasureColumnWidthItem {
    measureColumnWidthItem: IMeasureColumnWidthItemBody;
}

/**
 * Object defining the {@link IMeasureColumnWidthItem} object body.
 *
 * @public
 */
export declare interface IMeasureColumnWidthItemBody {
    width: ColumnWidth;
    locators: ColumnLocator[];
}

/**
 * @public
 */
export declare interface IMenu {
    /**
     * If true, grand totals and subtotals can be added to the table using table menu.
     *
     * @remarks
     * Default: false
     */
    aggregations?: boolean;
    /**
     * If true, subtotals can be added to the table using table menu.
     * TODO: remove for SDK9
     *
     * @remarks
     * Default: false
     */
    aggregationsSubMenu?: boolean;
    /**
     * Specifies which aggregation functions can be selected from the menu.
     *
     * @remarks
     * Note: this option only impacts available menu items. It will not be used to filter totals that
     * you specify on the pivot table props.
     *
     * Default: all available types.
     */
    aggregationTypes?: TotalType[];
    /**
     * If true, total and subtotals for columns (yes, for columns, although the naming is rows) can be added to the table using table menu.
     * This will be removed in the future, it's under feature flag control for development purposes.
     *
     * @remarks
     * Default: false
     */
    aggregationsSubMenuForRows?: boolean;
}

/**
 * @public
 */
export declare interface IMixedValuesColumnWidthItem {
    mixedValuesColumnWidthItem: IMixedValuesColumnWidthItemBody;
}

/**
 * Object defining the {@link IMixedValuesColumnWidthItemBody } object body.
 *
 * @public
 */
export declare interface IMixedValuesColumnWidthItemBody {
    width: ColumnWidth;
    locators: IMeasureColumnLocator[];
}

/**
 * @public
 */
export declare interface IPivotTableBaseProps extends IVisualizationProps, IVisualizationCallbacks {
    /**
     * Customize size of page when fetching data from backend.
     *
     * @remarks
     * Default is 100.
     */
    pageSize?: number;
    /**
     * Customize how pivot table capabilities and behavior.
     */
    config?: IPivotTableConfig;
    /**
     * Execution configuration.
     *
     * @remarks
     * This property will provide the execution with necessary config before initiating execution.
     */
    execConfig?: IExecutionConfig;
    /**
     * Specify function to call when user manually resizes a table column.
     *
     * @param columnWidths - new widths for columns
     */
    onColumnResized?: ColumnResizedCallback;
}

/**
 * @public
 */
export declare interface IPivotTableBucketProps {
    /**
     * Specify measures to create table columns from.
     */
    measures?: AttributesMeasuresOrPlaceholders;
    /**
     * Specify one or more attributes to create table columns from.
     *
     * @remarks
     * There will be a column for each combination of the specified attribute's values.
     *
     * Note: you can specify column attributes in conjunction with one or more measures. In that case the table
     * will contain column for each combination of attribute values & measures.
     */
    columns?: AttributesOrPlaceholders;
    /**
     * Specify attributes, whose elements will be used to populate table rows.
     */
    rows?: AttributesOrPlaceholders;
    /**
     * Specify what totals should be calculated and included in the table.
     *
     * @remarks
     * Note: table can only render column subtotal and/or grand-totals. It is not possible to calculate row totals.
     * Also note: the table will only include subtotals when in grouping mode and the grouping is effective = table
     * is sorted by the first row attribute.
     */
    totals?: TotalsOrPlaceholders;
    /**
     * Specify filters to apply on the data to chart.
     */
    filters?: NullableFiltersOrPlaceholders;
    /**
     * Specify how to sort the data to chart.
     */
    sortBy?: SortsOrPlaceholders;
    /**
     * Optional resolution context for composed placeholders.
     */
    placeholdersResolutionContext?: any;
}

/**
 * @public
 */
export declare interface IPivotTableConfig {
    /**
     * Customize column sizing strategy.
     *
     * @remarks
     * Default: none
     */
    columnSizing?: IColumnSizing;
    /**
     * Specify whether the table should group rows.
     *
     * @remarks
     * If this is turned on and the table is sorted by the first row attribute, then the grouping will take effect.
     *
     * Default: true
     */
    groupRows?: boolean;
    /**
     * Customize number segment separators (thousands, decimals)
     */
    separators?: ISeparators;
    /**
     * customize whether the column-level burger menu should be visible and if so,
     * what aggregations should be allowed.
     */
    menu?: IMenu;
    /**
     * Customize maximum height of the table.
     */
    maxHeight?: number;
    /**
     * Customize placement of metrics - in columns or in rows
     * @alpha
     *
     * Default: "columns"
     */
    measureGroupDimension?: MeasureGroupDimension;
    /**
     * Customize placement of column headers - top or left
     * @alpha
     *
     * Default: "top"
     */
    columnHeadersPosition?: ColumnHeadersPosition;
}

/**
 * @public
 */
export declare interface IPivotTableProps extends IPivotTableBaseProps, IPivotTableBucketProps {
    /**
     * Specify an instance of analytical backend instance to work with.
     *
     * @remarks
     * Note: if you do not have a BackendProvider above in the component tree, then you MUST specify the backend.
     */
    backend?: IAnalyticalBackend;
    /**
     * Specify workspace to work with.
     *
     * @remarks
     * Note: if you do not have a WorkspaceProvider above in the component tree, then you MUST specify the workspace.
     */
    workspace?: string;
}

/**
 * Tests whether object is an instance of {@link IAbsoluteColumnWidth}
 *
 * @public
 */
export declare function isAbsoluteColumnWidth(columnWidth: ColumnWidth): columnWidth is IAbsoluteColumnWidth;

/**
 * Tests whether object is an instance of {@link IAllMeasureColumnWidthItem}
 *
 * @public
 */
export declare function isAllMeasureColumnWidthItem(obj: unknown): obj is IAllMeasureColumnWidthItem;

/**
 * Tests whether object is an instance of {@link IAttributeColumnLocator}
 *
 * @public
 */
export declare function isAttributeColumnLocator(obj: unknown): obj is IAttributeColumnLocator;

/**
 * Tests whether object is an instance of {@link IAttributeColumnWidthItem}
 *
 * @public
 */
export declare function isAttributeColumnWidthItem(obj: unknown): obj is IAttributeColumnWidthItem;

/**
 * @public
 */
export declare interface ISliceMeasureColumnWidthItem {
    sliceMeasureColumnWidthItem: ISliceMeasureColumnWidthItemBody;
}

/**
 * Object defining the {@link ISliceMeasureColumnWidthItem } object body.
 *
 * @public
 */
export declare interface ISliceMeasureColumnWidthItemBody {
    width: ColumnWidth;
    locators: IMeasureColumnLocator[];
}

/**
 * Tests whether object is an instance of {@link IMeasureColumnLocator}
 *
 * @public
 */
export declare function isMeasureColumnLocator(obj: unknown): obj is IMeasureColumnLocator;

/**
 * Tests whether object is an instance of {@link IMeasureColumnWidthItem}
 *
 * @public
 */
export declare function isMeasureColumnWidthItem(obj: unknown): obj is IMeasureColumnWidthItem;

/**
 * Tests whether object is an instance of {@link IMixedValuesColumnWidthItem}
 *
 * @public
 */
export declare function isMixedValuesColumnWidthItem(obj: unknown): obj is IMixedValuesColumnWidthItem;

/**
 * Tests whether object is an instance of {@link ISliceMeasureColumnWidthItem}
 *
 * @public
 */
export declare function isSliceMeasureColumnWidthItem(obj: unknown): obj is ISliceMeasureColumnWidthItem;

/**
 * Tests whether object is an instance of {@link ITotalColumnLocator}
 *
 * @public
 */
export declare function isTotalColumnLocator(obj: unknown): obj is ITotalColumnLocator;

/**
 * Tests whether object is an instance of {@link IWeakMeasureColumnWidthItem}
 *
 * @public
 */
export declare function isWeakMeasureColumnWidthItem(obj: unknown): obj is IWeakMeasureColumnWidthItem;

/**
 * Locates all columns for a columns for particular total.
 *
 * @public
 */
export declare interface ITotalColumnLocator {
    totalLocatorItem: ITotalColumnLocatorBody;
}

/**
 * Object defining the {@link ITotalColumnLocator} object body.
 *
 * @public
 */
export declare interface ITotalColumnLocatorBody {
    /**
     * Local identifier of the attribute inside which the subtotal is put
     */
    attributeIdentifier: Identifier;
    /**
     * Function for the total, such as sum, max, min, ...
     */
    totalFunction: string;
}

/**
 * @public
 */
export declare interface IWeakMeasureColumnWidthItem {
    measureColumnWidthItem: IWeakMeasureColumnWidthItemBody;
}

/**
 * Object defining the {@link IWeakMeasureColumnWidthItem} object body.
 *
 * @public
 */
export declare interface IWeakMeasureColumnWidthItemBody {
    width: IAbsoluteColumnWidth;
    locator: IMeasureColumnLocator;
}

/**
 * @public
 */
export declare type MeasureGroupDimension = "columns" | "rows";

/**
 * Creates a new attribute column locator
 *
 * @remarks
 * This is used to narrow down location of measure columns in pivot table, where
 * measures are further scoped by different attribute elements - imagine pivot table with defined for measure 'Amount' and column
 * attribute 'Product'. The table will have multiple columns for the 'Amount' measure - each for different element of the
 * 'Product' attribute. In this context, identifying particular measure columns needs to be more specific.
 *
 * The attribute column locator can match either single element of particular attribute, or all elements of particular
 * attribute.
 *
 * @param attributeOrId - Column attribute specified by either value or by localId reference
 * @param element - specify attribute element URI or primary key; if not specified, the locator will match
 *  all elements of the attribute
 * @public
 */
export declare function newAttributeColumnLocator(attributeOrId: IAttribute | string, element?: string): IAttributeColumnLocator;

/**
 * Creates a new total column locator
 *
 * @param attributeOrId - Column attribute specified by either value or by localId reference
 * @param totalFunction - Function for the total, such as sum, max, min...
 * @alpha
 */
export declare function newTotalColumnLocator(attributeOrId: IAttribute | string, totalFunction: string): ITotalColumnLocator;

/**
 * Creates width item that will set width for all columns containing values of the provided measure.
 *
 * @param measureOrId - Measure specified either by value or by localId reference
 * @param width - Width in pixels
 * @param allowGrowToFit - indicates whether the column is allowed to grow if the table's growToFit is enabled
 * @public
 */
export declare function newWidthForAllColumnsForMeasure(measureOrId: IMeasure | string, width: number, allowGrowToFit?: boolean): IWeakMeasureColumnWidthItem;

/**
 * Creates width item that will set width for all measure columns in the table.
 *
 * @param width - Width in pixels
 * @param allowGrowToFit - indicates whether the column is allowed to grow if the table's growToFit is enabled
 * @public
 */
export declare function newWidthForAllMeasureColumns(width: number, allowGrowToFit?: boolean): IAllMeasureColumnWidthItem;

/**
 * Creates width item that will set width of a column which contains values of a row attribute.
 *
 * @param attributeOrId - Attribute specified by value or by localId reference
 * @param width - Width in pixels
 * @param allowGrowToFit - indicates whether the column is allowed to grow if the table's growToFit is enabled
 * @public
 */
export declare function newWidthForAttributeColumn(attributeOrId: IAttribute | string, width: number, allowGrowToFit?: boolean): IAttributeColumnWidthItem;

/**
 * Creates width item that will set width for all columns containing values of the provided measure.
 * To prepare width items for columns in tables without measures, pass measureOrId as `null`.
 *
 * @remarks
 * See also {@link newAttributeColumnLocator} to learn more about the attribute column locators.
 *
 * @param measureOrId - Measure specified either by value or by localId reference
 * @param locators - Attribute locators to narrow down selection
 * @param width - Width in pixels
 * @param allowGrowToFit - indicates whether the column is allowed to grow if the table's growToFit is enabled
 @deprecated this method is deprecated, please use {@link setNewWidthForSelectedColumns} instead.
 * @public
 */
export declare function newWidthForSelectedColumns(measureOrId: IMeasure | string, locators: (IAttributeColumnLocator | ITotalColumnLocator)[], width: number | "auto", allowGrowToFit?: boolean): IMeasureColumnWidthItem;

/**
 * [PivotTable](https://sdk.gooddata.com/gooddata-ui/docs/pivot_table_component.html)
 * is a component with bucket props measures, rows, columns, totals, sortBy, filters
 *
 * @public
 */
export declare const PivotTable: (props: IPivotTableProps) => JSX.Element;

/**
 * Given analytical backend capabilities and the desired aggregations menu config.
 *
 * @remarks
 * This function will correct the menu configuration so that it fits the capabilities.
 *
 * The function will explicitly set the options regardless of what is the (current) default value of the option if
 * it is not present in the menu. The backend capabilities are a hard stop for features.
 *
 * Note: the {@link PivotTable} will use this function out of the box to ensure the effective menu configuration
 * matches the backend capabilities. You don't need to use when creating a PivotTable.
 *
 * @param capabilities - Backend capabilities
 * @param desiredMenu - Aggregation menu configuration desired by the client
 * @public
 */
export declare function pivotTableMenuForCapabilities(capabilities: IBackendCapabilities, desiredMenu?: IMenu): IMenu;

/**
 * Creates width item that will set width for all columns containing values of the provided measure.
 * To prepare width items for columns in tables without measures, pass measureOrId as `null`.
 *
 * @remarks
 * See also {@link newAttributeColumnLocator} to learn more about the attribute column locators.
 *
 * @param measuresOrIds - Measures specified either by value or by localId reference
 * @param locators - Attribute locators to narrow down selection
 * @param width - Width in pixels
 * @param allowGrowToFit - indicates whether the column is allowed to grow if the table's growToFit is enabled
 * @public
 */
export declare function setNewWidthForSelectedColumns(measuresOrIds: IMeasure | string | IMeasure[] | string[] | null, locators: (IAttributeColumnLocator | ITotalColumnLocator)[], width: number | "auto", allowGrowToFit?: boolean): IMeasureColumnWidthItem;

export { }
