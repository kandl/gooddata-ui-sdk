// (C) 2021-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { newCustomWidget } from "../../model/types/layoutTypes.js";
/**
 * Tests whether an object is a {@link KpiPlaceholderWidget}.
 *
 * @param obj - object to test
 * @alpha
 */
export function isKpiPlaceholderWidget(obj) {
    return !isEmpty(obj) && obj.customType === "gd-kpi-placeholder";
}
/**
 * @internal
 */
export const KPI_PLACEHOLDER_WIDGET_ID = "__kpiPlaceholder__";
/**
 * @alpha
 */
export function newKpiPlaceholderWidget() {
    return newCustomWidget(KPI_PLACEHOLDER_WIDGET_ID, "gd-kpi-placeholder");
}
/**
 * Tests whether an object is a {@link InsightPlaceholderWidget}.
 *
 * @param obj - object to test
 * @alpha
 */
export function isInsightPlaceholderWidget(obj) {
    return !isEmpty(obj) && obj.customType === "gd-insight-placeholder";
}
/**
 * @internal
 */
export const INSIGHT_PLACEHOLDER_WIDGET_ID = "__insightPlaceholder__";
/**
 * @alpha
 */
export function newInsightPlaceholderWidget() {
    return newCustomWidget(INSIGHT_PLACEHOLDER_WIDGET_ID, "gd-insight-placeholder");
}
/**
 * Tests whether an object is a {@link PlaceholderWidget}.
 *
 * @param obj - object to test
 * @alpha
 */
export function isPlaceholderWidget(obj) {
    return !isEmpty(obj) && obj.customType === "gd-widget-placeholder";
}
/**
 * Tests whether an object is a {@link PlaceholderWidget} and is initial.
 *
 * @param obj - object to test
 * @internal
 */
export function isInitialPlaceholderWidget(obj) {
    return isPlaceholderWidget(obj) && !!obj.isInitial;
}
/**
 * Tests whether an object is a {@link PlaceholderWidget} and is loading.
 *
 * @param obj - object to test
 * @internal
 */
export function isLoadingPlaceholderWidget(obj) {
    return isPlaceholderWidget(obj) && !!obj.isLoading;
}
/**
 * @internal
 */
export const PLACEHOLDER_WIDGET_ID = "__placeholder__";
/**
 * @alpha
 */
export function newPlaceholderWidget() {
    return newCustomWidget(PLACEHOLDER_WIDGET_ID, "gd-widget-placeholder");
}
/**
 * @internal
 */
export function newInitialPlaceholderWidget() {
    return newCustomWidget(PLACEHOLDER_WIDGET_ID, "gd-widget-placeholder", {
        isInitial: true,
    });
}
/**
 * @internal
 */
export function newLoadingPlaceholderWidget() {
    return newCustomWidget(PLACEHOLDER_WIDGET_ID, "gd-widget-placeholder", {
        isLoading: true,
    });
}
/**
 * Tests whether an object is any type of placeholder widgets.
 *
 * @param obj - object to test
 * @alpha
 */
export function isAnyPlaceholderWidget(obj) {
    return isPlaceholderWidget(obj) || isInsightPlaceholderWidget(obj) || isKpiPlaceholderWidget(obj);
}
//# sourceMappingURL=types.js.map