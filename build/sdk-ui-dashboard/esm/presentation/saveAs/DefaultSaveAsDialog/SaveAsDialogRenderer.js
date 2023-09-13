// (C) 2020-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { ConfirmDialog, Input, Message, Typography } from "@gooddata/sdk-ui-kit";
import compact from "lodash/compact.js";
import first from "lodash/first.js";
import noop from "lodash/noop.js";
import { IntlWrapper } from "../../localization/index.js";
import { DASHBOARD_TITLE_MAX_LENGTH } from "../../constants/index.js";
import { messages } from "../../../locales.js";
/**
 * @internal
 */
export class SaveAsNewDashboardDialog extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleTitleFocus = (e) => {
            e.target.select();
        };
        this.handleTitleBlur = (e) => {
            const dashboardTitle = e.target.value.trim();
            this.setState({
                dashboardTitle: dashboardTitle === "" ? this.getDefaultDashboardTitle() : dashboardTitle,
            });
        };
        this.handleTitleChange = (value) => {
            this.setState({
                dashboardTitle: value,
            });
        };
        this.onSubmit = () => {
            const title = this.state.dashboardTitle.trim();
            if (this.canCreateDashboard() && title !== "") {
                this.props.onSubmit(title, true, // switch to the new dashboard
                // do not reuse the filter context in edit mode, create a new one with the current filter state
                // otherwise use the original filter context values when creating a copy
                !this.props.isInEditMode);
            }
        };
        this.getNoteText = () => {
            const { isKpiWidgetEnabled, isScheduleEmailsEnabled, intl } = this.props;
            const messageId = first(compact([
                isKpiWidgetEnabled && isScheduleEmailsEnabled && messages.saveAsNewAlertsAndEmailsMessage.id,
                isKpiWidgetEnabled && !isScheduleEmailsEnabled && messages.saveAsNewAlertsMessage.id,
                !isKpiWidgetEnabled && isScheduleEmailsEnabled && messages.saveAsNewEmailsMessage.id,
            ]));
            return messageId ? intl.formatMessage({ id: messageId }) : "";
        };
        const defaultDashboardTitle = this.getDefaultDashboardTitle();
        this.state = {
            dashboardTitle: defaultDashboardTitle,
        };
    }
    getDefaultDashboardTitle() {
        return this.props.intl.formatMessage({ id: "dialogs.save.as.new.default.title" }, {
            title: this.props.dashboardTitle,
        });
    }
    canCreateDashboard() {
        const { isDashboardLoaded, isDashboardSaving } = this.props;
        return isDashboardLoaded && !isDashboardSaving;
    }
    render() {
        const { intl: { formatMessage }, onCancel = noop, isDashboardSaving, } = this.props;
        const { dashboardTitle } = this.state;
        const noteText = this.getNoteText();
        return (React.createElement(ConfirmDialog, { onCancel: onCancel, onSubmit: this.onSubmit, isPositive: true, className: "s-dialog save-as-new-dialog", headline: formatMessage({ id: "dialogs.save.as.new.title" }), cancelButtonText: formatMessage({ id: "cancel" }), submitButtonText: formatMessage({ id: "create.dashboard" }), isSubmitDisabled: isDashboardSaving || dashboardTitle.trim() === "" },
            React.createElement(Typography, { tagName: "p", className: "dashboard-note" }, formatMessage({ id: "dialogs.save.as.new.desc" })),
            React.createElement("div", { className: "dashboard-title" },
                React.createElement(Input, { autofocus: true, maxlength: DASHBOARD_TITLE_MAX_LENGTH, onFocus: this.handleTitleFocus, onBlur: this.handleTitleBlur, value: dashboardTitle, placeholder: this.getDefaultDashboardTitle(), onChange: this.handleTitleChange })),
            noteText ? React.createElement(Message, { type: "progress" }, noteText) : null));
    }
}
export const SaveAsDialogRendererIntl = injectIntl(SaveAsNewDashboardDialog);
export const SaveAsDialogRenderer = (props) => (React.createElement(IntlWrapper, { locale: props.locale },
    React.createElement(SaveAsDialogRendererIntl, Object.assign({}, props))));
//# sourceMappingURL=SaveAsDialogRenderer.js.map