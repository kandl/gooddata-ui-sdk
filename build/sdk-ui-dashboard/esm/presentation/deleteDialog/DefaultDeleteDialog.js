// (C) 2022 GoodData Corporation
import React, { useCallback } from "react";
import { ConfirmDialog, Typography } from "@gooddata/sdk-ui-kit";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import compact from "lodash/compact.js";
import { deleteDashboard, dispatchAndWaitFor, selectEnableKPIDashboardDrillToDashboard, selectEnableKPIDashboardScheduleRecipients, selectIsDeleteDialogOpen, selectSupportsKpiWidgetCapability, uiActions, useDashboardDispatch, useDashboardSelector, } from "../../model/index.js";
const deleteMessages = defineMessages({
    alertsAndEmails: {
        id: "deleteDashboardDialog.alertsAndEmailsMessage",
    },
    alerts: {
        id: "deleteDashboardDialog.alertsMessage",
    },
    emails: {
        id: "deleteDashboardDialog.emailsMessage",
    },
    drills: {
        id: "deleteDashboardDialog.drillMessage",
    },
});
/**
 * @internal
 */
export function useDeleteDialogProps() {
    const dispatch = useDashboardDispatch();
    const onCancel = useCallback(() => dispatch(uiActions.closeDeleteDialog()), [dispatch]);
    const onDelete = useCallback(() => dispatchAndWaitFor(dispatch, deleteDashboard()).finally(() => {
        dispatch(uiActions.closeDeleteDialog());
    }), [dispatch]);
    const isVisible = useDashboardSelector(selectIsDeleteDialogOpen);
    const isKpiWidgetEnabled = useDashboardSelector(selectSupportsKpiWidgetCapability);
    const isScheduleEmailsEnabled = useDashboardSelector(selectEnableKPIDashboardScheduleRecipients);
    const isDrillToDashboardEnabled = useDashboardSelector(selectEnableKPIDashboardDrillToDashboard);
    return {
        isVisible,
        isKpiWidgetEnabled,
        isScheduleEmailsEnabled,
        isDrillToDashboardEnabled,
        onCancel,
        onDelete,
    };
}
/**
 * @internal
 */
export const DefaultDeleteDialog = (props) => {
    const { isVisible, isKpiWidgetEnabled, isScheduleEmailsEnabled, isDrillToDashboardEnabled, onDelete, onCancel, } = props;
    const intl = useIntl();
    if (!isVisible) {
        return null;
    }
    const messages = compact([
        isKpiWidgetEnabled && isScheduleEmailsEnabled && deleteMessages.alertsAndEmails,
        isKpiWidgetEnabled && !isScheduleEmailsEnabled && deleteMessages.alerts,
        !isKpiWidgetEnabled && isScheduleEmailsEnabled && deleteMessages.emails,
        isDrillToDashboardEnabled && deleteMessages.drills,
    ]);
    return (React.createElement(ConfirmDialog, { onCancel: onCancel, onSubmit: onDelete, isPositive: false, className: "s-dialog s-delete_dashboard_dialog", headline: intl.formatMessage({ id: "deleteDashboardDialog.headline" }), cancelButtonText: intl.formatMessage({ id: "cancel" }), submitButtonText: intl.formatMessage({ id: "deleteDashboardDialog.submitButtonText" }) }, messages.map((message, index) => (React.createElement(React.Fragment, { key: message.id },
        index !== 0 && React.createElement("br", null),
        React.createElement(Typography, { tagName: "p" },
            React.createElement(FormattedMessage, Object.assign({}, message))))))));
};
//# sourceMappingURL=DefaultDeleteDialog.js.map