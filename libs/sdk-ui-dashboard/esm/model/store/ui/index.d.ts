export declare const uiSliceReducer: import("@reduxjs/toolkit").Reducer<import("./uiState.js").UiState>;
/**
 * Actions to control ui state of the dashboard.
 *
 * @internal
 */
export declare const uiActions: import("@reduxjs/toolkit").CaseReducerActions<{
    openScheduleEmailDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    closeScheduleEmailDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setScheduleEmailDialogDefaultAttachment: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("@gooddata/sdk-model").ObjRef;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    resetScheduleEmailDialogDefaultAttachment: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    openScheduleEmailManagementDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    closeScheduleEmailManagementDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    openSaveAsDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    closeSaveAsDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setFilterBarExpanded: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: boolean;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    closeKpiAlertDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    openKpiAlertDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("@gooddata/sdk-model").ObjRef;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    highlightKpiAlert: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("@gooddata/sdk-model").ObjRef;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    openShareDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    closeShareDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    openDeleteDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    closeDeleteDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    openKpiDeleteDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("../../../types.js").ILayoutCoordinates;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    closeKpiDeleteDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setMenuButtonItemsVisibility: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("../../../types.js").IMenuButtonItemsVisibility;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    selectWidget: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("@gooddata/sdk-model").ObjRef;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    clearWidgetSelection: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setConfigurationPanelOpened: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: boolean;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setWidgetDateDatasetAutoSelect: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: boolean;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    requestInsightListUpdate: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setWidgetLoadingAdditionalDataStarted: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("@gooddata/sdk-model").ObjRef;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setWidgetLoadingAdditionalDataStopped: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("@gooddata/sdk-model").ObjRef;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setFilterAttributeSelectionOpen: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: boolean;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    selectFilterIndex: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: number;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    clearFilterIndexSelection: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setActiveSectionIndex: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: number;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    clearActiveSectionIndex: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    openCancelEditModeDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    closeCancelEditModeDialog: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    resetInvalidDrillWidgetRefs: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    resetAllInvalidCustomUrlDrillParameterWidgets: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    resetAllInvalidCustomUrlDrillParameterWidgetsWarnings: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    addInvalidDrillWidgetRefs: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("@gooddata/sdk-model").ObjRef[];
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setInvalidCustomUrlDrillParameterWidgets: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: {
            widget: import("@gooddata/sdk-model").IInsightWidget;
            invalidDrills: import("@gooddata/sdk-model").IDrillToCustomUrl[];
        }[];
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    removeInvalidDrillWidgetRefs: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("@gooddata/sdk-model").ObjRef[];
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    resetInvalidCustomUrlDrillParameterWidget: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("@gooddata/sdk-model").IInsightWidget[];
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setDraggingWidgetSource: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("../../../index.js").DraggableLayoutItem;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    clearDraggingWidgetSource: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: void;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setDraggingWidgetTarget: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: import("../../../types.js").ILayoutCoordinates;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    clearDraggingWidgetTarget: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: void;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    toggleWidgetsOverlay: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: {
            refs: (import("@gooddata/sdk-model").ObjRef | undefined)[];
            visible: boolean;
        };
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    setWidgetsOverlay: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: {
        payload: Record<string, import("../../index.js").IDashboardWidgetOverlay>;
        type: string;
    }) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
    hideAllWidgetsOverlay: (state: import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>, action: import("@reduxjs/toolkit").AnyAction) => void | import("./uiState.js").UiState | import("immer/dist/internal.js").WritableDraft<import("./uiState.js").UiState>;
}, "uiSlice">;
