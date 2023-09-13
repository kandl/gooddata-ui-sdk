// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { areObjRefsEqual, objRefToString } from "@gooddata/sdk-model";
import union from "lodash/union.js";
import filter from "lodash/filter.js";
import { selectWidgetsMap } from "../layout/layoutSelectors.js";
import { createMemoizedSelector } from "../_infra/selectors.js";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
const selectSelf = createSelector((state) => state, (state) => state.ui);
/**
 * @alpha
 */
export const selectIsScheduleEmailDialogOpen = createSelector(selectSelf, (state) => state.scheduleEmailDialog.open);
/**
 * @alpha
 */
export const selectScheduleEmailDialogDefaultAttachment = createSelector(selectSelf, (state) => { var _a; return (_a = state.scheduleEmailDialog.defaultAttachmentRef) !== null && _a !== void 0 ? _a : undefined; });
/**
 * @alpha
 */
export const selectIsScheduleEmailManagementDialogOpen = createSelector(selectSelf, (state) => state.scheduleEmailManagementDialog.open);
/**
 * @alpha
 */
export const selectIsSaveAsDialogOpen = createSelector(selectSelf, (state) => state.saveAsDialog.open);
/**
 * @alpha
 */
export const selectIsShareDialogOpen = createSelector(selectSelf, (state) => state.shareDialog.open);
/**
 * @internal
 */
export const selectIsDeleteDialogOpen = createSelector(selectSelf, (state) => state.deleteDialog.open);
/**
 * @internal
 */
export const selectIsKpiDeleteDialogOpen = createSelector(selectSelf, (state) => !!state.kpiDeleteDialog.widgetCoordinates);
/**
 * @internal
 */
export const selectIsCancelEditModeDialogOpen = createSelector(selectSelf, (state) => !!state.cancelEditModeDialog.open);
/**
 * @internal
 */
export const selectKpiDeleteDialogWidgetCoordinates = createSelector(selectSelf, (state) => state.kpiDeleteDialog.widgetCoordinates);
/**
 * @alpha
 */
export const selectFilterBarExpanded = createSelector(selectSelf, (state) => state.filterBar.expanded);
const selectHighlightedKpiWidgetRef = createSelector(selectSelf, (state) => state.kpiAlerts.highlightedWidgetRef);
const selectOpenedKpiWidgetRef = createSelector(selectSelf, (state) => { var _a; return (_a = state.kpiAlerts.openedWidgetRef) !== null && _a !== void 0 ? _a : undefined; });
/**
 * @alpha
 */
export const selectIsKpiAlertOpenedByWidgetRef = createMemoizedSelector((ref) => {
    return createSelector(selectWidgetsMap, selectOpenedKpiWidgetRef, (widgets, openedWidgetRef) => {
        if (!ref) {
            return false;
        }
        const openedWidget = openedWidgetRef && widgets.get(openedWidgetRef);
        if (!openedWidget) {
            return false;
        }
        const targetWidget = widgets.get(ref);
        if (!targetWidget) {
            return false;
        }
        return targetWidget.identifier === openedWidget.identifier;
    });
});
/**
 * @alpha
 */
export const selectIsKpiAlertHighlightedByWidgetRef = createMemoizedSelector((ref) => {
    return createSelector(selectWidgetsMap, selectHighlightedKpiWidgetRef, (widgets, highlightedWidgetRef) => {
        if (!ref) {
            return false;
        }
        const highlightedWidget = highlightedWidgetRef && widgets.get(highlightedWidgetRef);
        if (!highlightedWidget) {
            return false;
        }
        const targetWidget = widgets.get(ref);
        if (!targetWidget) {
            return false;
        }
        return targetWidget.identifier === highlightedWidget.identifier;
    });
});
/**
 * @alpha
 */
export const selectMenuButtonItemsVisibility = createSelector(selectSelf, (state) => { var _a; return (_a = state.menuButton.itemsVisibility) !== null && _a !== void 0 ? _a : {}; });
/**
 * @internal
 */
export const selectSelectedWidgetRef = createSelector(selectSelf, (state) => state.selectedWidgetRef);
/**
 * @internal
 */
export const selectConfigurationPanelOpened = createSelector(selectSelf, (state) => state.configurationPanelOpened);
/**
 * @internal
 */
export const selectWidgetDateDatasetAutoSelect = createSelector(selectSelf, (state) => state.widgetDateDatasetAutoSelect);
/**
 * @internal
 */
export const selectInsightListLastUpdateRequested = createSelector(selectSelf, (state) => state.insightListLastUpdateRequested);
const selectWidgetsLoadingAdditionalData = createSelector(selectSelf, (state) => state.widgetsLoadingAdditionalData);
/**
 * @internal
 */
export const selectIsWidgetLoadingAdditionalDataByWidgetRef = createMemoizedSelector((ref) => createSelector(selectWidgetsLoadingAdditionalData, (widgetsLoading) => {
    return widgetsLoading.some((loadingRef) => areObjRefsEqual(loadingRef, ref));
}));
/**
 * @alpha
 */
export const selectIsFilterAttributeSelectionOpen = createSelector(selectSelf, (state) => state.filterAttributeSelectionOpen);
/**
 * @alpha
 */
export const selectSelectedFilterIndex = createSelector(selectSelf, (state) => state.selectedFilterIndex);
/**
 * @internal
 */
export const selectIsDraggingWidget = createSelector(selectSelf, (state) => state.draggingWidgetSource !== undefined);
/**
 * @internal
 */
export const selectActiveSectionIndex = createSelector(selectSelf, (state) => state.activeSectionIndex);
/**
 * @internal
 */
export const selectInvalidDrillWidgetRefs = createSelector(selectSelf, (state) => state.drillValidationMessages.invalidDrillWidgetRefs);
const selectInvalidCustomUrlDrillParameterWidgets = createSelector(selectSelf, (state) => state.drillValidationMessages.invalidCustomUrlDrillParameterWidgets);
/**
 * @internal
 */
export const selectInvalidUrlDrillParameterWidgetRefs = createSelector(selectInvalidCustomUrlDrillParameterWidgets, (invalidCustomUrlDrillParameterWidgets) => invalidCustomUrlDrillParameterWidgets.map((i) => i.widgetRef));
/**
 * @internal
 */
export const selectInvalidUrlDrillParameterWidgetWarnings = createSelector(selectInvalidCustomUrlDrillParameterWidgets, (invalidCustomUrlDrillParameterWidgets) => invalidCustomUrlDrillParameterWidgets.filter((item) => item.showMessage).map((i) => i.widgetRef));
const selectInvalidUrlDrillParameterWidgetsMap = createSelector(selectInvalidCustomUrlDrillParameterWidgets, (invalidCustomUrlDrillParameterWidgets) => new ObjRefMap({
    idExtract: (i) => i.widgetId,
    refExtract: (i) => i.widgetRef,
    uriExtract: (i) => i.widgetUri,
    strictTypeCheck: false,
}).fromItems(invalidCustomUrlDrillParameterWidgets));
/**
 * @internal
 */
export const selectInvalidUrlDrillParameterDrillLocalIdsByWidgetRef = createMemoizedSelector((ref) => createSelector(selectInvalidUrlDrillParameterWidgetsMap, (invalidParameterWidgetsMap) => { var _a, _b; return (_b = (_a = invalidParameterWidgetsMap.get(ref)) === null || _a === void 0 ? void 0 : _a.drillsWithInvalidParametersLocalIds) !== null && _b !== void 0 ? _b : []; }));
/**
 * @internal
 */
export const selectDraggingWidgetSource = createSelector(selectSelf, (state) => state.draggingWidgetSource);
/**
 * @internal
 */
export const selectDraggingWidgetTarget = createSelector(selectSelf, (state) => state.draggingWidgetTarget);
/**
 * @internal
 */
export const selectWidgetsOverlay = createSelector(selectSelf, (state) => state.widgetsOverlay);
/**
 * @internal
 */
export const selectWidgetsOverlayState = createMemoizedSelector((refs) => createSelector(selectWidgetsOverlay, (overlay) => {
    return refs.every((ref) => {
        var _a, _b;
        return (_b = (ref && ((_a = overlay[objRefToString(ref)]) === null || _a === void 0 ? void 0 : _a.showOverlay))) !== null && _b !== void 0 ? _b : false;
    });
}));
/**
 * @internal
 */
export const selectWidgetsModification = createMemoizedSelector((refs) => createSelector(selectWidgetsOverlay, (overlay) => {
    return refs.reduce((modification, ref) => {
        const item = ref && overlay[objRefToString(ref)];
        if (item === null || item === void 0 ? void 0 : item.modification) {
            return union(modification, [item.modification]);
        }
        return modification;
    }, []);
}));
/**
 * @internal
 */
export const selectSectionModification = createMemoizedSelector((refs) => createSelector(selectWidgetsOverlay, (overlay) => {
    const modifications = refs.map((ref) => {
        const item = ref && overlay[objRefToString(ref)];
        return item === null || item === void 0 ? void 0 : item.modification;
    });
    const inserted = filter(modifications, (a) => a === "insertedByPlugin");
    const modified = filter(modifications, (a) => a === "modifiedByPlugin");
    return [
        ...(inserted.length === refs.length ? ["insertedByPlugin"] : []),
        ...(modified.length === refs.length ? ["modifiedByPlugin"] : []),
    ];
}));
/**
 * @internal
 */
export const selectIsSectionInsertedByPlugin = createMemoizedSelector((refs) => createSelector(selectSectionModification(refs), 
// When all the widgets in the section were inserted by the plugin,
// the section was added by the plugin as well (empty section(s) cannot be added)
(modifications) => modifications.length > 0 && modifications.every((m) => m === "insertedByPlugin")));
//# sourceMappingURL=uiSelectors.js.map