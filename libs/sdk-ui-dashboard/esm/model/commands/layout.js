// (C) 2021-2023 GoodData Corporation
/**
 * Creates the AddLayoutSection command.
 *
 * @remarks
 * Dispatching this command will result in the addition of a new layout section.
 * The new section will be placed at the desired index and will be empty by default.
 *
 * You may optionally specify the initial values of the section header and the items that will be in the new section.
 *
 * @param index - index to place the section at; -1 can be used as convenience to append a new section
 * @param initialHeader - specify specify header for the newly created section
 * @param initialItems - specify one or more items that the newly created section should include from the get-go
 * @param autoResolveDateFilterDataset - specify whether dashboard should auto-resolve date dataset to use for date filtering of KPI
 *  and insight widgets; default is disabled meaning date filtering will be enabled only for those KPI or Insight widgets
 *  that already specify dateDataset.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function addLayoutSection(index, initialHeader, initialItems, autoResolveDateFilterDataset, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.ADD_SECTION",
        correlationId,
        payload: {
            index,
            initialHeader,
            initialItems,
            autoResolveDateFilterDataset,
        },
    };
}
/**
 * Creates the MoveLayoutSection command. Dispatching this command will result in move of the section located at `sectionIndex`
 * to a new place indicated by `toIndex`.
 *
 * @param sectionIndex - index of section to move
 * @param toIndex - the new index for the section
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function moveLayoutSection(sectionIndex, toIndex, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_SECTION",
        correlationId,
        payload: {
            sectionIndex,
            toIndex,
        },
    };
}
/**
 * Creates the RemoveLayoutSection command.
 *
 * @remarks
 * Dispatching this command will result in removal of the entire dashboard
 * section. You can optionally specify that the items in the section should not be physically removed but instead be
 * stashed for later 'resurrection'.
 *
 * @param index - index of section to remove
 * @param stashIdentifier - specify identifier to stash items under; if you do not specify this, then the dashboard items in the removed section will also be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function removeLayoutSection(index, stashIdentifier, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_SECTION",
        correlationId,
        payload: {
            index,
            stashIdentifier,
        },
    };
}
/**
 * Creates the ChangeLayoutSectionHeader command.
 *
 * @remarks
 * Dispatching this command will result in change of the section's title and/or description.
 *
 * @param index - index of section to change
 * @param header - new header
 * @param merge - indicates whether the old header and the new header should be merged; default is no merging
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function changeLayoutSectionHeader(index, header, merge, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.CHANGE_SECTION_HEADER",
        correlationId,
        payload: {
            index,
            header,
            merge,
        },
    };
}
/**
 * Creates the AddSectionItems command.
 *
 * @remarks
 * Dispatching this command will result in addition of a new item into the existing
 * section. This item may be a placeholder for KPI or insight, an actual dashboard widget or a previously stashed
 * dashboard item.
 *
 *
 * @param sectionIndex - index of section to which the new item should be added
 * @param itemIndex - index at which to insert the new item
 * @param item - definition of the new item.
 * @param autoResolveDateFilterDataset - specify whether dashboard should auto-resolve date dataset to use for date filtering of KPI
 *  and insight widgets; default is disabled meaning date filtering will be enabled only for those KPI or Insight widgets
 *  that already specify dateDataset.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function addSectionItem(sectionIndex, itemIndex, item, autoResolveDateFilterDataset, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.ADD_ITEMS",
        correlationId,
        payload: {
            sectionIndex,
            itemIndex,
            items: [item],
            autoResolveDateFilterDataset,
        },
    };
}
/**
 * Creates the ReplaceSectionItem command. Dispatching this command will result in replacement of particular dashboard
 * item with a new item. By default the old item will be discarded, however you may specify to stash it for later use.
 *
 * @param sectionIndex - index of section where the item to replace resides
 * @param itemIndex - index of item within the section
 * @param item - new item definition
 * @param stashIdentifier - specify identifier of stash where the old item should be stored
 * @param autoResolveDateFilterDataset - specify whether dashboard should auto-resolve date dataset
 *  to use for date filtering of KPI or insight widget that is replacing the existing item; default is disabled
 *  meaning date filtering will be enabled only for those KPI or Insight widgets that already specify dateDataset.
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function replaceSectionItem(sectionIndex, itemIndex, item, stashIdentifier, autoResolveDateFilterDataset, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.REPLACE_ITEM",
        correlationId,
        payload: {
            sectionIndex,
            itemIndex,
            item,
            autoResolveDateFilterDataset,
            stashIdentifier,
        },
    };
}
/**
 * Creates the MoveSectionItem command.
 *
 * @remarks
 * Dispatching this command will result in move of single item within
 * section or from one section to another.
 *
 * @param sectionIndex - source section index
 * @param itemIndex - index of item to move
 * @param toSectionIndex - target section index; you may specify -1 to move to last section
 * @param toItemIndex - index within target section where the item should be inserted; you may specify -1 to append
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function moveSectionItem(sectionIndex, itemIndex, toSectionIndex, toItemIndex, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_ITEM",
        correlationId,
        payload: {
            sectionIndex,
            itemIndex,
            toSectionIndex,
            toItemIndex,
            removeOriginalSectionIfEmpty: false,
        },
    };
}
/**
 * Creates the MoveSectionItem command.
 *
 * @remarks
 * Dispatching this command will result in move of single item within
 * section or from one section to another. If original section stays empty after move, then it will be removed.
 *
 * @param sectionIndex - source section index
 * @param itemIndex - index of item to move
 * @param toSectionIndex - target section index; you may specify -1 to move to last section
 * @param toItemIndex - index within target section where the item should be inserted; you may specify -1 to append
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function moveSectionItemAndRemoveOriginalSectionIfEmpty(sectionIndex, itemIndex, toSectionIndex, toItemIndex, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_ITEM",
        correlationId,
        payload: {
            sectionIndex,
            itemIndex,
            toSectionIndex,
            toItemIndex,
            removeOriginalSectionIfEmpty: true,
        },
    };
}
/**
 * Creates the MoveSectionItemToNewSection command.
 *
 * @remarks
 * Dispatching this command will result in move of single item within
 * section or from one section to another.
 *
 * @param sectionIndex - source section index
 * @param itemIndex - index of item to move
 * @param toSectionIndex - target section index; you may specify -1 to move to last section
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function moveSectionItemToNewSection(sectionIndex, itemIndex, toSectionIndex, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_ITEM_TO_NEW_SECTION",
        correlationId,
        payload: {
            sectionIndex,
            itemIndex,
            toSectionIndex,
            removeOriginalSectionIfEmpty: false,
        },
    };
}
/**
 * Creates the MoveSectionItemToNewSection command.
 *
 * @remarks
 * Dispatching this command will result in move of single item within
 * section or from one section to another. If original section stays empty after move, then it will be removed.
 *
 * @param sectionIndex - source section index
 * @param itemIndex - index of item to move
 * @param toSectionIndex - target section index; you may specify -1 to move to last section
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function moveSectionItemToNewSectionAndRemoveOriginalSectionIfEmpty(sectionIndex, itemIndex, toSectionIndex, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.MOVE_ITEM_TO_NEW_SECTION",
        correlationId,
        payload: {
            sectionIndex,
            itemIndex,
            toSectionIndex,
            removeOriginalSectionIfEmpty: true,
        },
    };
}
/**
 * Creates the RemoveSectionItem command.
 *
 * @remarks
 * Dispatching this command will result in removal
 * of the item from a section. If the removed item was last in the section, the section will be left on the layout
 * and will contain no items.
 *
 * You may optionally specify the stashIdentifier in order to stash the removed item for later resurrection.
 *
 * @param sectionIndex - index of section from which to remove the item
 * @param itemIndex - index of item to remove
 * @param stashIdentifier - stash identifier to store the removed item under; if not specified the item will be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function removeSectionItem(sectionIndex, itemIndex, stashIdentifier, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_ITEM",
        correlationId,
        payload: {
            sectionIndex,
            itemIndex,
            stashIdentifier,
            eager: false,
        },
    };
}
/**
 * Creates the RemoveSectionItem configured to do eager remove of item.
 *
 * @remarks
 * Dispatching this command will result in removal
 * of the item from a section and if the section only contains that item then the whole section will be removed as well.
 *
 * You may optionally specify the stashIdentifier in order to stash the removed item for later resurrection.
 *
 * @param sectionIndex - index of section from which to remove the item
 * @param itemIndex - index of item to remove
 * @param stashIdentifier - stash identifier to store the removed item under; if not specified the item will be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function eagerRemoveSectionItem(sectionIndex, itemIndex, stashIdentifier, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_ITEM",
        correlationId,
        payload: {
            sectionIndex,
            itemIndex,
            stashIdentifier,
            eager: true,
        },
    };
}
/**
 * Creates the RemoveSectionItemByWidgetRef command.
 *
 * @remarks
 * Dispatching this command will result in removal
 * of the item from a section. If the removed item was last in the section, the section will be left on the layout
 * and will contain no items.
 *
 * @param widgetRef - widget reference of the item to remove;
 * @param stashIdentifier - stash identifier to store the removed item under; if not specified the item will be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function removeSectionItemByWidgetRef(widgetRef, stashIdentifier, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_ITEM_BY_WIDGET_REF",
        correlationId,
        payload: {
            widgetRef,
            stashIdentifier,
            eager: false,
        },
    };
}
/**
 * Creates the RemoveSectionItemByWidgetRef configured to do eager remove of item.
 *
 * @remarks
 * Dispatching this command will result in removal
 * of the item from a section and if the section only contains that item then the whole section will be removed as well.
 *
 * You may optionally specify the stashIdentifier in order to stash the removed item for later resurrection.
 *
 * @param widgetRef - widget reference of the item to remove;
 * @param stashIdentifier - stash identifier to store the removed item under; if not specified the item will be removed
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function eagerRemoveSectionItemByWidgetRef(widgetRef, stashIdentifier, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.REMOVE_ITEM_BY_WIDGET_REF",
        correlationId,
        payload: {
            widgetRef,
            stashIdentifier,
            eager: true,
        },
    };
}
/**
 * Creates the UndoLayoutChanges command.
 *
 * @remarks
 * Dispatching this command will result in reverting the state of the layout
 * to a point before a particular layout command processing.
 *
 * By default, the very last command will be undone, however you can provide a function of your own to determine
 * up to which command should the undo go.
 *
 * @param undoPointSelector - specify function to determine up to which command to undo; if not provided the very last command will be undone
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function undoLayoutChanges(undoPointSelector, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.UNDO",
        correlationId,
        payload: {
            undoPointSelector,
        },
    };
}
/**
 * A convenience function to create UndoLayoutChanges command that will revert the very last command and toss it out
 * of history.
 *
 * @remarks
 * This is useful if you are implementing complex and cancellable interactions. For instance if you are building
 * drag-and-drop interaction which upon drag start removes item from a section using the RemoveSectionItem command and
 * upon drop places item in a new location using AddSectionItems command.
 *
 * When the user starts drag, you submit the RemoveSectionItem command (keeping the item in stash). Then user does
 * something to cancel the interaction: you need to restore the layout to the original state: that means to revert
 * the last layout change that was done by your interaction.
 *
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function revertLastLayoutChange(correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.UNDO",
        correlationId,
        payload: {},
    };
}
/**
 * Creates the ResizeHeight command.
 *
 * @param sectionIndex - index of the section
 * @param itemIndexes - indexes of the items
 * @param height - height in Grid Rows (by default 1 Grid Row is 20px)
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function resizeHeight(sectionIndex, itemIndexes, height, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.RESIZE_HEIGHT",
        correlationId,
        payload: {
            sectionIndex,
            itemIndexes,
            height,
        },
    };
}
/**
 * Creates the ResizeWidth command.
 *
 * @param sectionIndex - index of the section
 * @param itemIndex - index of the item
 * @param width - width in Grid Rows (by default 1 Grid Row is 20px)
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @beta
 */
export function resizeWidth(sectionIndex, itemIndex, width, correlationId) {
    return {
        type: "GDC.DASH/CMD.FLUID_LAYOUT.RESIZE_WIDTH",
        correlationId,
        payload: {
            sectionIndex,
            itemIndex,
            width,
        },
    };
}
//# sourceMappingURL=layout.js.map