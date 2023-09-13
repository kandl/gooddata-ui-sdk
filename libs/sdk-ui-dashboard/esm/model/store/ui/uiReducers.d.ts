import { Action, AnyAction, CaseReducer } from "@reduxjs/toolkit";
import { IDrillToCustomUrl, ObjRef, IInsightWidget } from "@gooddata/sdk-model";
import { UiState } from "./uiState.js";
import { ILayoutCoordinates, IMenuButtonItemsVisibility } from "../../../types.js";
import { DraggableLayoutItem } from "../../../presentation/dragAndDrop/types.js";
import { IDashboardWidgetOverlay } from "../../types/commonTypes.js";
type UiReducer<A extends Action = AnyAction> = CaseReducer<UiState, A>;
type ToggleWidgetsOverlay = {
    refs: (ObjRef | undefined)[];
    visible: boolean;
};
export declare const uiReducers: {
    openScheduleEmailDialog: UiReducer<AnyAction>;
    closeScheduleEmailDialog: UiReducer<AnyAction>;
    setScheduleEmailDialogDefaultAttachment: UiReducer<{
        payload: ObjRef;
        type: string;
    }>;
    resetScheduleEmailDialogDefaultAttachment: UiReducer<AnyAction>;
    openScheduleEmailManagementDialog: UiReducer<AnyAction>;
    closeScheduleEmailManagementDialog: UiReducer<AnyAction>;
    openSaveAsDialog: UiReducer<AnyAction>;
    closeSaveAsDialog: UiReducer<AnyAction>;
    setFilterBarExpanded: UiReducer<{
        payload: boolean;
        type: string;
    }>;
    closeKpiAlertDialog: UiReducer<AnyAction>;
    openKpiAlertDialog: UiReducer<{
        payload: ObjRef;
        type: string;
    }>;
    highlightKpiAlert: UiReducer<{
        payload: ObjRef;
        type: string;
    }>;
    openShareDialog: UiReducer<AnyAction>;
    closeShareDialog: UiReducer<AnyAction>;
    openDeleteDialog: UiReducer<AnyAction>;
    closeDeleteDialog: UiReducer<AnyAction>;
    openKpiDeleteDialog: UiReducer<{
        payload: ILayoutCoordinates;
        type: string;
    }>;
    closeKpiDeleteDialog: UiReducer<AnyAction>;
    setMenuButtonItemsVisibility: UiReducer<{
        payload: IMenuButtonItemsVisibility;
        type: string;
    }>;
    selectWidget: UiReducer<{
        payload: ObjRef;
        type: string;
    }>;
    clearWidgetSelection: UiReducer<AnyAction>;
    setConfigurationPanelOpened: UiReducer<{
        payload: boolean;
        type: string;
    }>;
    setWidgetDateDatasetAutoSelect: UiReducer<{
        payload: boolean;
        type: string;
    }>;
    requestInsightListUpdate: UiReducer<AnyAction>;
    setWidgetLoadingAdditionalDataStarted: UiReducer<{
        payload: ObjRef;
        type: string;
    }>;
    setWidgetLoadingAdditionalDataStopped: UiReducer<{
        payload: ObjRef;
        type: string;
    }>;
    setFilterAttributeSelectionOpen: UiReducer<{
        payload: boolean;
        type: string;
    }>;
    selectFilterIndex: UiReducer<{
        payload: number;
        type: string;
    }>;
    clearFilterIndexSelection: UiReducer<AnyAction>;
    setActiveSectionIndex: UiReducer<{
        payload: number;
        type: string;
    }>;
    clearActiveSectionIndex: UiReducer<AnyAction>;
    openCancelEditModeDialog: UiReducer<AnyAction>;
    closeCancelEditModeDialog: UiReducer<AnyAction>;
    resetInvalidDrillWidgetRefs: UiReducer<AnyAction>;
    resetAllInvalidCustomUrlDrillParameterWidgets: UiReducer<AnyAction>;
    resetAllInvalidCustomUrlDrillParameterWidgetsWarnings: UiReducer<AnyAction>;
    addInvalidDrillWidgetRefs: UiReducer<{
        payload: ObjRef[];
        type: string;
    }>;
    setInvalidCustomUrlDrillParameterWidgets: UiReducer<{
        payload: {
            widget: IInsightWidget;
            invalidDrills: IDrillToCustomUrl[];
        }[];
        type: string;
    }>;
    removeInvalidDrillWidgetRefs: UiReducer<{
        payload: ObjRef[];
        type: string;
    }>;
    resetInvalidCustomUrlDrillParameterWidget: UiReducer<{
        payload: IInsightWidget[];
        type: string;
    }>;
    setDraggingWidgetSource: UiReducer<{
        payload: DraggableLayoutItem;
        type: string;
    }>;
    clearDraggingWidgetSource: UiReducer<{
        payload: void;
        type: string;
    }>;
    setDraggingWidgetTarget: UiReducer<{
        payload: ILayoutCoordinates;
        type: string;
    }>;
    clearDraggingWidgetTarget: UiReducer<{
        payload: void;
        type: string;
    }>;
    toggleWidgetsOverlay: UiReducer<{
        payload: ToggleWidgetsOverlay;
        type: string;
    }>;
    setWidgetsOverlay: UiReducer<{
        payload: Record<string, IDashboardWidgetOverlay>;
        type: string;
    }>;
    hideAllWidgetsOverlay: UiReducer<AnyAction>;
};
export {};
