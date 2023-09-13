import { GoodDataSdkError, ILocale } from "@gooddata/sdk-ui";
import { ObjRef, UriRef, IUser, FilterContextItem, WeekStart, IScheduledMail, IScheduledMailDefinition, IInsightWidget } from "@gooddata/sdk-model";
import { CommandProcessingStatus } from "../../../model/index.js";
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
    handleCreateScheduledEmail: (scheduledEmailToCreate: IScheduledMailDefinition, filters?: FilterContextItem[]) => void;
    /**
     * Status of the scheduled email creation
     */
    scheduledEmailCreationStatus?: CommandProcessingStatus;
    /**
     * Function that results in saving the existing scheduled email on the backend.
     */
    handleSaveScheduledEmail: (scheduledEmailToSave: IScheduledMailDefinition) => void;
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
    onSubmit?: (scheduledEmailDefinition: IScheduledMailDefinition) => void;
    /**
     * Callback to be called, when submitting of the scheduled email was successful.
     */
    onSubmitSuccess?: (scheduledEmail: IScheduledMail) => void;
    /**
     * Callback to be called, when submitting of the scheduled email failed.
     */
    onSubmitError?: (error: GoodDataSdkError) => void;
    /**
     * Callback to be called, when user saves the existing scheduled email.
     */
    onSave?: (scheduledEmailDefinition: IScheduledMailDefinition) => void;
    /**
     * Callback to be called, when saving of the scheduled email was successful.
     */
    onSaveSuccess?: () => void;
    /**
     * Callback to be called, when saving of the scheduled email failed.
     */
    onSaveError?: (error: GoodDataSdkError) => void;
}
export declare const useScheduledEmail: (props: UseScheduledEmailProps) => UseScheduledEmailResult;
export {};
