import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isKpiContentWithoutComparison(obj) {
    return !isEmpty(obj) && obj.comparisonType === "none";
}
/**
 * @public
 */
export function isKpi(obj) {
    return !isEmpty(obj) && obj.meta.category === "kpi";
}
/**
 * @public
 */
export function isWrappedKpi(obj) {
    return !isEmpty(obj) && !!obj.kpi;
}
//# sourceMappingURL=GdcKpi.js.map