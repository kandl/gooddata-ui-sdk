import isEmpty from "lodash/isEmpty.js";
import { isHeaderPredicate } from "../headerMatching/HeaderPredicate.js";
/**
 * @public
 */
export function isExplicitDrill(obj) {
    return [isDrillableItem, isHeaderPredicate].some((pred) => pred(obj));
}
/**
 * @public
 */
export function isDrillableItemUri(item) {
    return !isEmpty(item) && item.uri !== undefined;
}
/**
 * @public
 */
export function isDrillableItemIdentifier(item) {
    return !isEmpty(item) && item.identifier !== undefined;
}
/**
 * @public
 */
export function isDrillableItem(item) {
    return [isDrillableItemUri, isDrillableItemIdentifier].some((pred) => pred(item));
}
/**
 * @public
 */
export function isDrillIntersectionAttributeItem(header) {
    return !isEmpty(header) && header.attributeHeaderItem !== undefined;
}
//# sourceMappingURL=DrillEvents.js.map