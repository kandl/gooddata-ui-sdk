// (C) 2019-2023 GoodData Corporation
import { useCallback } from "react";
import { isInsightWidget, } from "@gooddata/sdk-model";
import isEqual from "lodash/isEqual.js";
import { useDashboardSelector, selectDashboardTitle, selectDashboardUriRef, selectCurrentUser, selectLocale, selectFilterContextFilters, selectDateFormat, selectWeekStart, selectEnableKPIDashboardScheduleRecipients, selectCanListUsersInWorkspace, selectEnableKPIDashboardSchedule, selectEnableInsightExportScheduling, selectOriginalFilterContextFilters, selectWidgets, isCustomWidget, selectCanExportTabular, selectScheduleEmailDialogDefaultAttachment, selectInsightsMap, } from "../../../model/index.js";
import { useCreateScheduledEmail } from "./useCreateScheduledEmail.js";
import { invariant } from "ts-invariant";
import { useSaveScheduledEmail } from "./useSaveScheduledEmail.js";
import { stripLocalIdentifierFromFilters } from "./utils/stripLocalIdentifierFromFilters.js";
export const useScheduledEmail = (props) => {
    const { onSubmit, onSubmitSuccess, onSubmitError, onSave, onSaveSuccess, onSaveError } = props;
    // Bear model expects that all refs are sanitized to uriRefs.
    const dashboardUriRef = useDashboardSelector(selectDashboardUriRef);
    // if this bombs then the controller code is bugged because it should not even allow to get
    // to this point for dashboards that are not persisted. scheduling is not possible for such
    // dashboards and so the respective menus to trigger the scheduling must not be present
    invariant(dashboardUriRef, "attempting to schedule email for unsaved dashboard");
    const dashboardTitle = useDashboardSelector(selectDashboardTitle);
    const dashboardWidgets = useDashboardSelector(selectWidgets);
    const dashboardInsights = useDashboardSelector(selectInsightsMap);
    const dashboardInsightWidgets = dashboardWidgets
        .filter(isInsightWidget)
        .filter((widget) => !isCustomWidget(widget))
        .map((widget) => {
        var _a;
        return Object.assign(Object.assign({}, widget), { visualizationUrl: (_a = dashboardInsights.get(widget.insight)) === null || _a === void 0 ? void 0 : _a.insight.visualizationUrl });
    });
    const currentUser = useDashboardSelector(selectCurrentUser);
    const locale = useDashboardSelector(selectLocale);
    const filters = useDashboardSelector(selectFilterContextFilters);
    const originalFilters = useDashboardSelector(selectOriginalFilterContextFilters);
    const dateFormat = useDashboardSelector(selectDateFormat);
    const weekStart = useDashboardSelector(selectWeekStart);
    const enableKPIDashboardScheduleRecipients = useDashboardSelector(selectEnableKPIDashboardScheduleRecipients);
    const canListUsersInWorkspace = useDashboardSelector(selectCanListUsersInWorkspace);
    const canExportTabular = useDashboardSelector(selectCanExportTabular);
    const enableKPIDashboardSchedule = useDashboardSelector(selectEnableKPIDashboardSchedule);
    const enableWidgetExportScheduling = useDashboardSelector(selectEnableInsightExportScheduling);
    const defaultAttachment = useDashboardSelector(selectScheduleEmailDialogDefaultAttachment);
    const scheduledEmailCreator = useCreateScheduledEmail({
        onSuccess: onSubmitSuccess,
        onError: onSubmitError,
        onBeforeRun: onSubmit,
    });
    // Compare filters without local identifiers as they are optional
    // which might cause false negative comparison result.
    const originalFiltersWithouLocalIdentifiers = stripLocalIdentifierFromFilters(originalFilters);
    const filtersWithoutLocalIdentifiers = stripLocalIdentifierFromFilters(filters);
    const hasDefaultFilters = isEqual(originalFiltersWithouLocalIdentifiers, filtersWithoutLocalIdentifiers);
    const handleCreateScheduledEmail = useCallback((scheduledEmail, customFilters) => {
        // If dashboard filters are not changed, do not save them to scheduled email filter context.
        // Like this, future filter changes stored in the original dashboard filter context
        // are correctly propagated to the scheduled emails with the original filter context.
        const filtersToStore = hasDefaultFilters ? undefined : filters;
        scheduledEmailCreator.create(scheduledEmail, customFilters !== null && customFilters !== void 0 ? customFilters : filtersToStore);
    }, [filters, hasDefaultFilters]);
    const scheduledEmailCreationStatus = scheduledEmailCreator.creationStatus;
    const scheduledEmailSaver = useSaveScheduledEmail({
        onSuccess: onSaveSuccess,
        onError: onSaveError,
        onBeforeRun: onSave,
    });
    const handleSaveScheduledEmail = useCallback((scheduledEmail, filterContextRef) => {
        scheduledEmailSaver.save(scheduledEmail, filterContextRef);
    }, []);
    const scheduledEmailSavingStatus = scheduledEmailSaver.savingStatus;
    return {
        dashboardRef: dashboardUriRef,
        dashboardTitle,
        dashboardInsightWidgets,
        hasDefaultFilters,
        canListUsersInWorkspace,
        canExportTabular,
        enableKPIDashboardSchedule,
        enableKPIDashboardScheduleRecipients,
        enableWidgetExportScheduling,
        dateFormat,
        weekStart,
        currentUser,
        locale,
        defaultAttachment,
        handleCreateScheduledEmail,
        scheduledEmailCreationStatus,
        handleSaveScheduledEmail,
        scheduledEmailSavingStatus,
    };
};
//# sourceMappingURL=useScheduledEmail.js.map