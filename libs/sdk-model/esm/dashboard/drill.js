// (C) 2020-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillFromMeasure}.
 * @alpha
 */
export function isDrillFromMeasure(obj) {
    return !isEmpty(obj) && obj.type === "drillFromMeasure";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillFromAttribute}.
 * @alpha
 */
export function isDrillFromAttribute(obj) {
    return !isEmpty(obj) && obj.type === "drillFromAttribute";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillToLegacyDashboard}.
 * @alpha
 */
export function isDrillToLegacyDashboard(obj) {
    return !isEmpty(obj) && obj.type === "drillToLegacyDashboard";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillToDashboard}.
 * @alpha
 */
export function isDrillToDashboard(obj) {
    return !isEmpty(obj) && obj.type === "drillToDashboard";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillToInsight}.
 * @alpha
 */
export function isDrillToInsight(obj) {
    return !isEmpty(obj) && obj.type === "drillToInsight";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillToCustomUrl}.
 * @alpha
 */
export function isDrillToCustomUrl(obj) {
    return !isEmpty(obj) && obj.type === "drillToCustomUrl";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillToAttributeUrl}.
 * @alpha
 */
export function isDrillToAttributeUrl(obj) {
    return !isEmpty(obj) && obj.type === "drillToAttributeUrl";
}
//# sourceMappingURL=drill.js.map