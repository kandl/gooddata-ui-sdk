// (C) 2020-2022 GoodData Corporation
import isObject from "lodash/isObject.js";
import { isCommandFailedData, getEventType, } from "./common.js";
/**
 * All AD command Types
 *
 * @public
 */
export var GdcAdCommandType;
(function (GdcAdCommandType) {
    /**
     * The command set drillable items
     */
    GdcAdCommandType["DrillableItems"] = "drillableItems";
    /**
     * The command open an insight
     */
    GdcAdCommandType["OpenInsight"] = "openInsight";
    /**
     * The command save an insight
     */
    GdcAdCommandType["Save"] = "saveInsight";
    /**
     * The command save the insight as a new one
     */
    GdcAdCommandType["SaveAs"] = "saveAsInsight";
    /**
     * The command export an insight
     */
    GdcAdCommandType["Export"] = "exportInsight";
    /**
     * The command reset the insight editor to empty state
     */
    GdcAdCommandType["Clear"] = "clear";
    /**
     * The command empties insight buckets and filters but keeps title and ID in the URL
     */
    GdcAdCommandType["ClearInsight"] = "clearInsight";
    /**
     * The command undo to previous state
     */
    GdcAdCommandType["Undo"] = "undo";
    /**
     * The command redo to next state
     */
    GdcAdCommandType["Redo"] = "redo";
    /**
     * The command to add or update filter context
     */
    GdcAdCommandType["SetFilterContext"] = "setFilterContext";
    /**
     * The command to remove filter item from current filter context
     */
    GdcAdCommandType["RemoveFilterContext"] = "removeFilterContext";
    /**
     * The command to request cancellation
     */
    GdcAdCommandType["RequestCancellation"] = "requestCancellation";
    /**
     * The command to set API token
     */
    GdcAdCommandType["SetApiToken"] = "setApiToken";
})(GdcAdCommandType = GdcAdCommandType || (GdcAdCommandType = {}));
/**
 * All event types on AD
 *
 * @public
 */
export var GdcAdEventType;
(function (GdcAdEventType) {
    /**
     * Type represent that AD is listening for drillable items command.
     */
    GdcAdEventType["ListeningForDrillableItems"] = "listeningForDrillableItems";
    /**
     * Type represent that a new insight is initialized
     */
    GdcAdEventType["NewInsightInitialized"] = "newInsightInitialized";
    /**
     * Type represent that the insight is opened
     */
    GdcAdEventType["InsightOpened"] = "insightOpened";
    /**
     * Type represent that the insight is rendered
     */
    GdcAdEventType["InsightRendered"] = "insightRendered";
    /**
     * Type represent that the insight editor is cleared
     */
    GdcAdEventType["ClearFinished"] = "clearFinished";
    /**
     * Type represent that the insight is cleared
     */
    GdcAdEventType["ClearInsightFinished"] = "clearInsightFinished";
    /**
     * Type represent that the insight is saved
     *
     * Note: use `visualizationSaved` because of backward compatibility
     * See visualizationSaved event on https://help.gooddata.com
     */
    GdcAdEventType["InsightSaved"] = "visualizationSaved";
    /**
     * Type represent that the undo action is finished
     */
    GdcAdEventType["UndoFinished"] = "undoFinished";
    /**
     * Type represent that the redo action is finished
     */
    GdcAdEventType["RedoFinished"] = "redoFinished";
    /**
     * Type represent that the export action is finished
     */
    GdcAdEventType["ExportFinished"] = "exportInsightFinished";
    /**
     * Type that drill performed
     */
    GdcAdEventType["Drill"] = "drill";
    /**
     * Type represent that the filter context is changed
     */
    GdcAdEventType["FilterContextChanged"] = "filterContextChanged";
    /**
     * Type represent that the set filter context action is finished
     */
    GdcAdEventType["SetFilterContextFinished"] = "setFilterContextFinished";
    /**
     * Type represent that the remove filter context action is finished
     */
    GdcAdEventType["RemoveFilterContextFinished"] = "removeFilterContextFinished";
    /**
     * Type notify AD that the insight editing has been cancelled
     */
    GdcAdEventType["InsightEditingCancelled"] = "insightEditingCancelled";
    /**
     * Type to notify AD that the insight has been changed and execution started. It contains new insight definition.
     */
    GdcAdEventType["InsightChanged"] = "insightChanged";
    /**
     * Type represents that AD is listening and waiting for API token to set up SDK backend instance.
     * AD will not continue with initialization until the token is set.
     */
    GdcAdEventType["ListeningForApiToken"] = "listeningForApiToken";
    /**
     * Type notifies embedding application that API token is about to expire and a new API token
     * must be set via "setApiToken" command, otherwise session will expire soon (how soon depends on
     * the reminder settings, by default in 60 seconds, can be changed by optional parameter with
     * "setApiToken" was called the last time).
     */
    GdcAdEventType["ApiTokenIsAboutToExpire"] = "apiTokenIsAboutToExpire";
})(GdcAdEventType = GdcAdEventType || (GdcAdEventType = {}));
/**
 * Type-guard checking whether an object is an instance of {@link AdCommandFailedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdCommandFailedData(obj) {
    return isCommandFailedData(obj);
}
/**
 * Type-guard checking whether an object is an instance of {@link AdDrillableItemsCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdDrillableItemsCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.DrillableItems;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdOpenInsightCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdOpenInsightCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.OpenInsight;
}
/**
 * Type-guard checking whether an object is an instance of  {@link AdClearCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdClearCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.Clear;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdClearInsightCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdClearInsightCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.ClearInsight;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdRequestCancellationCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdRequestCancellationCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.RequestCancellation;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdSaveInsightCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdSaveInsightCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.Save;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdSaveAsInsightCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdSaveAsInsightCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.SaveAs;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdExportInsightCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdExportInsightCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.Export;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdCommandFailed}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdUndoCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.Undo;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdRedoCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdRedoCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.Redo;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdSetFilterContextCommand}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdSetFilterContextCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.SetFilterContext;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdRemoveFilterContextCommand}  RemoveFilterContextCommand
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdRemoveFilterContextCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.RemoveFilterContext;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdNewInsightInitializedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdNewInsightInitializedData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdEventType.NewInsightInitialized;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdInsightOpenedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdInsightOpenedData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdEventType.InsightOpened;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdInsightRenderedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdInsightRenderedData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdEventType.InsightRendered;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdClearFinishedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdClearFinishedData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdEventType.ClearFinished;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdClearInsightFinishedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdClearInsightFinishedData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdEventType.ClearInsightFinished;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdInsightSavedData}
 *
 * @param obj - object to test
 * @public
 */
export function isAdInsightSavedData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdEventType.InsightSaved;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdExportFinishedData}
 *
 * @param obj - object to test
 * @public
 */
export function isAdExportFinishedData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdEventType.ExportFinished;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdUndoFinishedData}
 *
 * @param obj - object to test
 * @public
 */
export function isAdUndoFinishedData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdEventType.UndoFinished;
}
/**
 * Type-guard checking whether an object is an instance of  {@link AdRedoFinishedData}
 *
 * @param obj - object to test
 * @public
 */
export function isAdRedoFinishedData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdEventType.RedoFinished;
}
/**
 * Type-guard checking whether an object is an instance of {@link AdSetApiTokenCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export function isAdSetApiTokenCommandData(obj) {
    return isObject(obj) && getEventType(obj) === GdcAdCommandType.SetApiToken;
}
//# sourceMappingURL=EmbeddedAnalyticalDesigner.js.map