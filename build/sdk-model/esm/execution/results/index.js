// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
//
// Type guards
//
/**
 * Type-guard testing whether the provided object is an instance of {@link IAttributeDescriptor}.
 *
 * @public
 */
export function isAttributeDescriptor(obj) {
    return !isEmpty(obj) && obj.attributeHeader !== undefined;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IMeasureGroupDescriptor}.
 *
 * @public
 */
export function isMeasureGroupDescriptor(obj) {
    return !isEmpty(obj) && obj.measureGroupHeader !== undefined;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IMeasureDescriptor}.
 *
 * @public
 */
export function isMeasureDescriptor(obj) {
    return !isEmpty(obj) && obj.measureHeaderItem !== undefined;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link ITotalDescriptor}.
 *
 * @public
 */
export function isTotalDescriptor(obj) {
    return !isEmpty(obj) && obj.totalHeaderItem !== undefined;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IColorDescriptor}.
 *
 * @public
 */
export function isColorDescriptor(obj) {
    return !isEmpty(obj) && obj.colorHeaderItem !== undefined;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IResultAttributeHeader}.
 *
 * @public
 */
export function isResultAttributeHeader(obj) {
    return !isEmpty(obj) && obj.attributeHeaderItem !== undefined;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IResultMeasureHeader}.
 *
 * @public
 */
export function isResultMeasureHeader(obj) {
    return (!isEmpty(obj) &&
        obj.measureHeaderItem !== undefined &&
        obj.measureHeaderItem.order !== undefined);
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IResultTotalHeader}.
 *
 * @public
 */
export function isResultTotalHeader(obj) {
    return (!isEmpty(obj) &&
        obj.totalHeaderItem !== undefined &&
        obj.totalHeaderItem.type !== undefined);
}
//
//
//
/**
 * Returns item name contained within a result header.
 *
 * @param header - header of any type
 * @public
 */
export function resultHeaderName(header) {
    if (isResultAttributeHeader(header)) {
        return header.attributeHeaderItem.name;
    }
    else if (isResultMeasureHeader(header)) {
        return header.measureHeaderItem.name;
    }
    return header.totalHeaderItem.name;
}
/**
 * Returns local identifier of attribute described in the provided attribute descriptor.
 *
 * @param descriptor - attribute descriptor, must be specified
 * @public
 */
export function attributeDescriptorLocalId(descriptor) {
    return descriptor.attributeHeader.localIdentifier;
}
/**
 * Returns name of attribute described in the provided attribute descriptor.
 *
 * @param descriptor - attribute descriptor, must be specified
 * @public
 */
export function attributeDescriptorName(descriptor) {
    return descriptor.attributeHeader.formOf.name;
}
//# sourceMappingURL=index.js.map