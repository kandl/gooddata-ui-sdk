// (C) 2019-2023 GoodData Corporation
import set from "lodash/set";
import isEqual from "lodash/isEqual";
import uniqBy from "lodash/uniqBy";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import compact from "lodash/compact";
import { isColorFromPalette, isRgbColor, isAttributeDescriptor, isMeasureDescriptor, isResultAttributeHeader, isUriRef, } from "@gooddata/sdk-model";
import { getMappingHeaderName } from "@gooddata/sdk-ui";
import { ColorUtils } from "@gooddata/sdk-ui-charts";
function getItemName(item) {
    return getMappingHeaderName(item.mappingHeader) || "";
}
export function getSearchedItems(inputItems, searchString) {
    if (isEmpty(searchString)) {
        return inputItems;
    }
    return inputItems.filter((item) => {
        const name = getItemName(item);
        return name.toLowerCase().includes(searchString.toLowerCase());
    });
}
export function getColoredInputItems(colors) {
    let inputItems = [];
    if (colors === null || colors === void 0 ? void 0 : colors.colorAssignments) {
        inputItems = colors.colorAssignments.map((assignmentItem, index) => {
            if (isColorFromPalette(assignmentItem.color)) {
                return {
                    colorItem: assignmentItem.color,
                    mappingHeader: assignmentItem.headerItem,
                    color: ColorUtils.getColorByGuid(colors.colorPalette, assignmentItem.color.value, index),
                };
            }
            else if (isRgbColor(assignmentItem.color)) {
                return {
                    colorItem: assignmentItem.color,
                    mappingHeader: assignmentItem.headerItem,
                    color: assignmentItem.color.value,
                };
            }
        });
    }
    return inputItems;
}
function getMeasureMappingIdentifier(item) {
    return item.measureHeaderItem.localIdentifier;
}
function mergeColorMappingToProperties(properties, id, color) {
    var _a, _b;
    const colorMapping = [
        {
            id,
            color,
        },
    ];
    const previousColorMapping = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.colorMapping) !== null && _b !== void 0 ? _b : [];
    const mergedMapping = compact(uniqBy([...colorMapping, ...previousColorMapping], "id"));
    const newProperties = cloneDeep(properties);
    set(newProperties, "controls.colorMapping", mergedMapping);
    return newProperties;
}
export function getProperties(properties, item, color) {
    if (isMeasureDescriptor(item)) {
        const id = getMeasureMappingIdentifier(item);
        return mergeColorMappingToProperties(properties, id, color);
    }
    else if (isResultAttributeHeader(item)) {
        return mergeColorMappingToProperties(properties, item.attributeHeaderItem.uri, color);
    }
    else if (isAttributeDescriptor(item)) {
        const id = isUriRef(item.attributeHeader.ref)
            ? item.attributeHeader.uri
            : item.attributeHeader.identifier;
        return mergeColorMappingToProperties(properties, id, color);
    }
    return {};
}
export function getValidProperties(properties, colorAssignments) {
    var _a;
    if (!((_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.colorMapping)) {
        return properties;
    }
    const reducedColorMapping = properties.controls.colorMapping.filter((mappingItem) => {
        const { id } = mappingItem;
        const colorValue = mappingItem.color.value;
        const assignmentValid = colorAssignments.find((colorAssignment) => {
            if (isMeasureDescriptor(colorAssignment.headerItem)) {
                return (colorAssignment.headerItem.measureHeaderItem.localIdentifier === id &&
                    isEqual(colorAssignment.color.value, colorValue));
            }
            else if (isResultAttributeHeader(colorAssignment.headerItem)) {
                return colorAssignment.headerItem.attributeHeaderItem.uri === id;
            }
            else if (isAttributeDescriptor(colorAssignment.headerItem)) {
                return isUriRef(colorAssignment.headerItem.attributeHeader.ref)
                    ? colorAssignment.headerItem.attributeHeader.uri === id
                    : colorAssignment.headerItem.attributeHeader.identifier === id;
            }
            return false;
        });
        return assignmentValid !== undefined;
    });
    return Object.assign(Object.assign({}, properties), { controls: Object.assign(Object.assign({}, properties.controls), { colorMapping: reducedColorMapping.length ? reducedColorMapping : null }) });
}
//# sourceMappingURL=colors.js.map