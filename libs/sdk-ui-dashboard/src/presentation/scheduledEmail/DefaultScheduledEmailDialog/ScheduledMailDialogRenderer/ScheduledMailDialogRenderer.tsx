// (C) 2019-2024 GoodData Corporation
import * as React from "react";
import cloneDeep from "lodash/cloneDeep.js";
import differenceBy from "lodash/differenceBy.js";
import isEqual from "lodash/isEqual.js";
import omit from "lodash/omit.js";
import noop from "lodash/noop.js";
import { injectIntl, WrappedComponentProps, FormattedMessage } from "react-intl";
import parse from "date-fns/parse/index.js";
import {
    normalizeTime,
    ConfirmDialogBase,
    Overlay,
    Alignment,
    Message,
    ContentDivider,
    Button,
    EditableLabel,
    Hyperlink,
} from "@gooddata/sdk-ui-kit";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import {
    ObjRef,
    IUser,
    areObjRefsEqual,
    IAutomationMetadataObject,
    IAutomationMetadataObjectDefinition,
    isDashboardAttachment,
    ScheduledMailAttachment,
    IOrganizationUser,
    WeekStart,
    idRef,
} from "@gooddata/sdk-model";
import { GoodDataSdkError, withContexts } from "@gooddata/sdk-ui";
import memoize from "lodash/memoize.js";

import {
    DEFAULT_REPEAT_PERIOD,
    PLATFORM_DATE_FORMAT,
    REPEAT_EXECUTE_ON,
    REPEAT_FREQUENCIES,
    REPEAT_TYPES,
} from "../constants.js";
import {
    IScheduleEmailExternalRecipient,
    IScheduleEmailRecipient,
    IScheduleEmailRepeat,
    IScheduleEmailRepeatTime,
    isScheduleEmailExistingRecipient,
    isScheduleEmailExternalRecipient,
} from "../interfaces.js";
import {
    generateRepeatString,
    setDailyRepeat,
    setMonthlyRepeat,
    setWeeklyRepeat,
    parseRepeatString,
} from "../utils/repeat.js";
import { getScheduledEmailSummaryString } from "../utils/scheduledMailSummary.js";
import { getScheduledEmailRecipientEmail } from "../utils/scheduledMailRecipients.js";
import { getTimezoneByIdentifier, getUserTimezone, ITimezone, TIMEZONE_DEFAULT } from "../utils/timezone.js";
import { getDate, getMonth, getYear, convertDateToPlatformDateString } from "../utils/datetime.js";
import { isEmail } from "../utils/validate.js";

import { Textarea } from "./Textarea.js";
import { RepeatSelect, IRepeatSelectData } from "./RepeatSelect/RepeatSelect.js";
import { Input } from "./Input.js";
import { DateTime } from "./DateTime.js";
import { Attachments } from "./Attachments/Attachments.js";
import { RecipientsSelect } from "./RecipientsSelect/RecipientsSelect.js";
import { IntlWrapper } from "../../../localization/index.js";
import { DASHBOARD_TITLE_MAX_LENGTH } from "../../../constants/index.js";
import { IInsightWidgetExtended } from "../useScheduledEmail.js";
import { DestinationSelect } from "./DestinationSelect/DestinationSelect.js";

const MAX_MESSAGE_LENGTH = 200;
const MAX_SUBJECT_LENGTH = 200;
const MAX_DASHBOARD_TITLE_LENGTH = DASHBOARD_TITLE_MAX_LENGTH;

export interface IAutomationMdObjectDialogRendererOwnProps {
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
    editSchedule?: IAutomationMetadataObject;

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
    onSubmit?: (scheduledEmailData: IAutomationMetadataObject | IAutomationMetadataObjectDefinition) => void;

    /**
     * Callback to be called, when user saves the existing schedule.
     */
    onSave?: (scheduledEmailData: IAutomationMetadataObject, filterContextRef?: ObjRef) => void;

    /**
     * Callback to be called, when error occurs.
     */
    onError?: (error: GoodDataSdkError) => void;

    /**
     * Workspace users.
     */
    users: IOrganizationUser[];
}

export type IAutomationMdObjectDialogRendererProps = IAutomationMdObjectDialogRendererOwnProps &
    WrappedComponentProps & { backend?: IAnalyticalBackend; workspace?: string };

type IAutomationMdObjectDialogRendererState = {
    title?: string;
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
    };
    destination?: string;
};

const userToRecipient = memoize(
    (user: IUser): IScheduleEmailRecipient => ({
        user,
    }),
);

export class ScheduledMailDialogRendererUI extends React.PureComponent<
    IAutomationMdObjectDialogRendererProps,
    IAutomationMdObjectDialogRendererState
> {
    static defaultProps: Pick<IAutomationMdObjectDialogRendererProps, "dateFormat"> = {
        dateFormat: "MM/dd/yyyy",
    };

    // when editing, save initial state to compare if anything changed
    private originalEditState: IAutomationMdObjectDialogRendererState | undefined;

    constructor(props: IAutomationMdObjectDialogRendererProps) {
        super(props);

        this.state = this.props.editSchedule
            ? this.getEditState(this.props.editSchedule, this.props.users)
            : this.getDefaultState();
    }

    private getDefaultState(): IAutomationMdObjectDialogRendererState {
        const now = new Date();
        const normalizedTime = normalizeTime(now);

        return {
            title: undefined,
            alignment: "cc cc",
            startDate: now,
            userTimezone: getUserTimezone(),
            emailSubject: "",
            emailBody: "",
            repeat: {
                time: {
                    hour: normalizedTime.getHours(),
                    minute: normalizedTime.getMinutes(),
                    second: 0,
                },
                repeatType: REPEAT_TYPES.DAILY,
                repeatPeriod: DEFAULT_REPEAT_PERIOD,
                repeatFrequency: {
                    [REPEAT_FREQUENCIES.DAY]: true,
                },
            },
            selectedRecipients: [userToRecipient(this.props.currentUser)],
            isValidScheduleEmailData: true,
            attachments: {
                dashboardSelected: true,
            },
            destination: undefined,
        };
    }

    private getEditState(
        schedule: IAutomationMetadataObject,
        users: IOrganizationUser[],
    ): IAutomationMdObjectDialogRendererState {
        const defaultState = this.getDefaultState();

        const selectedRecipients = schedule.to.concat(schedule.bcc || []).map((email) => {
            /**
             * There can be the case that users might have different email and login address
             * Need to make the comparison from user login, since email is not an unique value
             */
            if (email === schedule.createdBy?.login) {
                return userToRecipient(schedule.createdBy);
            } else {
                return { email };
            }
        });
        /**
         *  At this point, all recipients except the author are stored as external (IScheduleEmailExternalRecipient).
         *  They will be compared with workspace users and potentially switched to workspace recipients (IScheduleEmailExistingRecipient)
         *  and obtain correct values to be displayed on UI
         */
        const processedRecipients = selectedRecipients.map((recipient) => {
            if (isScheduleEmailExternalRecipient(recipient)) {
                // need to make the comparison from user login, since email is not an unique value
                // TODO: this should be adapted
                const user = users.find((user) => user.id === recipient.email);
                if (user) {
                    // TODO:
                    return { user } as unknown as IScheduleEmailExternalRecipient;
                }
            }

            return recipient;
        });

        const isDashboardSelected = schedule.attachments.some(isDashboardAttachment);

        const newState = {
            ...defaultState,
            title: schedule.title,
            emailSubject: schedule.subject,
            emailBody: schedule.body,
            selectedRecipients: processedRecipients,
            userTimezone: getTimezoneByIdentifier(schedule.when.timeZone) || TIMEZONE_DEFAULT,
            startDate: parse(schedule.when.startDate, PLATFORM_DATE_FORMAT, new Date()),
            isValidScheduleEmailData: true,
            repeat: parseRepeatString(schedule.when.recurrence),
            attachments: {
                dashboardSelected: isDashboardSelected,
            },
            destination: schedule.webhook,
        };
        this.originalEditState = newState;

        return newState;
    }

    public render() {
        const { intl, onCancel, editSchedule } = this.props;
        const { alignment, isValidScheduleEmailData } = this.state;
        const alignPoints = [
            {
                align: alignment,
            },
        ];

        const isSubmitDisabled =
            !isValidScheduleEmailData ||
            (editSchedule &&
                isEqual(omit(this.originalEditState, "alignment"), omit(this.state, "alignment")));

        return (
            <Overlay
                alignPoints={alignPoints}
                className="gd-schedule-email-dialog-overlay"
                isModal={true}
                positionType="fixed"
                onAlign={this.onAlign}
            >
                <ConfirmDialogBase
                    className="gd-schedule-email-dialog s-gd-schedule-email-dialog"
                    isPositive={true}
                    cancelButtonText={intl.formatMessage({ id: "cancel" })}
                    submitButtonText={
                        editSchedule
                            ? intl.formatMessage({ id: `dialogs.schedule.email.save` })
                            : intl.formatMessage({ id: `dialogs.schedule.email.create` })
                    }
                    footerLeftRenderer={this.renderFooterLeft}
                    isSubmitDisabled={isSubmitDisabled}
                    submitOnEnterKey={false}
                    onCancel={onCancel}
                    onSubmit={this.onScheduleDialogSubmit}
                    headline={undefined}
                    headerLeftButtonRenderer={this.renderHeader}
                >
                    <div className="gd-schedule-mail-dialog-content-wrapper">
                        <ContentDivider className="gd-divider-with-margin gd-divider-full-row" />
                        {this.renderFiltersMessage()}
                        {this.renderDateTime()}
                        {this.renderRepeats()}
                        <ContentDivider className="gd-divider-with-margin" />
                        {this.renderDestination()}
                        <ContentDivider className="gd-divider-with-margin" />
                        {this.renderRecipients()}
                        {this.renderUnsubscribedRecipients()}
                        {this.renderSubject()}
                        {this.renderMessage()}
                        {this.renderAttachment()}
                        <ContentDivider className="gd-divider-with-margin gd-divider-full-row" />
                    </div>
                </ConfirmDialogBase>
            </Overlay>
        );
    }

    private onAlign = (alignment: Alignment) => {
        if (alignment.top < 0) {
            this.setState({ alignment: "tc tc" });
        }
    };

    private renderHeader = (): JSX.Element => {
        const title = this.state.title;

        return (
            <div className="gd-schedule-email-dialog-header">
                <Button
                    className="gd-button-primary gd-button-icon-only gd-icon-navigateleft s-schedule-email-dialog-button"
                    onClick={this.props.onCancel}
                />
                <EditableLabel
                    value={title ?? ""}
                    onSubmit={noop}
                    onChange={(value) => this.setState({ title: value })}
                    maxRows={1}
                    maxLength={40}
                    className="gd-schedule-email-dialog-title s-gd-schedule-email-dialog-title"
                    autofocus={!title}
                    placeholder={this.props.intl.formatMessage({
                        id: "dialogs.schedule.email.title.placeholder",
                    })}
                />
            </div>
        );
    };

    private renderFooterLeft = (): JSX.Element => {
        const { intl } = this.props;
        return (
            <div className="gd-schedule-email-dialog-footer-link">
                <Hyperlink
                    text={intl.formatMessage({ id: "dialogs.schedule.email.footer.title" })}
                    href=""
                    iconClass="gd-icon-circle-question"
                />
            </div>
        );
    };

    private renderAttachment = (): React.ReactNode => {
        const { dashboardTitle } = this.props;
        const { dashboardSelected } = this.state.attachments;

        return (
            <Attachments
                dashboardTitle={dashboardTitle}
                dashboardSelected={dashboardSelected}
                onAttachmentsSelectionChanged={this.onAttachmentsChange}
            />
        );
    };

    private renderDateTime = (): React.ReactNode => {
        const { dateFormat, intl, locale, weekStart } = this.props;

        const {
            repeat: { time },
            startDate,
        } = this.state;

        const sendDate = new Date(
            getYear(startDate),
            getMonth(startDate) - 1,
            getDate(startDate),
            time.hour,
            time.minute,
        );
        return (
            <DateTime
                date={sendDate}
                dateFormat={dateFormat}
                label={intl.formatMessage({ id: "dialogs.schedule.email.time.label" })}
                locale={locale}
                timezone={this.state.userTimezone.title}
                onDateChange={this.onDateChange}
                onTimeChange={this.onTimeChange}
                weekStart={weekStart}
            />
        );
    };

    private renderMessage = (): React.ReactNode => {
        const { intl } = this.props;
        const defaultEmailBody = this.getDefaultEmailBody();
        return (
            <Textarea
                className="gd-schedule-email-dialog-message s-gd-schedule-email-dialog-message"
                label={intl.formatMessage({ id: "dialogs.schedule.email.message.label" })}
                maxlength={MAX_MESSAGE_LENGTH}
                placeholder={defaultEmailBody}
                rows={3}
                onChange={this.onMessageChange}
                value={this.state.emailBody}
            />
        );
    };

    private renderFiltersMessage = (): React.ReactNode => {
        const { enableWidgetExportScheduling, hasDefaultFilters, editSchedule } = this.props;
        if (editSchedule) {
            return (
                <Message className="gd-schedule-email-dialog-filters-message " type="progress">
                    <FormattedMessage id="dialogs.schedule.email.filters.not.saved" />
                </Message>
            );
        }
        if (enableWidgetExportScheduling && !hasDefaultFilters) {
            return (
                <Message className="gd-schedule-email-dialog-filters-message " type="progress">
                    <FormattedMessage id="dialogs.schedule.email.filters" />
                </Message>
            );
        }

        return null;
    };

    private renderDestination = (): React.ReactNode => {
        // TODO: JSC get all webhooks, set properly
        const items = [{ id: "acme", title: "Acme email" }];
        const selectedItem = items[0];
        this.setState({ destination: selectedItem.id });

        return (
            <DestinationSelect
                items={items}
                selectedItem={selectedItem}
                onChange={(item) => this.setState({ destination: item.id })}
            />
        );
    };

    private renderRecipients = (): React.ReactNode => {
        const { selectedRecipients } = this.state;
        const {
            backend,
            workspace,
            canListUsersInProject,
            enableKPIDashboardScheduleRecipients,
            currentUser,
            editSchedule,
        } = this.props;

        // it should be possible to remove the only remaining recipient if the author unsubscribed
        const allowEmptySelection = editSchedule?.unsubscribed?.some(
            (unsubscribedRecipient) => unsubscribedRecipient === editSchedule.createdBy?.email,
        );

        return (
            <RecipientsSelect
                author={userToRecipient(editSchedule?.createdBy ? editSchedule?.createdBy : currentUser)}
                currentUser={currentUser}
                canListUsersInProject={canListUsersInProject}
                enableKPIDashboardScheduleRecipients={enableKPIDashboardScheduleRecipients}
                value={selectedRecipients}
                originalValue={this.originalEditState?.selectedRecipients || []}
                onChange={this.onRecipientsChange}
                onError={this.props.onError}
                backend={backend}
                workspace={workspace}
                allowEmptySelection={allowEmptySelection}
            />
        );
    };

    private renderUnsubscribedRecipients = (): React.ReactNode => {
        const { intl, editSchedule } = this.props;
        const unsubscribedAmount =
            editSchedule?.unsubscribed?.length === undefined ? 0 : editSchedule.unsubscribed.length;
        return (
            unsubscribedAmount !== 0 && (
                <div className="gd-input-component">
                    <span className="gd-schedule-email-dialog-unsubscribed-recipients">
                        {intl.formatMessage(
                            { id: "dialogs.schedule.email.unsubscribed.recipients" },
                            { n: unsubscribedAmount },
                        )}
                    </span>
                </div>
            )
        );
    };

    private renderRepeats = (): React.ReactNode => {
        const { intl } = this.props;
        const { startDate, repeat } = this.state;

        let repeatFrequency = REPEAT_FREQUENCIES.DAY;
        let repeatExecuteOn = REPEAT_EXECUTE_ON.DAY_OF_MONTH;

        if (repeat.repeatFrequency.week) {
            repeatFrequency = REPEAT_FREQUENCIES.WEEK;
        } else if (repeat.repeatFrequency.month) {
            repeatFrequency = REPEAT_FREQUENCIES.MONTH;
            repeatExecuteOn = repeat.repeatFrequency.month.type;
        }
        return (
            <RepeatSelect
                label={intl.formatMessage({ id: "dialogs.schedule.email.repeats.label" })}
                repeatExecuteOn={repeatExecuteOn}
                repeatFrequency={repeatFrequency}
                repeatPeriod={repeat.repeatPeriod}
                repeatType={repeat.repeatType}
                startDate={startDate}
                onChange={this.onRepeatsChange}
            />
        );
    };

    private renderSubject = (): React.ReactNode => {
        const { intl } = this.props;
        return (
            <Input
                className="gd-schedule-email-dialog-subject s-gd-schedule-email-dialog-subject"
                label={intl.formatMessage({ id: "dialogs.schedule.email.subject.label" })}
                maxlength={MAX_SUBJECT_LENGTH}
                placeholder={this.getDefaultSubject()}
                value={this.state.emailSubject}
                onChange={this.onSubjectChange}
            />
        );
    };

    // Listeners
    private onScheduleDialogSubmit = (): void => {
        const { onSubmit, onSave, editSchedule } = this.props;
        if (editSchedule) {
            if (onSave) {
                const originalFilterContext = editSchedule?.attachments[0]?.filterContext;
                onSave(this.getScheduleEmailData(), originalFilterContext);
            }
        } else {
            if (onSubmit) {
                // TODO: JSC
                // eslint-disable-next-line no-console
                console.log("data", this.getScheduleEmailData());
                // onSubmit(this.getScheduleEmailData());
            }
        }
    };

    private onDateChange = (selectedDateObject: Date): void => {
        const { repeatFrequency } = this.state.repeat;

        const newRepeat = cloneDeep(this.state.repeat);

        if (repeatFrequency.month) {
            setMonthlyRepeat(newRepeat, repeatFrequency.month.type, selectedDateObject);
        } else if (repeatFrequency.week) {
            setWeeklyRepeat(newRepeat, selectedDateObject);
        } else {
            setDailyRepeat(newRepeat);
        }

        this.setState({
            startDate: selectedDateObject,
            repeat: newRepeat,
        });
    };

    private onTimeChange = (time: IScheduleEmailRepeatTime): void => {
        this.setState((prevState) => {
            return {
                repeat: {
                    ...prevState.repeat,
                    time,
                },
            };
        });
    };

    private onRecipientsChange = (selectedRecipients: IScheduleEmailRecipient[]): void => {
        const { editSchedule, currentUser } = this.props;
        const allRecipientsAreEmails = selectedRecipients.map(getScheduledEmailRecipientEmail).every(isEmail);

        const newExternalRecipientsEmails: string[] = selectedRecipients
            .filter(isScheduleEmailExternalRecipient)
            .map((recipient) => recipient.email);
        const hasNewExternalRecipients = editSchedule
            ? differenceBy(newExternalRecipientsEmails, editSchedule.bcc || []).length > 0
            : false;

        const author = userToRecipient(editSchedule?.createdBy ? editSchedule?.createdBy : currentUser);
        const currentUserIsAuthor =
            isScheduleEmailExistingRecipient(author) && areObjRefsEqual(author.user.ref, currentUser.ref);

        this.setState({
            selectedRecipients,
            // new external recipients are not allowed when the current user is not the author of edited schedule
            isValidScheduleEmailData:
                allRecipientsAreEmails && (currentUserIsAuthor || !hasNewExternalRecipients),
        });
    };

    private onMessageChange = (value: string): void => {
        this.setState({
            emailBody: value,
        });
    };

    private onRepeatsChange = (data: IRepeatSelectData): void => {
        const { repeatExecuteOn, repeatFrequency, repeatPeriod, repeatType } = data;
        const { startDate } = this.state;

        const newRepeat = cloneDeep(this.state.repeat);
        newRepeat.repeatType = repeatType;
        newRepeat.repeatPeriod = repeatPeriod;

        if (repeatType === REPEAT_TYPES.CUSTOM) {
            if (repeatFrequency === REPEAT_FREQUENCIES.MONTH) {
                setMonthlyRepeat(newRepeat, repeatExecuteOn, startDate);
            } else if (repeatFrequency === REPEAT_FREQUENCIES.WEEK) {
                setWeeklyRepeat(newRepeat, startDate);
            } else {
                setDailyRepeat(newRepeat);
            }
        } else if (repeatType === REPEAT_TYPES.MONTHLY) {
            setMonthlyRepeat(newRepeat, REPEAT_EXECUTE_ON.DAY_OF_WEEK, startDate);
        } else if (repeatType === REPEAT_TYPES.WEEKLY) {
            setWeeklyRepeat(newRepeat, startDate);
        } else {
            setDailyRepeat(newRepeat);
        }

        this.setState({ repeat: newRepeat });
    };

    private onSubjectChange = (value: string): void => {
        this.setState({
            emailSubject: value,
        });
    };

    private onAttachmentsChange = (dashboardSelected: boolean): void => {
        this.setState({
            attachments: {
                dashboardSelected,
            },
        });
    };

    // Internal utils
    private getDefaultSubject = (): string => {
        const { dashboardTitle } = this.props;
        const isDashboardTitleTooLong = dashboardTitle.length > MAX_DASHBOARD_TITLE_LENGTH;
        return isDashboardTitleTooLong
            ? dashboardTitle.substring(0, MAX_DASHBOARD_TITLE_LENGTH)
            : dashboardTitle;
    };

    private getDefaultEmailBody = (): string => {
        const { intl } = this.props;
        return intl.formatMessage({
            id: "dialogs.schedule.email.message.placeholder",
        });
    };

    private getAttachments = (dashboard: ObjRef): ScheduledMailAttachment[] => {
        const { dashboardSelected } = this.state.attachments;

        if (dashboardSelected) {
            return [
                {
                    dashboard,
                    format: "pdf",
                },
            ];
        }

        return [];
    };

    private getScheduleEmailData = (): IAutomationMetadataObject => {
        const { editSchedule } = this.props;

        const when = this.getTimeSchedule();

        const { selectedRecipients: recipients, emailSubject, emailBody } = this.state;
        /// To: is currently only owner
        const toEmails = recipients
            .filter(isScheduleEmailExistingRecipient)
            .map((recipient) => recipient.user.login);

        /// All other emails (without owner)
        const bccEmails = recipients
            .filter(isScheduleEmailExternalRecipient)
            .map((recipient) => recipient.email);

        const subject = emailSubject || this.getDefaultSubject();
        const title = this.state.title || subject;
        const body = emailBody || this.getDefaultEmailBody();
        const description = this.getSummaryMessage();
        const attachments = this.getAttachments(this.props.dashboard);

        let unsubscribed: string[] | undefined = undefined;
        if (editSchedule) {
            unsubscribed = differenceBy(editSchedule.unsubscribed, toEmails.concat(bccEmails));
        }

        return {
            type: "automation",
            id: "scheduled-email", // TODO
            ref: idRef("scheduled-email", "automation"),
            when,
            to: toEmails,
            bcc: bccEmails,
            unsubscribed,
            subject,
            body,
            attachments,
            description,
            title,
            webhook: this.state.destination,
            // Every scheduled email is private for the logged in user.
            unlisted: true,
            uri: editSchedule ? editSchedule.uri : "scheduled-email", // TODO,
            deprecated: false,
            production: true,
        };
    };

    private getTimeSchedule = (): IAutomationMetadataObjectDefinition["when"] => {
        const recurrence = generateRepeatString(this.state.repeat);
        const startDate = convertDateToPlatformDateString(this.state.startDate);
        return {
            recurrence,
            startDate,
            timeZone: this.state.userTimezone.identifier,
        };
    };

    private getSummaryMessage = (): string => {
        const { startDate, repeat } = this.state;
        return getScheduledEmailSummaryString(this.props.intl, repeat, startDate);
    };
}

export const ScheduledMailDialogRendererIntl = withContexts(injectIntl(ScheduledMailDialogRendererUI));

export const ScheduledMailDialogRenderer: React.FC<IAutomationMdObjectDialogRendererOwnProps> = (props) => (
    <IntlWrapper locale={props.locale}>
        <ScheduledMailDialogRendererIntl {...props} />
    </IntlWrapper>
);
