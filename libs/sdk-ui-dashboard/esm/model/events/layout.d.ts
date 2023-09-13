import { IDashboardLayout, IDashboardLayoutSectionHeader } from "@gooddata/sdk-model";
import { ExtendedDashboardItem, ExtendedDashboardLayoutSection, ExtendedDashboardWidget, StashedDashboardItemsId } from "../types/layoutTypes.js";
import { DashboardContext } from "../types/commonTypes.js";
import { IDashboardEvent } from "./base.js";
/**
 * Payload of the {@link DashboardLayoutSectionAdded} event.
 * @beta
 */
export interface DashboardLayoutSectionAddedPayload {
    /**
     * The new section.
     */
    readonly section: ExtendedDashboardLayoutSection;
    /**
     * Index of the new section among other sections in the layout.
     *
     * Index is zero-based.
     */
    readonly index: number;
}
/**
 * This event is emitted when a new dashboard layout section is added.
 *
 * @beta
 */
export interface DashboardLayoutSectionAdded extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ADDED";
    readonly payload: DashboardLayoutSectionAddedPayload;
}
export declare function layoutSectionAdded(ctx: DashboardContext, section: ExtendedDashboardLayoutSection, index: number, correlationId?: string): DashboardLayoutSectionAdded;
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionAdded}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionAdded: (obj: unknown) => obj is DashboardLayoutSectionAdded;
/**
 * Payload of the {@link DashboardLayoutSectionMoved} event.
 * @beta
 */
export interface DashboardLayoutSectionMovedPayload {
    /**
     * The section moved.
     */
    readonly section: ExtendedDashboardLayoutSection;
    /**
     * Index from which the section was moved.
     */
    readonly fromIndex: number;
    /**
     * Zero-based index to which the section was moved.
     */
    readonly toIndex: number;
}
/**
 * This event is emitted when a dashboard layout section is moved from one place to another.
 *
 * @beta
 */
export interface DashboardLayoutSectionMoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_MOVED";
    readonly payload: DashboardLayoutSectionMovedPayload;
}
export declare function layoutSectionMoved(ctx: DashboardContext, section: ExtendedDashboardLayoutSection, fromIndex: number, toIndex: number, correlationId?: string): DashboardLayoutSectionMoved;
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionMoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionMoved: (obj: unknown) => obj is DashboardLayoutSectionMoved;
/**
 * Payload of the {@link DashboardLayoutSectionRemoved} event.
 * @beta
 */
export interface DashboardLayoutSectionRemovedPayload {
    /**
     * Section that was removed.
     *
     * Note: when the section is eagerly removed, it's items will be empty.
     */
    readonly section: ExtendedDashboardLayoutSection;
    /**
     * Index where the section originally resided.
     */
    readonly index: number;
    /**
     * Indicates that the section was removed as part of eager removal of the section items.
     */
    readonly eagerRemoval?: boolean;
    /**
     * If the remove command indicated to stash the items for later reuse, then the stash identifier
     * provided on the command is mirrored here.
     */
    readonly stashIdentifier?: StashedDashboardItemsId;
}
/**
 * This event is emitted when a dashboard layout section is removed from the layout.
 *
 * Note: this event will be emitted also when the section is removed as part of eager removal of
 * its items. E.g. item is removed, it is last item in the section, and the whole section is removed
 * as well.
 *
 * @beta
 */
export interface DashboardLayoutSectionRemoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_REMOVED";
    readonly payload: DashboardLayoutSectionRemovedPayload;
}
export declare function layoutSectionRemoved(ctx: DashboardContext, section: ExtendedDashboardLayoutSection, index: number, eagerRemoval?: boolean, stashIdentifier?: StashedDashboardItemsId, correlationId?: string): DashboardLayoutSectionRemoved;
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionRemoved: (obj: unknown) => obj is DashboardLayoutSectionRemoved;
/**
 * Payload of the {@link DashboardLayoutSectionHeaderChanged} event.
 * @beta
 */
export interface DashboardLayoutSectionHeaderChangedPayload {
    /**
     * The new header of the section.
     */
    readonly newHeader: IDashboardLayoutSectionHeader;
    /**
     * Index of the section which had the header updated.
     */
    readonly sectionIndex: number;
}
/**
 * This event is emitted when dashboard layout section changes.
 *
 * @beta
 */
export interface DashboardLayoutSectionHeaderChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_HEADER_CHANGED";
    readonly payload: DashboardLayoutSectionHeaderChangedPayload;
}
export declare function layoutSectionHeaderChanged(ctx: DashboardContext, newHeader: IDashboardLayoutSectionHeader, sectionIndex: number, correlationId?: string): DashboardLayoutSectionHeaderChanged;
/**
 * Payload of the {@link DashboardLayoutSectionItemsHeightResized} event.
 * @beta
 */
export interface DashboardLayoutSectionItemsHeightResizedPayload {
    /**
     * Index of the section which items height was changed.
     */
    readonly sectionIndex: number;
    /**
     * Index of the items in section which height was changed.
     */
    readonly itemIndexes: number[];
    /**
     * New height of items.
     */
    readonly newHeight: number;
}
/**
 * This event is emitted when dashboard layout items height changes.
 *
 * @beta
 */
export interface DashboardLayoutSectionItemsHeightResized extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ITEMS_HEIGHT_RESIZED";
    readonly payload: DashboardLayoutSectionItemsHeightResizedPayload;
}
export declare function layoutSectionItemsHeightResized(ctx: DashboardContext, sectionIndex: number, itemIndexes: number[], newHeight: number, correlationId?: string): DashboardLayoutSectionItemsHeightResized;
/**
 * Payload of the {@link DashboardLayoutSectionItemWidthResized} event.
 * @beta
 */
export interface DashboardLayoutSectionItemWidthResizedPayload {
    /**
     * Index of the section which items height was changed.
     */
    readonly sectionIndex: number;
    /**
     * Index of the items in section which height was changed.
     */
    readonly itemIndex: number;
    /**
     * New width of items.
     */
    readonly newWidth: number;
}
/**
 * This event is emitted when dashboard layout items height changes.
 *
 * @beta
 */
export interface DashboardLayoutSectionItemWidthResized extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ITEM_WIDTH_RESIZED";
    readonly payload: DashboardLayoutSectionItemWidthResizedPayload;
}
export declare function layoutSectionItemWidthResized(ctx: DashboardContext, sectionIndex: number, itemIndex: number, newWidth: number, correlationId?: string): DashboardLayoutSectionItemWidthResized;
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionHeaderChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionHeaderChanged: (obj: unknown) => obj is DashboardLayoutSectionHeaderChanged;
/**
 * Payload of the {@link DashboardLayoutSectionItemsAdded} event.
 * @beta
 */
export interface DashboardLayoutSectionItemsAddedPayload {
    /**
     * Index of the section to which the items were added.
     */
    readonly sectionIndex: number;
    /**
     * Index within the section at which the items were inserted.
     */
    readonly startIndex: number;
    /**
     * Items that were inserted.
     */
    readonly itemsAdded: ReadonlyArray<ExtendedDashboardItem>;
    /**
     * If the items from one or more stashes were added and the stashes were cleared, the the list of
     * stash identifiers will be included here.
     */
    readonly stashesUsed?: ReadonlyArray<StashedDashboardItemsId>;
}
/**
 * This event is emitted when items are added to a dashboard section.
 *
 * @beta
 */
export interface DashboardLayoutSectionItemsAdded extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEMS_ADDED";
    readonly payload: DashboardLayoutSectionItemsAddedPayload;
}
export declare function layoutSectionItemsAdded(ctx: DashboardContext, sectionIndex: number, startIndex: number, itemsAdded: ExtendedDashboardItem[], stashesUsed?: StashedDashboardItemsId[], correlationId?: string): DashboardLayoutSectionItemsAdded;
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemsAdded}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionItemsAdded: (obj: unknown) => obj is DashboardLayoutSectionItemsAdded;
/**
 * Payload of the {@link DashboardLayoutSectionItemReplaced} event.
 * @beta
 */
export interface DashboardLayoutSectionItemReplacedPayload {
    /**
     * Index of section where the replacement happened.
     */
    readonly sectionIndex: number;
    /**
     * Index of item within the section that was replaced.
     */
    readonly itemIndex: number;
    /**
     * New item definition.
     */
    readonly items: ReadonlyArray<ExtendedDashboardItem>;
    /**
     * Item that was replaced
     */
    readonly previousItem: ExtendedDashboardItem;
    /**
     * If the replacement specified to stash the old item, then the identifier of the
     * stash is included here.
     */
    readonly stashIdentifier?: StashedDashboardItemsId;
}
/**
 * This event is emitted when an item in a dashboard section is replaced.
 * @beta
 */
export interface DashboardLayoutSectionItemReplaced extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REPLACED";
    readonly payload: DashboardLayoutSectionItemReplacedPayload;
}
export declare function layoutSectionItemReplaced(ctx: DashboardContext, sectionIndex: number, itemIndex: number, items: ExtendedDashboardItem[], previousItem: ExtendedDashboardItem, stashIdentifier?: StashedDashboardItemsId, correlationId?: string): DashboardLayoutSectionItemReplaced;
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemReplaced}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionItemReplaced: (obj: unknown) => obj is DashboardLayoutSectionItemReplaced;
/**
 * Payload of the {@link DashboardLayoutSectionItemMoved} event.
 * @beta
 */
export interface DashboardLayoutSectionItemMovedPayload {
    /**
     * Item that was moved.
     */
    readonly item: ExtendedDashboardItem;
    /**
     * Index of section from which the item was moved.
     */
    readonly fromSectionIndex: number;
    /**
     * Index of section to which the item was moved.
     *
     * This may be the same as `fromSectionIndex` - which means the move happened within the same section.
     */
    readonly toSectionIndex: number;
    /**
     * Index within the `fromSection` from where the item was moved.
     */
    readonly fromIndex: number;
    /**
     * Index in `toSection` at which the item was inserted.
     */
    readonly toIndex: number;
    /**
     * Indicate, that original section has been removed.
     */
    readonly originalSectionRemoved: boolean;
}
/**
 * This event is emitted when a dashboard item is moved between sections or within a section.
 *
 * @beta
 */
export interface DashboardLayoutSectionItemMoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED";
    readonly payload: DashboardLayoutSectionItemMovedPayload;
}
export declare function layoutSectionItemMoved(ctx: DashboardContext, item: ExtendedDashboardItem, fromSectionIndex: number, toSectionIndex: number, fromIndex: number, toIndex: number, originalSectionRemoved: boolean, correlationId?: string): DashboardLayoutSectionItemMoved;
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemMoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionItemMoved: (obj: unknown) => obj is DashboardLayoutSectionItemMoved;
/**
 * Payload of the {@link DashboardLayoutSectionItemMovedToNewSection} event.
 * @beta
 */
export interface DashboardLayoutSectionItemMovedToNewSectionPayload {
    /**
     * Item that was moved.
     */
    readonly item: ExtendedDashboardItem;
    /**
     * Index of section from which the item was moved.
     */
    readonly fromSectionIndex: number;
    /**
     * Index of section to which the item was moved.
     *
     * This may be the same as `fromSectionIndex` - which means the move happened within the same section.
     */
    readonly toSectionIndex: number;
    /**
     * Index within the `fromSection` from where the item was moved.
     */
    readonly fromIndex: number;
    /**
     * Index in `toSection` at which the item was inserted.
     */
    readonly toIndex: number;
    /**
     * Indicate, that original section has been removed.
     */
    readonly originalSectionRemoved: boolean;
}
/**
 * This event is emitted when a dashboard item is moved to new section.
 *
 * @beta
 */
export interface DashboardLayoutSectionItemMovedToNewSection extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED_TO_NEW_SECTION";
    readonly payload: DashboardLayoutSectionItemMovedToNewSectionPayload;
}
export declare function layoutSectionItemMovedToNewSection(ctx: DashboardContext, item: ExtendedDashboardItem, fromSectionIndex: number, toSectionIndex: number, fromIndex: number, toIndex: number, originalSectionRemoved: boolean, correlationId?: string): DashboardLayoutSectionItemMovedToNewSection;
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemMovedToNewSection}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionItemMovedToNewSection: (obj: unknown) => obj is DashboardLayoutSectionItemMovedToNewSection;
/**
 * Payload of the {@link DashboardLayoutSectionItemRemoved} event.
 * @beta
 */
export interface DashboardLayoutSectionItemRemovedPayload {
    /**
     * Item that was removed.
     */
    readonly item: ExtendedDashboardItem;
    /**
     * Index where the item resided.
     */
    readonly itemIndex: number;
    /**
     * If the removal was eager and removed the entire section, then that section is included here.
     *
     * NOTE: the {@link DashboardLayoutSectionRemoved} will be fired at the occasion as well.
     */
    readonly section?: ExtendedDashboardLayoutSection;
    /**
     * If the removal indicated to stash the item, then the stash identifier is mirrored here.
     */
    readonly stashIdentifier?: StashedDashboardItemsId;
}
/**
 * This event is emitted when an item is removed from dashboard layout section.
 *
 * @beta
 */
export interface DashboardLayoutSectionItemRemoved extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REMOVED";
    readonly payload: DashboardLayoutSectionItemRemovedPayload;
}
export declare function layoutSectionItemRemoved(ctx: DashboardContext, item: ExtendedDashboardItem, itemIndex: number, section?: ExtendedDashboardLayoutSection, stashIdentifier?: StashedDashboardItemsId, correlationId?: string): DashboardLayoutSectionItemRemoved;
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutSectionItemRemoved}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutSectionItemRemoved: (obj: unknown) => obj is DashboardLayoutSectionItemRemoved;
/**
 * Payload of the {@link DashboardLayoutChanged} event.
 * @beta
 */
export interface DashboardLayoutChangedPayload {
    /**
     * Layout after the change.
     */
    readonly layout: IDashboardLayout<ExtendedDashboardWidget>;
}
/**
 * This event is emitted after any change to the dashboard layout and will include the entire new layout.
 *
 * @beta
 */
export interface DashboardLayoutChanged extends IDashboardEvent {
    readonly type: "GDC.DASH/EVT.FLUID_LAYOUT.LAYOUT_CHANGED";
    readonly payload: DashboardLayoutChangedPayload;
}
export declare function layoutChanged(ctx: DashboardContext, layout: IDashboardLayout<ExtendedDashboardWidget>, correlationId?: string): DashboardLayoutChanged;
/**
 * Tests whether the provided object is an instance of {@link DashboardLayoutChanged}.
 *
 * @param obj - object to test
 * @beta
 */
export declare const isDashboardLayoutChanged: (obj: unknown) => obj is DashboardLayoutChanged;
