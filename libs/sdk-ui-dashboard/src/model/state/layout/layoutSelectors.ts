// (C) 2021 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { ObjRef, serializeObjRef } from "@gooddata/sdk-model";
import invariant from "ts-invariant";
import { DashboardState } from "../types";
import { LayoutState } from "./layoutState";
import { IDashboardLayout, IDashboardLayoutItem } from "@gooddata/sdk-backend-spi";
import {
    ExtendedDashboardWidget,
    isInsightPlaceholderWidget,
    isKpiPlaceholderWidget,
} from "../../types/layoutTypes";
import { createUndoableCommandsMapping } from "../_infra/undoEnhancer";
import { DashboardLayoutFacade } from "@gooddata/sdk-ui-ext/esm/internal";
import memoize from "lodash/memoize";

const selectSelf = createSelector(
    (state: DashboardState) => state,
    (state) => state.layout,
);

/**
 * This selector returns current layout's stash. This stash can contain items that were removed from the layout with the
 * intent of further using the item elsewhere on the layout. The stash is a mapping of stashIdentifier to an array
 * of stashed items. The stash identifiers and stash usage is fully under control of the user.
 *
 * @internal
 */
export const selectStash = createSelector(selectSelf, (layoutState: LayoutState) => {
    return layoutState.stash;
});

/**
 * This selector returns commands that impacted the layout and can now be undone.
 *
 * @internal
 */
export const selectUndoableLayoutCommands = createSelector(selectSelf, (layoutState: LayoutState) => {
    return createUndoableCommandsMapping(layoutState);
});

/**
 * This selector returns dashboard's layout. It is expected that the selector is called only after the layout state
 * is correctly initialized. Invocations before initialization lead to invariant errors.
 *
 * @internal
 */
export const selectLayout = createSelector(selectSelf, (layoutState: LayoutState) => {
    invariant(layoutState.layout, "attempting to access uninitialized layout state");

    return layoutState.layout;
});

function isItemWithBaseWidget(obj: IDashboardLayoutItem<unknown>): obj is IDashboardLayoutItem {
    const widget = obj.widget;
    return !isKpiPlaceholderWidget(widget) && !isInsightPlaceholderWidget(widget);
}

/**
 * This selector returns the basic dashboard layout that does not contain any client-side extensions.
 *
 * TODO: we need to get to a point where this selector is not needed. the layout component needs to recognize that the
 *  layout may contain client-side customizations. Furthermore, the dashboard saving should be enhanced so that the
 *  client-side customization can also be persisted.
 *
 * @internal
 */
export const selectBasicLayout = createSelector(selectLayout, (layout) => {
    const dashboardLayout: IDashboardLayout = {
        ...layout,
        sections: layout.sections.map((section) => {
            return {
                ...section,
                items: section.items.filter(isItemWithBaseWidget),
            };
        }),
    };

    return dashboardLayout;
});
/**
 * Returns current layout wrapped in layout facade.
 *
 * @internal
 */
export const selectLayoutFacade = createSelector(selectSelf, (layoutState) => {
    return DashboardLayoutFacade.for(layoutState.layout!);
});

/**
 * Selects widget by its ref.
 *
 * @internal
 */
export const selectWidgetByRef = memoize(
    (ref: ObjRef | undefined) => {
        return createSelector(selectLayoutFacade, (layoutFacade) => {
            if (!ref) {
                return;
            }
            // TODO: extend layoutFacade with findWidget method
            const sections = layoutFacade.sections().all();
            let item: ExtendedDashboardWidget | undefined;
            for (const section of sections) {
                item = section
                    .items()
                    .find((item) => item.isWidgetItemWithRef(ref!))
                    ?.widget();
                if (item) {
                    break;
                }
            }

            return item;
        });
    },
    (ref) => ref && serializeObjRef(ref),
);
