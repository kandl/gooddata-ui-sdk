import { DashboardCommands } from "../commands/index.js";
import { DashboardEvents, DashboardEventType } from "../events/index.js";
/**
 * Hook that takes command creator and event handlers and returns function
 * that will result into dispatching this command, registering the event handlers,
 * and unregistering them once event type with the same type and correlation ID is triggered.
 *
 * @remarks
 * If no correlationId is provided, it's auto-generated.

 * @param commandCreator - command factory
 * @param eventHandlers - record with eventTypes as keys and relevant callbacks as values
 * @param onBeforeRun - provide callback that will be called before dispatching the command
 * @returns callback that dispatches the command, registers relevant event handlers and unregisters them
 *          when an event that matches the correlation ID and one of the specified event types occurs
 * @internal
 */
export declare const useDashboardCommand: <TCommand extends DashboardCommands, TArgs extends any[]>(commandCreator: (...args: TArgs) => TCommand, eventHandlers?: {
    "GDC.DASH/EVT.COMMAND.FAILED"?: ((event: import("../events/general.js").DashboardCommandFailed<any>) => void) | undefined;
    "GDC.DASH/EVT.COMMAND.REJECTED"?: ((event: import("../events/general.js").DashboardCommandRejected) => void) | undefined;
    "GDC.DASH/EVT.COMMAND.STARTED"?: ((event: import("../events/general.js").DashboardCommandStarted<any>) => void) | undefined;
    "GDC.DASH/EVT.QUERY.FAILED"?: ((event: import("../events/general.js").DashboardQueryFailed) => void) | undefined;
    "GDC.DASH/EVT.QUERY.REJECTED"?: ((event: import("../events/general.js").DashboardQueryRejected) => void) | undefined;
    "GDC.DASH/EVT.QUERY.STARTED"?: ((event: import("../events/general.js").DashboardQueryStarted) => void) | undefined;
    "GDC.DASH/EVT.QUERY.COMPLETED"?: ((event: import("../events/general.js").DashboardQueryCompleted<any, any>) => void) | undefined;
    "GDC.DASH/EVT.USER_INTERACTION.TRIGGERED"?: ((event: import("../events/userInteraction.js").DashboardUserInteractionTriggered) => void) | undefined;
    "GDC.DASH/EVT.INITIALIZED"?: ((event: import("../events/dashboard.js").DashboardInitialized) => void) | undefined;
    "GDC.DASH/EVT.DEINITIALIZED"?: ((event: import("../events/dashboard.js").DashboardDeinitialized) => void) | undefined;
    "GDC.DASH/EVT.SAVED"?: ((event: import("../events/dashboard.js").DashboardSaved) => void) | undefined;
    "GDC.DASH/EVT.COPY_SAVED"?: ((event: import("../events/dashboard.js").DashboardCopySaved) => void) | undefined;
    "GDC.DASH/EVT.RENAMED"?: ((event: import("../events/dashboard.js").DashboardRenamed) => void) | undefined;
    "GDC.DASH/EVT.RESET"?: ((event: import("../events/dashboard.js").DashboardWasReset) => void) | undefined;
    "GDC.DASH/EVT.DELETED"?: ((event: never) => void) | undefined;
    "GDC.DASH/EVT.RENDER_MODE.CHANGED"?: ((event: import("../events/renderMode.js").DashboardRenderModeChanged) => void) | undefined;
    "GDC.DASH/EVT.EXPORT.PDF.REQUESTED"?: ((event: import("../events/dashboard.js").DashboardExportToPdfRequested) => void) | undefined;
    "GDC.DASH/EVT.EXPORT.PDF.RESOLVED"?: ((event: import("../events/dashboard.js").DashboardExportToPdfResolved) => void) | undefined;
    "GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.VALIDATION.FAILED"?: ((event: import("../events/dashboard.js").DateFilterValidationFailed) => void) | undefined;
    "GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.SELECTION_CHANGED"?: ((event: import("../events/filters.js").DashboardDateFilterSelectionChanged) => void) | undefined;
    "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.ADDED"?: ((event: import("../events/filters.js").DashboardAttributeFilterAdded) => void) | undefined;
    "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.REMOVED"?: ((event: import("../events/filters.js").DashboardAttributeFilterRemoved) => void) | undefined;
    "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.MOVED"?: ((event: import("../events/filters.js").DashboardAttributeFilterMoved) => void) | undefined;
    "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_CHANGED"?: ((event: import("../events/filters.js").DashboardAttributeFilterSelectionChanged) => void) | undefined;
    "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.PARENT_CHANGED"?: ((event: import("../events/filters.js").DashboardAttributeFilterParentChanged) => void) | undefined;
    "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.DISPLAY_FORM_CHANGED"?: ((event: never) => void) | undefined;
    "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_MODE_CHANGED"?: ((event: import("../events/filters.js").DashboardAttributeSelectionModeChanged) => void) | undefined;
    "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.TITLE_CHANGED"?: ((event: import("../events/filters.js").DashboardAttributeTitleChanged) => void) | undefined;
    "GDC.DASH/EVT.FILTER_CONTEXT.CHANGED"?: ((event: import("../events/filters.js").DashboardFilterContextChanged) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ADDED"?: ((event: import("../events/layout.js").DashboardLayoutSectionAdded) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_MOVED"?: ((event: import("../events/layout.js").DashboardLayoutSectionMoved) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_REMOVED"?: ((event: import("../events/layout.js").DashboardLayoutSectionRemoved) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_HEADER_CHANGED"?: ((event: import("../events/layout.js").DashboardLayoutSectionHeaderChanged) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ITEM_WIDTH_RESIZED"?: ((event: never) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ITEMS_HEIGHT_RESIZED"?: ((event: never) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.ITEMS_ADDED"?: ((event: import("../events/layout.js").DashboardLayoutSectionItemsAdded) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REPLACED"?: ((event: import("../events/layout.js").DashboardLayoutSectionItemReplaced) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED"?: ((event: import("../events/layout.js").DashboardLayoutSectionItemMoved) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED_TO_NEW_SECTION"?: ((event: never) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REMOVED"?: ((event: import("../events/layout.js").DashboardLayoutSectionItemRemoved) => void) | undefined;
    "GDC.DASH/EVT.FLUID_LAYOUT.LAYOUT_CHANGED"?: ((event: import("../events/layout.js").DashboardLayoutChanged) => void) | undefined;
    "GDC.DASH/EVT.KPI_WIDGET.HEADER_CHANGED"?: ((event: import("../events/kpi.js").DashboardKpiWidgetHeaderChanged) => void) | undefined;
    "GDC.DASH/EVT.KPI_WIDGET.DESCRIPTION_CHANGED"?: ((event: import("../events/kpi.js").DashboardKpiWidgetDescriptionChanged) => void) | undefined;
    "GDC.DASH/EVT.KPI_WIDGET.CONFIGURATION_CHANGED"?: ((event: import("../events/kpi.js").DashboardKpiWidgetConfigurationChanged) => void) | undefined;
    "GDC.DASH/EVT.KPI_WIDGET.MEASURE_CHANGED"?: ((event: import("../events/kpi.js").DashboardKpiWidgetMeasureChanged) => void) | undefined;
    "GDC.DASH/EVT.KPI_WIDGET.FILTER_SETTINGS_CHANGED"?: ((event: import("../events/kpi.js").DashboardKpiWidgetFilterSettingsChanged) => void) | undefined;
    "GDC.DASH/EVT.KPI_WIDGET.COMPARISON_CHANGED"?: ((event: import("../events/kpi.js").DashboardKpiWidgetComparisonChanged) => void) | undefined;
    "GDC.DASH/EVT.KPI_WIDGET.DRILL_REMOVED"?: ((event: import("../events/kpi.js").DashboardKpiWidgetDrillRemoved) => void) | undefined;
    "GDC.DASH/EVT.KPI_WIDGET.DRILL_SET"?: ((event: import("../events/kpi.js").DashboardKpiWidgetDrillSet) => void) | undefined;
    "GDC.DASH/EVT.KPI_WIDGET.WIDGET_CHANGED"?: ((event: import("../events/kpi.js").DashboardKpiWidgetChanged) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.HEADER_CHANGED"?: ((event: import("../events/insight.js").DashboardInsightWidgetHeaderChanged) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.DESCRIPTION_CHANGED"?: ((event: import("../events/insight.js").DashboardInsightWidgetDescriptionChanged) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.FILTER_SETTINGS_CHANGED"?: ((event: import("../events/insight.js").DashboardInsightWidgetFilterSettingsChanged) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.PROPERTIES_CHANGED"?: ((event: import("../events/insight.js").DashboardInsightWidgetVisPropertiesChanged) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.CONFIGURATION_CHANGED"?: ((event: import("../events/insight.js").DashboardInsightWidgetVisConfigurationChanged) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.INSIGHT_SWITCHED"?: ((event: import("../events/insight.js").DashboardInsightWidgetInsightSwitched) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_MODIFIED"?: ((event: import("../events/insight.js").DashboardInsightWidgetDrillsModified) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_REMOVED"?: ((event: import("../events/insight.js").DashboardInsightWidgetDrillsRemoved) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.WIDGET_CHANGED"?: ((event: import("../events/insight.js").DashboardInsightWidgetChanged) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.EXPORT_REQUESTED"?: ((event: import("../events/insight.js").DashboardInsightWidgetExportRequested) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.EXPORT_RESOLVED"?: ((event: import("../events/insight.js").DashboardInsightWidgetExportResolved) => void) | undefined;
    "GDC.DASH/EVT.INSIGHT_WIDGET.REFRESHED"?: ((event: import("../events/insight.js").DashboardInsightWidgetRefreshed) => void) | undefined;
    "GDC.DASH/EVT.WIDGET.EXECUTION_STARTED"?: ((event: import("../events/widget.js").DashboardWidgetExecutionStarted) => void) | undefined;
    "GDC.DASH/EVT.WIDGET.EXECUTION_FAILED"?: ((event: import("../events/widget.js").DashboardWidgetExecutionFailed) => void) | undefined;
    "GDC.DASH/EVT.WIDGET.EXECUTION_SUCCEEDED"?: ((event: import("../events/widget.js").DashboardWidgetExecutionSucceeded) => void) | undefined;
    "GDC.DASH/EVT.ALERT.CREATED"?: ((event: import("../events/alerts.js").DashboardAlertCreated) => void) | undefined;
    "GDC.DASH/EVT.ALERT.UPDATED"?: ((event: import("../events/alerts.js").DashboardAlertUpdated) => void) | undefined;
    "GDC.DASH/EVT.ALERTS.REMOVED"?: ((event: import("../events/alerts.js").DashboardAlertsRemoved) => void) | undefined;
    "GDC.DASH/EVT.SCHEDULED_EMAIL.CREATED"?: ((event: import("../events/scheduledEmail.js").DashboardScheduledEmailCreated) => void) | undefined;
    "GDC.DASH/EVT.SCHEDULED_EMAIL.SAVED"?: ((event: import("../events/scheduledEmail.js").DashboardScheduledEmailSaved) => void) | undefined;
    "GDC.DASH/EVT.DRILL.REQUESTED"?: ((event: import("../events/drill.js").DashboardDrillRequested) => void) | undefined;
    "GDC.DASH/EVT.DRILL.RESOLVED"?: ((event: import("../events/drill.js").DashboardDrillResolved) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_DOWN.REQUESTED"?: ((event: import("../events/drill.js").DashboardDrillDownRequested) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_DOWN.RESOLVED"?: ((event: import("../events/drill.js").DashboardDrillDownResolved) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.REQUESTED"?: ((event: import("../events/drill.js").DashboardDrillToInsightRequested) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.RESOLVED"?: ((event: import("../events/drill.js").DashboardDrillToInsightResolved) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.REQUESTED"?: ((event: import("../events/drill.js").DashboardDrillToDashboardRequested) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.RESOLVED"?: ((event: import("../events/drill.js").DashboardDrillToDashboardResolved) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.REQUESTED"?: ((event: import("../events/drill.js").DashboardDrillToAttributeUrlRequested) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.RESOLVED"?: ((event: import("../events/drill.js").DashboardDrillToAttributeUrlResolved) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.REQUESTED"?: ((event: import("../events/drill.js").DashboardDrillToCustomUrlRequested) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.RESOLVED"?: ((event: import("../events/drill.js").DashboardDrillToCustomUrlResolved) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.REQUESTED"?: ((event: import("../events/drill.js").DashboardDrillToLegacyDashboardRequested) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.RESOLVED"?: ((event: import("../events/drill.js").DashboardDrillToLegacyDashboardResolved) => void) | undefined;
    "GDC.DASH/EVT.DRILL.DRILLABLE_ITEMS.CHANGED"?: ((event: import("../events/drill.js").DashboardDrillableItemsChanged) => void) | undefined;
    "GDC.DASH/EVT.DRILL_TARGETS.ADDED"?: ((event: never) => void) | undefined;
    "GDC.DASH/EVT.RENDER.REQUESTED"?: ((event: import("../events/render.js").DashboardRenderRequested) => void) | undefined;
    "GDC.DASH/EVT.RENDER.ASYNC.REQUESTED"?: ((event: import("../events/render.js").DashboardAsyncRenderRequested) => void) | undefined;
    "GDC.DASH/EVT.RENDER.ASYNC.RESOLVED"?: ((event: import("../events/render.js").DashboardAsyncRenderResolved) => void) | undefined;
    "GDC.DASH/EVT.RENDER.RESOLVED"?: ((event: import("../events/render.js").DashboardRenderResolved) => void) | undefined;
    "GDC.DASH/EVT.SHARING.CHANGED"?: ((event: import("../events/dashboard.js").DashboardSharingChanged) => void) | undefined;
    "GDC.DASH/EVT.CREATE_INSIGHT_REQUESTED"?: ((event: import("../events/lab.js").CreateInsightRequested) => void) | undefined;
} | undefined, onBeforeRun?: ((command: TCommand) => void) | undefined) => (...args: TArgs) => void;
