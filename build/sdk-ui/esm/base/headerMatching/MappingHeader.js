// (C) 2007-2023 GoodData Corporation
import { isAttributeDescriptor, isMeasureDescriptor, isResultAttributeHeader, isTotalDescriptor, isColorDescriptor, isResultMeasureHeader, } from "@gooddata/sdk-model";
//
//
//
/**
 * @internal
 */
export function hasMappingHeaderLocalIdentifier(header) {
    return isAttributeDescriptor(header) || isMeasureDescriptor(header);
}
/**
 * @internal
 */
export function hasMappingHeaderFormattedName(header) {
    return isResultAttributeHeader(header) && !!header.attributeHeaderItem.formattedName;
}
/**
 * @internal
 */
export function getMappingHeaderLocalIdentifier(header) {
    if (isAttributeDescriptor(header)) {
        return header.attributeHeader.localIdentifier;
    }
    else if (isMeasureDescriptor(header)) {
        return header.measureHeaderItem.localIdentifier;
    }
    else if (isColorDescriptor(header)) {
        return header.colorHeaderItem.id;
    }
    throw new Error(`Mapping header of type "${Object.keys(header)}" has no localIdentifier`);
}
/**
 * @internal
 */
export function getMappingHeaderName(header) {
    if (isAttributeDescriptor(header)) {
        return header.attributeHeader.formOf.name;
    }
    else if (isResultAttributeHeader(header)) {
        return header.attributeHeaderItem.name;
    }
    else if (isMeasureDescriptor(header) || isResultMeasureHeader(header)) {
        return header.measureHeaderItem.name;
    }
    else if (isColorDescriptor(header)) {
        return header.colorHeaderItem.name;
    }
}
/**
 * Get formatted name of provided mapping header.
 *
 * Formatted name has higher priority than name when displaying in visualisations.
 *
 * @internal
 */
export function getMappingHeaderFormattedName(header) {
    if (isResultAttributeHeader(header)) {
        return getAttributeHeaderItemName(header.attributeHeaderItem);
    }
    else if (isTotalDescriptor(header)) {
        return getTotalHeaderItemName(header.totalHeaderItem);
    }
    else {
        return getMappingHeaderName(header);
    }
}
/**
 * Get formatted name of provided total header item.
 *
 * @internal
 */
export function getTotalHeaderItemName(totalHeaderItem) {
    return totalHeaderItem === null || totalHeaderItem === void 0 ? void 0 : totalHeaderItem.name;
}
/**
 * Get formatted name of provided attribute header item.
 *
 * Formatted name has higher priority than name when displaying in visualisations.
 *
 * @internal
 */
export function getAttributeHeaderItemName(attributeHeaderItem) {
    var _a;
    return (_a = attributeHeaderItem === null || attributeHeaderItem === void 0 ? void 0 : attributeHeaderItem.formattedName) !== null && _a !== void 0 ? _a : attributeHeaderItem === null || attributeHeaderItem === void 0 ? void 0 : attributeHeaderItem.name;
}
/**
 * @internal
 */
export function getMappingHeaderIdentifier(header) {
    if (isAttributeDescriptor(header)) {
        return header.attributeHeader.identifier;
    }
    else if (isMeasureDescriptor(header)) {
        return header.measureHeaderItem.identifier;
    }
    throw new Error(`Mapping header of type "${Object.keys(header)}" has no identifier`);
}
/**
 * @internal
 */
export function getMappingHeaderUri(header) {
    if (isAttributeDescriptor(header)) {
        return header.attributeHeader.uri;
    }
    else if (isResultAttributeHeader(header)) {
        return header.attributeHeaderItem.uri;
    }
    else if (isMeasureDescriptor(header)) {
        return header.measureHeaderItem.uri;
    }
}
//# sourceMappingURL=MappingHeader.js.map