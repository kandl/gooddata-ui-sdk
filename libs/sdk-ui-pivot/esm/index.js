// (C) 2007-2022 GoodData Corporation
/**
 * This package provides the PivotTable component that you can use to visualize your data in a table-based manner.
 *
 * @remarks
 * The PivotTable component provides additional capabilities such as totals, automatic column resizing, and more.
 *
 * @packageDocumentation
 */
export { PivotTable, pivotTableMenuForCapabilities, getPivotTableDimensions } from "./PivotTable.js";
export { CorePivotTable } from "./CorePivotTable.js";
export { isWeakMeasureColumnWidthItem, isAttributeColumnWidthItem, isMeasureColumnWidthItem, isSliceMeasureColumnWidthItem, isMixedValuesColumnWidthItem, isAbsoluteColumnWidth, isAllMeasureColumnWidthItem, isMeasureColumnLocator, isAttributeColumnLocator, isTotalColumnLocator, newAttributeColumnLocator, newWidthForAllColumnsForMeasure, newWidthForAllMeasureColumns, newWidthForAttributeColumn, newWidthForSelectedColumns, setNewWidthForSelectedColumns, newTotalColumnLocator, } from "./columnWidths.js";
//# sourceMappingURL=index.js.map