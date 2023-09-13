// (C) 2007-2023 GoodData Corporation
import { isMeasureGroupDescriptor, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
//
// TODO: move all this code to data view facade.
//
//
function findInDimensionHeaders(dimensions, headerCallback) {
    for (let dimensionIndex = 0; dimensionIndex < dimensions.length; dimensionIndex++) {
        const dimension = dimensions[dimensionIndex];
        for (let headerIndex = 0; headerIndex < dimension.headers.length; headerIndex++) {
            const wrappedDescriptor = dimension.headers[headerIndex];
            const headerCount = dimension.headers.length;
            let headerType;
            let header;
            if (isMeasureGroupDescriptor(wrappedDescriptor)) {
                headerType = "measureGroupHeader";
                header = wrappedDescriptor.measureGroupHeader;
            }
            else {
                headerType = "attributeHeader";
                header = wrappedDescriptor.attributeHeader;
            }
            const callbackResult = headerCallback(headerType, header, dimensionIndex, headerIndex, headerCount);
            if (callbackResult) {
                return callbackResult;
            }
        }
    }
    return null;
}
export function findMeasureGroupInDimensions(dimensions) {
    return findInDimensionHeaders(dimensions, (descriptorType, descriptor, _dimensionIndex, headerIndex, headerCount) => {
        const measureGroupHeader = descriptorType === "measureGroupHeader" ? descriptor : null;
        if (measureGroupHeader) {
            invariant(headerIndex === headerCount - 1, "MeasureGroup must be the last header in it's dimension");
        }
        return measureGroupHeader;
    });
}
export function findAttributeInDimension(dimension, attributeHeaderItemsDimension, indexInDimension) {
    return findInDimensionHeaders([dimension], (descriptorType, descriptor, _dimensionIndex, headerIndex) => {
        if (descriptorType === "attributeHeader" &&
            (indexInDimension === undefined || indexInDimension === headerIndex)) {
            return Object.assign(Object.assign({}, descriptor), { 
                // attribute items are delivered separately from attributeHeaderItems
                items: attributeHeaderItemsDimension[indexInDimension ? indexInDimension : 0] });
        }
        return null;
    });
}
//# sourceMappingURL=executionResultHelper.js.map