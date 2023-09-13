export { isDashboardEvent, isCustomDashboardEvent, isDashboardEventOrCustomDashboardEvent, } from "./base.js";
export { isDashboardSaved, isDashboardCopySaved, isDashboardInitialized, isDashboardDeinitialized, isDashboardRenamed, isDashboardWasReset, isDashboardDeleted, isDateFilterValidationFailed, isDashboardExportToPdfRequested, isDashboardExportToPdfResolved, isDashboardSharingChanged, } from "./dashboard.js";
export { isDashboardCommandStarted, isDashboardCommandFailed, isDashboardQueryFailed, isDashboardCommandRejected, isDashboardQueryCompleted, isDashboardQueryRejected, isDashboardQueryStarted, } from "./general.js";
export { isDashboardAttributeFilterAdded, isDashboardAttributeFilterMoved, isDashboardAttributeFilterParentChanged, isDashboardAttributeFilterRemoved, isDashboardAttributeFilterSelectionChanged, isDashboardAttributeFilterSelectionModeChanged, isDashboardAttributeFilterTitleChanged, isDashboardDateFilterSelectionChanged, isDashboardFilterContextChanged, } from "./filters.js";
export { isDashboardLayoutChanged, isDashboardLayoutSectionAdded, isDashboardLayoutSectionHeaderChanged, isDashboardLayoutSectionItemMoved, isDashboardLayoutSectionItemRemoved, isDashboardLayoutSectionItemReplaced, isDashboardLayoutSectionItemsAdded, isDashboardLayoutSectionMoved, isDashboardLayoutSectionRemoved, } from "./layout.js";
export { isDashboardKpiWidgetChanged, isDashboardKpiWidgetComparisonChanged, isDashboardKpiWidgetFilterSettingsChanged, isDashboardKpiWidgetHeaderChanged, isDashboardKpiWidgetDescriptionChanged, isDashboardKpiWidgetConfigurationChanged, isDashboardKpiWidgetMeasureChanged, isDashboardKpiWidgetDrillRemoved, isDashboardKpiWidgetDrillSet, } from "./kpi.js";
export { isDashboardInsightWidgetChanged, isDashboardInsightWidgetDrillsModified, isDashboardInsightWidgetDrillsRemoved, isDashboardInsightWidgetFilterSettingsChanged, isDashboardInsightWidgetHeaderChanged, isDashboardInsightWidgetDescriptionChanged, isDashboardInsightWidgetInsightSwitched, isDashboardInsightWidgetVisPropertiesChanged, isDashboardInsightWidgetVisConfigurationChanged, isDashboardInsightWidgetExportRequested, isDashboardInsightWidgetExportResolved, isDashboardInsightWidgetRefreshed, } from "./insight.js";
export { isDashboardWidgetExecutionStarted, isDashboardWidgetExecutionSucceeded, isDashboardWidgetExecutionFailed, } from "./widget.js";
export { isDashboardAlertCreated, isDashboardAlertsRemoved, isDashboardAlertUpdated, } from "./alerts.js";
export { isDashboardScheduledEmailCreated, isDashboardScheduledEmailSaved, } from "./scheduledEmail.js";
export { isDashboardDrillDownRequested, isDashboardDrillDownResolved, isDashboardDrillRequested, isDashboardDrillResolved, isDashboardDrillToAttributeUrlRequested, isDashboardDrillToAttributeUrlResolved, isDashboardDrillToCustomUrlRequested, isDashboardDrillToCustomUrlResolved, isDashboardDrillToDashboardRequested, isDashboardDrillToDashboardResolved, isDashboardDrillToInsightRequested, isDashboardDrillToInsightResolved, isDashboardDrillToLegacyDashboardRequested, isDashboardDrillToLegacyDashboardResolved, isDashboardDrillableItemsChanged, } from "./drill.js";
export { drillTargetsAdded, isDrillTargetsAdded, } from "./drillTargets.js";
export * from "./userInteraction.js";
export { isDashboardAsyncRenderRequested, isDashboardAsyncRenderResolved, isDashboardRenderRequested, isDashboardRenderResolved, } from "./render.js";
export { isDashboardRenderModeChanged, } from "./renderMode.js";
export { createInsightRequested, isCreateInsightRequested } from "./lab.js";
/**
 * Creates DashboardEvent predicate that test whether the provided event matches it.
 *
 * @alpha
 * @param eventType - dashboard event type
 * @param pred - predicate to test
 * @returns boolean - matches?
 */
export function newDashboardEventPredicate(eventType, pred) {
    return (event) => {
        var _a;
        if ((event === null || event === void 0 ? void 0 : event.type) !== eventType) {
            return false;
        }
        return (_a = pred === null || pred === void 0 ? void 0 : pred(event)) !== null && _a !== void 0 ? _a : true;
    };
}
//# sourceMappingURL=index.js.map