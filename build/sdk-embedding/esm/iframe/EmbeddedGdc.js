// (C) 2020-2023 GoodData Corporation
import { isObjIdentifierQualifier as isBearObjIdentifierQualifier, isObjectUriQualifier as isBearObjectUriQualifier, } from "@gooddata/api-model-bear";
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isDateFilter(filter) {
    return !isEmpty(filter) && (isRelativeDateFilter(filter) || isAbsoluteDateFilter(filter));
}
/**
 * @public
 */
export function isRelativeDateFilter(filter) {
    return !isEmpty(filter) && filter.relativeDateFilter !== undefined;
}
/**
 * @public
 */
export function isAbsoluteDateFilter(filter) {
    return !isEmpty(filter) && filter.absoluteDateFilter !== undefined;
}
/**
 * @public
 */
export function isAttributeFilter(filter) {
    return !isEmpty(filter) && (isPositiveAttributeFilter(filter) || isNegativeAttributeFilter(filter));
}
/**
 * @public
 */
export function isPositiveAttributeFilter(filter) {
    return !isEmpty(filter) && filter.positiveAttributeFilter !== undefined;
}
/**
 * @public
 */
export function isNegativeAttributeFilter(filter) {
    return !isEmpty(filter) && filter.negativeAttributeFilter !== undefined;
}
/**
 * @public
 */
export const isObjIdentifierQualifier = isBearObjIdentifierQualifier;
/**
 * @public
 */
export const isObjectUriQualifier = isBearObjectUriQualifier;
/**
 * @public
 */
export function isRankingFilter(filter) {
    return !isEmpty(filter) && filter.rankingFilter !== undefined;
}
/**
 * @public
 */
export function isRemoveDateFilter(filter) {
    return !isEmpty(filter) && filter.dataSet !== undefined;
}
/**
 * @public
 */
export function isRemoveAttributeFilter(filter) {
    return !isEmpty(filter) && filter.displayForm !== undefined;
}
/**
 * @public
 */
export function isRemoveRankingFilter(filter) {
    return !isEmpty(filter) && filter.removeRankingFilter !== undefined;
}
/**
 * @public
 */
export function isDashboardDateFilter(filter) {
    return !isEmpty(filter) && filter.dateFilter !== undefined;
}
/**
 * @public
 */
export function isDashboardAllTimeDateFilter(filter) {
    var _a;
    return !isEmpty(filter) && ((_a = filter.dateFilter) === null || _a === void 0 ? void 0 : _a.type) === "allTime";
}
/**
 * @public
 */
export function isDashboardAbsoluteDateFilter(filter) {
    var _a;
    return !isEmpty(filter) && ((_a = filter.dateFilter) === null || _a === void 0 ? void 0 : _a.type) === "absolute";
}
/**
 * @public
 */
export function isDashboardRelativeDateFilter(filter) {
    var _a;
    return !isEmpty(filter) && ((_a = filter.dateFilter) === null || _a === void 0 ? void 0 : _a.type) === "relative";
}
/**
 * @public
 */
export function isDashboardAttributeFilter(filter) {
    return !isEmpty(filter) && filter.attributeFilter !== undefined;
}
//# sourceMappingURL=EmbeddedGdc.js.map