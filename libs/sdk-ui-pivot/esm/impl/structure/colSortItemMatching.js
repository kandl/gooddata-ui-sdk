import { isAttributeLocator, isMeasureLocator, isAttributeSort, isMeasureSort, sortMeasureLocators, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import findIndex from "lodash/findIndex.js";
function attributeLocatorMatch(col, locator) {
    var _a, _b;
    const { attributeDescriptors, attributeHeaders } = col.seriesDescriptor;
    const { attributeIdentifier, element } = locator.attributeLocatorItem;
    if (!attributeDescriptors || !attributeHeaders) {
        return false;
    }
    const attributeIdx = findIndex(attributeDescriptors, (d) => d.attributeHeader.localIdentifier === attributeIdentifier);
    if (attributeIdx === -1) {
        return false;
    }
    // if this happens then either data access infrastructure or the col descriptor method is hosed. there must
    // always be same number of descriptors and headers.
    invariant(attributeHeaders[attributeIdx]);
    return ((_b = (_a = attributeHeaders[attributeIdx]) === null || _a === void 0 ? void 0 : _a.attributeHeaderItem) === null || _b === void 0 ? void 0 : _b.uri) === element;
}
function measureLocatorMatch(col, locator) {
    const { measureDescriptor } = col.seriesDescriptor;
    const { measureIdentifier } = locator.measureLocatorItem;
    return measureDescriptor.measureHeaderItem.localIdentifier === measureIdentifier;
}
export function measureSortMatcher(col, sortItem) {
    return (isMeasureSort(sortItem) &&
        sortMeasureLocators(sortItem).every((locator) => {
            if (isAttributeLocator(locator)) {
                return attributeLocatorMatch(col, locator);
            }
            else if (isMeasureLocator(locator)) {
                return measureLocatorMatch(col, locator);
            }
        }));
}
export function attributeSortMatcher(col, sortItem) {
    return (isAttributeSort(sortItem) &&
        col.attributeDescriptor.attributeHeader.localIdentifier ===
            sortItem.attributeSortItem.attributeIdentifier);
}
//# sourceMappingURL=colSortItemMatching.js.map