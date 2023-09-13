// (C) 2020-2022 GoodData Corporation
import includes from "lodash/includes";
import { isAbsoluteColumnWidth, isAllMeasureColumnWidthItem, isAttributeColumnWidthItem, isMeasureColumnWidthItem, isWeakMeasureColumnWidthItem, } from "@gooddata/sdk-ui-pivot";
import { areObjRefsEqual, attributeLocalId, bucketAttributes, insightBucket, insightMeasures, isMeasureLocator, measureLocalId, isAttributeLocator, } from "@gooddata/sdk-model";
import { isAttributeFilter } from "../../../utils/bucketHelper";
import { BucketNames } from "@gooddata/sdk-ui";
const isMeasureWidthItemMatchedByFilter = (widthItem, filter) => filter.selectedElements.some((selectedElement) => widthItem.measureColumnWidthItem.locators.some((locator) => !isMeasureLocator(locator) && locator.attributeLocatorItem.element === selectedElement.uri));
const matchesMeasureColumnWidthItemFilters = (widthItem, filters, columnAttributes) => {
    return filters
        .filter(isAttributeFilter)
        .filter((filter) => columnAttributes.some((columnBucketItem) => areObjRefsEqual(columnBucketItem.dfRef, filter.displayFormRef)))
        .every((filter) => {
        const shouldBeMatched = !filter.isInverted;
        return shouldBeMatched === isMeasureWidthItemMatchedByFilter(widthItem, filter);
    });
};
const matchesWidthItemFilters = (widthItem, filters, columnAttributes) => {
    if (isMeasureColumnWidthItem(widthItem)) {
        return matchesMeasureColumnWidthItemFilters(widthItem, filters, columnAttributes);
    }
    return true;
};
const containsMeasureLocator = (widthItem) => widthItem.measureColumnWidthItem.locators.some((locator) => isMeasureLocator(locator));
const widthItemLocatorsHaveProperLength = (widthItem, measuresCount, columnAttributesCount) => {
    const widthItemLocatorsLength = widthItem.measureColumnWidthItem.locators.length;
    const hasWidthItemLocators = widthItemLocatorsLength > 0;
    const hasMeasureLocators = measuresCount > 0 && containsMeasureLocator(widthItem);
    const hasNotMeasureLocators = measuresCount === 0 && !containsMeasureLocator(widthItem);
    const widthItemLocatorsMatchesColumnAttributesLength = widthItemLocatorsLength === columnAttributesCount + 1;
    const widthItemLocatorsHasLengthAsColumnAttributesLength = widthItemLocatorsLength === columnAttributesCount;
    const locatorsMatchesLength = hasMeasureLocators && widthItemLocatorsMatchesColumnAttributesLength;
    const locatorsAreEmpty = hasNotMeasureLocators && widthItemLocatorsHasLengthAsColumnAttributesLength;
    return hasWidthItemLocators && (locatorsMatchesLength || locatorsAreEmpty);
};
function removeInvalidLocators(columnWidth, measureLocalIdentifiers, columnAttributeLocalIdentifiers) {
    return columnWidth.measureColumnWidthItem.locators.filter((locator) => {
        // filter out invalid measure locators
        if (isMeasureLocator(locator)) {
            return includes(measureLocalIdentifiers, locator.measureLocatorItem.measureIdentifier);
        }
        // filter out invalid column attribute locators
        return includes(columnAttributeLocalIdentifiers, locator.attributeLocatorItem.attributeIdentifier);
    });
}
function transformToWeakMeasureColumnWidthItem(columnWidth) {
    if (isAbsoluteColumnWidth(columnWidth.measureColumnWidthItem.width) &&
        columnWidth.measureColumnWidthItem.locators.length === 1 &&
        isMeasureLocator(columnWidth.measureColumnWidthItem.locators[0])) {
        return {
            measureColumnWidthItem: {
                width: columnWidth.measureColumnWidthItem.width,
                locator: columnWidth.measureColumnWidthItem.locators.filter(isMeasureLocator)[0],
            },
        };
    }
}
// removes attribute widthItems with invalid identifiers
// removes measure widthItems with invalid identifiers and invalid number of locators
function adaptWidthItemsToPivotTable(originalColumnWidths, measureLocalIdentifiers, rowAttributeLocalIdentifiers, columnAttributeLocalIdentifiers, filters, firstColumnAttributeAdded, columnAttributes, isAdaptPropertiesToInsight) {
    if (!originalColumnWidths) {
        return originalColumnWidths;
    }
    return originalColumnWidths.reduce((columnWidths, columnWidth) => {
        if (isMeasureColumnWidthItem(columnWidth)) {
            const filteredMeasureColumnWidthItem = {
                measureColumnWidthItem: Object.assign(Object.assign({}, columnWidth.measureColumnWidthItem), { locators: removeInvalidLocators(columnWidth, measureLocalIdentifiers, columnAttributeLocalIdentifiers) }),
            };
            // need to filter this too, so it takes in consideration previous row bucket identifiers that were moved to column bucket, as same as is done with referencePoint
            let filteredColumnAttributeLocalIdentifiers = [];
            if (isAdaptPropertiesToInsight) {
                filteredColumnAttributeLocalIdentifiers = [];
                filteredMeasureColumnWidthItem.measureColumnWidthItem.locators.forEach((locator) => {
                    if (isAttributeLocator(locator)) {
                        columnAttributeLocalIdentifiers.forEach((columnAttributeIdentifier) => {
                            if (columnAttributeIdentifier === locator.attributeLocatorItem.attributeIdentifier) {
                                filteredColumnAttributeLocalIdentifiers.push(columnAttributeIdentifier);
                            }
                        });
                    }
                });
            }
            else {
                filteredColumnAttributeLocalIdentifiers = columnAttributeLocalIdentifiers;
            }
            if (firstColumnAttributeAdded) {
                const transformedWeakMeasureWidthItem = transformToWeakMeasureColumnWidthItem(columnWidth);
                if (transformedWeakMeasureWidthItem) {
                    columnWidths.push(transformedWeakMeasureWidthItem);
                    return columnWidths;
                }
            }
            if (matchesWidthItemFilters(filteredMeasureColumnWidthItem, filters, columnAttributes) &&
                widthItemLocatorsHaveProperLength(filteredMeasureColumnWidthItem, measureLocalIdentifiers.length, filteredColumnAttributeLocalIdentifiers.length)) {
                columnWidths.push(filteredMeasureColumnWidthItem);
                return columnWidths;
            }
        }
        else if (isAttributeColumnWidthItem(columnWidth)) {
            if (includes(rowAttributeLocalIdentifiers, columnWidth.attributeColumnWidthItem.attributeIdentifier)) {
                columnWidths.push(columnWidth);
                return columnWidths;
            }
        }
        else if ((isAllMeasureColumnWidthItem(columnWidth) || isWeakMeasureColumnWidthItem(columnWidth)) &&
            measureLocalIdentifiers.length > 0) {
            columnWidths.push(columnWidth);
            return columnWidths;
        }
        return columnWidths;
    }, []);
}
export function adaptReferencePointWidthItemsToPivotTable(originalColumnWidths, measures, rowAttributes, columnAttributes, previousRowAttributes, previousColumnAttributes, filters) {
    const measureLocalIdentifiers = measures.map((measure) => measure.localIdentifier);
    const rowAttributeLocalIdentifiers = rowAttributes.map((rowAttribute) => rowAttribute.localIdentifier);
    const columnAttributeLocalIdentifiers = columnAttributes.map((columnAttribute) => columnAttribute.localIdentifier);
    const previousRowAttributeLocalIdentifiers = previousRowAttributes.map((rowAttribute) => rowAttribute.localIdentifier);
    const previousColumnAttributeLocalIdentifiers = previousColumnAttributes.map((columnAttribute) => columnAttribute.localIdentifier);
    const filteredRowAttributeLocalIdentifiers = rowAttributeLocalIdentifiers.filter((rowAttributeLocalIdentifier) => !previousColumnAttributeLocalIdentifiers.includes(rowAttributeLocalIdentifier));
    const filteredColumnAttributeLocalIdentifiers = columnAttributeLocalIdentifiers.filter((columnAttributeLocalIdentifier) => !previousRowAttributeLocalIdentifiers.includes(columnAttributeLocalIdentifier));
    const firstColumnAttributeAdded = previousColumnAttributes.length === 0 && columnAttributes.length === 1;
    return adaptWidthItemsToPivotTable(originalColumnWidths, measureLocalIdentifiers, filteredRowAttributeLocalIdentifiers, filteredColumnAttributeLocalIdentifiers, filters, firstColumnAttributeAdded, columnAttributes);
}
export function adaptMdObjectWidthItemsToPivotTable(originalColumnWidths, insight) {
    const rowBucket = insightBucket(insight, BucketNames.ATTRIBUTE);
    const columnBucket = insightBucket(insight, BucketNames.COLUMNS);
    const measureLocalIdentifiers = insightMeasures(insight).map(measureLocalId);
    const rowAttributeLocalIdentifiers = rowBucket ? bucketAttributes(rowBucket).map(attributeLocalId) : [];
    const columnAttributeLocalIdentifiers = columnBucket
        ? bucketAttributes(columnBucket).map(attributeLocalId)
        : [];
    return adaptWidthItemsToPivotTable(originalColumnWidths, measureLocalIdentifiers, rowAttributeLocalIdentifiers, columnAttributeLocalIdentifiers, [], false, [], true);
}
//# sourceMappingURL=widthItemsHelpers.js.map