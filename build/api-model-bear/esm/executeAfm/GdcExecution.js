// (C) 2007-2020 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isAttributeHeaderItem(header) {
    return !isEmpty(header) && header.attributeHeaderItem !== undefined;
}
/**
 * @public
 */
export function isMeasureHeaderItem(header) {
    return !isEmpty(header) && header.measureHeaderItem !== undefined;
}
/**
 * @public
 */
export function isTotalHeaderItem(header) {
    return !isEmpty(header) && header.totalHeaderItem !== undefined;
}
/**
 * @public
 */
export function isAttributeHeader(header) {
    return !isEmpty(header) && header.attributeHeader !== undefined;
}
/**
 * @public
 */
export function isMeasureGroupHeader(header) {
    return !isEmpty(header) && header.measureGroupHeader !== undefined;
}
//# sourceMappingURL=GdcExecution.js.map