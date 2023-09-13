// (C) 2019-2022 GoodData Corporation
import { isResultTotalHeader, } from "@gooddata/sdk-model";
/**
 * @internal
 */
export function dataViewHeaders(dataView, dimIdx) {
    var _a;
    return (_a = dataView.headerItems[dimIdx]) !== null && _a !== void 0 ? _a : [];
}
/**
 * @internal
 */
export function dataViewDimensionItems(dataView, dimIdx) {
    const dimensionDescriptor = dataView.result.dimensions[dimIdx];
    return dimensionDescriptor ? dimensionDescriptor.headers : [];
}
/**
 * @internal
 */
export function measureGroupItems(measureGroup) {
    return measureGroup.measureGroupHeader.items;
}
/**
 * @internal
 */
export function measureFormat(measureDescriptor) {
    return measureDescriptor.measureHeaderItem.format;
}
/**
 * @internal
 */
export function measureName(measureDescriptor) {
    return measureDescriptor.measureHeaderItem.name;
}
/**
 * @internal
 */
export function getTotalInfo(attributeHeaders) {
    const numberOfTotalHeaders = attributeHeaders.filter(isResultTotalHeader).length;
    return {
        isTotal: numberOfTotalHeaders > 0 && numberOfTotalHeaders === attributeHeaders.length,
        isSubtotal: numberOfTotalHeaders > 0 && numberOfTotalHeaders !== attributeHeaders.length,
    };
}
//# sourceMappingURL=utils.js.map