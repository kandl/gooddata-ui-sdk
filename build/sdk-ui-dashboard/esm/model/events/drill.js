import { eventGuard } from "./util.js";
/**
 * @alpha
 */
export function drillRequested(ctx, drillEvent, drillContext, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.REQUESTED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
            drillContext,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillRequested = eventGuard("GDC.DASH/EVT.DRILL.REQUESTED");
/**
 * @alpha
 */
export function drillResolved(ctx, drillEvent, drillContext, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.RESOLVED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
            drillContext,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillResolved = eventGuard("GDC.DASH/EVT.DRILL.RESOLVED");
/**
 * @alpha
 */
export function drillDownRequested(ctx, insight, drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_DOWN.REQUESTED",
        ctx,
        correlationId,
        payload: {
            insight,
            drillEvent,
            drillDefinition,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillDownRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillDownRequested = eventGuard("GDC.DASH/EVT.DRILL.DRILL_DOWN.REQUESTED");
/**
 * @alpha
 */
export function drillDownResolved(ctx, insight, drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_DOWN.RESOLVED",
        ctx,
        correlationId,
        payload: {
            insight,
            drillEvent,
            drillDefinition,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillDownResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillDownResolved = eventGuard("GDC.DASH/EVT.DRILL.DRILL_DOWN.RESOLVED");
/**
 * @alpha
 */
export function drillToInsightRequested(ctx, insight, drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.REQUESTED",
        ctx,
        correlationId,
        payload: {
            insight,
            drillEvent,
            drillDefinition,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToInsightRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillToInsightRequested = eventGuard("GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.REQUESTED");
/**
 * @alpha
 */
export function drillToInsightResolved(ctx, insight, drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.RESOLVED",
        ctx,
        correlationId,
        payload: {
            insight,
            drillEvent,
            drillDefinition,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToInsightResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillToInsightResolved = eventGuard("GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.RESOLVED");
/**
 * @alpha
 */
export function drillToDashboardRequested(ctx, drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.REQUESTED",
        ctx,
        correlationId,
        payload: {
            drillDefinition,
            drillEvent,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToDashboardRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillToDashboardRequested = eventGuard("GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.REQUESTED");
/**
 * @alpha
 */
export function drillToDashboardResolved(ctx, filters, drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.RESOLVED",
        ctx,
        correlationId,
        payload: {
            filters,
            drillDefinition,
            drillEvent,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToDashboardResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillToDashboardResolved = eventGuard("GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.RESOLVED");
/**
 * @alpha
 */
export function drillToCustomUrlRequested(ctx, drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.REQUESTED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
            drillDefinition,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToCustomUrlRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillToCustomUrlRequested = eventGuard("GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.REQUESTED");
/**
 * @alpha
 */
export function drillToCustomUrlResolved(ctx, url, drillDefinition, drillEvent, filtersInfo, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.RESOLVED",
        ctx,
        correlationId,
        payload: {
            url,
            drillEvent,
            drillDefinition,
            filtersInfo,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToCustomUrlResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillToCustomUrlResolved = eventGuard("GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.RESOLVED");
/**
 * @alpha
 */
export function drillToAttributeUrlRequested(ctx, drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.REQUESTED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
            drillDefinition,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToAttributeUrlRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillToAttributeUrlRequested = eventGuard("GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.REQUESTED");
/**
 * @alpha
 */
export function drillToAttributeUrlResolved(ctx, url, drillDefinition, drillEvent, filtersInfo, isImplicit, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.RESOLVED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
            drillDefinition,
            url,
            filtersInfo,
            isImplicit,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToAttributeUrlResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillToAttributeUrlResolved = eventGuard("GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.RESOLVED");
/**
 * @alpha
 */
export function drillToLegacyDashboardRequested(ctx, drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.REQUESTED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
            drillDefinition,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToLegacyDashboardRequested}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillToLegacyDashboardRequested = eventGuard("GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.REQUESTED");
/**
 * @alpha
 */
export function drillToLegacyDashboardResolved(ctx, drillDefinition, drillEvent, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.RESOLVED",
        ctx,
        correlationId,
        payload: {
            drillEvent,
            drillDefinition,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillToLegacyDashboardResolved}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillToLegacyDashboardResolved = eventGuard("GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.RESOLVED");
/**
 * @alpha
 */
export function drillableItemsChanged(ctx, drillableItems, correlationId) {
    return {
        type: "GDC.DASH/EVT.DRILL.DRILLABLE_ITEMS.CHANGED",
        ctx,
        correlationId,
        payload: {
            drillableItems,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDrillableItemsChanged}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isDashboardDrillableItemsChanged = eventGuard("GDC.DASH/EVT.DRILL.DRILLABLE_ITEMS.CHANGED");
//# sourceMappingURL=drill.js.map