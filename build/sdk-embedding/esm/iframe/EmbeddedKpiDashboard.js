// (C) 2020-2023 GoodData Corporation
import isObject from "lodash/isObject.js";
import { getEventType, } from "./common.js";
/**
 * All KD command Types.
 *
 * @public
 */
export var GdcKdCommandType;
(function (GdcKdCommandType) {
    /**
     * The command save a dashboard.
     */
    GdcKdCommandType["Save"] = "saveDashboard";
    /**
     * The command cancel editing dashboard.
     */
    GdcKdCommandType["CancelEdit"] = "cancelEdit";
    /**
     * The command delete existed dashboard.
     */
    GdcKdCommandType["Delete"] = "deleteDashboard";
    /**
     * The command edit a dashboard.
     */
    GdcKdCommandType["SwitchToEdit"] = "switchToEdit";
    /**
     * The command set drillable items.
     */
    GdcKdCommandType["DrillableItems"] = "drillableItems";
    /**
     * The command set size of dashboard.
     */
    GdcKdCommandType["SetSize"] = "setSize";
    /**
     * The command add widget to dashboard.
     */
    GdcKdCommandType["AddWidget"] = "addWidget";
    /**
     * The command add filter to dashboard.
     */
    GdcKdCommandType["AddFilter"] = "addFilter";
    /**
     * The command export a dashboard.
     */
    GdcKdCommandType["ExportToPdf"] = "exportToPdf";
    /**
     * The command to add or update filter context
     */
    GdcKdCommandType["SetFilterContext"] = "setFilterContext";
    /**
     * The command to remove filter item from current filter context
     */
    GdcKdCommandType["RemoveFilterContext"] = "removeFilterContext";
    /**
     * The command to duplicate a KPI Dashboard
     */
    GdcKdCommandType["SaveAsDashboard"] = "saveAsDashboard";
    /**
     * The command to open schedule email dialog
     */
    GdcKdCommandType["OpenScheduleEmailDialog"] = "openScheduleEmailDialog";
    /**
     * The command to set attribute filter parents
     */
    GdcKdCommandType["SetFilterParents"] = "setFilterParents";
    /**
     * The command open delete existed dashboard dialog
     */
    GdcKdCommandType["OpenDeleteDashboardDialog"] = "openDeleteDashboardDialog";
    /**
     * The command to set API token
     */
    GdcKdCommandType["SetApiToken"] = "setApiToken";
})(GdcKdCommandType = GdcKdCommandType || (GdcKdCommandType = {}));
/**
 * All KD event types.
 *
 * @public
 */
export var GdcKdEventType;
(function (GdcKdEventType) {
    /**
     * Type represent that the dashboard listening for drilling event.
     */
    GdcKdEventType["ListeningForDrillableItems"] = "listeningForDrillableItems";
    /**
     * Type represent that the embedded content starts loading.
     */
    GdcKdEventType["LoadingStarted"] = "loadingStarted";
    /**
     * Type represent that The user does not have permissions to view or edit the content.
     */
    GdcKdEventType["NoPermissions"] = "noPermissions";
    /**
     * Type represent that an operation increasing the height of the hosting iframe is performed.
     */
    GdcKdEventType["Resized"] = "resized";
    /**
     * Type represent that the dashboard has been created and saved.
     */
    GdcKdEventType["DashboardCreated"] = "dashboardCreated";
    /**
     * Type represent that the content is fully loaded,
     * and the user has permissions to access the dashboard.
     */
    GdcKdEventType["DashboardLoaded"] = "loaded";
    /**
     * Type represent that the existing dashboard has been updated.
     */
    GdcKdEventType["DashboardUpdated"] = "dashboardUpdated";
    /**
     * Type represent that the dashboard is saved.
     *
     */
    GdcKdEventType["DashboardSaved"] = "dashboardSaved";
    /**
     * Type represent that the dashboard is deleted.
     *
     */
    GdcKdEventType["DashboardDeleted"] = "dashboardDeleted";
    /**
     * Type represent that the user cancels the creation of the dashboard.
     */
    GdcKdEventType["DashboardCreationCanceled"] = "dashboardCreationCanceled";
    /**
     * Type represent that the dashboard is switched to edit mode.
     */
    GdcKdEventType["SwitchedToEdit"] = "switchedToEdit";
    /**
     * Type represent that the dashboard is switched to view mode.
     */
    GdcKdEventType["SwitchedToView"] = "switchedToView";
    /**
     * Type represent that the platform is down.
     */
    GdcKdEventType["Platform"] = "platform";
    /**
     * Type represent that the widget is added to dashboard.
     *
     */
    GdcKdEventType["WidgetAdded"] = "widgetAdded";
    /**
     * Type represent that the filter is added to dashboard.
     *
     */
    GdcKdEventType["FilterAdded"] = "filterAdded";
    /**
     * Type represent that the export action is finished.
     */
    GdcKdEventType["ExportedToPdf"] = "exportedToPdf";
    /**
     * Type represent that the drill performed
     */
    GdcKdEventType["Drill"] = "drill";
    /**
     * Type represent that the filter context is changed
     */
    GdcKdEventType["FilterContextChanged"] = "filterContextChanged";
    /**
     * Type represent that the set filter context action is finished
     */
    GdcKdEventType["SetFilterContextFinished"] = "setFilterContextFinished";
    /**
     * Type represent that the remove filter context action is finished
     */
    GdcKdEventType["RemoveFilterContextFinished"] = "removeFilterContextFinished";
    /**
     * Type that represents started drill to URL. The event does not contain an URL. The event can be used as
     * notification to display a loading indicator as the URL resolving takes some time. The URL is sent in
     * DrillToUrlResolved event which is posted after the URL is resolved. The event also contains an ID that can
     * be matched with ID in subsequently posted DrillToUrlResolved event.
     */
    GdcKdEventType["DrillToUrlStarted"] = "drillToUrlStarted";
    /**
     * Type that represents resolved drill to URL. The event is sent after DrillToUrlStarted event was posted and
     * it contains the resolved URL. The event also contains an ID which can be matched with ID from
     * DrillToUrlStarted event.
     */
    GdcKdEventType["DrillToUrlResolved"] = "drillToUrlResolved";
    /**
     * Type represent that the schedule email dialog is opened.
     */
    GdcKdEventType["ScheduleEmailDialogOpened"] = "scheduleEmailDialogOpened";
    /**
     * The event that is emitted once setFilterParents command is successful
     */
    GdcKdEventType["SetFilterParentsFinished"] = "setFilterParentsFinished";
    /**
     * The event that is emitted if setFilterParents command is not successful it contains `SetFilterParentsErrorCode`
     */
    GdcKdEventType["SetFilterParentsFailed"] = "setFilterParentsFailed";
    /**
     * Type represent that the delete dashboard dialog is opened
     */
    GdcKdEventType["DeleteDashboardDialogOpened"] = "deleteDashboardDialogOpened";
    /**
     * Type represent that the insight was saved.
     */
    GdcKdEventType["InsightSaved"] = "visualizationSaved";
    /**
     * Type represents that KD is listening and waiting for API token to set up SDK backend instance.
     * KD will not continue with initialization until the token is set.
     */
    GdcKdEventType["ListeningForApiToken"] = "listeningForApiToken";
    /**
     * Type notifies embedding application that API token is about to expire and a new API token
     * must be set via "setApiToken" command, otherwise session will expire soon (how soon depends on
     * the reminder settings, by default in 60 seconds, can be changed by optional parameter with
     * "setApiToken" was called the last time).
     */
    GdcKdEventType["ApiTokenIsAboutToExpire"] = "apiTokenIsAboutToExpire";
})(GdcKdEventType = GdcKdEventType || (GdcKdEventType = {}));
/**
 * Type-guard checking whether object is an instance of {@link KdSaveDashboardCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export function isKdSaveDashboardCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.Save;
}
/**
 * Type-guard checking whether object is an instance of {@link KdSaveAsDashboardCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export function isKdSaveAsDashboardCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.SaveAsDashboard;
}
/**
 * Type-guard checking whether object is an instance of {@link KdCancelEditCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export function isKdCancelEditCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.CancelEdit;
}
/**
 * Type-guard checking whether object is an instance of {@link KdSwitchToEditCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export function isKdSwitchToEditCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.SwitchToEdit;
}
/**
 * Type-guard checking whether object is an instance of {@link KdDrillableItemsCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export function isKdDrillableItemsCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.DrillableItems;
}
/**
 * Type-guard checking whether object is an instance of {@link KdSetSizeCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export function isKdSetSizeCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.SetSize;
}
/**
 * Type-guard checking whether an object is an instance of {@link KdSetFilterContextCommand}
 *
 * @param obj - object to test
 * @public
 */
export function isKdSetFilterContextCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.SetFilterContext;
}
/**
 * Type-guard checking whether an object is an instance of {@link KdRemoveFilterContextCommand}
 *
 * @param obj - object to test
 * @public
 */
export function isKdRemoveFilterContextCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.RemoveFilterContext;
}
/**
 * Type-guard checking whether object is an instance of {@link IKdIdentifierInsightRef}.
 *
 * @param obj - object to test
 * @public
 */
export function isKdIdentifierInsight(obj) {
    return obj.identifier !== undefined;
}
/**
 * Type-guard checking whether object is an instance of {@link IKdUriInsightRef}.
 *
 * @param obj - object to test
 * @public
 */
export function isKdUriInsight(obj) {
    return obj.uri !== undefined;
}
/**
 * Type-guard checking whether object is an instance of {@link KdAddWidgetCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export function isKdAddWidgetCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.AddWidget;
}
/**
 * Type-guard checking whether object is an instance of {@link KdAddFilterCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export function isKdAddFilterCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.AddFilter;
}
/**
 * Type-guard checking whether object is an instance of {@link KdExportToPdfCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export function isKdExportToPdfCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.ExportToPdf;
}
/**
 * Type-guard checking whether object is an instance of {@link KdOpenScheduleEmailDialogCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export function isKdOpenScheduleEmailDialogCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.OpenScheduleEmailDialog;
}
/**
 * Type-guard that checks if event in {@link KdSetFilterParentsCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isKdSetFilterParentsCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.SetFilterParents;
}
/**
 * Error type within AppCommandFailed event body when setFilterParents command is not successful
 *
 * @public
 */
export var KdSetFilterParentsErrorCode;
(function (KdSetFilterParentsErrorCode) {
    /**
     * Command data format is invalid e.g. missing properties or wrong types.
     */
    KdSetFilterParentsErrorCode["InvalidDataFormat"] = "invalidDataFormat";
    /**
     * Attribute filter display form has invalid ref, or display form does not exist in workspace.
     */
    KdSetFilterParentsErrorCode["InvalidAttributeFilterDisplayForm"] = "invalidAttributeFilterDisplayForm";
    /**
     * Parent filter display form has invalid ref or does not exist in workspace.
     */
    KdSetFilterParentsErrorCode["InvalidParentFilterDisplayForm"] = "invalidParentFilterDisplayForm";
    /**
     * Filter is not on a dashboard.
     */
    KdSetFilterParentsErrorCode["FilterNotFound"] = "filterNotFound";
    /**
     * Filter can not depend on itself.
     */
    KdSetFilterParentsErrorCode["CircularDependency"] = "circularDependency";
    /**
     * Connecting attribute is invalid, or does not exist in workspace.
     */
    KdSetFilterParentsErrorCode["InvalidConnectingAttribute"] = "invalidConnectingAttribute";
    /**
     * Connecting attribute is not shared between filter and parent.
     */
    KdSetFilterParentsErrorCode["IncompatibleConnectingAttribute"] = "incompatibleConnectingAttribute";
    /**
     * Multiple filters with same id in single command.
     */
    KdSetFilterParentsErrorCode["DuplicateFilters"] = "duplicateFilters";
    /**
     * Multiple parents with same id in single filter.
     */
    KdSetFilterParentsErrorCode["DuplicateParents"] = "duplicateParents";
})(KdSetFilterParentsErrorCode = KdSetFilterParentsErrorCode || (KdSetFilterParentsErrorCode = {}));
/**
 * Type-guard checking whether object is an instance of {@link KdOpenDeleteDashboardDialogCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export function isKdOpenDeleteDashboardDialogCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.OpenDeleteDashboardDialog;
}
/**
 * Type-guard checking whether an object is an instance of {@link KdSetApiTokenCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export function isKdSetApiTokenCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcKdCommandType.SetApiToken;
}
//# sourceMappingURL=EmbeddedKpiDashboard.js.map