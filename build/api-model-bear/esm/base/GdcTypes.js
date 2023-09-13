// (C) 2007-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isObjectUriQualifier(qualifier) {
    return !isEmpty(qualifier) && qualifier.uri !== undefined;
}
/**
 * @public
 */
export function isObjIdentifierQualifier(qualifier) {
    return !isEmpty(qualifier) && qualifier.identifier !== undefined;
}
/**
 * @public
 */
export function isLocalIdentifierQualifier(qualifier) {
    return !isEmpty(qualifier) && qualifier.localIdentifier !== undefined;
}
/**
 * @public
 */
export function isComparisonCondition(condition) {
    return !isEmpty(condition) && condition.comparison !== undefined;
}
/**
 * @public
 */
export function isRangeCondition(condition) {
    return !isEmpty(condition) && condition.range !== undefined;
}
//# sourceMappingURL=GdcTypes.js.map