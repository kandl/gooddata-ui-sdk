// (C) 2019-2024 GoodData Corporation
import { useCallback } from "react";
import { GoodDataSdkError, ILocale } from "@gooddata/sdk-ui";
import {
    ObjRef,
    UriRef,
    IUser,
    FilterContextItem,
    WeekStart,
    isInsightWidget,
    IAutomationMdObject,
    IAutomationMdObjectDefinition,
    IInsightWidget,
} from "@gooddata/sdk-model";
import isEqual from "lodash/isEqual.js";

import {
    CommandProcessingStatus,
    useDashboardSelector,
    selectDashboardTitle,
    selectDashboardUriRef,
    selectCurrentUser,
    selectLocale,
    selectFilterContextFilters,
    selectDateFormat,
    selectWeekStart,
    selectEnableKPIDashboardScheduleRecipients,
    selectCanListUsersInWorkspace,
    selectEnableKPIDashboardSchedule,
    selectEnableInsightExportScheduling,
    selectOriginalFilterContextFilters,
    selectWidgets,
    isCustomWidget,
    selectCanExportTabular,
    selectScheduleEmailDialogDefaultAttachment,
    selectInsightsMap,
} from "../../../model/index.js";
import { useCreateScheduledEmail } from "./useCreateScheduledEmail.js";
import { invariant } from "ts-invariant";
import { useSaveScheduledEmail } from "./useSaveScheduledEmail.js";
import { stripLocalIdentifierFromFilters } from "./utils/stripLocalIdentifierFromFilters.js";

export interface IInsightWidgetExtended extends IInsightWidget {
    visualizationUrl?: string;
}

interface UseScheduledEmailResult {
    /**
     * Filters to apply to the exported dashboard attached to the scheduled email.
     */
    filters?: FilterContextItem[];

    /**
     * Reference of the dashboard to be attached to the scheduled email.
     */
    dashboardRef: UriRef;

    /**
     * Dashboard title. It's used as the default scheduled email subject.
     */
    dashboardTitle: string;

    /**
     * Analytical insights widgets on the dashboard
     */
    dashboardInsightWidgets: IInsightWidgetExtended[];

    /**
     * Filters on the dashboard have not been changed so the dashboard filters should be used for the schedule
     */
    hasDefaultFilters: boolean;

    /**
     * Has user permissions to list users in the workspace?
     */
    canListUsersInWorkspace?: boolean;

    /**
     * Has user permissions to export tabular?
     */
    canExportTabular?: boolean;

    /**
     * Is user able to create scheduled emails?
     */
    enableKPIDashboardSchedule?: boolean;

    /**
     * Is user able to send scheduled email to other recipients?
     */
    enableKPIDashboardScheduleRecipients?: boolean;

    /**
     * Is the new UI and workflow for scheduled emailing with widgets is enabled?
     */
    enableWidgetExportScheduling?: boolean;

    /**
     * Date format user for the date select and default scheduled email subject.
     */
    dateFormat?: string;

    /**
     * Define start day of the week. This value will be used for datepicker. Sunday will be used as a default.
     */
    weekStart?: WeekStart;

    /**
     * Currently logged in user. Current user has to be one of the recipients of the scheduled email.
     */
    currentUser: IUser;

    /**
     * Locale used for translations
     */
    locale: ILocale;

    /**
     * Attachment to be selected by default.
     */
    defaultAttachment?: ObjRef;

    /**
     * Function that results in the creation of the scheduled email on the backend.
     */
    handleCreateScheduledEmail: (
        scheduledEmailToCreate: IAutomationMdObjectDefinition,
        filters?: FilterContextItem[],
    ) => void;

    /**
     * Status of the scheduled email creation
     */
    scheduledEmailCreationStatus?: CommandProcessingStatus;

    /**
     * Function that results in saving the existing scheduled email on the backend.
     */
    handleSaveScheduledEmail: (scheduledEmailToSave: IAutomationMdObject) => void;

    /**
     * Status of the scheduled email creation
     */
    scheduledEmailSavingStatus?: CommandProcessingStatus;
}

/**
 * @internal
 */
export interface UseScheduledEmailProps {
    /**
     * Callback to be called, when user submit the scheduled email dialog.
     */
    onSubmit?: (scheduledEmailDefinition: IAutomationMdObject | IAutomationMdObjectDefinition) => void;

    /**
     * Callback to be called, when submitting of the scheduled email was successful.
     */
    onSubmitSuccess?: (scheduledEmail: IAutomationMdObject) => void;

    /**
     * Callback to be called, when submitting of the scheduled email failed.
     */
    onSubmitError?: (error: GoodDataSdkError) => void;

    /**
     * Callback to be called, when user saves the existing scheduled email.
     */
    onSave?: (scheduledEmailDefinition: IAutomationMdObject) => void;

    /**
     * Callback to be called, when saving of the scheduled email was successful.
     */
    onSaveSuccess?: () => void;

    /**
     * Callback to be called, when saving of the scheduled email failed.
     */
    onSaveError?: (error: GoodDataSdkError) => void;
}

export const useScheduledEmail = (props: UseScheduledEmailProps): UseScheduledEmailResult => {
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
    const dashboardInsightWidgets: IInsightWidgetExtended[] = dashboardWidgets
        .filter(isInsightWidget)
        .filter((widget) => !isCustomWidget(widget))
        .map((widget) => {
            return {
                ...widget,
                visualizationUrl: dashboardInsights.get(widget.insight)?.insight.visualizationUrl,
            };
        });
    const currentUser = useDashboardSelector(selectCurrentUser);
    const locale = useDashboardSelector(selectLocale);
    const filters = useDashboardSelector(selectFilterContextFilters);
    const originalFilters = useDashboardSelector(selectOriginalFilterContextFilters);
    const dateFormat = useDashboardSelector(selectDateFormat);
    const weekStart = useDashboardSelector(selectWeekStart);
    const enableKPIDashboardScheduleRecipients = useDashboardSelector(
        selectEnableKPIDashboardScheduleRecipients,
    );
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

    const handleCreateScheduledEmail = useCallback(
        (scheduledEmail: IAutomationMdObjectDefinition, customFilters?: FilterContextItem[]) => {
            // If dashboard filters are not changed, do not save them to scheduled email filter context.
            // Like this, future filter changes stored in the original dashboard filter context
            // are correctly propagated to the scheduled emails with the original filter context.
            const filtersToStore = hasDefaultFilters ? undefined : filters;
            scheduledEmailCreator.create(scheduledEmail, customFilters ?? filtersToStore);
        },
        [filters, hasDefaultFilters],
    );
    const scheduledEmailCreationStatus = scheduledEmailCreator.creationStatus;

    const scheduledEmailSaver = useSaveScheduledEmail({
        onSuccess: onSaveSuccess,
        onError: onSaveError,
        onBeforeRun: onSave,
    });

    const handleSaveScheduledEmail = useCallback(
        (scheduledEmail: IAutomationMdObject, filterContextRef?: ObjRef) => {
            scheduledEmailSaver.save(scheduledEmail, filterContextRef);
        },
        [],
    );
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
