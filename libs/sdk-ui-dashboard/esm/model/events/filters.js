import { eventGuard } from "./util.js";
export function dateFilterChanged(ctx, filter, dateFilterOptionLocalId, correlationId) {
    return {
        type: "GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.SELECTION_CHANGED",
        ctx,
        correlationId,
        payload: {
            filter,
            dateFilterOptionLocalId,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardDateFilterSelectionChanged}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardDateFilterSelectionChanged = eventGuard("GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.SELECTION_CHANGED");
export function attributeFilterAdded(ctx, added, index, correlationId) {
    return {
        type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.ADDED",
        ctx,
        correlationId,
        payload: {
            added,
            index,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeFilterAdded}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardAttributeFilterAdded = eventGuard("GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.ADDED");
export function attributeFilterRemoved(ctx, removed, children, correlationId) {
    return {
        type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.REMOVED",
        ctx,
        correlationId,
        payload: {
            removed,
            children,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeFilterRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardAttributeFilterRemoved = eventGuard("GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.REMOVED");
export function attributeFilterMoved(ctx, moved, fromIndex, toIndex, correlationId) {
    return {
        type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.MOVED",
        ctx,
        correlationId,
        payload: {
            moved,
            fromIndex,
            toIndex,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeFilterMoved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardAttributeFilterMoved = eventGuard("GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.MOVED");
export function attributeFilterSelectionChanged(ctx, filter, correlationId) {
    return {
        type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_CHANGED",
        ctx,
        correlationId,
        payload: {
            filter,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeFilterSelectionChanged}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardAttributeFilterSelectionChanged = eventGuard("GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_CHANGED");
export function attributeFilterParentChanged(ctx, filter, correlationId) {
    return {
        type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.PARENT_CHANGED",
        ctx,
        correlationId,
        payload: {
            filter,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeFilterParentChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardAttributeFilterParentChanged = eventGuard("GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.PARENT_CHANGED");
export function attributeDisplayTitleChanged(ctx, filter, correlationId) {
    return {
        type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.TITLE_CHANGED",
        ctx,
        correlationId,
        payload: {
            filter,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeTitleChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardAttributeFilterTitleChanged = eventGuard("GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.TITLE_CHANGED");
export function attributeDisplayFormChanged(ctx, filter, correlationId) {
    return {
        type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.DISPLAY_FORM_CHANGED",
        ctx,
        correlationId,
        payload: {
            filter,
        },
    };
}
export function attributeSelectionModeChanged(ctx, filter, correlationId) {
    return {
        type: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_MODE_CHANGED",
        ctx,
        correlationId,
        payload: {
            filter,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardAttributeSelectionModeChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardAttributeFilterSelectionModeChanged = eventGuard("GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_MODE_CHANGED");
export function filterContextChanged(ctx, filterContext, correlationId) {
    return {
        type: "GDC.DASH/EVT.FILTER_CONTEXT.CHANGED",
        ctx,
        correlationId,
        payload: {
            filterContext,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardFilterContextChanged}.
 *
 * @param obj - object to test
 * @public
 */
export const isDashboardFilterContextChanged = eventGuard("GDC.DASH/EVT.FILTER_CONTEXT.CHANGED");
//# sourceMappingURL=filters.js.map