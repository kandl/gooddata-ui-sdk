// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { objRefToString, isKpiWidget, isInsightWidget, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import isEmpty from "lodash/isEmpty.js";
import { isCustomWidget } from "../../types/layoutTypes.js";
import { createUndoableCommandsMapping } from "../_infra/undoEnhancer.js";
import { newMapForObjectWithIdentity } from "../../../_staging/metadata/objRefMap.js";
import { selectFilterContextFilters } from "../filterContext/filterContextSelectors.js";
import { filterContextItemsToDashboardFiltersByWidget } from "../../../converters/index.js";
import { createMemoizedSelector } from "../_infra/selectors.js";
import { isInsightPlaceholderWidget, isKpiPlaceholderWidget, isPlaceholderWidget, } from "../../../widgets/index.js";
import { isItemWithBaseWidget, getWidgetCoordinates } from "./layoutUtils.js";
const selectSelf = createSelector((state) => state, (state) => state.layout);
/**
 * This selector returns current layout's stash. This stash can contain items that were removed from the layout with the
 * intent of further using the item elsewhere on the layout. The stash is a mapping of stashIdentifier to an array
 * of stashed items. The stash identifiers and stash usage is fully under control of the user.
 *
 * @internal
 */
export const selectStash = createSelector(selectSelf, (layoutState) => {
    return layoutState.stash;
});
/**
 * This selector returns commands that impacted the layout and can now be undone.
 *
 * @internal
 */
export const selectUndoableLayoutCommands = createSelector(selectSelf, (layoutState) => {
    return createUndoableCommandsMapping(layoutState);
});
/**
 * This selector returns dashboard's layout. It is expected that the selector is called only after the layout state
 * is correctly initialized. Invocations before initialization lead to invariant errors.
 *
 * @alpha
 */
export const selectLayout = createSelector(selectSelf, (layoutState) => {
    invariant(layoutState.layout, "attempting to access uninitialized layout state");
    return layoutState.layout;
});
/**
 * This selector returns the basic dashboard layout that does not contain any client-side extensions.
 *
 * This selector exists because analytical backend impls are not yet ready to handle persistence of custom
 * widgets (that may have arbitrary payloads). The selector is used only in save and saveAs command handlers,
 * where it obtains the layout without any custom widgets and persists that. Note that the save/saveAs
 * handlers will not wipe the custom widgets from the state during the save - so at this point the custom
 * widgets are treated as client-side extensions.
 *
 * Note: this selector also intentionally removes empty sections; dashboard cannot cope with them and
 * they may readily appear if user adds section full of custom widgets and then does saveAs; such sections
 * would end up empty.
 *
 * @internal
 */
export const selectBasicLayout = createSelector(selectLayout, (layout) => {
    const dashboardLayout = Object.assign(Object.assign({}, layout), { sections: layout.sections
            .map((section) => {
            return Object.assign(Object.assign({}, section), { items: section.items.filter(isItemWithBaseWidget) });
        })
            .filter((section) => !isEmpty(section.items)) });
    return dashboardLayout;
});
/**
 * Selects dashboard widgets in an obj ref an array. This map will include both analytical and custom
 * widgets that are placed on the dashboard.
 *
 * @internal
 */
export const selectWidgets = createSelector(selectLayout, (layout) => {
    const items = [];
    for (const section of layout.sections) {
        for (const item of section.items) {
            if (!item.widget) {
                continue;
            }
            items.push(item.widget);
        }
    }
    return items;
});
/**
 * Selects dashboard widgets in an obj ref to widget map. This map will include both analytical and custom
 * widgets that are placed on the dashboard.
 *
 * @internal
 */
export const selectWidgetsMap = createSelector(selectWidgets, (widgets) => {
    return newMapForObjectWithIdentity(widgets);
});
/**
 * Selects widget by its ref (including custom widgets).
 *
 * @remarks
 * To limit the scope only to analytical widgets, use {@link selectAnalyticalWidgetByRef}.
 *
 * @alpha
 */
export const selectWidgetByRef = createMemoizedSelector((ref) => createSelector(selectWidgetsMap, (widgetMap) => {
    if (!ref) {
        return undefined;
    }
    return widgetMap.get(ref);
}));
/**
 * Selects analytical widget by its ref. This selector will return undefined if the provided
 * widget ref is for a custom widget.
 *
 * @remarks
 * To include custom widgets as well, use {@link selectWidgetByRef}.
 *
 * @alpha
 */
export const selectAnalyticalWidgetByRef = createMemoizedSelector((ref) => createSelector(selectWidgetsMap, (widgetMap) => {
    if (!ref) {
        return undefined;
    }
    const widget = widgetMap.get(ref);
    if (!widget || isCustomWidget(widget)) {
        return undefined;
    }
    return widget;
}));
/**
 * Selects widget drills by the widget ref.
 *
 * @alpha
 */
export const selectWidgetDrills = createMemoizedSelector((ref) => createSelector(selectAnalyticalWidgetByRef(ref), (widget) => { var _a; return (_a = widget === null || widget === void 0 ? void 0 : widget.drills) !== null && _a !== void 0 ? _a : []; }));
/**
 * Selects all filters from filter context converted to filters specific for a widget specified by a ref.
 *
 * @remarks
 * This does NOT resolve things like ignored filters for a widget, etc.
 *
 * @internal
 */
export const selectAllFiltersForWidgetByRef = createMemoizedSelector((ref) => {
    return createSelector(selectWidgetByRef(ref), selectFilterContextFilters, (widget, dashboardFilters) => {
        invariant(widget, `widget with ref ${objRefToString(ref)} does not exist in the state`);
        return filterContextItemsToDashboardFiltersByWidget(dashboardFilters, widget);
    });
});
const selectAllWidgets = createSelector(selectWidgetsMap, (widgetMap) => {
    return Array.from(widgetMap.values());
});
/**
 * Selects a boolean indicating if the dashboard is empty.
 *
 * @alpha
 */
export const selectIsLayoutEmpty = createSelector(selectAllWidgets, (allWidgets) => {
    return allWidgets.length === 0;
});
/**
 * Selects all KPI widgets in the layout.
 *
 * @alpha
 */
export const selectAllKpiWidgets = createSelector(selectAllWidgets, (allWidgets) => {
    return allWidgets.filter(isKpiWidget);
});
/**
 * Selects all insight widgets in the layout.
 *
 * @alpha
 */
export const selectAllInsightWidgets = createSelector(selectAllWidgets, (allWidgets) => {
    return allWidgets.filter(isInsightWidget);
});
/**
 * Selects all custom widgets in the layout.
 *
 * @alpha
 */
export const selectAllCustomWidgets = createSelector(selectAllWidgets, (allWidgets) => {
    return allWidgets.filter(isCustomWidget);
});
/**
 * Selects all non-custom widgets in the layout.
 *
 * @alpha
 */
export const selectAllAnalyticalWidgets = createSelector(selectAllWidgets, (allWidgets) => {
    return allWidgets.filter((w) => !isCustomWidget(w));
});
/**
 * Selects a boolean indicating if the dashboard contains at least one non-custom widget.
 *
 * @alpha
 */
export const selectLayoutHasAnalyticalWidgets = createSelector(selectAllAnalyticalWidgets, (allAnalyticalWidgets) => {
    return allAnalyticalWidgets.length > 0;
});
/**
 * Selects layout coordinates for a given widget.
 *
 * @alpha
 */
export const selectWidgetCoordinatesByRef = createMemoizedSelector((ref) => {
    return createSelector(selectLayout, (layout) => {
        const coords = getWidgetCoordinates(layout, ref);
        invariant(coords, `widget with ref ${objRefToString(ref)} does not exist in the state`);
        return coords;
    });
});
/**
 * @internal
 */
export const selectWidgetPlaceholder = createSelector(selectAllCustomWidgets, (customWidgets) => {
    return customWidgets.find(isPlaceholderWidget);
});
/**
 * @internal
 */
export const selectWidgetPlaceholderCoordinates = createSelector(selectWidgetPlaceholder, selectLayout, (widgetPlaceholder, layout) => {
    return widgetPlaceholder ? getWidgetCoordinates(layout, widgetPlaceholder.ref) : undefined;
});
/**
 * @internal
 */
export const selectInsightWidgetPlaceholder = createSelector(selectAllCustomWidgets, (customWidgets) => {
    return customWidgets.find(isInsightPlaceholderWidget);
});
/**
 * @internal
 */
export const selectInsightWidgetPlaceholderCoordinates = createSelector(selectInsightWidgetPlaceholder, selectLayout, (widgetPlaceholder, layout) => {
    return widgetPlaceholder ? getWidgetCoordinates(layout, widgetPlaceholder.ref) : undefined;
});
/**
 * @internal
 */
export const selectKpiWidgetPlaceholder = createSelector(selectAllCustomWidgets, (customWidgets) => {
    return customWidgets.find(isKpiPlaceholderWidget);
});
/**
 * @internal
 */
export const selectKpiWidgetPlaceholderCoordinates = createSelector(selectKpiWidgetPlaceholder, selectLayout, (widgetPlaceholder, layout) => {
    return widgetPlaceholder ? getWidgetCoordinates(layout, widgetPlaceholder.ref) : undefined;
});
//# sourceMappingURL=layoutSelectors.js.map