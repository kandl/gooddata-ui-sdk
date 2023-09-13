// (C) 2021-2023 GoodData Corporation
import { eventGuard } from "./util.js";
export function kpiWidgetHeaderChanged(ctx, ref, header, correlationId) {
    return {
        type: "GDC.DASH/EVT.KPI_WIDGET.HEADER_CHANGED",
        ctx,
        correlationId,
        payload: {
            ref,
            header,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetHeaderChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardKpiWidgetHeaderChanged = eventGuard("GDC.DASH/EVT.KPI_WIDGET.HEADER_CHANGED");
export function kpiWidgetDescriptionChanged(ctx, ref, description, correlationId) {
    return {
        type: "GDC.DASH/EVT.KPI_WIDGET.DESCRIPTION_CHANGED",
        ctx,
        correlationId,
        payload: {
            ref,
            description,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetDescriptionChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardKpiWidgetDescriptionChanged = eventGuard("GDC.DASH/EVT.KPI_WIDGET.DESCRIPTION_CHANGED");
export function kpiWidgetConfigurationChanged(ctx, ref, configuration, correlationId) {
    return {
        type: "GDC.DASH/EVT.KPI_WIDGET.CONFIGURATION_CHANGED",
        ctx,
        correlationId,
        payload: {
            ref,
            configuration,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetConfigurationChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardKpiWidgetConfigurationChanged = eventGuard("GDC.DASH/EVT.KPI_WIDGET.CONFIGURATION_CHANGED");
export function kpiWidgetMeasureChanged(ctx, ref, kpiWidget, measure, header, correlationId) {
    return {
        type: "GDC.DASH/EVT.KPI_WIDGET.MEASURE_CHANGED",
        ctx,
        correlationId,
        payload: {
            ref,
            kpiWidget,
            measure,
            header,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetMeasureChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardKpiWidgetMeasureChanged = eventGuard("GDC.DASH/EVT.KPI_WIDGET.MEASURE_CHANGED");
export function kpiWidgetFilterSettingsChanged(ctx, ref, ignoredAttributeFilters, dateDatasetForFiltering, correlationId) {
    return {
        type: "GDC.DASH/EVT.KPI_WIDGET.FILTER_SETTINGS_CHANGED",
        ctx,
        correlationId,
        payload: {
            ref,
            ignoredAttributeFilters,
            dateDatasetForFiltering,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetFilterSettingsChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardKpiWidgetFilterSettingsChanged = eventGuard("GDC.DASH/EVT.KPI_WIDGET.FILTER_SETTINGS_CHANGED");
export function kpiWidgetComparisonChanged(ctx, ref, kpi, correlationId) {
    return {
        type: "GDC.DASH/EVT.KPI_WIDGET.COMPARISON_CHANGED",
        ctx,
        correlationId,
        payload: {
            ref,
            kpi,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetComparisonChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardKpiWidgetComparisonChanged = eventGuard("GDC.DASH/EVT.KPI_WIDGET.COMPARISON_CHANGED");
export function kpiWidgetDrillRemoved(ctx, ref, correlationId) {
    return {
        type: "GDC.DASH/EVT.KPI_WIDGET.DRILL_REMOVED",
        ctx,
        correlationId,
        payload: {
            ref,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetDrillRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardKpiWidgetDrillRemoved = eventGuard("GDC.DASH/EVT.KPI_WIDGET.DRILL_REMOVED");
export function kpiWidgetDrillSet(ctx, ref, drill, correlationId) {
    return {
        type: "GDC.DASH/EVT.KPI_WIDGET.DRILL_SET",
        ctx,
        correlationId,
        payload: {
            ref,
            drill,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetDrillSet}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardKpiWidgetDrillSet = eventGuard("GDC.DASH/EVT.KPI_WIDGET.DRILL_SET");
export function kpiWidgetChanged(ctx, kpiWidget, correlationId) {
    return {
        type: "GDC.DASH/EVT.KPI_WIDGET.WIDGET_CHANGED",
        ctx,
        correlationId,
        payload: {
            kpiWidget,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardKpiWidgetChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardKpiWidgetChanged = eventGuard("GDC.DASH/EVT.KPI_WIDGET.WIDGET_CHANGED");
//# sourceMappingURL=kpi.js.map