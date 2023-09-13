/**
 * This package defines APIs for embedding and interfacing with the embedded GoodData applications - Analytical Designer and Dashboards/KPI Dashboards.
 *
 * @remarks
 * You can use this package to manipulate the embedded GoodData applications from your application by sending
 * commands to the embedded GoodData applications and receiving events from them.
 *
 * @packageDocumentation
 */

import { IBaseExportConfig } from '@gooddata/api-model-bear';
import { IInsightDefinition } from '@gooddata/sdk-model';
import { ILocalIdentifierQualifier as ILocalIdentifierQualifier_2 } from '@gooddata/api-model-bear';
import { isObjectUriQualifier as isObjectUriQualifier_2 } from '@gooddata/api-model-bear';
import { isObjIdentifierQualifier as isObjIdentifierQualifier_2 } from '@gooddata/api-model-bear';
import { IVisualization } from '@gooddata/api-model-bear';
import { ObjQualifier as ObjQualifier_2 } from '@gooddata/api-model-bear';
import { ObjRef } from '@gooddata/sdk-model';

/**
 * @public
 */
export declare type AbsoluteType = "absolute";

/**
 * Triggers the clear action to reset the insight editor to empty state
 *
 * @public
 */
export declare type AdClearCommand = IGdcAdMessageEvent<GdcAdCommandType.Clear, undefined>;

/**
 * Data type of clear command
 *
 * Note: it has empty content and just wrapped to application and product data structure
 *
 * @public
 */
export declare type AdClearCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.Clear, undefined>;

/**
 * This event is emitted when AD successfully performs clear operation.
 *
 * @public
 */
export declare type AdClearFinished = IGdcAdMessageEvent<GdcAdEventType.ClearFinished, IAdAvailableCommands>;

/**
 * Data type of event that was emitted after finish clear action
 *
 * Note: The main event data was wrapped to application and product data structure
 *
 * @public
 */
export declare type AdClearFinishedData = IGdcAdMessageEnvelope<GdcAdEventType.ClearFinished, IAdAvailableCommands>;

/**
 * Triggers the clearInsight action to reset the insight to empty state
 *
 * @public
 */
export declare type AdClearInsightCommand = IGdcAdMessageEvent<GdcAdCommandType.ClearInsight, undefined>;

/**
 * Data type of clearInsight command
 *
 * Note: it has empty content and just wrapped to application and product data structure
 *
 * @public
 */
export declare type AdClearInsightCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.ClearInsight, undefined>;

/**
 * This event is emitted when AD successfully performs clearInsight operation.
 *
 * @public
 */
export declare type AdClearInsightFinished = IGdcAdMessageEvent<GdcAdEventType.ClearInsightFinished, IAdAvailableCommands>;

/**
 * Data type of event that was emitted after finish clearInsight action
 *
 * Note: The main event data was wrapped to application and product data structure
 *
 * @public
 */
export declare type AdClearInsightFinishedData = IGdcAdMessageEnvelope<GdcAdEventType.ClearInsightFinished, IAdAvailableCommands>;

/**
 * This event will be emitted if AD runs into errors while processing the posted command.
 *
 * @remarks see {@link GdcErrorType} for types of errors that may fly
 * @public
 */
export declare type AdCommandFailed = CommandFailed<GdcProductName.ANALYTICAL_DESIGNER>;

/**
 * Base type for the data of error events sent by AD
 * in case command processing comes to an expected or unexpected halt.
 *
 * @public
 */
export declare type AdCommandFailedData = CommandFailedData<GdcProductName.ANALYTICAL_DESIGNER>;

/**
 * Set drillable items.
 *
 * Contract:
 *
 * - Drillable items can be set by uris or identifiers of insight's measures/attributes
 *
 * @public
 */
export declare type AdDrillableItemsCommand = IGdcAdMessageEvent<GdcAdCommandType.DrillableItems, IDrillableItemsCommandBody>;

/**
 * Data type of drillable items command
 *
 * Note: The main event data was wrapped to application and product data structure
 *
 * @remarks See {@link IDrillableItemsCommandBody}
 *
 * @public
 */
export declare type AdDrillableItemsCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.DrillableItems, IDrillableItemsCommandBody>;

/**
 * This event is emitted when AD successfully exports data visualized by the currently edited insight.
 * @public
 */
export declare type AdExportFinished = IGdcAdMessageEvent<GdcAdEventType.ExportFinished, AdExportFinishedBody>;

/**
 * Main data of {@link AdExportFinished} event
 * @public
 */
export declare type AdExportFinishedBody = IAdAvailableCommands & {
    /**
     * Link to the file containing exported data.
     */
    link: string;
};

/**
 * Data type of event that was emitted after an insight was exported
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See {@link AdExportFinishedBody}
 * @public
 */
export declare type AdExportFinishedData = IGdcAdMessageEnvelope<GdcAdEventType.ExportFinished, AdExportFinishedBody>;

/**
 * Exports current insight into CSV or XLSX. The export configuration matches that of the exportResult
 * function already available in `api-model-bear`. Please consult {@link @gooddata/api-model-bear#IBaseExportConfig} for more
 * detail about possible export configuration options.
 *
 * Contract:
 *
 * -  if the currently edited insight IS eligible for export then it is done and the ExportFinished event will be
 *    posted with `link` to the result.
 * -  if the currently edited insight IS NOT eligible for export (empty, in-error), then {@link AdCommandFailed} event
 *    will be posted.
 * -  if the specified export config is invalid / does not match validation rules, then {@link AdCommandFailed} event
 *    will be posted
 *
 * @public
 */
export declare type AdExportInsightCommand = IGdcAdMessageEvent<GdcAdCommandType.Export, IAdExportInsightCommandBody>;

/**
 * Data type of export insight command
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See {@link IAdExportInsightCommandBody}
 *
 * @public
 */
export declare type AdExportInsightCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.Export, IAdExportInsightCommandBody>;

/**
 * Main data of Filter context changed event
 * @public
 */
export declare type AdFilterContextChangedBody = IAdAvailableCommands & IFilterContextContent;

/**
 * Data type of event that was emitted after finishing change filter context
 *
 * Note: The main event data was wrapped to application and product data structure
 * @public
 */
export declare type AdFilterContextChangedData = IGdcAdMessageEnvelope<GdcAdEventType.FilterContextChanged, AdFilterContextChangedBody>;

/**
 * @public
 */
export declare type AdInsightChangedBody = IAdAvailableCommands & {
    definition: IInsightDefinition;
};

/**
 * @public
 */
export declare type AdInsightChangedData = IGdcAdMessageEnvelope<GdcAdEventType.InsightChanged, AdInsightChangedBody>;

/**
 * This event is emitted when AD initializes edit session for an existing insight. Essential detail about
 * the insight is included in the body.
 *
 * @public
 */
export declare type AdInsightOpened = IGdcAdMessageEvent<GdcAdEventType.InsightOpened, AdInsightOpenedBody>;

/**
 * Main data of InsightOpened event
 *
 * @public
 */
export declare type AdInsightOpenedBody = IAdAvailableCommands & {
    /**
     * The minimal opened insight information
     */
    insight: IObjectMeta;
    /**
     * Definition of insight
     */
    definition: IInsightDefinition;
};

/**
 * Data type of event that was emitted when an insight is opened
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See {@link AdInsightOpenedBody}
 *
 * @public
 */
export declare type AdInsightOpenedData = IGdcAdMessageEnvelope<GdcAdEventType.InsightOpened, AdInsightOpenedBody>;

/**
 * This event is emitted when AD has finished rendering an insight. Essential detail about
 * the insight is included in the body.
 *
 * @public
 */
export declare type AdInsightRendered = IGdcAdMessageEvent<GdcAdEventType.InsightRendered, AdInsightRenderedBody>;

/**
 * Main data of {@link AdInsightRendered} event
 *
 * @public
 */
export declare type AdInsightRenderedBody = IAdAvailableCommands & {
    /**
     * The minimal rendered insight information
     */
    insight: IObjectMeta;
    /**
     * Message about rendering error (if any)
     */
    errorMessage?: string;
};

/**
 * Data type of event that was emitted when an insight is rendered
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See  {@link AdInsightRenderedBody}
 *
 * @public
 */
export declare type AdInsightRenderedData = IGdcAdMessageEnvelope<GdcAdEventType.InsightRendered, AdInsightRenderedBody>;

/**
 * This event is emitted when AD saves the currently edited insight.
 *
 * @public
 */
export declare type AdInsightSaved = IGdcAdMessageEvent<GdcAdEventType.InsightSaved, AdInsightSavedBody>;

/**
 * Main data of  {@link AdInsightSaved}  event
 *
 * Note: `visualizationObject` is kept because of backward compatibility
 *
 * @public
 */
export declare type AdInsightSavedBody = IAdAvailableCommands & IVisualization & {
    /**
     * The minimal saved insight information
     */
    insight: IObjectMeta;
};

/**
 * Data type of event that was emitted when an insight is saved
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See {@link AdInsightSavedBody}
 * @public
 */
export declare type AdInsightSavedData = IGdcAdMessageEnvelope<GdcAdEventType.InsightSaved, AdInsightSavedBody>;

/**
 * This event is emitted when AD initializes edit session for a new insight.
 *
 * @public
 */
export declare type AdNewInsightInitialized = IGdcAdMessageEvent<GdcAdEventType.NewInsightInitialized, AdNewInsightInitializedBody>;

/**
 * It's main content is empty.
 *
 * @public
 */
export declare type AdNewInsightInitializedBody = IAdAvailableCommands;

/**
 * Data type of event that was emitted when the new insight initialized
 *
 * Note: it has empty content and just wrapped to application and product data structure
 *
 * @public
 */
export declare type AdNewInsightInitializedData = IGdcAdMessageEnvelope<GdcAdEventType.NewInsightInitialized, undefined>;

/**
 * Open an insight.
 *
 * Contract:
 *
 * - if the insight could not found, then CommandFailed event will be posted
 * - after the insight is opened, then {@link AdInsightOpened} event will be posted
 *
 * Note: if insightId isn't provided, the empty insight editor will be opened
 *
 * @public
 */
export declare type AdOpenInsightCommand = IGdcAdMessageEvent<GdcAdCommandType.OpenInsight, IAdOpenInsightCommandBody>;

/**
 * Data type of open insight command
 *
 * Note: The main event data was wrapped to application and product data structure
 *
 * @remarks See {@link IAdOpenInsightCommandBody}
 *
 * @public
 */
export declare type AdOpenInsightCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.OpenInsight, IAdOpenInsightCommandBody>;

/**
 * Triggers the redo action.
 *
 * Contract:
 *
 * -  if it is valid to perform Redo operation, AD will do it and the {@link AdRedoFinished}  will be posted once the
 *    redo completes
 *
 * -  if the Redo operation is not available in current state of AD, then {@link AdCommandFailed} will be posted
 *
 * @public
 */
export declare type AdRedoCommand = IGdcAdMessageEvent<GdcAdCommandType.Redo, undefined>;

/**
 * Data type of redo command
 *
 * Note: it has empty content and just wrapped to application and product data structure
 *
 * @public
 */
export declare type AdRedoCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.Redo, undefined>;

/**
 * This event is emitted when AD successfully performs Undo operation.
 *
 * @public
 */
export declare type AdRedoFinished = IGdcAdMessageEvent<GdcAdEventType.RedoFinished, AdRedoFinishedBody>;

/**
 * It's main content is empty.
 * @public
 */
export declare type AdRedoFinishedBody = IAdAvailableCommands;

/**
 * Data type of event that was emitted after finish redo action
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See {@link AdRedoFinishedBody}
 * @public
 */
export declare type AdRedoFinishedData = IGdcAdMessageEnvelope<GdcAdEventType.RedoFinished, AdRedoFinishedBody>;

/**
 * Remove the filter context
 * Contract:
 * - if filters are in the filter bar, then remove the filters on the filter bar and update insight
 * - if filters are not in the filter bar, then a CommandFailed will be posted.
 *
 * @public
 */
export declare type AdRemoveFilterContextCommand = IGdcAdMessageEvent<GdcAdCommandType.RemoveFilterContext, IRemoveFilterContextContent>;

/**
 * Data type of removeFilterContext command
 *
 * @public
 */
export declare type AdRemoveFilterContextCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.RemoveFilterContext, IRemoveFilterContextContent>;

/**
 * Data type of event that was emitted after finishing remove filter context
 *
 * Note: The main event data was wrapped to application and product data structure
 * @public
 */
export declare type AdRemoveFilterContextFinishedData = IGdcAdMessageEnvelope<GdcAdEventType.RemoveFilterContextFinished, IAdAvailableCommands>;

/**
 * Triggers the action to request cancellation
 *
 * @public
 */
export declare type AdRequestCancellationCommand = IGdcAdMessageEvent<GdcAdCommandType.RequestCancellation, undefined>;

/**
 * Data type of {@link AdRequestCancellationCommand} command
 *
 * Note: it has empty content and just wrapped to application and product data structure
 *
 * @public
 */
export declare type AdRequestCancellationCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.RequestCancellation, undefined>;

/**
 * Saves current insight as a new object, with a different title. The title is specified
 *
 * Contract is same as {@link AdSaveInsightCommand}.
 *
 * @public
 */
export declare type AdSaveAsInsightCommand = IGdcAdMessageEvent<GdcAdCommandType.SaveAs, IAdSaveAsInsightCommandBody>;

/**
 * Data type of save as insight command
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See {@link IAdSaveAsInsightCommandBody}
 *
 * @public
 */
export declare type AdSaveAsInsightCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.SaveAs, IAdSaveAsInsightCommandBody>;

/**
 * Saves current insight.
 *
 * Contract:
 *
 * -  if currently edited insight IS NOT eligible for save (empty, in-error), then CommandFailed event
 *    will be posted
 * -  if the specified title is invalid / does not match title validation rules, then CommandFailed event
 *    will be posted
 * -  otherwise insight WILL be saved with the title as specified in the body and the InsightSaved event
 *    will be posted
 * -  the InsightSaved event will be posted even when saving insights that have not changed but are eligible
 *    for saving (not empty, not in-error)
 *
 * Note: sending AdSaveInsightCommand with different title means insight will be saved with that new title.
 *
 * @public
 */
export declare type AdSaveInsightCommand = IGdcAdMessageEvent<GdcAdCommandType.Save, IAdSaveCommandBody>;

/**
 * Data type of save insight command
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See  {@link IAdSaveCommandBody}
 *
 * @public
 */
export declare type AdSaveInsightCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.Save, IAdSaveCommandBody>;

/**
 * Sets API token.
 *
 * Contract:
 *
 * -  received value is set as API token into the backend instance that will be used by AD for all
 *      the subsequent backend calls. If the token is invalid, the subsequent backend calls will
 *      start to fail.
 *
 * @public
 */
export declare type AdSetApiTokenCommand = IGdcAdMessageEvent<GdcAdCommandType.SetApiToken, IAdSetApiTokenBody>;

/**
 * Data type of set API token command
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See {@link IAdSetApiTokenBody}
 *
 * @public
 */
export declare type AdSetApiTokenCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.SetApiToken, IAdSetApiTokenBody>;

/**
 * Add or update the filter context
 *
 * Contract:
 * - if filters are same with filters on the AD filter bar, then update the filters on the filter bar
 *   and apply the filters to insight
 * - if filters are new, then add them to the AD filter bar and apply to insight
 * - in-case the AD can not apply the filters, a CommandFailed will be posted. The reason could be
 *   - Filter is not existed in the dataset
 *   - Filter is existed but wrong elements input data
 *   - Exceed the limit number of filter items
 *
 * @public
 */
export declare type AdSetFilterContextCommand = IGdcAdMessageEvent<GdcAdCommandType.SetFilterContext, IFilterContextContent>;

/**
 * Data type of {@link AdSetFilterContextCommand} command
 *
 * @public
 */
export declare type AdSetFilterContextCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.SetFilterContext, IFilterContextContent>;

/**
 * Data type of event that was emitted after finishing set filter context
 *
 * Note: The main event data was wrapped to application and product data structure
 * @public
 */
export declare type AdSetFilterContextFinishedData = IGdcAdMessageEnvelope<GdcAdEventType.SetFilterContextFinished, IAdAvailableCommands>;

/**
 * Triggers the undo action.
 *
 * Contract:
 *
 * -  if it is valid to perform Undo operation, AD will do it and the {@link AdUndoFinished} will be posted once the
 *    undo completes
 *
 * -  if the Undo operation is not available in current state of AD, then {@link AdCommandFailed} will be posted
 *
 * @public
 */
export declare type AdUndoCommand = IGdcAdMessageEvent<GdcAdCommandType.Undo, undefined>;

/**
 * Data type of undo command
 *
 * Note: it has empty content and just wrapped to application and product data structure
 *
 * @public
 */
export declare type AdUndoCommandData = IGdcAdMessageEnvelope<GdcAdCommandType.Undo, undefined>;

/**
 * This event is emitted when AD successfully performs Undo operation.
 * @public
 */
export declare type AdUndoFinished = IGdcAdMessageEvent<GdcAdEventType.UndoFinished, AdUndoFinishedBody>;

/**
 * It's main content is empty.
 * @public
 */
export declare type AdUndoFinishedBody = IAdAvailableCommands;

/**
 * Data type of event that was emitted after finish undo action
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See {@link AdUndoFinishedBody}
 * @public
 */
export declare type AdUndoFinishedData = IGdcAdMessageEnvelope<GdcAdEventType.UndoFinished, AdUndoFinishedBody>;

/**
 * @public
 */
export declare type AllTimeType = "allTime";

/**
 * @public
 */
export declare type AttributeFilterItem = IPositiveAttributeFilter | INegativeAttributeFilter;

/**
 * @public
 */
export declare type AttributeFilterItemSelectionMode = "single" | "multi";

/**
 * Base type for error events sent by application in case command processing comes to an expected
 * or unexpected halt.
 *
 * @public
 */
export declare type CommandFailed<Product> = IGdcMessageEvent<Product, GdcEventType.AppCommandFailed, ICommandFailedBody>;

/**
 * Base type for the data of error events sent by application
 * in case command processing comes to an expected or unexpected halt.
 *
 * @public
 */
export declare type CommandFailedData<Product> = IGdcMessageEnvelope<Product, GdcEventType.AppCommandFailed, ICommandFailedBody>;

/**
 * @public
 */
export declare type DashboardDateFilter = IDashboardAllTimeDateFilter | IDashboardAbsoluteDateFilter | IDashboardRelativeDateFilter;

/**
 * @public
 */
export declare type DateFilterGranularity = "GDC.time.minute" | "GDC.time.hour" | "GDC.time.date" | "GDC.time.week_us" | "GDC.time.month" | "GDC.time.quarter" | "GDC.time.year";

/**
 * @public
 */
export declare type DateFilterItem = IAbsoluteDateFilter | IRelativeDateFilter;

/**
 * @public
 */
export declare type DateString = string;

/**
 * @public
 */
export declare type FilterItem = DateFilterItem | AttributeFilterItem | IRankingFilter;

/**
 * All AD command Types
 *
 * @public
 */
export declare enum GdcAdCommandType {
    /**
     * The command set drillable items
     */
    DrillableItems = "drillableItems",
    /**
     * The command open an insight
     */
    OpenInsight = "openInsight",
    /**
     * The command save an insight
     */
    Save = "saveInsight",
    /**
     * The command save the insight as a new one
     */
    SaveAs = "saveAsInsight",
    /**
     * The command export an insight
     */
    Export = "exportInsight",
    /**
     * The command reset the insight editor to empty state
     */
    Clear = "clear",
    /**
     * The command empties insight buckets and filters but keeps title and ID in the URL
     */
    ClearInsight = "clearInsight",
    /**
     * The command undo to previous state
     */
    Undo = "undo",
    /**
     * The command redo to next state
     */
    Redo = "redo",
    /**
     * The command to add or update filter context
     */
    SetFilterContext = "setFilterContext",
    /**
     * The command to remove filter item from current filter context
     */
    RemoveFilterContext = "removeFilterContext",
    /**
     * The command to request cancellation
     */
    RequestCancellation = "requestCancellation",
    /**
     * The command to set API token
     */
    SetApiToken = "setApiToken"
}

/**
 * All event types on AD
 *
 * @public
 */
export declare enum GdcAdEventType {
    /**
     * Type represent that AD is listening for drillable items command.
     */
    ListeningForDrillableItems = "listeningForDrillableItems",
    /**
     * Type represent that a new insight is initialized
     */
    NewInsightInitialized = "newInsightInitialized",
    /**
     * Type represent that the insight is opened
     */
    InsightOpened = "insightOpened",
    /**
     * Type represent that the insight is rendered
     */
    InsightRendered = "insightRendered",
    /**
     * Type represent that the insight editor is cleared
     */
    ClearFinished = "clearFinished",
    /**
     * Type represent that the insight is cleared
     */
    ClearInsightFinished = "clearInsightFinished",
    /**
     * Type represent that the insight is saved
     *
     * Note: use `visualizationSaved` because of backward compatibility
     * See visualizationSaved event on https://help.gooddata.com
     */
    InsightSaved = "visualizationSaved",
    /**
     * Type represent that the undo action is finished
     */
    UndoFinished = "undoFinished",
    /**
     * Type represent that the redo action is finished
     */
    RedoFinished = "redoFinished",
    /**
     * Type represent that the export action is finished
     */
    ExportFinished = "exportInsightFinished",
    /**
     * Type that drill performed
     */
    Drill = "drill",
    /**
     * Type represent that the filter context is changed
     */
    FilterContextChanged = "filterContextChanged",
    /**
     * Type represent that the set filter context action is finished
     */
    SetFilterContextFinished = "setFilterContextFinished",
    /**
     * Type represent that the remove filter context action is finished
     */
    RemoveFilterContextFinished = "removeFilterContextFinished",
    /**
     * Type notify AD that the insight editing has been cancelled
     */
    InsightEditingCancelled = "insightEditingCancelled",
    /**
     * Type to notify AD that the insight has been changed and execution started. It contains new insight definition.
     */
    InsightChanged = "insightChanged",
    /**
     * Type represents that AD is listening and waiting for API token to set up SDK backend instance.
     * AD will not continue with initialization until the token is set.
     */
    ListeningForApiToken = "listeningForApiToken",
    /**
     * Type notifies embedding application that API token is about to expire and a new API token
     * must be set via "setApiToken" command, otherwise session will expire soon (how soon depends on
     * the reminder settings, by default in 60 seconds, can be changed by optional parameter with
     * "setApiToken" was called the last time).
     */
    ApiTokenIsAboutToExpire = "apiTokenIsAboutToExpire"
}

/**
 * Enumeration of possible types of error messages posted from the apps.
 *
 * @public
 */
export declare enum GdcErrorType {
    /**
     * The posted command is not recognized.
     */
    InvalidCommand = "error:invalidCommand",
    /**
     * Argument specified in the command body is invalid; it has failed the syntactical
     * or semantic validation.
     */
    InvalidArgument = "error:invalidArgument",
    /**
     * Command was posted when the app is not in a state to process the command. For instance:
     *
     * - trying to do save/save-as on new, empty insight
     * - trying to do save/save-as on insight that is in error
     * - trying to do undo when there is no step-back available
     * - trying to do redo when there is no step-forward available
     */
    InvalidState = "error:invalidState",
    /**
     * The Unexpected Happened.
     */
    RuntimeError = "error:runtime"
}

/**
 * Common event types in application
 *
 * @public
 */
export declare enum GdcEventType {
    /**
     * Event to notify outer application that the command is invalid or have errors while processing
     */
    AppCommandFailed = "appCommandFailed"
}

/**
 * All KD command Types.
 *
 * @public
 */
export declare enum GdcKdCommandType {
    /**
     * The command save a dashboard.
     */
    Save = "saveDashboard",
    /**
     * The command cancel editing dashboard.
     */
    CancelEdit = "cancelEdit",
    /**
     * The command delete existed dashboard.
     */
    Delete = "deleteDashboard",
    /**
     * The command edit a dashboard.
     */
    SwitchToEdit = "switchToEdit",
    /**
     * The command set drillable items.
     */
    DrillableItems = "drillableItems",
    /**
     * The command set size of dashboard.
     */
    SetSize = "setSize",
    /**
     * The command add widget to dashboard.
     */
    AddWidget = "addWidget",
    /**
     * The command add filter to dashboard.
     */
    AddFilter = "addFilter",
    /**
     * The command export a dashboard.
     */
    ExportToPdf = "exportToPdf",
    /**
     * The command to add or update filter context
     */
    SetFilterContext = "setFilterContext",
    /**
     * The command to remove filter item from current filter context
     */
    RemoveFilterContext = "removeFilterContext",
    /**
     * The command to duplicate a KPI Dashboard
     */
    SaveAsDashboard = "saveAsDashboard",
    /**
     * The command to open schedule email dialog
     */
    OpenScheduleEmailDialog = "openScheduleEmailDialog",
    /**
     * The command to set attribute filter parents
     */
    SetFilterParents = "setFilterParents",
    /**
     * The command open delete existed dashboard dialog
     */
    OpenDeleteDashboardDialog = "openDeleteDashboardDialog",
    /**
     * The command to set API token
     */
    SetApiToken = "setApiToken"
}

/**
 * All KD event types.
 *
 * @public
 */
export declare enum GdcKdEventType {
    /**
     * Type represent that the dashboard listening for drilling event.
     */
    ListeningForDrillableItems = "listeningForDrillableItems",
    /**
     * Type represent that the embedded content starts loading.
     */
    LoadingStarted = "loadingStarted",
    /**
     * Type represent that The user does not have permissions to view or edit the content.
     */
    NoPermissions = "noPermissions",
    /**
     * Type represent that an operation increasing the height of the hosting iframe is performed.
     */
    Resized = "resized",
    /**
     * Type represent that the dashboard has been created and saved.
     */
    DashboardCreated = "dashboardCreated",
    /**
     * Type represent that the content is fully loaded,
     * and the user has permissions to access the dashboard.
     */
    DashboardLoaded = "loaded",
    /**
     * Type represent that the existing dashboard has been updated.
     */
    DashboardUpdated = "dashboardUpdated",
    /**
     * Type represent that the dashboard is saved.
     *
     */
    DashboardSaved = "dashboardSaved",
    /**
     * Type represent that the dashboard is deleted.
     *
     */
    DashboardDeleted = "dashboardDeleted",
    /**
     * Type represent that the user cancels the creation of the dashboard.
     */
    DashboardCreationCanceled = "dashboardCreationCanceled",
    /**
     * Type represent that the dashboard is switched to edit mode.
     */
    SwitchedToEdit = "switchedToEdit",
    /**
     * Type represent that the dashboard is switched to view mode.
     */
    SwitchedToView = "switchedToView",
    /**
     * Type represent that the platform is down.
     */
    Platform = "platform",
    /**
     * Type represent that the widget is added to dashboard.
     *
     */
    WidgetAdded = "widgetAdded",
    /**
     * Type represent that the filter is added to dashboard.
     *
     */
    FilterAdded = "filterAdded",
    /**
     * Type represent that the export action is finished.
     */
    ExportedToPdf = "exportedToPdf",
    /**
     * Type represent that the drill performed
     */
    Drill = "drill",
    /**
     * Type represent that the filter context is changed
     */
    FilterContextChanged = "filterContextChanged",
    /**
     * Type represent that the set filter context action is finished
     */
    SetFilterContextFinished = "setFilterContextFinished",
    /**
     * Type represent that the remove filter context action is finished
     */
    RemoveFilterContextFinished = "removeFilterContextFinished",
    /**
     * Type that represents started drill to URL. The event does not contain an URL. The event can be used as
     * notification to display a loading indicator as the URL resolving takes some time. The URL is sent in
     * DrillToUrlResolved event which is posted after the URL is resolved. The event also contains an ID that can
     * be matched with ID in subsequently posted DrillToUrlResolved event.
     */
    DrillToUrlStarted = "drillToUrlStarted",
    /**
     * Type that represents resolved drill to URL. The event is sent after DrillToUrlStarted event was posted and
     * it contains the resolved URL. The event also contains an ID which can be matched with ID from
     * DrillToUrlStarted event.
     */
    DrillToUrlResolved = "drillToUrlResolved",
    /**
     * Type represent that the schedule email dialog is opened.
     */
    ScheduleEmailDialogOpened = "scheduleEmailDialogOpened",
    /**
     * The event that is emitted once setFilterParents command is successful
     */
    SetFilterParentsFinished = "setFilterParentsFinished",
    /**
     * The event that is emitted if setFilterParents command is not successful it contains `SetFilterParentsErrorCode`
     */
    SetFilterParentsFailed = "setFilterParentsFailed",
    /**
     * Type represent that the delete dashboard dialog is opened
     */
    DeleteDashboardDialogOpened = "deleteDashboardDialogOpened",
    /**
     * Type represent that the insight was saved.
     */
    InsightSaved = "visualizationSaved",
    /**
     * Type represents that KD is listening and waiting for API token to set up SDK backend instance.
     * KD will not continue with initialization until the token is set.
     */
    ListeningForApiToken = "listeningForApiToken",
    /**
     * Type notifies embedding application that API token is about to expire and a new API token
     * must be set via "setApiToken" command, otherwise session will expire soon (how soon depends on
     * the reminder settings, by default in 60 seconds, can be changed by optional parameter with
     * "setApiToken" was called the last time).
     */
    ApiTokenIsAboutToExpire = "apiTokenIsAboutToExpire"
}

/**
 * Type for event listener
 *
 * @public
 */
export declare type GdcMessageEventListener = (event: IGdcMessageEvent<string, string, any>) => boolean;

/**
 * List of products using post events
 *
 * @public
 */
export declare enum GdcProductName {
    /**
     * AD product name
     */
    ANALYTICAL_DESIGNER = "analyticalDesigner",
    /**
     * KD product name
     */
    KPI_DASHBOARD = "dashboard"
}

/**
 * Get event type of event from event data
 * @param obj - the event data object
 * @public
 */
export declare function getEventType(obj: Record<string, any>): string;

/**
 * @public
 */
export declare interface IAbsoluteDateFilter {
    absoluteDateFilter: {
        dataSet?: ObjQualifier;
        from: string;
        to: string;
    };
}

/**
 * List of available commands; this is included in each event sent by AD.
 *
 * @public
 */
export declare interface IAdAvailableCommands {
    /**
     * Array of available commands types
     */
    availableCommands: GdcAdCommandType[];
}

/**
 * Export command body sent by outer application
 *
 * @public
 */
export declare interface IAdExportInsightCommandBody {
    /**
     * Configuration for exported file.
     *
     * @remarks See IInsightExportConfig for more details about possible configuration options
     *
     * @public
     */
    readonly config: IInsightExportConfig;
}

/**
 * Contain the information to construct the AD url to open an insight editor
 *
 * @public
 */
export declare interface IAdOpenInsightCommandBody {
    /**
     * Dataset identifier - A dataset consists of attributes and facts,
     * which correspond to data you want to measure and the data
     * that you want to use to segment or filter those measurements.
     */
    dataset?: string;
    /**
     * Project id
     */
    projectId?: string;
    /**
     * Client id - Each client has an identifier unique within the domain
     *
     * Note: use the combination of the data product ID and client ID instead of the project ID
     */
    clientId?: string;
    /**
     * Product id - A data product contains multiple segments. And a segment has clients assigned to it
     *
     * Note: use the combination of the data product ID and client ID instead of the project ID
     */
    productId?: string;
    /**
     * Insight id - leave it empty to reset the insight editor to empty state
     */
    insightId?: string;
    /**
     * Insight id - leave it empty to reset the insight editor to empty state
     *
     * Note: if both insightId and reportId are provided. the insightId will be use higher
     * with higher priority.
     */
    reportId?: string;
    /**
     * Show only the attributes, measures, facts, and dates with the specified tag
     */
    includeObjectsWithTags?: string;
    /**
     * Hide the attributes, measures, facts, and dates with the specified tag
     */
    excludeObjectsWithTags?: string;
}

/**
 * Save As command body sent by outer application
 *
 * @public
 */
export declare interface IAdSaveAsInsightCommandBody {
    /**
     * Insight title - use as title of new insight
     */
    readonly title: string;
}

/**
 * Save command body sent by outer application
 *
 * @public
 */
export declare interface IAdSaveCommandBody {
    /**
     * Insight title - use as title of new insight or rename of saved insight
     */
    title: string;
}

/**
 * Set API token command body sent by outer application
 *
 * @public
 */
export declare interface IAdSetApiTokenBody {
    /**
     * API token value - used to set up SDK backend instance
     */
    token: string;
    /**
     * Type of the API token, default value is "GoodData"
     */
    type?: "gooddata" | "jwt";
    /**
     * Number of seconds before a postMessage event about to be expired JWT is emitted.
     * Used only when type == jwt. Default value is 60 seconds.
     */
    secondsBeforeTokenExpirationToEmitReminder?: number;
}

/**
 * @public
 */
export declare interface ICommandFailedBody {
    /**
     * Error code indicates category of error that has occurred.
     * The possible types vary between applications.
     */
    errorCode: GdcErrorType;
    /**
     * Error message includes descriptive information about the error.
     * E.g. "Insight title must not contain newline character"
     */
    errorMessage: string;
}

/**
 * @public
 */
export declare interface IDashboardAbsoluteDateFilter {
    dateFilter: {
        type: AbsoluteType;
        granularity: DateFilterGranularity;
        from: DateString;
        to: DateString;
    };
}

/**
 * @public
 */
export declare interface IDashboardAllTimeDateFilter {
    dateFilter: {
        type: AllTimeType;
    };
}

/**
 * @public
 */
export declare interface IDashboardAttributeFilter {
    attributeFilter: {
        displayForm: string;
        negativeSelection: boolean;
        attributeElements: string[];
    };
}

/**
 * @public
 */
export declare interface IDashboardRelativeDateFilter {
    dateFilter: {
        type: RelativeType;
        granularity: DateFilterGranularity;
        from: number;
        to: number;
    };
}

/**
 * The main data type of drillable items command
 *
 * @public
 */
export declare interface IDrillableItemsCommandBody extends ISimpleDrillableItemsCommandBody {
    /**
     * Master measures items - In-case, a derived measure is composed from a master measure.
     */
    composedFrom?: ISimpleDrillableItemsCommandBody;
}

/**
 * The filter context content that is used to exchange the filter context
 * between AD, KD embedded page and parent application
 * @public
 */
export declare interface IFilterContextContent {
    filters: FilterItem[];
}

/**
 * Base type for AD event data
 *
 * @public
 */
export declare type IGdcAdMessageEnvelope<T, TBody> = IGdcMessageEnvelope<GdcProductName.ANALYTICAL_DESIGNER, T, TBody>;

/**
 * Base type for AD events
 *
 * @public
 */
export declare type IGdcAdMessageEvent<T, TBody> = IGdcMessageEvent<GdcProductName.ANALYTICAL_DESIGNER, T, TBody>;

/**
 * Base type for KD event data.
 *
 * @public
 */
export declare type IGdcKdMessageEnvelope<T, TBody> = IGdcMessageEnvelope<GdcProductName.KPI_DASHBOARD, T, TBody>;

/**
 * Base type for KD events.
 *
 * @public
 */
export declare type IGdcKdMessageEvent<T, TBody> = IGdcMessageEvent<GdcProductName.KPI_DASHBOARD, T, TBody>;

/**
 * Base type for event content
 *
 * @public
 */
export declare interface IGdcMessage<Product, T, TBody> {
    readonly product: Product;
    readonly event: {
        readonly name: T;
        readonly data?: TBody;
        readonly contextId?: string;
    };
}

/**
 * Base type for gdc event data
 *
 * @public
 */
export declare interface IGdcMessageEnvelope<Product, T, TBody> {
    readonly gdc: IGdcMessage<Product, T, TBody>;
}

/**
 * Base type for events
 *
 * @public
 */
export declare interface IGdcMessageEvent<Product, T, TBody> extends MessageEvent {
    readonly data: IGdcMessageEnvelope<Product, T, TBody>;
}

/**
 * Config type use to setup the message event listeners
 *
 * @public
 */
export declare interface IGdcMessageEventListenerConfig {
    /**
     * The product name where the post messages are sent/received
     */
    product: string;
    /**
     * The list of events is allowed for processing
     */
    validReceivedPostEvents: string[];
}

/**
 * Insight Export configuration
 *
 * Note: AFM is omitted on purpose; it should be added by AD itself; create new type using Omit\<\>
 *
 * @public
 */
export declare interface IInsightExportConfig extends IBaseExportConfig {
    /**
     * Include applied filters
     */
    includeFilterContext?: boolean;
}

/**
 * @public
 */
export declare interface IKdAddedWidgetBody {
    insight?: IKdInsightWidgetBody;
}

/**
 * @public
 */
export declare interface IKdAddWidgetBody {
    widget: IKdKpiWidget | IKdInsightWidget;
}

/**
 * List of available commands. This is included in each event sent by KD.
 *
 * @public
 */
export declare interface IKdAvailableCommands {
    /**
     * Array of available commands types.
     */
    availableCommands: GdcKdCommandType[];
}

/**
 * Data type of event that was emitted when a dashboard has been created and saved.
 * @public
 */
export declare type IKdDashboardCreatedData = IGdcKdMessageEnvelope<GdcKdEventType.DashboardCreated, KdDashboardBody>;

/**
 * Data type of event that was emitted when the dashboard has been deleted.
 * @public
 */
export declare type IKdDashboardDeletedData = IGdcKdMessageEnvelope<GdcKdEventType.DashboardDeleted, KdDashboardBody>;

/**
 * Data type of event that was emitted when the content is fully loaded,
 * and the user has permissions to access the dashboard.
 * @public
 */
export declare type IKdDashboardLoadedData = IGdcKdMessageEnvelope<GdcKdEventType.DashboardLoaded, KdDashboardBody>;

/**
 * @public
 */
export declare interface IKdDashboardObjectMeta {
    /**
     * Client id - Each client has an identifier unique within the domain
     *
     * Note: use the combination of the data product ID and client ID instead of the project ID
     */
    client?: string;
    /**
     * object id
     */
    dashboardId: string;
    /**
     * Project id
     */
    project: string;
    /**
     * dashboard identifier
     */
    dashboard: string;
    /**
     * dashboard title - this is what users see in KD top bar (if visible)
     */
    title: string;
}

/**
 * Data type of event that was emitted when the dashboard has been saved.
 * @public
 */
export declare type IKdDashboardSavedData = IGdcKdMessageEnvelope<GdcKdEventType.DashboardSaved, KdDashboardBody>;

/**
 * Data type of event that was emitted when the existing dashboard has been updated.
 * @public
 */
export declare type IKdDashboardUpdatedData = IGdcKdMessageEnvelope<GdcKdEventType.DashboardUpdated, KdDashboardBody>;

/**
 * @public
 */
export declare interface IKdDrillToUrlResolvedDataBody {
    id: string;
    url: string;
    /**
     * Contains date filter and attribute filters set in the dashboard.
     *
     * Note: You can use the type guards defined in EmbeddedGdc.js to test the type of the filter.
     * For instance, you can call data.filters.find(isDashboardDateFilter) to get the date filter.
     */
    filters: KdDrillToUrlFilters;
    resolvedFilterValues?: IResolvedFilterValues;
}

/**
 * @public
 */
export declare interface IKdDrillToUrlStartedDataBody {
    id: string;
}

/**
 * @public
 */
export declare interface IKdIdentifierInsightRef {
    identifier: string;
}

/**
 * Type that represents `InsightSaved` data.
 *
 * @public
 */
export declare type IKdInsightSavedBody = IVisualization & {
    insight: IObjectMeta;
};

/**
 * @public
 */
export declare interface IKdInsightWidget {
    type: "insight";
    ref: IKdIdentifierInsightRef | IKdUriInsightRef;
}

/**
 * @public
 */
export declare interface IKdInsightWidgetBody {
    widgetCategory: "kpi" | "visualization";
    identifier?: string;
    uri?: string;
    title?: string;
}

/**
 * @public
 */
export declare interface IKdKpiWidget {
    type: "kpi";
}

/**
 * @public
 */
export declare interface IKdNoPermissionsBody {
    /**
     * the 'data' section contains information about whether view or edit permissions are missing
     */
    reason: string;
}

/**
 * @public
 */
export declare interface IKdPlatformBody {
    status?: string;
    errorCode?: number;
    description?: string;
}

/**
 * @public
 */
export declare interface IKdResizedBody {
    height: number;
}

/**
 * Save command body sent by outer application
 *
 * @public
 */
export declare interface IKdSaveCommandBody {
    /**
     * Dashboard title - use as title of new dashboard or rename of saved dashboard
     */
    title: string;
}

/**
 * Set API token command body sent by outer application
 *
 * @public
 */
export declare interface IKdSetApiTokenBody {
    /**
     * API token value - used to set up SDK backend instance
     */
    token: string;
    /**
     * Type of the API token, default value is "GoodData"
     */
    type?: "gooddata" | "jwt";
    /**
     * Number of seconds before a postMessage event about to be expired JWT is emitted.
     * Used only when type == jwt. Default value is 60 seconds.
     */
    secondsBeforeTokenExpirationToEmitReminder?: number;
}

/**
 * Type that represents attribute filter on a dashboard referenced by display form.
 *
 * @public
 */
export declare interface IKdSetFilterParentsAttributeFilter {
    attributeFilter: {
        displayForm: ObjRef;
    };
}

/**
 * Type that represents all the changes that command `SetFilterParentsCommand` requests to change. One item per filter.
 * If filter is not present in command it will not be changed.
 *
 * @public
 */
export declare interface IKdSetFilterParentsDataBody {
    filters: IKdSetFilterParentsItem[];
}

/**
 * Type that represents `SetFilterParentsFailed` data.
 *
 * @public
 */
export declare interface IKdSetFilterParentsFailedDataBody {
    /**
     * Code that represents cause of error look at `SetFilterParentsErrorCode` for more information.
     */
    errorCode: KdSetFilterParentsErrorCode;
}

/**
 * Type that represents filter that is requested to be changed.
 *
 * @public
 */
export declare interface IKdSetFilterParentsItem {
    /**
     * Filter property is reference to filter that exists on a dashboard. If filter is not on a dashboard `FilterNotFound`
     * error will be returned.
     */
    filter: KdSetFilterParentsItemFilter;
    /**
     * Parents is array of filters that this filter depends on, parents filters also need to be present on a dashboard.
     * If filter should not depend on any parent filters pass empty array `[]` to `parents` property.
     */
    parents: IKdSetFilterParentsItemParent[];
}

/**
 * Type that represents filter connection to its parent.
 *
 * @public
 */
export declare interface IKdSetFilterParentsItemParent {
    /**
     * Parent is filter that is present on a dashboard.
     */
    parent: KdSetFilterParentsItemFilter;
    /**
     * Connecting attribute is common attribute for both child and parent attribute filter.
     */
    connectingAttribute: ObjRef;
}

/**
 * @public
 */
export declare interface IKdSetSizeCommandBody {
    /**
     * the height of the hosting iframe
     */
    height: number;
}

/**
 * @public
 */
export declare interface IKdUriInsightRef {
    uri: string;
}

/**
 * @public
 */
export declare type ILocalIdentifierQualifier = ILocalIdentifierQualifier_2;

/**
 * @public
 */
export declare interface INegativeAttributeFilter {
    negativeAttributeFilter: {
        displayForm: ObjQualifier;
        notIn: string[];
        textFilter?: boolean;
        selectionMode?: "multi";
    };
}

/**
 * Minimal meta-information about an object.
 *
 * @public
 */
export declare interface IObjectMeta {
    /**
     * Unique, user-assignable identifier of the insight. This identifier does not change during LCM operations.
     */
    identifier: string;
    /**
     * URI of the Insight. In context of GoodData platform, the URI is a link to the visualization object
     * where the insight is persisted.
     *
     * NOTE: URI is workspace scoped; same insight distributed across multiple workspaces using LCM will have
     * different URI.
     */
    uri: string;
    /**
     * Insight title - this is what users see in AD top bar (if visible)
     */
    title: string;
}

/**
 * Attribute filters were exposed in the 'old' format that did not match backend and used the
 * textFilter boolean indicator. We have to honor this for the public API.
 * @public
 */
export declare interface IPositiveAttributeFilter {
    positiveAttributeFilter: {
        displayForm: ObjQualifier;
        in: string[];
        textFilter?: boolean;
        selectionMode?: AttributeFilterItemSelectionMode;
    };
}

/**
 * Additional information for action payload. Use for internal reducers, sagas
 *
 * @public
 */
export declare interface IPostMessageContextPayload {
    postMessageContext?: {
        contextId: string;
    };
}

/**
 * @public
 */
export declare interface IRankingFilter {
    rankingFilter: {
        measure: ILocalIdentifierQualifier;
        attributes?: ILocalIdentifierQualifier[];
        operator: RankingFilterOperator;
        value: number;
    };
}

/**
 * @public
 */
export declare interface IRelativeDateFilter {
    relativeDateFilter: {
        dataSet?: ObjQualifier;
        granularity: string;
        from: number;
        to: number;
    };
}

/**
 * @public
 */
export declare interface IRemoveAttributeFilterItem {
    displayForm: ObjQualifier;
}

/**
 * @public
 */
export declare interface IRemoveDateFilterItem {
    dataSet: ObjQualifier;
}

/**
 * The remove filter context content that is used to exchange the filter context
 * between AD, KD embedded page and parent application
 * @public
 */
export declare interface IRemoveFilterContextContent {
    filters: RemoveFilterItem[];
}

/**
 * @public
 */
export declare interface IRemoveRankingFilterItem {
    removeRankingFilter: unknown;
}

/**
 * @public
 */
export declare interface IResolvedAttributeFilterValues {
    [elementRef: string]: string | undefined;
}

/**
 * @public
 */
export declare interface IResolvedDateFilterValue {
    from: string;
    to: string;
}

/**
 * Resolved values for all resolvable filters
 * @public
 */
export declare interface IResolvedFilterValues {
    dateFilters: ResolvedDateFilterValues;
    attributeFilters: {
        [filterStringRef: string]: IResolvedAttributeFilterValues;
    };
}

/**
 * @public
 */
export declare function isAbsoluteDateFilter(filter: unknown): filter is IAbsoluteDateFilter;

/**
 * Type-guard checking whether an object is an instance of  {@link AdClearCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdClearCommandData(obj: unknown): obj is AdClearCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdClearFinishedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdClearFinishedData(obj: unknown): obj is AdClearFinishedData;

/**
 * Type-guard checking whether an object is an instance of {@link AdClearInsightCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdClearInsightCommandData(obj: unknown): obj is AdClearInsightCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdClearInsightFinishedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdClearInsightFinishedData(obj: unknown): obj is AdClearInsightFinishedData;

/**
 * Type-guard checking whether an object is an instance of {@link AdCommandFailedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdCommandFailedData(obj: unknown): obj is AdCommandFailedData;

/**
 * Type-guard checking whether an object is an instance of {@link AdDrillableItemsCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdDrillableItemsCommandData(obj: unknown): obj is AdDrillableItemsCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdExportFinishedData}
 *
 * @param obj - object to test
 * @public
 */
export declare function isAdExportFinishedData(obj: unknown): obj is AdExportFinishedData;

/**
 * Type-guard checking whether an object is an instance of {@link AdExportInsightCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdExportInsightCommandData(obj: unknown): obj is AdExportInsightCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdInsightOpenedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdInsightOpenedData(obj: unknown): obj is AdInsightOpenedData;

/**
 * Type-guard checking whether an object is an instance of {@link AdInsightRenderedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdInsightRenderedData(obj: unknown): obj is AdInsightRenderedData;

/**
 * Type-guard checking whether an object is an instance of {@link AdInsightSavedData}
 *
 * @param obj - object to test
 * @public
 */
export declare function isAdInsightSavedData(obj: unknown): obj is AdInsightSavedData;

/**
 * Type-guard checking whether an object is an instance of {@link AdNewInsightInitializedData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdNewInsightInitializedData(obj: unknown): obj is AdNewInsightInitializedData;

/**
 * Type-guard checking whether an object is an instance of {@link AdOpenInsightCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdOpenInsightCommandData(obj: unknown): obj is AdOpenInsightCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdRedoCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdRedoCommandData(obj: unknown): obj is AdRedoCommandData;

/**
 * Type-guard checking whether an object is an instance of  {@link AdRedoFinishedData}
 *
 * @param obj - object to test
 * @public
 */
export declare function isAdRedoFinishedData(obj: unknown): obj is AdRedoFinishedData;

/**
 * Type-guard checking whether an object is an instance of {@link AdRemoveFilterContextCommand}  RemoveFilterContextCommand
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdRemoveFilterContextCommandData(obj: unknown): obj is AdRemoveFilterContextCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdRequestCancellationCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdRequestCancellationCommandData(obj: unknown): obj is AdRequestCancellationCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdSaveAsInsightCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdSaveAsInsightCommandData(obj: unknown): obj is AdSaveAsInsightCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdSaveInsightCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdSaveInsightCommandData(obj: unknown): obj is AdSaveInsightCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdSetApiTokenCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdSetApiTokenCommandData(obj: unknown): obj is AdSetApiTokenCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdSetFilterContextCommand}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdSetFilterContextCommandData(obj: unknown): obj is AdSetFilterContextCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdCommandFailed}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isAdUndoCommandData(obj: unknown): obj is AdUndoCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link AdUndoFinishedData}
 *
 * @param obj - object to test
 * @public
 */
export declare function isAdUndoFinishedData(obj: unknown): obj is AdUndoFinishedData;

/**
 * @public
 */
export declare function isAttributeFilter(filter: unknown): filter is AttributeFilterItem;

/**
 * Type-guard checking whether an object is an instance of {@link CommandFailedData}
 *
 * @param obj - object to test
 * @public
 */
export declare function isCommandFailedData<Product>(obj: unknown): obj is CommandFailedData<Product>;

/**
 * @public
 */
export declare function isDashboardAbsoluteDateFilter(filter: unknown): filter is IDashboardAbsoluteDateFilter;

/**
 * @public
 */
export declare function isDashboardAllTimeDateFilter(filter: unknown): filter is IDashboardAllTimeDateFilter;

/**
 * @public
 */
export declare function isDashboardAttributeFilter(filter: unknown): filter is IDashboardAttributeFilter;

/**
 * @public
 */
export declare function isDashboardDateFilter(filter: unknown): filter is DashboardDateFilter;

/**
 * @public
 */
export declare function isDashboardRelativeDateFilter(filter: unknown): filter is IDashboardRelativeDateFilter;

/**
 * @public
 */
export declare function isDateFilter(filter: unknown): filter is DateFilterItem;

/**
 * Base type of drillable items command body
 *
 * @public
 */
export declare interface ISimpleDrillableItemsCommandBody {
    /**
     * The array of uris of attributes or measures
     */
    uris?: string[];
    /**
     * The array of identifiers of attributes or measures
     */
    identifiers?: string[];
}

/**
 * Type-guard checking whether object is an instance of {@link KdAddFilterCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isKdAddFilterCommandData(obj: unknown): obj is KdAddFilterCommandData;

/**
 * Type-guard checking whether object is an instance of {@link KdAddWidgetCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isKdAddWidgetCommandData(obj: unknown): obj is KdAddWidgetCommandData;

/**
 * Type-guard checking whether object is an instance of {@link KdCancelEditCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isKdCancelEditCommandData(obj: unknown): obj is KdCancelEditCommandData;

/**
 * Type-guard checking whether object is an instance of {@link KdDrillableItemsCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isKdDrillableItemsCommandData(obj: unknown): obj is KdDrillableItemsCommandData;

/**
 * Type-guard checking whether object is an instance of {@link KdExportToPdfCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isKdExportToPdfCommandData(obj: unknown): obj is KdExportToPdfCommandData;

/**
 * Type-guard checking whether object is an instance of {@link IKdIdentifierInsightRef}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isKdIdentifierInsight(obj: unknown): obj is IKdIdentifierInsightRef;

/**
 * Type-guard checking whether object is an instance of {@link KdOpenDeleteDashboardDialogCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isKdOpenDeleteDashboardDialogCommandData(obj: unknown): obj is KdOpenDeleteDashboardDialogCommandData;

/**
 * Type-guard checking whether object is an instance of {@link KdOpenScheduleEmailDialogCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isKdOpenScheduleEmailDialogCommandData(obj: unknown): obj is KdOpenScheduleEmailDialogCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link KdRemoveFilterContextCommand}
 *
 * @param obj - object to test
 * @public
 */
export declare function isKdRemoveFilterContextCommandData(obj: unknown): obj is KdRemoveFilterContextCommandData;

/**
 * Type-guard checking whether object is an instance of {@link KdSaveAsDashboardCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isKdSaveAsDashboardCommandData(obj: unknown): obj is KdSaveAsDashboardCommandData;

/**
 * Type-guard checking whether object is an instance of {@link KdSaveDashboardCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isKdSaveDashboardCommandData(obj: unknown): obj is KdSaveDashboardCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link KdSetApiTokenCommandData}.
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isKdSetApiTokenCommandData(obj: unknown): obj is KdSetApiTokenCommandData;

/**
 * Type-guard checking whether an object is an instance of {@link KdSetFilterContextCommand}
 *
 * @param obj - object to test
 * @public
 */
export declare function isKdSetFilterContextCommandData(obj: unknown): obj is KdSetFilterContextCommandData;

/**
 * Type-guard that checks if event in {@link KdSetFilterParentsCommandData}
 *
 * @param obj - object to test
 *
 * @public
 */
export declare function isKdSetFilterParentsCommandData(obj: unknown): obj is KdSetFilterParentsCommandData;

/**
 * Type-guard checking whether object is an instance of {@link KdSetSizeCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isKdSetSizeCommandData(obj: unknown): obj is KdSetSizeCommandData;

/**
 * Type-guard checking whether object is an instance of {@link KdSwitchToEditCommandData}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isKdSwitchToEditCommandData(obj: unknown): obj is KdSwitchToEditCommandData;

/**
 * Type-guard checking whether object is an instance of {@link IKdUriInsightRef}.
 *
 * @param obj - object to test
 * @public
 */
export declare function isKdUriInsight(obj: unknown): obj is IKdUriInsightRef;

/**
 * @public
 */
export declare function isNegativeAttributeFilter(filter: unknown): filter is INegativeAttributeFilter;

/**
 * @public
 */
export declare const isObjectUriQualifier: typeof isObjectUriQualifier_2;

/**
 * @public
 */
export declare const isObjIdentifierQualifier: typeof isObjIdentifierQualifier_2;

/**
 * @public
 */
export declare function isPositiveAttributeFilter(filter: unknown): filter is IPositiveAttributeFilter;

/**
 * @public
 */
export declare function isRankingFilter(filter: unknown): filter is IRankingFilter;

/**
 * @public
 */
export declare function isRelativeDateFilter(filter: unknown): filter is IRelativeDateFilter;

/**
 * @public
 */
export declare function isRemoveAttributeFilter(filter: unknown): filter is IRemoveAttributeFilterItem;

/**
 * @public
 */
export declare function isRemoveDateFilter(filter: unknown): filter is IRemoveDateFilterItem;

/**
 * @public
 */
export declare function isRemoveRankingFilter(filter: unknown): filter is IRemoveRankingFilterItem;

/**
 * Adds new attribute filter to filter bar and starts the filter customization flow.
 *
 * Contract:
 *
 * -  if KD is currently editing a dashboard, adds new attribute filter, starts customization flow; FilterAdded
 *    will be posted right after customization starts
 *
 * -  if KD is currently in view mode or does not show any dashboard, will post CommandFailed
 *
 * @public
 */
export declare type KdAddFilterCommand = IGdcKdMessageEvent<GdcKdCommandType.AddFilter, null>;

/**
 * @public
 */
export declare type KdAddFilterCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.AddFilter, null>;

/**
 * Adds new widget onto dashboard. New row will be created on top of the dashboard, the widget
 * will be placed into its first column.
 *
 * It is currently possible to add either a KPI or an Insight. When adding either of these, KD will
 * scroll to top so that the newly added widget is visible.
 *
 * For KPI, the KD will start the KPI customization flow right after the KPI is placed.
 * Insights are placed without need for further customization
 *
 * Contract:
 *
 * -  if KD is currently editing a dashboard, then depending on widget type:
 *    -  KPI is added to dashboard, customization flow is started, WidgetAdded will be posted
 *    -  Insight is added to dashboard, WidgetAdded will be posted
 *
 * -  if insight reference included in command payload does not refer to a valid insight, CommandFailed
 *    will be posted
 *
 * -  if KD is in view mode or not showing any dashboard, then CommandFailed will be posted
 *
 * @public
 */
export declare type KdAddWidgetCommand = IGdcKdMessageEvent<GdcKdCommandType.AddWidget, IKdAddWidgetBody>;

/**
 * @public
 */
export declare type KdAddWidgetCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.AddWidget, IKdAddWidgetBody>;

/**
 * Cancels editing and switches dashboard to view mode.
 *
 * Contract:
 *
 * -  if KD is currently editing dashboard, this will trigger switch to view mode, without popping up the
 *    dialog asking to discard unsaved changes. On success SwitchedToView will be posted
 * -  if KD is currently viewing dashboard, SwitchedToView will be posted back immediately
 * -  if KD is not currently showing any dashboard, CommandFailed is posted
 *
 * @public
 */
export declare type KdCancelEditCommand = IGdcKdMessageEvent<GdcKdCommandType.CancelEdit, null>;

/**
 * @public
 */
export declare type KdCancelEditCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.CancelEdit, null>;

/**
 * @public
 */
export declare type KdDashboardBody = IKdAvailableCommands & IKdDashboardObjectMeta;

/**
 * Deleted currently edited dashboard.
 *
 * Contract:
 *
 * -  if KD is currently editing dashboard, this will trigger delete without popping up the dialog
 *    asking for permission. On success DashboardDeleted will be posted
 *
 * -  if KD is currently viewing dashboard or not not showing any dashboard, CommandFailed will
 *    be posted
 *
 * @public
 */
export declare type KdDeleteDashboardCommand = IGdcKdMessageEvent<GdcKdCommandType.Delete, null>;

/**
 * @public
 */
export declare type KdDeleteDashboardCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.Delete, null>;

/**
 * Set drillable items.
 *
 * Contract:
 *
 * - Drillable items can be set by uris or identifiers of dashboard's measures/attributes
 * @public
 */
export declare type KdDrillableItemsCommand = IGdcKdMessageEvent<GdcKdCommandType.DrillableItems, IDrillableItemsCommandBody>;

/**
 * Data type of drillable items command
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See {@link IDrillableItemsCommandBody}
 * @public
 */
export declare type KdDrillableItemsCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.DrillableItems, IDrillableItemsCommandBody>;

/**
 * @public
 */
export declare type KdDrillToUrlFilters = Array<DashboardDateFilter | IDashboardAttributeFilter>;

/**
 * @public
 */
export declare type KdDrillToUrlResolvedData = IGdcKdMessageEnvelope<GdcKdEventType.DrillToUrlResolved, IKdDrillToUrlResolvedDataBody>;

/**
 * @public
 */
export declare type KdDrillToUrlStartedData = IGdcKdMessageEnvelope<GdcKdEventType.DrillToUrlStarted, IKdDrillToUrlStartedDataBody>;

/**
 * Exports dashboard to PDF.
 *
 * Contract:
 *
 * -  if KD shows dashboard in view mode, will export dashboard to PDF and post ExportFinished once ready for
 *    exporting
 * -  if KD shows dashboard in edit mode or not not showing any dashboard, CommandFailed will
 *    be posted
 * @public
 */
export declare type KdExportToPdfCommand = IGdcKdMessageEvent<GdcKdCommandType.ExportToPdf, null>;

/**
 * @public
 */
export declare type KdExportToPdfCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.ExportToPdf, null>;

/**
 * @public
 */
export declare type KdExportToPdfFinishedBody = IKdAvailableCommands & {
    /**
     * Link to the file containing exported data.
     */
    link: string;
};

/**
 * This event is emitted after dashboard has been exported to PDF
 * @public
 */
export declare type KdExportToPdfFinishedData = IGdcKdMessageEnvelope<GdcKdEventType.ExportedToPdf, KdExportToPdfFinishedBody>;

/**
 * @public
 */
export declare type KdFilterAddedBody = IKdAvailableCommands;

/**
 * This event is emitted after KD added a new filter to dashboard's filter bar and started its
 * customization flow.
 *
 * Note: users can still cancel the filter customization flow meaning no new attribute filter
 * will end on the filter bar.
 * @public
 */
export declare type KdFilterAddedData = IGdcKdMessageEnvelope<GdcKdEventType.FilterAdded, KdFilterAddedBody>;

/**
 * Main data of Filter context changed event
 * @public
 */
export declare type KdFilterContextChangedBody = IKdAvailableCommands & IFilterContextContent;

/**
 * Data type of event that was emitted after finishing change filter context
 *
 * Note: The main event data was wrapped to application and product data structure
 * @public
 */
export declare type KdFilterContextChangedData = IGdcKdMessageEnvelope<GdcKdEventType.FilterContextChanged, KdFilterContextChangedBody>;

/**
 * Type that represents `InsightSaved` event data. For more information look at `InsightSaved`.
 *
 * @public
 */
export declare type KdInsightSavedData = IGdcKdMessageEnvelope<GdcKdEventType.InsightSaved, IKdInsightSavedBody>;

/**
 * This event is emitted When User does not have permissions to view or edit the content
 * @public
 */
export declare type KdNoPermissionsEventData = IGdcKdMessageEnvelope<GdcKdEventType.NoPermissions, IKdNoPermissionsBody>;

/**
 * Open delete dashboard dialog, user will be able to delete currently existing dashboard
 *
 * Contract:
 *
 * if KD is currently editing dashboard, this command will try to open the dialog to delete currently existing dashboard,
 *      on success DeleteDashboardDialogOpened will be posted
 * commandFailed will be posted when:
 *      KD is currently viewing dashboard or
 *      No dashboard showing or
 *      The current user does not have the permission to delete existing objects or,
 *      Delete dashboard dialog is opened
 *
 * @public
 */
export declare type KdOpenDeleteDashboardDialogCommand = IGdcKdMessageEvent<GdcKdCommandType.OpenDeleteDashboardDialog, null>;

/**
 * @public
 */
export declare type KdOpenDeleteDashboardDialogCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.OpenDeleteDashboardDialog, null>;

/**
 * Open the schedule email dialog, user will be able to schedule periodic exports of the current dashboard
 *
 * Contract:
 *
 * -  if KD is currently viewing dashboard, this command will try to open the dialog to schedule an email,
 *    on success ScheduleEmailDialogOpened will be posted
 * -  if KD is currently editing dashboard or is not currently showing any dashboard or schedule email dialog is opened,
 *    commandFailed will be posted
 *
 * @public
 */
export declare type KdOpenScheduleEmailDialogCommand = IGdcKdMessageEvent<GdcKdCommandType.OpenScheduleEmailDialog, null>;

/**
 * @public
 */
export declare type KdOpenScheduleEmailDialogCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.OpenScheduleEmailDialog, null>;

/**
 * @public
 */
export declare type KdPlatformData = IGdcKdMessageEnvelope<GdcKdEventType.Platform, IKdPlatformBody>;

/**
 * Remove the filter context
 * Contract:
 * - if filters are in the filter bar, then remove the filters on the filter bar and update insight
 * - if filters are not in the filter bar and then a CommandFailed will be posted.
 *
 * @public
 */
export declare type KdRemoveFilterContextCommand = IGdcKdMessageEvent<GdcKdCommandType.RemoveFilterContext, IRemoveFilterContextContent>;

/**
 * Data type of removeFilterContext command
 *
 * @public
 */
export declare type KdRemoveFilterContextCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.RemoveFilterContext, IRemoveFilterContextContent>;

/**
 * Data type of event that was emitted after finishing remove filter context
 *
 * Note: The main event data was wrapped to application and product data structure
 * @public
 */
export declare type KdRemoveFilterContextFinishedData = IGdcKdMessageEnvelope<GdcKdEventType.RemoveFilterContextFinished, IKdAvailableCommands>;

/**
 * This event is emitted when the content is fully loaded
 * @public
 */
export declare type KdResizedEventData = IGdcKdMessageEnvelope<GdcKdEventType.Resized, IKdResizedBody>;

/**
 * Creates a new dashboard from an existing dashboard
 *
 * Contract:
 *
 * -  if KD saves as new an existing dashboard in view mode, the DashboardSaved event will be posted,
 * the new duplicated dashboard doesn't apply changes from the filter bar.
 *
 * -  if KD saves as new an existing dashboard in edit mode, the DashboardSaved event will be posted,
 * the new duplicated dashboard applies all changes from the existing dashboard like
 * title, filter context, insight widgets, layout...
 *
 * -  if KD saves as new an existing dashboard in the locked dashboard but the user can create new dashboard,
 * the DashboardSaved event will be posted, the new duplicated dashboard won't be locked.
 *
 * -  if KD doesn't have an existing dashboard, no permission to create dashboard or the title is empty,
 * CommandFailed is posted
 *
 * @public
 */
export declare type KdSaveAsDashboardCommand = IGdcKdMessageEvent<GdcKdCommandType.SaveAsDashboard, IKdSaveCommandBody>;

/**
 * @public
 */
export declare type KdSaveAsDashboardCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.SaveAsDashboard, IKdSaveCommandBody>;

/**
 * Saves current dashboard.
 *
 * Contract:
 *
 * -  if currently edited dashboard IS NOT eligible for save (empty, in-error), then CommandFailed event
 *    will be posted
 * -  if the specified title is invalid / does not match title validation rules, then CommandFailed event
 *    will be posted
 * -  otherwise dashboard WILL be saved with the title as specified in the body and the DashboardSaved event
 *    will be posted
 * -  the DashboardSaved event will be posted even when saving dashboard that has not changed but would
 *    otherwise be eligible for saving (not empty, not in-error)
 *
 * Note: sending Save command with different title means dashboard will be saved with that new title.
 *
 * @public
 */
export declare type KdSaveDashboardCommand = IGdcKdMessageEvent<GdcKdCommandType.Save, IKdSaveCommandBody>;

/**
 * @public
 */
export declare type KdSaveDashboardCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.Save, IKdSaveCommandBody>;

/**
 * Sets API token.
 *
 * Contract:
 *
 * -  received value is set as API token into the backend instance that will be used by KD for all
 *      the subsequent backend calls. If the token is invalid, the subsequent backend calls will
 *      start to fail.
 *
 * @public
 */
export declare type KdSetApiTokenCommand = IGdcKdMessageEvent<GdcKdCommandType.SetApiToken, IKdSetApiTokenBody>;

/**
 * Data type of set API token command
 *
 * Note: The main event data was wrapped to application and product data structure
 * @remarks See ISetApiTokenBody
 *
 * @public
 */
export declare type KdSetApiTokenCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.SetApiToken, IKdSetApiTokenBody>;

/**
 * Add or update the filter context
 *
 * Contract:
 * - If filters are same with filters on the KD filter bar, then update the filters on the filter bar
 *   and apply the filters to dashboard
 * - In edit mode, if filters are new and then add them to the KD filter bar and apply to dashboard
 * - In-case the KD can not apply the filters, a CommandFailed will be posted. The reason could be:
 *   - Add new filter in view mode
 *   - Filter is not existed in the dataset
 *   - Filter is existed but wrong elements input data
 *   - Exceed the limit number of filter items
 *
 * @public
 */
export declare type KdSetFilterContextCommand = IGdcKdMessageEvent<GdcKdCommandType.SetFilterContext, IFilterContextContent>;

/**
 * Data type of {@link KdSetFilterContextCommand} command
 *
 * @public
 */
export declare type KdSetFilterContextCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.SetFilterContext, IFilterContextContent>;

/**
 * Data type of event that was emitted after finishing set filter context
 *
 * Note: The main event data was wrapped to application and product data structure
 * @public
 */
export declare type KdSetFilterContextFinishedData = IGdcKdMessageEnvelope<GdcKdEventType.SetFilterContextFinished, IKdAvailableCommands>;

/**
 * Command that sets filter dependencies on other filters. This command can return `SetFilterParentsFailed` event
 * if it failed. Otherwise `SetFilterParentsFinished` is sent on success. For more information about all errors,
 * look at`SetFilterParentsFailed` event.
 *
 * ## Use
 *
 * ### Add filter parents
 *
 * To connect filter `A` to parent `B` and `C` you need to know display forms of all filters, also connecting attribute
 * of `A` with `B` and `A` with `C`. Create one `ISetFilterParentsItem` with filter display form `A` and two parent display forms
 * `B` and `C` with their common attributes shared with `A`.
 *
 * ### Remove filter parents
 *
 * If you want to remove connection between `A`, `B`, `C` just create `ISetFilterParentsItem` with `A` filter and empty array
 * `parents` property.
 *
 * ## Filter references
 *
 * All referenced filters need to be present on a dashboard. They are referenced by attribute display form. If filter or parent filter
 * is not found it will result in `FilterNotFound` error
 *
 * ## Circular dependency
 *
 * One filter can have multiple parents but filters can not depend on themselves, even over another filter. For example
 * case `A -> B -> A` will result in error `CircularDependency`
 *
 * ## Other invalid cases
 *
 * Referencing same filter multiple times in `filters` property is not allowed and will result in `DuplicateFilters`
 * error. Referencing same parent multiple times in single filter item is also not allowed and will result in
 * `DuplicateParents` error. If filter and its parent does not share connecting attribute it will result in
 * `IncompatibleConnectingAttribute` error.
 *
 * @public
 */
export declare type KdSetFilterParentsCommand = IGdcKdMessageEvent<GdcKdCommandType.SetFilterParents, IKdSetFilterParentsDataBody>;

/**
 * Type that represents `SetFilterParentsCommand` data. For more information on use look at {@link KdSetFilterParentsCommand}
 *
 * @public
 */
export declare type KdSetFilterParentsCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.SetFilterParents, IKdSetFilterParentsDataBody>;

/**
 * Error type within AppCommandFailed event body when setFilterParents command is not successful
 *
 * @public
 */
export declare enum KdSetFilterParentsErrorCode {
    /**
     * Command data format is invalid e.g. missing properties or wrong types.
     */
    InvalidDataFormat = "invalidDataFormat",
    /**
     * Attribute filter display form has invalid ref, or display form does not exist in workspace.
     */
    InvalidAttributeFilterDisplayForm = "invalidAttributeFilterDisplayForm",
    /**
     * Parent filter display form has invalid ref or does not exist in workspace.
     */
    InvalidParentFilterDisplayForm = "invalidParentFilterDisplayForm",
    /**
     * Filter is not on a dashboard.
     */
    FilterNotFound = "filterNotFound",
    /**
     * Filter can not depend on itself.
     */
    CircularDependency = "circularDependency",
    /**
     * Connecting attribute is invalid, or does not exist in workspace.
     */
    InvalidConnectingAttribute = "invalidConnectingAttribute",
    /**
     * Connecting attribute is not shared between filter and parent.
     */
    IncompatibleConnectingAttribute = "incompatibleConnectingAttribute",
    /**
     * Multiple filters with same id in single command.
     */
    DuplicateFilters = "duplicateFilters",
    /**
     * Multiple parents with same id in single filter.
     */
    DuplicateParents = "duplicateParents"
}

/**
 * Event that is sent when `SetFilterParents` command failed. it contains error code `SetFilterParentsErrorCode` for more
 * information about all possible error codes look at `SetFilterParentsErrorCode`.
 *
 * @public
 */
export declare type KdSetFilterParentsFailed = IGdcKdMessageEvent<GdcKdEventType.SetFilterParentsFailed, IKdSetFilterParentsFailedDataBody>;

/**
 * Type that represents `SetFilterParentsFailed` event data. For more information look at `SetFilterParentsFailed`.
 *
 * @public
 */
export declare type KdSetFilterParentsFailedData = IGdcKdMessageEnvelope<GdcKdEventType.SetFilterParentsFailed, IKdSetFilterParentsFailedDataBody>;

/**
 * Event that is sent after `SetFilterParents` is successfully finished event. It also contains availableCommands.
 *
 * @public
 */
export declare type KdSetFilterParentsFinished = IGdcKdMessageEvent<GdcKdEventType.SetFilterParentsFinished, IKdAvailableCommands>;

/**
 * Type that represents `SetFilterParentsFinished` data. For more information look at `SetFilterParentsFinished`
 *
 * @public
 */
export declare type KdSetFilterParentsFinishedData = IGdcKdMessageEnvelope<GdcKdEventType.SetFilterParentsFinished, IKdAvailableCommands>;

/**
 * Type that represents filter on a dashboard. At the moment it can only be an attribute filter
 *
 * @public
 */
export declare type KdSetFilterParentsItemFilter = IKdSetFilterParentsAttributeFilter;

/**
 * @public
 */
export declare type KdSetSizeCommand = IGdcKdMessageEvent<GdcKdCommandType.SetSize, IKdSetSizeCommandBody>;

/**
 * @public
 */
export declare type KdSetSizeCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.SetSize, IKdSetSizeCommandBody>;

/**
 * This event is emitted after KD switched a dashboard from view mode to edit mode.
 * @public
 */
export declare type KdSwitchedToEditData = IGdcKdMessageEnvelope<GdcKdEventType.SwitchedToEdit, KdDashboardBody>;

/**
 * This event is emitted after KD switched a dashboard from edit mode to view mode.
 * @public
 */
export declare type KdSwitchedToViewData = IGdcKdMessageEnvelope<GdcKdEventType.SwitchedToView, KdDashboardBody>;

/**
 * Switches current dashboard to edit mode.
 *
 * Contract:
 *
 * -  if KD shows dashboard in view mode, will switch to edit mode and post SwitchedToEdit once ready for
 *    editing
 * -  if KD shows dashboard in edit mode, will keep edit mode and post SwitchedToEdit as if just switched
 *    from view mode
 * -  if no dashboard currently displayed, posts CommandFailed
 *
 * @public
 */
export declare type KdSwitchToEditCommand = IGdcKdMessageEvent<GdcKdCommandType.SwitchToEdit, null>;

/**
 * @public
 */
export declare type KdSwitchToEditCommandData = IGdcKdMessageEnvelope<GdcKdCommandType.SwitchToEdit, null>;

/**
 * This event is emitted after KD added a new widget to a dashboard. If the widget is
 * an insight, then meta information about the insight will be returned.
 *
 * Note: when this event is added for a KPI widget, it means the customization flow for the KPI has
 * started. The user may still 'just' click somewhere outside of the KPI configuration and the KPI will
 * be discarded.
 *
 * @public
 */
export declare type KdWidgetAddedData = IGdcKdMessageEnvelope<GdcKdEventType.WidgetAdded, IKdAddedWidgetBody>;

/**
 * @public
 */
export declare type ObjQualifier = ObjQualifier_2;

/**
 * @public
 */
export declare type RankingFilterOperator = "TOP" | "BOTTOM";

/**
 * @public
 */
export declare type RelativeType = "relative";

/**
 * @public
 */
export declare type RemoveFilterItem = IRemoveDateFilterItem | IRemoveAttributeFilterItem | IRemoveRankingFilterItem;

/**
 * @public
 */
export declare type ResolvedDateFilterValues = IResolvedDateFilterValue[];

export { }
