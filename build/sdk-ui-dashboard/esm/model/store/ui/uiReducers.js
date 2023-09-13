import { areObjRefsEqual, objRefToString, widgetId, widgetRef, widgetUri, } from "@gooddata/sdk-model";
import { getDrillOriginLocalIdentifier } from "../../../_staging/drills/drillingUtils.js";
const openScheduleEmailDialog = (state) => {
    state.scheduleEmailDialog.open = true;
};
const closeScheduleEmailDialog = (state) => {
    state.scheduleEmailDialog.open = false;
};
const setScheduleEmailDialogDefaultAttachment = (state, action) => {
    state.scheduleEmailDialog.defaultAttachmentRef = action.payload;
};
const resetScheduleEmailDialogDefaultAttachment = (state) => {
    state.scheduleEmailDialog.defaultAttachmentRef = undefined;
};
const openScheduleEmailManagementDialog = (state) => {
    state.scheduleEmailManagementDialog.open = true;
};
const closeScheduleEmailManagementDialog = (state) => {
    state.scheduleEmailManagementDialog.open = false;
};
const openSaveAsDialog = (state) => {
    state.saveAsDialog.open = true;
};
const closeSaveAsDialog = (state) => {
    state.saveAsDialog.open = false;
};
const openShareDialog = (state) => {
    state.shareDialog.open = true;
};
const closeShareDialog = (state) => {
    state.shareDialog.open = false;
};
const openDeleteDialog = (state) => {
    state.deleteDialog.open = true;
};
const closeDeleteDialog = (state) => {
    state.deleteDialog.open = false;
};
const openKpiDeleteDialog = (state, action) => {
    state.kpiDeleteDialog.widgetCoordinates = action.payload;
};
const closeKpiDeleteDialog = (state) => {
    state.kpiDeleteDialog.widgetCoordinates = undefined;
};
const setFilterBarExpanded = (state, action) => {
    state.filterBar.expanded = action.payload;
};
const openKpiAlertDialog = (state, action) => {
    state.kpiAlerts.openedWidgetRef = action.payload;
};
const closeKpiAlertDialog = (state) => {
    state.kpiAlerts.openedWidgetRef = undefined;
};
const openCancelEditModeDialog = (state) => {
    state.cancelEditModeDialog.open = true;
};
const closeCancelEditModeDialog = (state) => {
    state.cancelEditModeDialog.open = false;
};
const highlightKpiAlert = (state, action) => {
    state.kpiAlerts.highlightedWidgetRef = action.payload;
};
const setMenuButtonItemsVisibility = (state, action) => {
    state.menuButton.itemsVisibility = action.payload;
};
const selectWidget = (state, action) => {
    state.selectedWidgetRef = action.payload;
};
const clearWidgetSelection = (state) => {
    state.selectedWidgetRef = undefined;
};
const setConfigurationPanelOpened = (state, action) => {
    state.configurationPanelOpened = action.payload;
};
const setWidgetDateDatasetAutoSelect = (state, action) => {
    state.widgetDateDatasetAutoSelect = action.payload;
};
const requestInsightListUpdate = (state) => {
    state.insightListLastUpdateRequested = +new Date();
};
const setWidgetLoadingAdditionalDataStarted = (state, action) => {
    state.widgetsLoadingAdditionalData.push(action.payload);
};
const setWidgetLoadingAdditionalDataStopped = (state, action) => {
    state.widgetsLoadingAdditionalData = state.widgetsLoadingAdditionalData.filter((item) => !areObjRefsEqual(item, action.payload));
};
const setFilterAttributeSelectionOpen = (state, action) => {
    state.filterAttributeSelectionOpen = action.payload;
};
const selectFilterIndex = (state, action) => {
    state.selectedFilterIndex = action.payload;
};
const clearFilterIndexSelection = (state) => {
    state.selectedFilterIndex = undefined;
};
const setActiveSectionIndex = (state, action) => {
    state.activeSectionIndex = action.payload;
};
const clearActiveSectionIndex = (state) => {
    state.activeSectionIndex = undefined;
};
const resetInvalidDrillWidgetRefs = (state) => {
    state.drillValidationMessages.invalidDrillWidgetRefs = [];
};
const resetAllInvalidCustomUrlDrillParameterWidgets = (state) => {
    state.drillValidationMessages.invalidCustomUrlDrillParameterWidgets = [];
};
const resetAllInvalidCustomUrlDrillParameterWidgetsWarnings = (state) => {
    state.drillValidationMessages.invalidCustomUrlDrillParameterWidgets =
        state.drillValidationMessages.invalidCustomUrlDrillParameterWidgets.map((item) => {
            return Object.assign(Object.assign({}, item), { showMessage: false });
        });
};
const addInvalidDrillWidgetRefs = (state, action) => {
    action.payload.forEach((toAdd) => {
        if (!state.drillValidationMessages.invalidDrillWidgetRefs.some((existing) => areObjRefsEqual(existing, toAdd))) {
            state.drillValidationMessages.invalidDrillWidgetRefs.push(toAdd);
        }
    });
};
const setInvalidCustomUrlDrillParameterWidgets = (state, action) => {
    action.payload.forEach((item) => {
        const existingIndex = state.drillValidationMessages.invalidCustomUrlDrillParameterWidgets.findIndex((i) => i.widgetId === widgetId(item.widget));
        const itemToStore = {
            drillsWithInvalidParametersLocalIds: item.invalidDrills.map(getDrillOriginLocalIdentifier),
            widgetId: widgetId(item.widget),
            widgetRef: widgetRef(item.widget),
            widgetUri: widgetUri(item.widget),
            showMessage: true,
        };
        if (existingIndex >= 0) {
            state.drillValidationMessages.invalidCustomUrlDrillParameterWidgets[existingIndex] = itemToStore;
        }
        else {
            state.drillValidationMessages.invalidCustomUrlDrillParameterWidgets.push(itemToStore);
        }
    });
};
const resetInvalidCustomUrlDrillParameterWidget = (state, action) => {
    action.payload.forEach((widget) => {
        const existingIndex = state.drillValidationMessages.invalidCustomUrlDrillParameterWidgets.findIndex((i) => i.widgetId === widgetId(widget));
        if (existingIndex >= 0) {
            state.drillValidationMessages.invalidCustomUrlDrillParameterWidgets.splice(existingIndex, 1);
        }
    });
};
const removeInvalidDrillWidgetRefs = (state, action) => {
    state.drillValidationMessages.invalidDrillWidgetRefs =
        state.drillValidationMessages.invalidDrillWidgetRefs.filter((existing) => !action.payload.some((toRemove) => areObjRefsEqual(toRemove, existing)));
};
const setDraggingWidgetSource = (state, action) => {
    state.draggingWidgetSource = action.payload;
};
const clearDraggingWidgetSource = (state) => {
    state.draggingWidgetSource = undefined;
};
const setDraggingWidgetTarget = (state, action) => {
    state.draggingWidgetTarget = action.payload;
    state.activeSectionIndex = action.payload.sectionIndex;
};
const clearDraggingWidgetTarget = (state) => {
    state.draggingWidgetTarget = undefined;
    state.activeSectionIndex = undefined;
};
const setWidgetsOverlay = (state, action) => {
    state.widgetsOverlay = action.payload;
};
const toggleWidgetsOverlay = (state, action) => {
    const { visible, refs } = action.payload;
    refs.forEach((ref) => {
        if (!ref) {
            return;
        }
        const refId = objRefToString(ref);
        const overlay = (state.widgetsOverlay[refId] = state.widgetsOverlay[refId] || {
            showOverlay: visible,
        });
        overlay.showOverlay = visible;
    });
};
const hideAllWidgetsOverlay = (state) => {
    state.widgetsOverlay = Object.keys(state.widgetsOverlay).reduce((prev, key) => {
        return Object.assign(Object.assign({}, prev), { [key]: Object.assign(Object.assign({}, state.widgetsOverlay[key]), { showOverlay: false }) });
    }, {});
};
export const uiReducers = {
    openScheduleEmailDialog,
    closeScheduleEmailDialog,
    setScheduleEmailDialogDefaultAttachment,
    resetScheduleEmailDialogDefaultAttachment,
    openScheduleEmailManagementDialog,
    closeScheduleEmailManagementDialog,
    openSaveAsDialog,
    closeSaveAsDialog,
    setFilterBarExpanded,
    closeKpiAlertDialog,
    openKpiAlertDialog,
    highlightKpiAlert,
    openShareDialog,
    closeShareDialog,
    openDeleteDialog,
    closeDeleteDialog,
    openKpiDeleteDialog,
    closeKpiDeleteDialog,
    setMenuButtonItemsVisibility,
    selectWidget,
    clearWidgetSelection,
    setConfigurationPanelOpened,
    setWidgetDateDatasetAutoSelect,
    requestInsightListUpdate,
    setWidgetLoadingAdditionalDataStarted,
    setWidgetLoadingAdditionalDataStopped,
    setFilterAttributeSelectionOpen,
    selectFilterIndex,
    clearFilterIndexSelection,
    setActiveSectionIndex,
    clearActiveSectionIndex,
    openCancelEditModeDialog,
    closeCancelEditModeDialog,
    resetInvalidDrillWidgetRefs,
    resetAllInvalidCustomUrlDrillParameterWidgets,
    resetAllInvalidCustomUrlDrillParameterWidgetsWarnings,
    addInvalidDrillWidgetRefs,
    setInvalidCustomUrlDrillParameterWidgets,
    removeInvalidDrillWidgetRefs,
    resetInvalidCustomUrlDrillParameterWidget,
    setDraggingWidgetSource,
    clearDraggingWidgetSource,
    setDraggingWidgetTarget,
    clearDraggingWidgetTarget,
    toggleWidgetsOverlay,
    setWidgetsOverlay,
    hideAllWidgetsOverlay,
};
//# sourceMappingURL=uiReducers.js.map