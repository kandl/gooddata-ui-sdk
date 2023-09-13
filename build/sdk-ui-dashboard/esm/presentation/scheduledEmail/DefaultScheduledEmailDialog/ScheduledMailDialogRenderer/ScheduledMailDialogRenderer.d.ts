import * as React from "react";
import { WrappedComponentProps } from "react-intl";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { ObjRef, IUser, IScheduledMail, IScheduledMailDefinition, IWorkspaceUser, WeekStart } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { IScheduleEmailRecipient, IScheduleEmailRepeat, IWidgetExportConfiguration, IWidgetsSelection } from "../interfaces.js";
import { ITimezone } from "../utils/timezone.js";
import { IInsightWidgetExtended } from "../useScheduledEmail.js";
export interface IScheduledMailDialogRendererOwnProps {
    /**
     * Reference of the dashboard to be attached to the scheduled email.
     */
    dashboard: ObjRef;
    /**
     * Title of the attached dashboard. Used to create the default subject of a scheduled email.
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
     * Current user - is always recipient of newly created scheduled email.
     */
    currentUser: IUser;
    /**
     * Date format to use in DatePicker. To check the supported tokens,
     * see the `format` method of the https://date-fns.org/ library.
     */
    dateFormat?: string;
    /**
     * Locale to use for localization of texts appearing in the scheduled email dialog.
     */
    locale?: string;
    /**
     * Define start day of the week. This value will be used for datepicker. Sunday will be used as a default.
     */
    weekStart?: WeekStart;
    /**
     * Has user canListUsersInProject permission?
     */
    canListUsersInProject?: boolean;
    /**
     * Is user allowed to perform tabular exports?
     */
    canExportTabular?: boolean;
    /**
     * Is enableKPIDashboardScheduleRecipients feature flag turned on?
     */
    enableKPIDashboardScheduleRecipients?: boolean;
    /**
     * Is the new UI and workflow for scheduled emailing with widgets is enabled?
     */
    enableWidgetExportScheduling?: boolean;
    /**
     * Schedule to be edited. If defined, it switches the dialog to edit mode.
     */
    editSchedule?: IScheduledMail;
    /**
     * Attachment to be selected by default.
     */
    defaultAttachment?: ObjRef;
    /**
     * Callback to be called, when user close the scheduled email dialog.
     */
    onCancel?: () => void;
    /**
     * Callback to be called, when user submit the scheduled email dialog.
     */
    onSubmit?: (scheduledEmailData: IScheduledMailDefinition) => void;
    /**
     * Callback to be called, when user saves the existing schedule.
     */
    onSave?: (scheduledEmailData: IScheduledMailDefinition, filterContextRef?: ObjRef) => void;
    /**
     * Callback to be called, when error occurs.
     */
    onError?: (error: GoodDataSdkError) => void;
    /**
     * Workspace users.
     */
    users: IWorkspaceUser[];
}
export type IScheduledMailDialogRendererProps = IScheduledMailDialogRendererOwnProps & WrappedComponentProps & {
    backend?: IAnalyticalBackend;
    workspace?: string;
};
type IScheduledMailDialogRendererState = {
    alignment: string;
    userTimezone: ITimezone;
    emailSubject: string;
    emailBody: string;
    startDate: Date;
    repeat: IScheduleEmailRepeat;
    isValidScheduleEmailData: boolean;
    selectedRecipients: IScheduleEmailRecipient[];
    attachments: {
        dashboardSelected: boolean;
        widgetsSelected: IWidgetsSelection;
        configuration: IWidgetExportConfiguration;
    };
};
export declare class ScheduledMailDialogRendererUI extends React.PureComponent<IScheduledMailDialogRendererProps, IScheduledMailDialogRendererState> {
    static defaultProps: Pick<IScheduledMailDialogRendererProps, "dateFormat">;
    private originalEditState;
    constructor(props: IScheduledMailDialogRendererProps);
    private getDefaultState;
    private getEditState;
    private getDefaultAttachments;
    render(): JSX.Element;
    private getDashboardTitleMaxLength;
    private onAlign;
    private renderAttachment;
    private renderDateTime;
    private renderMessage;
    private renderFiltersMessage;
    private renderRecipients;
    private renderUnsubscribedRecipients;
    private renderRepeats;
    private renderSubject;
    private onScheduleDialogSubmit;
    private onDateChange;
    private onTimeChange;
    private onRecipientsChange;
    private onMessageChange;
    private onRepeatsChange;
    private onSubjectChange;
    private onAttachmentsChange;
    private onAttachmentsConfigurationChange;
    private getDefaultAttachment;
    private getDefaultSubject;
    private getDefaultEmailBody;
    private getAttachments;
    private getScheduleEmailData;
    private getTimeSchedule;
    private getSummaryMessage;
}
export declare const ScheduledMailDialogRendererIntl: React.ComponentType<import("react-intl").WithIntlProps<IScheduledMailDialogRendererProps>>;
export declare const ScheduledMailDialogRenderer: React.FC<IScheduledMailDialogRendererOwnProps>;
export {};
