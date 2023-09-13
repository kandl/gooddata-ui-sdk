// (C) 2019-2022 GoodData Corporation
import flatMap from "lodash/flatMap.js";
import { attributeLocatorElement, attributeLocatorIdentifier, idMatchMeasure, isAttributeLocator, isMeasureLocator, isAttributeSort, isPoPMeasure, isPreviousPeriodMeasure, sortMeasureLocators, isAttributeDescriptor, isMeasureGroupDescriptor, isResultAttributeHeader, isVirtualArithmeticMeasure, } from "@gooddata/sdk-model";
import findIndex from "lodash/findIndex.js";
function findMeasureGroupHeader(dataView) {
    for (let dimIdx = 0; dimIdx < dataView.result.dimensions.length; dimIdx++) {
        const dim = dataView.result.dimensions[dimIdx];
        const measureGroup = dim.headers.find(isMeasureGroupDescriptor);
        if (measureGroup) {
            return {
                dimIdx,
                measureGroup,
            };
        }
    }
    return {};
}
function buildMeasureHeaderIndex(measureGroup) {
    var _a, _b;
    const items = (_b = (_a = measureGroup === null || measureGroup === void 0 ? void 0 : measureGroup.measureGroupHeader) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : [];
    return items.reduce((acc, val) => {
        const id = val.measureHeaderItem.localIdentifier;
        acc[id] = val;
        return acc;
    }, {});
}
class ResultMetaMethods {
    constructor(dataView) {
        this.dataView = dataView;
        /**
         * Matches attribute locator against the descriptors and headers in the data view. The attribute is expected
         * to be located in the same dimension as the measure group. The element specified in the locator must be
         * found within the respective attribute's headers.
         *
         * @param locator - locator to match
         */
        this.matchAttributeLocator = (locator) => {
            if (this._measureGroupHeaderIdx === undefined) {
                return false;
            }
            const attributeId = attributeLocatorIdentifier(locator);
            const attributeIdx = findIndex(this.dimensionItemDescriptors(this._measureGroupHeaderIdx), (descriptor) => {
                return (isAttributeDescriptor(descriptor) &&
                    descriptor.attributeHeader.localIdentifier === attributeId);
            });
            if (attributeIdx === -1) {
                return false;
            }
            const headers = this.allHeaders()[this._measureGroupHeaderIdx][attributeIdx];
            const attributeElement = attributeLocatorElement(locator);
            return (headers.find((header) => isResultAttributeHeader(header) && header.attributeHeaderItem.uri === attributeElement) !== undefined);
        };
        this.matchMeasureSortItem = (sortItem) => {
            if (!this._measureGroupHeader) {
                /*
                 * Measure sort exists but there are no measures in the result. This is unlike as
                 * at latest the backend would bomb that the sort references invalid measure.
                 */
                return false;
            }
            return sortMeasureLocators(sortItem).every((locator) => {
                if (isAttributeLocator(locator)) {
                    return this.matchAttributeLocator(locator);
                }
                else if (isMeasureLocator(locator)) {
                    return this._measureDescriptorByLocalId[locator.measureLocatorItem.measureIdentifier];
                }
            });
        };
        this.matchSortItem = (sortItem) => {
            if (isAttributeSort(sortItem)) {
                return true;
            }
            return this.matchMeasureSortItem(sortItem);
        };
        const { dimIdx, measureGroup } = findMeasureGroupHeader(dataView);
        this._measureGroupHeaderIdx = dimIdx;
        this._measureGroupHeader = measureGroup;
        this._measureDescriptorByLocalId = buildMeasureHeaderIndex(this._measureGroupHeader);
    }
    dimensions() {
        return this.dataView.result.dimensions;
    }
    dimensionItemDescriptors(dimIdx) {
        const dim = this.dataView.result.dimensions[dimIdx];
        return (dim === null || dim === void 0 ? void 0 : dim.headers) ? dim.headers : [];
    }
    attributeDescriptors() {
        return flatMap(this.dataView.result.dimensions, (dim) => {
            return dim.headers.filter(isAttributeDescriptor);
        });
    }
    attributeDescriptorsForDim(dim) {
        var _a, _b;
        return ((_b = (_a = this.dataView.result.dimensions[dim]) === null || _a === void 0 ? void 0 : _a.headers) !== null && _b !== void 0 ? _b : []).filter(isAttributeDescriptor);
    }
    measureGroupDescriptor() {
        return this._measureGroupHeader;
    }
    measureDescriptors() {
        const header = this.measureGroupDescriptor();
        return header ? header.measureGroupHeader.items : [];
    }
    measureDescriptor(localId) {
        return this._measureDescriptorByLocalId[localId];
    }
    hasNoHeadersInDim(dim) {
        return this.dataView.headerItems[dim] && this.dataView.headerItems[dim].length === 0;
    }
    allHeaders() {
        return this.dataView.headerItems;
    }
    attributeHeaders() {
        return this.dataView.headerItems.map((dimension) => {
            return dimension.filter((headerList) => isResultAttributeHeader(headerList[0]));
        });
    }
    attributeHeadersForDim(dim) {
        if (this.hasNoHeadersInDim(dim)) {
            return [];
        }
        return this.dataView.headerItems[dim].filter((headerList) => isResultAttributeHeader(headerList[0]));
    }
    isDerivedMeasure(measureDescriptor) {
        const measureIdMatch = idMatchMeasure(measureDescriptor.measureHeaderItem.localIdentifier);
        return this.dataView.definition.measures.some((measure) => {
            if (!measureIdMatch(measure)) {
                return false;
            }
            return isPoPMeasure(measure) || isPreviousPeriodMeasure(measure);
        });
    }
    isVirtualMeasure(measureDescriptor) {
        const measureIdMatch = idMatchMeasure(measureDescriptor.measureHeaderItem.localIdentifier);
        const measure = this.dataView.definition.measures.find(measureIdMatch);
        return isVirtualArithmeticMeasure(measure);
    }
    effectiveSortItems() {
        return this.dataView.definition.sortBy.filter(this.matchSortItem);
    }
}
export function newResultMetaMethods(dataView) {
    return new ResultMetaMethods(dataView);
}
//# sourceMappingURL=resultMetaMethods.js.map