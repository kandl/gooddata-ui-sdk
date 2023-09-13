import { eventGuard } from "./util.js";
export function layoutSectionAdded(ctx, section, index, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ADDED",
        ctx,
        correlationId,
        payload: {
            section,
            index,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionAdded}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardLayoutSectionAdded = eventGuard("GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ADDED");
export function layoutSectionMoved(ctx, section, fromIndex, toIndex, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_MOVED",
        ctx,
        correlationId,
        payload: {
            section,
            fromIndex,
            toIndex,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionMoved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardLayoutSectionMoved = eventGuard("GDC.DASH/EVT.FLUID_LAYOUT.SECTION_MOVED");
export function layoutSectionRemoved(ctx, section, index, eagerRemoval, stashIdentifier, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_REMOVED",
        ctx,
        correlationId,
        payload: {
            section,
            index,
            eagerRemoval,
            stashIdentifier,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardLayoutSectionRemoved = eventGuard("GDC.DASH/EVT.FLUID_LAYOUT.SECTION_REMOVED");
export function layoutSectionHeaderChanged(ctx, newHeader, sectionIndex, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_HEADER_CHANGED",
        ctx,
        correlationId,
        payload: {
            newHeader,
            sectionIndex,
        },
    };
}
export function layoutSectionItemsHeightResized(ctx, sectionIndex, itemIndexes, newHeight, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ITEMS_HEIGHT_RESIZED",
        ctx,
        correlationId,
        payload: {
            sectionIndex,
            itemIndexes,
            newHeight,
        },
    };
}
export function layoutSectionItemWidthResized(ctx, sectionIndex, itemIndex, newWidth, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ITEM_WIDTH_RESIZED",
        ctx,
        correlationId,
        payload: {
            sectionIndex,
            itemIndex,
            newWidth,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionHeaderChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardLayoutSectionHeaderChanged = eventGuard("GDC.DASH/EVT.FLUID_LAYOUT.SECTION_HEADER_CHANGED");
export function layoutSectionItemsAdded(ctx, sectionIndex, startIndex, itemsAdded, stashesUsed, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEMS_ADDED",
        ctx,
        correlationId,
        payload: {
            sectionIndex,
            startIndex,
            itemsAdded,
            stashesUsed,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemsAdded}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardLayoutSectionItemsAdded = eventGuard("GDC.DASH/EVT.FLUID_LAYOUT.ITEMS_ADDED");
export function layoutSectionItemReplaced(ctx, sectionIndex, itemIndex, items, previousItem, stashIdentifier, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REPLACED",
        ctx,
        correlationId,
        payload: {
            sectionIndex,
            itemIndex,
            items,
            previousItem,
            stashIdentifier,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemReplaced}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardLayoutSectionItemReplaced = eventGuard("GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REPLACED");
export function layoutSectionItemMoved(ctx, item, fromSectionIndex, toSectionIndex, fromIndex, toIndex, originalSectionRemoved, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED",
        ctx,
        correlationId,
        payload: {
            item,
            fromSectionIndex,
            toSectionIndex,
            fromIndex,
            toIndex,
            originalSectionRemoved,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemMoved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardLayoutSectionItemMoved = eventGuard("GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED");
export function layoutSectionItemMovedToNewSection(ctx, item, fromSectionIndex, toSectionIndex, fromIndex, toIndex, originalSectionRemoved, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED_TO_NEW_SECTION",
        ctx,
        correlationId,
        payload: {
            item,
            fromSectionIndex,
            toSectionIndex,
            fromIndex,
            toIndex,
            originalSectionRemoved,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemMovedToNewSection}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardLayoutSectionItemMovedToNewSection = eventGuard("GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED_TO_NEW_SECTION");
export function layoutSectionItemRemoved(ctx, item, itemIndex, section, stashIdentifier, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REMOVED",
        ctx,
        correlationId,
        payload: {
            item,
            itemIndex,
            section,
            stashIdentifier,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardLayoutSectionItemRemoved = eventGuard("GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REMOVED");
export function layoutChanged(ctx, layout, correlationId) {
    return {
        type: "GDC.DASH/EVT.FLUID_LAYOUT.LAYOUT_CHANGED",
        ctx,
        correlationId,
        payload: {
            layout,
        },
    };
}
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export const isDashboardLayoutChanged = eventGuard("GDC.DASH/EVT.FLUID_LAYOUT.LAYOUT_CHANGED");
//# sourceMappingURL=layout.js.map