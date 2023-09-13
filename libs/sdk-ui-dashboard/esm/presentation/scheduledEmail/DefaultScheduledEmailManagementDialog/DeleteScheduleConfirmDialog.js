// (C) 2022-2023 GoodData Corporation
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useBackendStrict, useWorkspaceStrict } from "@gooddata/sdk-ui";
import { ConfirmDialog } from "@gooddata/sdk-ui-kit";
export const DeleteScheduleConfirmDialog = (props) => {
    const { scheduledEmail, onCancel, onSuccess, onError } = props;
    const { ref, subject } = scheduledEmail;
    const effectiveBackend = useBackendStrict();
    const effectiveWorkspace = useWorkspaceStrict();
    const intl = useIntl();
    const handleDeleteScheduledMail = async () => {
        try {
            await effectiveBackend.workspace(effectiveWorkspace).dashboards().deleteScheduledMail(ref);
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        }
        catch (err) {
            onError === null || onError === void 0 ? void 0 : onError(err);
        }
    };
    return (React.createElement(ConfirmDialog, { displayCloseButton: true, isPositive: false, headline: intl.formatMessage({ id: "dialogs.schedule.management.delete.dialog" }), cancelButtonText: intl.formatMessage({ id: "cancel" }), submitButtonText: intl.formatMessage({ id: "delete" }), onSubmit: handleDeleteScheduledMail, onClose: onCancel, onCancel: onCancel, className: "gd-scheduled-email-delete-dialog s-scheduled-email-delete-dialog", containerClassName: "gd-scheduled-email-delete-dialog-overlay" },
        React.createElement("span", { className: "s-scheduled-email-delete-dialog-content" },
            React.createElement(FormattedMessage, { id: "dialogs.schedule.management.delete.dialog.confirm", values: {
                    b: (chunks) => (React.createElement("span", { className: "gd-scheduled-email-delete-dialog-text" },
                        chunks,
                        " ",
                        React.createElement("strong", null, subject))),
                } }))));
};
//# sourceMappingURL=DeleteScheduleConfirmDialog.js.map