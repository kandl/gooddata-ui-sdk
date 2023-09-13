// (C) 2007-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { attributeLocalId, measureLocalId } from "@gooddata/sdk-model";
//
// types used in implementation internals
//
/**
 * @internal
 */
export var ColumnEventSourceType;
(function (ColumnEventSourceType) {
    ColumnEventSourceType["AUTOSIZE_COLUMNS"] = "autosizeColumns";
    ColumnEventSourceType["UI_DRAGGED"] = "uiColumnDragged";
    ColumnEventSourceType["FIT_GROW"] = "growToFit";
})(ColumnEventSourceType = ColumnEventSourceType || (ColumnEventSourceType = {}));
/**
 * @internal
 */
export var UIClick;
(function (UIClick) {
    UIClick[UIClick["CLICK"] = 1] = "CLICK";
    UIClick[UIClick["DOUBLE_CLICK"] = 2] = "DOUBLE_CLICK";
})(UIClick = UIClick || (UIClick = {}));
/**
 * Tests whether object is an instance of {@link IMeasureColumnLocator}
 *
 * @public
 */
export function isMeasureColumnLocator(obj) {
    return !isEmpty(obj) && obj.measureLocatorItem !== undefined;
}
/**
 * Tests whether object is an instance of {@link IAttributeColumnLocator}
 *
 * @public
 */
export function isAttributeColumnLocator(obj) {
    return !isEmpty(obj) && obj.attributeLocatorItem !== undefined;
}
/**
 * Tests whether object is an instance of {@link ITotalColumnLocator}
 *
 * @public
 */
export function isTotalColumnLocator(obj) {
    return !isEmpty(obj) && obj.totalLocatorItem !== undefined;
}
/**
 * Tests whether object is an instance of {@link IAbsoluteColumnWidth}
 *
 * @public
 */
export function isAbsoluteColumnWidth(columnWidth) {
    return Number(columnWidth.value) === columnWidth.value;
}
/**
 * Tests whether object is an instance of {@link IAttributeColumnWidthItem}
 *
 * @public
 */
export function isAttributeColumnWidthItem(obj) {
    return !isEmpty(obj) && obj.attributeColumnWidthItem !== undefined;
}
/**
 * Tests whether object is an instance of {@link IMeasureColumnWidthItem}
 *
 * @public
 */
export function isMeasureColumnWidthItem(obj) {
    return (!isEmpty(obj) &&
        obj.measureColumnWidthItem !== undefined &&
        obj.measureColumnWidthItem.locators !== undefined);
}
/**
 * Tests whether object is an instance of {@link ISliceMeasureColumnWidthItem}
 *
 * @public
 */
export function isSliceMeasureColumnWidthItem(obj) {
    return (!isEmpty(obj) &&
        obj.sliceMeasureColumnWidthItem !== undefined &&
        obj.sliceMeasureColumnWidthItem.locators !== undefined);
}
/**
 * Tests whether object is an instance of {@link IMixedValuesColumnWidthItem}
 *
 * @public
 */
export function isMixedValuesColumnWidthItem(obj) {
    return (!isEmpty(obj) &&
        obj.mixedValuesColumnWidthItem !== undefined &&
        obj.mixedValuesColumnWidthItem.locators !== undefined);
}
/**
 * Tests whether object is an instance of {@link IAllMeasureColumnWidthItem}
 *
 * @public
 */
export function isAllMeasureColumnWidthItem(obj) {
    return (!isEmpty(obj) &&
        obj.measureColumnWidthItem !== undefined &&
        obj.measureColumnWidthItem.locators === undefined &&
        obj.measureColumnWidthItem.locator === undefined);
}
/**
 * Tests whether object is an instance of {@link IWeakMeasureColumnWidthItem}
 *
 * @public
 */
export function isWeakMeasureColumnWidthItem(obj) {
    return (!isEmpty(obj) &&
        obj.measureColumnWidthItem !== undefined &&
        obj.measureColumnWidthItem.locator !== undefined);
}
/**
 * @internal
 */
export function newMeasureColumnLocator(measureOrId) {
    const measureIdentifier = measureLocalId(measureOrId);
    return {
        measureLocatorItem: {
            measureIdentifier,
        },
    };
}
/**
 * Creates a new total column locator
 *
 * @param attributeOrId - Column attribute specified by either value or by localId reference
 * @param totalFunction - Function for the total, such as sum, max, min...
 * @alpha
 */
export function newTotalColumnLocator(attributeOrId, totalFunction) {
    return {
        totalLocatorItem: {
            attributeIdentifier: attributeLocalId(attributeOrId),
            totalFunction,
        },
    };
}
/**
 * Creates width item that will set width of a column which contains values of a row attribute.
 *
 * @param attributeOrId - Attribute specified by value or by localId reference
 * @param width - Width in pixels
 * @param allowGrowToFit - indicates whether the column is allowed to grow if the table's growToFit is enabled
 * @public
 */
export function newWidthForAttributeColumn(attributeOrId, width, allowGrowToFit) {
    const growToFitProp = allowGrowToFit !== undefined ? { allowGrowToFit } : {};
    return {
        attributeColumnWidthItem: {
            attributeIdentifier: attributeLocalId(attributeOrId),
            width: Object.assign({ value: width }, growToFitProp),
        },
    };
}
/**
 * Creates width item that will set width for all measure columns in the table.
 *
 * @param width - Width in pixels
 * @param allowGrowToFit - indicates whether the column is allowed to grow if the table's growToFit is enabled
 * @public
 */
export function newWidthForAllMeasureColumns(width, allowGrowToFit) {
    const growToFitProp = allowGrowToFit !== undefined ? { allowGrowToFit } : {};
    return {
        measureColumnWidthItem: {
            width: Object.assign({ value: width }, growToFitProp),
        },
    };
}
/**
 * Creates width item that will set width for all columns containing values of the provided measure.
 *
 * @param measureOrId - Measure specified either by value or by localId reference
 * @param width - Width in pixels
 * @param allowGrowToFit - indicates whether the column is allowed to grow if the table's growToFit is enabled
 * @public
 */
export function newWidthForAllColumnsForMeasure(measureOrId, width, allowGrowToFit) {
    const locator = newMeasureColumnLocator(measureOrId);
    const growToFitProp = allowGrowToFit !== undefined ? { allowGrowToFit } : {};
    return {
        measureColumnWidthItem: {
            width: Object.assign({ value: width }, growToFitProp),
            locator,
        },
    };
}
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
export function newWidthForSelectedColumns(measureOrId, locators, width, allowGrowToFit) {
    return setNewWidthForSelectedColumns(measureOrId, locators, width, allowGrowToFit);
}
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
export function setNewWidthForSelectedColumns(measuresOrIds, locators, width, allowGrowToFit) {
    let measureLocators = [];
    if (Array.isArray(measuresOrIds)) {
        measureLocators = measuresOrIds.map(newMeasureColumnLocator);
    }
    else if (measuresOrIds) {
        measureLocators.push(newMeasureColumnLocator(measuresOrIds));
    }
    const growToFitProp = allowGrowToFit !== undefined && width !== "auto" ? { allowGrowToFit } : {};
    // Note: beware here. The attribute locators _must_ come first for some obscure, impl dependent reason
    return {
        measureColumnWidthItem: {
            width: Object.assign({ value: width }, growToFitProp),
            locators: [...locators, ...measureLocators],
        },
    };
}
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
export function newAttributeColumnLocator(attributeOrId, element) {
    return {
        attributeLocatorItem: {
            attributeIdentifier: attributeLocalId(attributeOrId),
            element,
        },
    };
}
//# sourceMappingURL=columnWidths.js.map