// (C) 2022 GoodData Corporation
import isNil from "lodash/isNil.js";
import isString from "lodash/isString.js";
import partition from "lodash/partition.js";
import { isAllMeasureColumnWidthItem, isAttributeColumnLocator, isAttributeColumnWidthItem, isMeasureColumnLocator, isMeasureColumnWidthItem, isWeakMeasureColumnWidthItem, isTotalColumnLocator, } from "@gooddata/sdk-ui-pivot";
export function factoryNotationForAttributeColumnWidthItem(obj) {
    const { attributeIdentifier, width } = obj.attributeColumnWidthItem;
    const { value: widthValue, allowGrowToFit } = width;
    // cannot use lodash compact, that would remove 0 values which we want to keep here
    const params = [`"${attributeIdentifier}"`, `${widthValue}`, allowGrowToFit && "true"].filter((item) => !isNil(item));
    return `newWidthForAttributeColumn(${params.join(", ")})`;
}
export function factoryNotationForMeasureColumnWidthItem(obj) {
    const { locators, width } = obj.measureColumnWidthItem;
    const [measureLocators, attributeLocators] = partition(locators, isMeasureColumnLocator);
    const allowGrowToFit = isString(width) ? false : width.allowGrowToFit;
    const attributeLocatorFactories = attributeLocators.map((locator) => isAttributeColumnLocator(locator)
        ? factoryNotationForAttributeColumnLocator(locator)
        : factoryNotationForTotalColumnLocator(locator));
    const measureLocatorIdentifiers = measureLocators === null || measureLocators === void 0 ? void 0 : measureLocators.map((measureLocator) => measureLocator.measureLocatorItem.measureIdentifier);
    const params = [
        measureLocatorIdentifiers && measureLocatorIdentifiers.length > 0
            ? `["${measureLocatorIdentifiers.join('","')}"]`
            : "null",
        `[${attributeLocatorFactories.join(", ")}]`,
        isString(width.value) ? `"${width.value}"` : width.value,
        allowGrowToFit && "true",
    ].filter((item) => !isNil(item));
    return `setNewWidthForSelectedColumns(${params.join(", ")})`;
}
export function factoryNotationForAttributeColumnLocator(obj) {
    const { attributeIdentifier, element } = obj.attributeLocatorItem;
    // cannot use lodash compact, that would remove 0 values which we want to keep here
    const params = [`"${attributeIdentifier}"`, element && `"${element}"`].filter((item) => !isNil(item));
    return `newAttributeColumnLocator(${params.join(", ")})`;
}
export function factoryNotationForTotalColumnLocator(obj) {
    const { attributeIdentifier, totalFunction } = obj.totalLocatorItem;
    // cannot use lodash compact, that would remove 0 values which we want to keep here
    const params = [`"${attributeIdentifier}"`, totalFunction && `"${totalFunction}"`].filter((item) => !isNil(item));
    return `newTotalColumnLocator(${params.join(", ")})`;
}
export function factoryNotationForWeakMeasureColumnWidthItem(obj) {
    const { locator, width } = obj.measureColumnWidthItem;
    // cannot use lodash compact, that would remove 0 values which we want to keep here
    const params = [
        `"${locator.measureLocatorItem.measureIdentifier}"`,
        width.value,
        width.allowGrowToFit && "true",
    ].filter((item) => !isNil(item));
    return `newWidthForAllColumnsForMeasure(${params.join(", ")})`;
}
export function factoryNotationForAllMeasureColumnWidthItem(obj) {
    const { value, allowGrowToFit } = obj.measureColumnWidthItem.width;
    // cannot use lodash compact, that would remove 0 values which we want to keep here
    const params = [value, allowGrowToFit && "true"].filter((item) => !isNil(item));
    return `newWidthForAllMeasureColumns(${params.join(", ")})`;
}
export const pivotTableAdditionalFactories = [
    {
        importInfo: {
            name: "newWidthForAttributeColumn",
            package: "@gooddata/sdk-ui-pivot",
            importType: "named",
        },
        transformation: (obj) => {
            return isAttributeColumnWidthItem(obj)
                ? factoryNotationForAttributeColumnWidthItem(obj)
                : undefined;
        },
    },
    {
        importInfo: {
            name: "newAttributeColumnLocator",
            package: "@gooddata/sdk-ui-pivot",
            importType: "named",
        },
        transformation: (obj) => {
            return isAttributeColumnLocator(obj) ? factoryNotationForAttributeColumnLocator(obj) : undefined;
        },
    },
    {
        importInfo: {
            name: "newTotalColumnLocator",
            package: "@gooddata/sdk-ui-pivot",
            importType: "named",
        },
        transformation: (obj) => {
            return isTotalColumnLocator(obj) ? factoryNotationForTotalColumnLocator(obj) : undefined;
        },
    },
    {
        importInfo: {
            name: "newWidthForAllColumnsForMeasure",
            package: "@gooddata/sdk-ui-pivot",
            importType: "named",
        },
        transformation: (obj) => {
            return isWeakMeasureColumnWidthItem(obj)
                ? factoryNotationForWeakMeasureColumnWidthItem(obj)
                : undefined;
        },
    },
    {
        importInfo: {
            name: "setNewWidthForSelectedColumns",
            package: "@gooddata/sdk-ui-pivot",
            importType: "named",
        },
        transformation: (obj) => {
            return isMeasureColumnWidthItem(obj) ? factoryNotationForMeasureColumnWidthItem(obj) : undefined;
        },
    },
    {
        importInfo: {
            name: "newWidthForAllMeasureColumns",
            package: "@gooddata/sdk-ui-pivot",
            importType: "named",
        },
        transformation: (obj) => {
            return isAllMeasureColumnWidthItem(obj)
                ? factoryNotationForAllMeasureColumnWidthItem(obj)
                : undefined;
        },
    },
];
//# sourceMappingURL=pivotTableAdditionalFactories.js.map