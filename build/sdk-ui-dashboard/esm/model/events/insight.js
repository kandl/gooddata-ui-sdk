import { eventGuard } from "./util.js";
export function insightWidgetHeaderChanged(ctx, ref, header, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.HEADER_CHANGED",
        ctx,
        correlationId,
        payload: {
            ref,
            header,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetHeaderChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetHeaderChanged = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.HEADER_CHANGED");
export function insightWidgetDescriptionChanged(ctx, ref, description, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.DESCRIPTION_CHANGED",
        ctx,
        correlationId,
        payload: {
            ref,
            description,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetDescriptionChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetDescriptionChanged = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.DESCRIPTION_CHANGED");
export function insightWidgetFilterSettingsChanged(ctx, ref, ignoredAttributeFilters, dateDatasetForFiltering, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.FILTER_SETTINGS_CHANGED",
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
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetFilterSettingsChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetFilterSettingsChanged = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.FILTER_SETTINGS_CHANGED");
export function insightWidgetVisPropertiesChanged(ctx, ref, properties, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.PROPERTIES_CHANGED",
        ctx,
        correlationId,
        payload: {
            ref,
            properties,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetVisPropertiesChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetVisPropertiesChanged = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.PROPERTIES_CHANGED");
export function insightWidgetVisConfigurationChanged(ctx, ref, newConfig, oldConfig, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.CONFIGURATION_CHANGED",
        ctx,
        correlationId,
        payload: {
            ref,
            newConfig,
            oldConfig,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetVisConfigurationChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetVisConfigurationChanged = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.CONFIGURATION_CHANGED");
export function insightWidgetInsightChanged(ctx, ref, insight, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.INSIGHT_SWITCHED",
        ctx,
        correlationId,
        payload: {
            ref,
            insight,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetInsightSwitched}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetInsightSwitched = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.INSIGHT_SWITCHED");
export function insightWidgetDrillsModified(ctx, ref, added, updated, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_MODIFIED",
        ctx,
        correlationId,
        payload: {
            ref,
            added,
            updated,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetDrillsModified}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetDrillsModified = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_MODIFIED");
export function insightWidgetDrillsRemoved(ctx, ref, removed, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_REMOVED",
        ctx,
        correlationId,
        payload: {
            ref,
            removed,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetDrillsRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetDrillsRemoved = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_REMOVED");
export function insightWidgetChanged(ctx, insightWidget, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.WIDGET_CHANGED",
        ctx,
        correlationId,
        payload: {
            insightWidget,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetChanged = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.WIDGET_CHANGED");
/**
 * @beta
 */
export function insightWidgetExportRequested(ctx, ref, config, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.EXPORT_REQUESTED",
        ctx,
        correlationId,
        payload: {
            ref,
            config,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetExportRequested}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetExportRequested = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.EXPORT_REQUESTED");
/**
 * @beta
 */
export function insightWidgetExportResolved(ctx, result, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.EXPORT_RESOLVED",
        ctx,
        correlationId,
        payload: {
            resultUri: result.uri,
            result,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetExportResolved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetExportResolved = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.EXPORT_RESOLVED");
/**
 * @beta
 */
export function insightWidgetRefreshed(ctx, insight, correlationId) {
    return {
        type: "GDC.DASH/EVT.INSIGHT_WIDGET.REFRESHED",
        ctx,
        correlationId,
        payload: {
            insight,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardInsightWidgetRefreshed}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardInsightWidgetRefreshed = eventGuard("GDC.DASH/EVT.INSIGHT_WIDGET.REFRESHED");
//# sourceMappingURL=insight.js.map