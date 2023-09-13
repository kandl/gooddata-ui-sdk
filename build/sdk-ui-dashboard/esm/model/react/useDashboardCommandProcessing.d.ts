import { DashboardCommands } from "../commands/index.js";
import { DashboardEvents, DashboardEventType } from "../events/index.js";
/**
 * @internal
 */
export type CommandProcessingStatus = "running" | "success" | "error";
/**
 * @internal
 */
export declare const useDashboardCommandProcessing: <TCommand extends DashboardCommands, TCommandCreatorArgs extends any[], TSuccessEventType extends DashboardEventType, TErrorEventType extends DashboardEventType>({ commandCreator, successEvent, errorEvent, onSuccess, onError, onBeforeRun, }: {
    commandCreator: (...args: TCommandCreatorArgs) => TCommand;
    successEvent: TSuccessEventType;
    errorEvent: TErrorEventType;
    onSuccess?: ((event: Extract<import("../events/general.js").DashboardCommandStarted<any>, {
        type: TSuccessEventType;
    }> | Extract<import("../events/general.js").DashboardCommandFailed<any>, {
        type: TSuccessEventType;
    }> | Extract<import("../events/general.js").DashboardCommandRejected, {
        type: TSuccessEventType;
    }> | Extract<import("../events/general.js").DashboardQueryRejected, {
        type: TSuccessEventType;
    }> | Extract<import("../events/general.js").DashboardQueryFailed, {
        type: TSuccessEventType;
    }> | Extract<import("../events/general.js").DashboardQueryStarted, {
        type: TSuccessEventType;
    }> | Extract<import("../events/general.js").DashboardQueryCompleted<any, any>, {
        type: TSuccessEventType;
    }> | Extract<import("../events/dashboard.js").DashboardInitialized, {
        type: TSuccessEventType;
    }> | Extract<import("../events/dashboard.js").DashboardDeinitialized, {
        type: TSuccessEventType;
    }> | Extract<import("../events/dashboard.js").DashboardSaved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/dashboard.js").DashboardCopySaved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/dashboard.js").DashboardRenamed, {
        type: TSuccessEventType;
    }> | Extract<import("../events/dashboard.js").DashboardWasReset, {
        type: TSuccessEventType;
    }> | Extract<import("../events/dashboard.js").DateFilterValidationFailed, {
        type: TSuccessEventType;
    }> | Extract<import("../events/dashboard.js").DashboardExportToPdfRequested, {
        type: TSuccessEventType;
    }> | Extract<import("../events/dashboard.js").DashboardExportToPdfResolved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/dashboard.js").DashboardSharingChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/filters.js").DashboardDateFilterSelectionChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeFilterAdded, {
        type: TSuccessEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeFilterRemoved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeFilterMoved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeFilterSelectionChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeFilterParentChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeTitleChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeSelectionModeChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/filters.js").DashboardFilterContextChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionAdded, {
        type: TSuccessEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionMoved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionRemoved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionHeaderChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionItemsAdded, {
        type: TSuccessEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionItemReplaced, {
        type: TSuccessEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionItemMoved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionItemRemoved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetHeaderChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetDescriptionChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetConfigurationChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetMeasureChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetFilterSettingsChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetComparisonChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetDrillRemoved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetDrillSet, {
        type: TSuccessEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetHeaderChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetDescriptionChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetFilterSettingsChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetVisPropertiesChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetVisConfigurationChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetInsightSwitched, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetDrillsModified, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetDrillsRemoved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetExportRequested, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetExportResolved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetRefreshed, {
        type: TSuccessEventType;
    }> | Extract<import("../events/widget.js").DashboardWidgetExecutionStarted, {
        type: TSuccessEventType;
    }> | Extract<import("../events/widget.js").DashboardWidgetExecutionFailed, {
        type: TSuccessEventType;
    }> | Extract<import("../events/widget.js").DashboardWidgetExecutionSucceeded, {
        type: TSuccessEventType;
    }> | Extract<import("../events/alerts.js").DashboardAlertCreated, {
        type: TSuccessEventType;
    }> | Extract<import("../events/alerts.js").DashboardAlertsRemoved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/alerts.js").DashboardAlertUpdated, {
        type: TSuccessEventType;
    }> | Extract<import("../events/scheduledEmail.js").DashboardScheduledEmailCreated, {
        type: TSuccessEventType;
    }> | Extract<import("../events/scheduledEmail.js").DashboardScheduledEmailSaved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/userInteraction.js").DashboardUserInteractionTriggered, {
        type: TSuccessEventType;
    }> | Extract<import("../events/render.js").DashboardRenderRequested, {
        type: TSuccessEventType;
    }> | Extract<import("../events/render.js").DashboardAsyncRenderRequested, {
        type: TSuccessEventType;
    }> | Extract<import("../events/render.js").DashboardAsyncRenderResolved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/render.js").DashboardRenderResolved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillRequested, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillResolved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillDownRequested, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillDownResolved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToInsightRequested, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToInsightResolved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToDashboardRequested, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToDashboardResolved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToCustomUrlRequested, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToCustomUrlResolved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToAttributeUrlRequested, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToAttributeUrlResolved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToLegacyDashboardRequested, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToLegacyDashboardResolved, {
        type: TSuccessEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillableItemsChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/renderMode.js").DashboardRenderModeChanged, {
        type: TSuccessEventType;
    }> | Extract<import("../events/lab.js").CreateInsightRequested, {
        type: TSuccessEventType;
    }>) => void) | undefined;
    onError?: ((event: Extract<import("../events/general.js").DashboardCommandStarted<any>, {
        type: TErrorEventType;
    }> | Extract<import("../events/general.js").DashboardCommandFailed<any>, {
        type: TErrorEventType;
    }> | Extract<import("../events/general.js").DashboardCommandRejected, {
        type: TErrorEventType;
    }> | Extract<import("../events/general.js").DashboardQueryRejected, {
        type: TErrorEventType;
    }> | Extract<import("../events/general.js").DashboardQueryFailed, {
        type: TErrorEventType;
    }> | Extract<import("../events/general.js").DashboardQueryStarted, {
        type: TErrorEventType;
    }> | Extract<import("../events/general.js").DashboardQueryCompleted<any, any>, {
        type: TErrorEventType;
    }> | Extract<import("../events/dashboard.js").DashboardInitialized, {
        type: TErrorEventType;
    }> | Extract<import("../events/dashboard.js").DashboardDeinitialized, {
        type: TErrorEventType;
    }> | Extract<import("../events/dashboard.js").DashboardSaved, {
        type: TErrorEventType;
    }> | Extract<import("../events/dashboard.js").DashboardCopySaved, {
        type: TErrorEventType;
    }> | Extract<import("../events/dashboard.js").DashboardRenamed, {
        type: TErrorEventType;
    }> | Extract<import("../events/dashboard.js").DashboardWasReset, {
        type: TErrorEventType;
    }> | Extract<import("../events/dashboard.js").DateFilterValidationFailed, {
        type: TErrorEventType;
    }> | Extract<import("../events/dashboard.js").DashboardExportToPdfRequested, {
        type: TErrorEventType;
    }> | Extract<import("../events/dashboard.js").DashboardExportToPdfResolved, {
        type: TErrorEventType;
    }> | Extract<import("../events/dashboard.js").DashboardSharingChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/filters.js").DashboardDateFilterSelectionChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeFilterAdded, {
        type: TErrorEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeFilterRemoved, {
        type: TErrorEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeFilterMoved, {
        type: TErrorEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeFilterSelectionChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeFilterParentChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeTitleChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/filters.js").DashboardAttributeSelectionModeChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/filters.js").DashboardFilterContextChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionAdded, {
        type: TErrorEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionMoved, {
        type: TErrorEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionRemoved, {
        type: TErrorEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionHeaderChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionItemsAdded, {
        type: TErrorEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionItemReplaced, {
        type: TErrorEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionItemMoved, {
        type: TErrorEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutSectionItemRemoved, {
        type: TErrorEventType;
    }> | Extract<import("../events/layout.js").DashboardLayoutChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetHeaderChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetDescriptionChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetConfigurationChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetMeasureChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetFilterSettingsChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetComparisonChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetDrillRemoved, {
        type: TErrorEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetDrillSet, {
        type: TErrorEventType;
    }> | Extract<import("../events/kpi.js").DashboardKpiWidgetChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetHeaderChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetDescriptionChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetFilterSettingsChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetVisPropertiesChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetVisConfigurationChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetInsightSwitched, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetDrillsModified, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetDrillsRemoved, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetExportRequested, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetExportResolved, {
        type: TErrorEventType;
    }> | Extract<import("../events/insight.js").DashboardInsightWidgetRefreshed, {
        type: TErrorEventType;
    }> | Extract<import("../events/widget.js").DashboardWidgetExecutionStarted, {
        type: TErrorEventType;
    }> | Extract<import("../events/widget.js").DashboardWidgetExecutionFailed, {
        type: TErrorEventType;
    }> | Extract<import("../events/widget.js").DashboardWidgetExecutionSucceeded, {
        type: TErrorEventType;
    }> | Extract<import("../events/alerts.js").DashboardAlertCreated, {
        type: TErrorEventType;
    }> | Extract<import("../events/alerts.js").DashboardAlertsRemoved, {
        type: TErrorEventType;
    }> | Extract<import("../events/alerts.js").DashboardAlertUpdated, {
        type: TErrorEventType;
    }> | Extract<import("../events/scheduledEmail.js").DashboardScheduledEmailCreated, {
        type: TErrorEventType;
    }> | Extract<import("../events/scheduledEmail.js").DashboardScheduledEmailSaved, {
        type: TErrorEventType;
    }> | Extract<import("../events/userInteraction.js").DashboardUserInteractionTriggered, {
        type: TErrorEventType;
    }> | Extract<import("../events/render.js").DashboardRenderRequested, {
        type: TErrorEventType;
    }> | Extract<import("../events/render.js").DashboardAsyncRenderRequested, {
        type: TErrorEventType;
    }> | Extract<import("../events/render.js").DashboardAsyncRenderResolved, {
        type: TErrorEventType;
    }> | Extract<import("../events/render.js").DashboardRenderResolved, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillRequested, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillResolved, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillDownRequested, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillDownResolved, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToInsightRequested, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToInsightResolved, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToDashboardRequested, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToDashboardResolved, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToCustomUrlRequested, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToCustomUrlResolved, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToAttributeUrlRequested, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToAttributeUrlResolved, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToLegacyDashboardRequested, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillToLegacyDashboardResolved, {
        type: TErrorEventType;
    }> | Extract<import("../events/drill.js").DashboardDrillableItemsChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/renderMode.js").DashboardRenderModeChanged, {
        type: TErrorEventType;
    }> | Extract<import("../events/lab.js").CreateInsightRequested, {
        type: TErrorEventType;
    }>) => void) | undefined;
    onBeforeRun?: ((command: TCommand) => void) | undefined;
}) => {
    run: (...args: TCommandCreatorArgs) => void;
    status?: CommandProcessingStatus | undefined;
};
