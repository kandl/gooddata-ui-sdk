// (C) 2020-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Type-guard testing whether the provided object is an instance of {@link IKpi}.
 * @alpha
 */
export function isKpi(obj) {
    return isKpiWithComparison(obj) || isKpiWithoutComparison(obj);
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWithComparison}.
 * @alpha
 */
export function isKpiWithComparison(obj) {
    return (!isEmpty(obj) &&
        (obj.comparisonType === "previousPeriod" ||
            obj.comparisonType === "lastYear"));
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWithoutComparison}.
 * @alpha
 */
export function isKpiWithoutComparison(obj) {
    return !isEmpty(obj) && obj.comparisonType === "none";
}
//# sourceMappingURL=kpi.js.map