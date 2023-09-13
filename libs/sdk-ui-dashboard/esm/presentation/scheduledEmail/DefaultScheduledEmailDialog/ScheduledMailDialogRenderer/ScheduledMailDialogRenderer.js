// (C) 2019-2023 GoodData Corporation
import * as React from "react";
import cloneDeep from "lodash/cloneDeep.js";
import differenceBy from "lodash/differenceBy.js";
import isEqual from "lodash/isEqual.js";
import omit from "lodash/omit.js";
import { injectIntl, FormattedMessage } from "react-intl";
import parse from "date-fns/parse/index.js";
import { normalizeTime, ConfirmDialogBase, Overlay, Message } from "@gooddata/sdk-ui-kit";
import { uriRef, objRefToString, areObjRefsEqual, isDashboardAttachment, isWidgetAttachment, } from "@gooddata/sdk-model";
import { withContexts } from "@gooddata/sdk-ui";
import memoize from "lodash/memoize.js";
import { DEFAULT_REPEAT_PERIOD, PLATFORM_DATE_FORMAT, REPEAT_EXECUTE_ON, REPEAT_FREQUENCIES, REPEAT_TYPES, } from "../constants.js";
import { isScheduleEmailExistingRecipient, isScheduleEmailExternalRecipient, } from "../interfaces.js";
import { generateRepeatString, setDailyRepeat, setMonthlyRepeat, setWeeklyRepeat, parseRepeatString, } from "../utils/repeat.js";
import { getScheduledEmailSummaryString } from "../utils/scheduledMailSummary.js";
import { getScheduledEmailRecipientEmail } from "../utils/scheduledMailRecipients.js";
import { getTimezoneByIdentifier, getUserTimezone, TIMEZONE_DEFAULT } from "../utils/timezone.js";
import { getDate, getMonth, getYear, convertDateToDisplayDateString, convertDateToPlatformDateString, } from "../utils/datetime.js";
import { isEmail } from "../utils/validate.js";
import { Textarea } from "./Textarea.js";
import { RepeatSelect } from "./RepeatSelect/RepeatSelect.js";
import { Input } from "./Input.js";
import { DateTime } from "./DateTime.js";
import { Attachments } from "./Attachments/Attachments.js";
import { RecipientsSelect } from "./RecipientsSelect/RecipientsSelect.js";
import { IntlWrapper } from "../../../localization/index.js";
import { DASHBOARD_TITLE_MAX_LENGTH } from "../../../constants/index.js";
import { AttachmentNoWidgets } from "./Attachments/AttachmentNoWidgets.js";
const MAX_MESSAGE_LENGTH = 200;
const MAX_SUBJECT_LENGTH = 200;
const MAX_DASHBOARD_TITLE_LENGTH = DASHBOARD_TITLE_MAX_LENGTH;
const MAX_HYPHEN_LENGTH = 3;
const userToRecipient = memoize((user) => ({
    user,
}));
class ScheduledMailDialogRendererUI extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onAlign = (alignment) => {
            if (alignment.top < 0) {
                this.setState({ alignment: "tc tc" });
            }
        };
        this.renderAttachment = () => {
            const { intl, dashboardTitle, dashboardInsightWidgets, enableWidgetExportScheduling, canExportTabular, } = this.props;
            const { dashboardSelected, widgetsSelected, configuration } = this.state.attachments;
            const defaultAttachment = this.getDefaultAttachment();
            const fileName = `${defaultAttachment}.pdf`;
            return enableWidgetExportScheduling ? (React.createElement(Attachments, { dashboardTitle: dashboardTitle, insightWidgets: dashboardInsightWidgets, dashboardSelected: dashboardSelected, widgetsSelected: widgetsSelected, configuration: configuration, canExportTabular: canExportTabular, onAttachmentsSelectionChanged: this.onAttachmentsChange, onAttachmentsConfigurationChanged: this.onAttachmentsConfigurationChange })) : (React.createElement(AttachmentNoWidgets, { className: "s-gd-schedule-email-dialog-attachment", label: intl.formatMessage({ id: "dialogs.schedule.email.attachment.label" }), fileName: fileName }));
        };
        this.renderDateTime = () => {
            const { dateFormat, intl, locale, weekStart } = this.props;
            const { repeat: { time }, startDate, } = this.state;
            const sendDate = new Date(getYear(startDate), getMonth(startDate) - 1, getDate(startDate), time.hour, time.minute);
            return (React.createElement(DateTime, { date: sendDate, dateFormat: dateFormat, label: intl.formatMessage({ id: "dialogs.schedule.email.time.label" }), locale: locale, timezone: this.state.userTimezone.title, onDateChange: this.onDateChange, onTimeChange: this.onTimeChange, weekStart: weekStart }));
        };
        this.renderMessage = () => {
            const { intl } = this.props;
            const defaultEmailBody = this.getDefaultEmailBody();
            return (React.createElement(Textarea, { className: "s-gd-schedule-email-dialog-message", label: intl.formatMessage({ id: "dialogs.schedule.email.message.label" }), maxlength: MAX_MESSAGE_LENGTH, placeholder: defaultEmailBody, rows: 4, onChange: this.onMessageChange, value: this.state.emailBody }));
        };
        this.renderFiltersMessage = () => {
            const { enableWidgetExportScheduling, hasDefaultFilters, editSchedule } = this.props;
            if (editSchedule) {
                return (React.createElement(Message, { className: "gd-schedule-email-dialog-filters-message ", type: "progress" },
                    React.createElement(FormattedMessage, { id: "dialogs.schedule.email.filters.not.saved" })));
            }
            if (enableWidgetExportScheduling && !hasDefaultFilters) {
                return (React.createElement(Message, { className: "gd-schedule-email-dialog-filters-message ", type: "progress" },
                    React.createElement(FormattedMessage, { id: "dialogs.schedule.email.filters" })));
            }
        };
        this.renderRecipients = () => {
            var _a, _b;
            const { selectedRecipients } = this.state;
            const { backend, workspace, canListUsersInProject, enableKPIDashboardScheduleRecipients, currentUser, editSchedule, } = this.props;
            // it should be possible to remove the only remaining recipient if the author unsubscribed
            const allowEmptySelection = (_a = editSchedule === null || editSchedule === void 0 ? void 0 : editSchedule.unsubscribed) === null || _a === void 0 ? void 0 : _a.some((unsubscribedRecipient) => { var _a; return unsubscribedRecipient === ((_a = editSchedule.createdBy) === null || _a === void 0 ? void 0 : _a.email); });
            return (React.createElement(RecipientsSelect, { author: userToRecipient((editSchedule === null || editSchedule === void 0 ? void 0 : editSchedule.createdBy) ? editSchedule === null || editSchedule === void 0 ? void 0 : editSchedule.createdBy : currentUser), currentUser: currentUser, canListUsersInProject: canListUsersInProject, enableKPIDashboardScheduleRecipients: enableKPIDashboardScheduleRecipients, value: selectedRecipients, originalValue: ((_b = this.originalEditState) === null || _b === void 0 ? void 0 : _b.selectedRecipients) || [], onChange: this.onRecipientsChange, onError: this.props.onError, backend: backend, workspace: workspace, allowEmptySelection: allowEmptySelection }));
        };
        this.renderUnsubscribedRecipients = () => {
            var _a;
            const { intl, editSchedule } = this.props;
            const unsubscribedAmount = ((_a = editSchedule === null || editSchedule === void 0 ? void 0 : editSchedule.unsubscribed) === null || _a === void 0 ? void 0 : _a.length) === undefined ? 0 : editSchedule.unsubscribed.length;
            return (unsubscribedAmount !== 0 && (React.createElement("div", { className: "gd-input-component" },
                React.createElement("span", { className: "gd-schedule-email-dialog-unsubscribed-recipients" }, intl.formatMessage({ id: "dialogs.schedule.email.unsubscribed.recipients" }, { n: unsubscribedAmount })))));
        };
        this.renderRepeats = () => {
            const { intl } = this.props;
            const { startDate, repeat } = this.state;
            let repeatFrequency = REPEAT_FREQUENCIES.DAY;
            let repeatExecuteOn = REPEAT_EXECUTE_ON.DAY_OF_MONTH;
            if (repeat.repeatFrequency.week) {
                repeatFrequency = REPEAT_FREQUENCIES.WEEK;
            }
            else if (repeat.repeatFrequency.month) {
                repeatFrequency = REPEAT_FREQUENCIES.MONTH;
                repeatExecuteOn = repeat.repeatFrequency.month.type;
            }
            return (React.createElement(RepeatSelect, { label: intl.formatMessage({ id: "dialogs.schedule.email.repeats.label" }), repeatExecuteOn: repeatExecuteOn, repeatFrequency: repeatFrequency, repeatPeriod: repeat.repeatPeriod, repeatType: repeat.repeatType, startDate: startDate, onChange: this.onRepeatsChange }));
        };
        this.renderSubject = () => {
            const { intl } = this.props;
            return (React.createElement(Input, { className: "s-gd-schedule-email-dialog-subject", label: intl.formatMessage({ id: "dialogs.schedule.email.subject.label" }), maxlength: MAX_SUBJECT_LENGTH, placeholder: this.getDefaultSubject(), value: this.state.emailSubject, onChange: this.onSubjectChange }));
        };
        // Listeners
        this.onScheduleDialogSubmit = () => {
            var _a;
            const { onSubmit, onSave, editSchedule } = this.props;
            if (editSchedule) {
                if (onSave) {
                    const originalFilterContext = (_a = editSchedule === null || editSchedule === void 0 ? void 0 : editSchedule.attachments[0]) === null || _a === void 0 ? void 0 : _a.filterContext;
                    onSave(this.getScheduleEmailData(), originalFilterContext);
                }
            }
            else {
                if (onSubmit) {
                    onSubmit(this.getScheduleEmailData());
                }
            }
        };
        this.onDateChange = (selectedDateObject) => {
            const { repeatFrequency } = this.state.repeat;
            const newRepeat = cloneDeep(this.state.repeat);
            if (repeatFrequency.month) {
                setMonthlyRepeat(newRepeat, repeatFrequency.month.type, selectedDateObject);
            }
            else if (repeatFrequency.week) {
                setWeeklyRepeat(newRepeat, selectedDateObject);
            }
            else {
                setDailyRepeat(newRepeat);
            }
            this.setState({
                startDate: selectedDateObject,
                repeat: newRepeat,
            });
        };
        this.onTimeChange = (time) => {
            this.setState((prevState) => {
                return {
                    repeat: Object.assign(Object.assign({}, prevState.repeat), { time }),
                };
            });
        };
        this.onRecipientsChange = (selectedRecipients) => {
            const { editSchedule, currentUser } = this.props;
            const allRecipientsAreEmails = selectedRecipients.map(getScheduledEmailRecipientEmail).every(isEmail);
            const newExternalRecipientsEmails = selectedRecipients
                .filter(isScheduleEmailExternalRecipient)
                .map((recipient) => recipient.email);
            const hasNewExternalRecipients = editSchedule
                ? differenceBy(newExternalRecipientsEmails, editSchedule.bcc || []).length > 0
                : false;
            const author = userToRecipient((editSchedule === null || editSchedule === void 0 ? void 0 : editSchedule.createdBy) ? editSchedule === null || editSchedule === void 0 ? void 0 : editSchedule.createdBy : currentUser);
            const currentUserIsAuthor = isScheduleEmailExistingRecipient(author) && areObjRefsEqual(author.user.ref, currentUser.ref);
            this.setState({
                selectedRecipients,
                // new external recipients are not allowed when the current user is not the author of edited schedule
                isValidScheduleEmailData: allRecipientsAreEmails && (currentUserIsAuthor || !hasNewExternalRecipients),
            });
        };
        this.onMessageChange = (value) => {
            this.setState({
                emailBody: value,
            });
        };
        this.onRepeatsChange = (data) => {
            const { repeatExecuteOn, repeatFrequency, repeatPeriod, repeatType } = data;
            const { startDate } = this.state;
            const newRepeat = cloneDeep(this.state.repeat);
            newRepeat.repeatType = repeatType;
            newRepeat.repeatPeriod = repeatPeriod;
            if (repeatType === REPEAT_TYPES.CUSTOM) {
                if (repeatFrequency === REPEAT_FREQUENCIES.MONTH) {
                    setMonthlyRepeat(newRepeat, repeatExecuteOn, startDate);
                }
                else if (repeatFrequency === REPEAT_FREQUENCIES.WEEK) {
                    setWeeklyRepeat(newRepeat, startDate);
                }
                else {
                    setDailyRepeat(newRepeat);
                }
            }
            else if (repeatType === REPEAT_TYPES.MONTHLY) {
                setMonthlyRepeat(newRepeat, REPEAT_EXECUTE_ON.DAY_OF_WEEK, startDate);
            }
            else if (repeatType === REPEAT_TYPES.WEEKLY) {
                setWeeklyRepeat(newRepeat, startDate);
            }
            else {
                setDailyRepeat(newRepeat);
            }
            this.setState({ repeat: newRepeat });
        };
        this.onSubjectChange = (value) => {
            this.setState({
                emailSubject: value,
            });
        };
        this.onAttachmentsChange = (dashboardSelected, widgetsSelected) => {
            this.setState({
                attachments: Object.assign(Object.assign({}, this.state.attachments), { dashboardSelected,
                    widgetsSelected }),
            });
        };
        this.onAttachmentsConfigurationChange = (configuration) => {
            this.setState({
                attachments: Object.assign(Object.assign({}, this.state.attachments), { configuration }),
            });
        };
        // Internal utils
        this.getDefaultAttachment = () => {
            const { dashboardTitle, dateFormat } = this.props;
            const { startDate } = this.state;
            const displayDateString = convertDateToDisplayDateString(startDate, dateFormat);
            const dashboardTitleMaxLength = this.getDashboardTitleMaxLength(displayDateString);
            const isDashboardTitleTooLong = dashboardTitle.length > dashboardTitleMaxLength;
            const truncatedDashboardTitle = isDashboardTitleTooLong
                ? dashboardTitle.substring(0, dashboardTitleMaxLength)
                : dashboardTitle;
            return `${truncatedDashboardTitle} - ${displayDateString}`;
        };
        this.getDefaultSubject = () => {
            const { dashboardTitle } = this.props;
            const isDashboardTitleTooLong = dashboardTitle.length > MAX_DASHBOARD_TITLE_LENGTH;
            return isDashboardTitleTooLong
                ? dashboardTitle.substring(0, MAX_DASHBOARD_TITLE_LENGTH)
                : dashboardTitle;
        };
        this.getDefaultEmailBody = () => {
            const { intl } = this.props;
            return intl.formatMessage({
                id: "dialogs.schedule.email.message.placeholder",
            });
        };
        this.getAttachments = (dashboard) => {
            const result = [];
            const { dashboardSelected, widgetsSelected, configuration } = this.state.attachments;
            if (dashboardSelected) {
                result.push({
                    dashboard,
                    format: "pdf",
                });
            }
            const exportOptions = configuration.format === "xlsx"
                ? {
                    mergeHeaders: configuration.mergeHeaders,
                    includeFilters: configuration.includeFilters,
                }
                : undefined;
            const widgetsRefStringToUriRefMap = this.props.dashboardInsightWidgets.reduce((acc, widget) => {
                acc[objRefToString(widget)] = uriRef(widget.uri);
                return acc;
            }, {});
            for (const widgetRefString in widgetsSelected) {
                if (widgetsSelected[widgetRefString]) {
                    result.push({
                        widget: widgetsRefStringToUriRefMap[widgetRefString],
                        widgetDashboard: dashboard,
                        formats: [configuration.format],
                        exportOptions,
                    });
                }
            }
            return result;
        };
        this.getScheduleEmailData = () => {
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
            const body = emailBody || this.getDefaultEmailBody();
            const description = this.getSummaryMessage();
            const attachments = this.getAttachments(this.props.dashboard);
            let unsubscribed = undefined;
            if (editSchedule) {
                unsubscribed = differenceBy(editSchedule.unsubscribed, toEmails.concat(bccEmails));
            }
            return {
                when,
                to: toEmails,
                bcc: bccEmails,
                unsubscribed,
                subject,
                body,
                attachments,
                description,
                title: subject,
                // Every scheduled email is private for the logged in user.
                unlisted: true,
                uri: editSchedule ? editSchedule.uri : undefined,
            };
        };
        this.getTimeSchedule = () => {
            const recurrence = generateRepeatString(this.state.repeat);
            const startDate = convertDateToPlatformDateString(this.state.startDate);
            return {
                recurrence,
                startDate,
                timeZone: this.state.userTimezone.identifier,
            };
        };
        this.getSummaryMessage = () => {
            const { startDate, repeat } = this.state;
            return getScheduledEmailSummaryString(this.props.intl, repeat, startDate);
        };
        this.state = this.props.editSchedule
            ? this.getEditState(this.props.editSchedule, this.props.users)
            : this.getDefaultState();
    }
    getDefaultState() {
        const now = new Date();
        const normalizedTime = normalizeTime(now);
        return {
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
            attachments: Object.assign(Object.assign({}, this.getDefaultAttachments()), { configuration: {
                    format: "csv",
                    mergeHeaders: true,
                    includeFilters: true,
                } }),
        };
    }
    getEditState(schedule, users) {
        var _a, _b;
        const defaultState = this.getDefaultState();
        const selectedRecipients = schedule.to.concat(schedule.bcc || []).map((email) => {
            var _a;
            /**
             * There can be the case that users might have different email and login address
             * Need to make the comparison from user login, since email is not an unique value
             */
            if (email === ((_a = schedule.createdBy) === null || _a === void 0 ? void 0 : _a.login)) {
                return userToRecipient(schedule.createdBy);
            }
            else {
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
                const user = users.find((user) => user.login === recipient.email);
                if (user) {
                    return { user };
                }
            }
            return recipient;
        });
        const dashboardAttachments = schedule.attachments.filter(isDashboardAttachment);
        const widgetAttachments = schedule.attachments.filter(isWidgetAttachment);
        const widgetsSelected = this.props.dashboardInsightWidgets.reduce((acc, widget) => {
            const widgetKey = objRefToString(widget);
            acc[widgetKey] = widgetAttachments.some((widgetAttachment) => {
                return areObjRefsEqual(widgetAttachment.widget, widget);
            });
            return acc;
        }, {});
        const configuration = widgetAttachments.length === 0
            ? defaultState.attachments.configuration
            : {
                format: widgetAttachments[0].formats[0] || "csv",
                mergeHeaders: ((_a = widgetAttachments[0].exportOptions) === null || _a === void 0 ? void 0 : _a.mergeHeaders) || false,
                includeFilters: ((_b = widgetAttachments[0].exportOptions) === null || _b === void 0 ? void 0 : _b.includeFilters) || false,
            };
        const newState = Object.assign(Object.assign({}, defaultState), { emailSubject: schedule.subject, emailBody: schedule.body, selectedRecipients: processedRecipients, userTimezone: getTimezoneByIdentifier(schedule.when.timeZone) || TIMEZONE_DEFAULT, startDate: parse(schedule.when.startDate, PLATFORM_DATE_FORMAT, new Date()), isValidScheduleEmailData: true, repeat: parseRepeatString(schedule.when.recurrence), attachments: {
                dashboardSelected: dashboardAttachments.length !== 0,
                widgetsSelected,
                configuration,
            } });
        this.originalEditState = newState;
        return newState;
    }
    getDefaultAttachments() {
        const { enableWidgetExportScheduling, defaultAttachment, dashboardInsightWidgets } = this.props;
        const isDefaultAttachmentValid = dashboardInsightWidgets.some((widget) => areObjRefsEqual(widget.ref, defaultAttachment));
        if (enableWidgetExportScheduling && defaultAttachment && isDefaultAttachmentValid) {
            return {
                dashboardSelected: false,
                widgetsSelected: { [objRefToString(defaultAttachment)]: true },
            };
        }
        else {
            return {
                dashboardSelected: true,
                widgetsSelected: dashboardInsightWidgets.reduce((acc, widget) => {
                    acc[objRefToString(widget)] = false;
                    return acc;
                }, {}),
            };
        }
    }
    render() {
        const { intl, onCancel, editSchedule, enableWidgetExportScheduling } = this.props;
        const { alignment, isValidScheduleEmailData } = this.state;
        const alignPoints = [
            {
                align: alignment,
            },
        ];
        const isSubmitDisabled = !isValidScheduleEmailData ||
            (editSchedule &&
                isEqual(omit(this.originalEditState, "alignment"), omit(this.state, "alignment")));
        return (React.createElement(Overlay, { alignPoints: alignPoints, className: "gd-schedule-email-dialog-overlay", isModal: true, positionType: "fixed", onAlign: this.onAlign },
            React.createElement(ConfirmDialogBase, { className: "gd-schedule-email-dialog s-gd-schedule-email-dialog", isPositive: true, headline: enableWidgetExportScheduling
                    ? intl.formatMessage({ id: "dialogs.schedule.email.heading" })
                    : intl.formatMessage({ id: "dialogs.schedule.email.headline" }), cancelButtonText: intl.formatMessage({ id: "cancel" }), submitButtonText: editSchedule
                    ? intl.formatMessage({ id: `dialogs.schedule.email.save` })
                    : intl.formatMessage({ id: `dialogs.schedule.email.submit` }), isSubmitDisabled: isSubmitDisabled, submitOnEnterKey: false, onCancel: onCancel, onSubmit: this.onScheduleDialogSubmit },
                this.renderFiltersMessage(),
                this.renderRecipients(),
                this.renderUnsubscribedRecipients(),
                this.renderSubject(),
                this.renderMessage(),
                this.renderAttachment(),
                React.createElement("div", { className: "hr" }),
                this.renderDateTime(),
                this.renderRepeats())));
    }
    getDashboardTitleMaxLength(displayDateString) {
        return MAX_DASHBOARD_TITLE_LENGTH - displayDateString.trim().length - MAX_HYPHEN_LENGTH;
    }
}
ScheduledMailDialogRendererUI.defaultProps = {
    dateFormat: "MM/dd/yyyy",
};
export { ScheduledMailDialogRendererUI };
export const ScheduledMailDialogRendererIntl = withContexts(injectIntl(ScheduledMailDialogRendererUI));
export const ScheduledMailDialogRenderer = (props) => (React.createElement(IntlWrapper, { locale: props.locale },
    React.createElement(ScheduledMailDialogRendererIntl, Object.assign({}, props))));
//# sourceMappingURL=ScheduledMailDialogRenderer.js.map