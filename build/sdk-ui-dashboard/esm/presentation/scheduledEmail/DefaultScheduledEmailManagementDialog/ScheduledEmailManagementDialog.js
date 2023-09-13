// (C) 2022-2023 GoodData Corporation
import React, { useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Dialog, Typography, Tabs } from "@gooddata/sdk-ui-kit";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { ScheduledEmails } from "./ScheduledEmails.js";
import { useScheduledEmailManagement } from "./useScheduledEmailManagement.js";
import { DeleteScheduleConfirmDialog } from "./DeleteScheduleConfirmDialog.js";
import { selectCurrentUser, useDashboardSelector, selectCanManageScheduledMail, } from "../../../model/index.js";
import { messages } from "../../../locales.js";
/**
 * @alpha
 */
export const ScheduledEmailManagementDialog = (props) => {
    const { onAdd, onEdit, onDeleteSuccess: onDelete, onClose, onLoadError, onDeleteError } = props;
    const [scheduledEmailToDelete, setScheduledEmailToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [scheduledEmailsByUser, setScheduledEmailsByUser] = useState([]);
    const [scheduledEmails, setScheduledEmails] = useState([]);
    const [selectedTabId, setSelectedTabId] = useState(messages.scheduleManagementTabUser.id);
    const [isFirstLoaded, setIsFirstLoaded] = useState(true);
    const [users, setUsers] = useState([]);
    const canManageScheduledMail = useDashboardSelector(selectCanManageScheduledMail);
    const currentUser = useDashboardSelector(selectCurrentUser);
    const intl = useIntl();
    const onLoadSuccess = useCallback((emailManagement) => {
        const { scheduledEmails, users } = emailManagement;
        const emailsByUser = scheduledEmails.filter((scheduledEmail) => { var _a; return areObjRefsEqual(currentUser.ref, (_a = scheduledEmail.createdBy) === null || _a === void 0 ? void 0 : _a.ref); });
        setIsLoading(false);
        setScheduledEmails(scheduledEmails);
        setScheduledEmailsByUser(canManageScheduledMail ? emailsByUser : scheduledEmails);
        setUsers(users);
        if (isFirstLoaded) {
            if (emailsByUser.length === 0 && canManageScheduledMail) {
                setSelectedTabId(messages.scheduleManagementTabAll.id);
            }
            setIsFirstLoaded(false);
        }
    }, []);
    const handleScheduleDelete = useCallback((scheduledEmail) => {
        setScheduledEmailToDelete(scheduledEmail);
    }, []);
    const handleScheduleEdit = useCallback((scheduledEmail, users) => {
        onEdit === null || onEdit === void 0 ? void 0 : onEdit(scheduledEmail, users);
    }, []);
    const handleScheduleDeleteSuccess = useCallback(() => {
        onDelete === null || onDelete === void 0 ? void 0 : onDelete();
        setScheduledEmailToDelete(null);
        setIsLoading(true);
    }, []);
    const handleTabChange = useCallback((tab) => {
        setSelectedTabId(tab.id);
    }, []);
    useScheduledEmailManagement({
        loadScheduledMails: isLoading,
        onError: onLoadError,
        onSuccess: onLoadSuccess,
    });
    const noSchedulesMessageId = selectedTabId === messages.scheduleManagementTabAll.id
        ? messages.scheduleManagementNoSchedules.id
        : messages.scheduleManagementNoSchedulesByUser.id;
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { displayCloseButton: true, onCancel: onClose, className: "gd-scheduled-email-management-dialog s-scheduled-email-management-dialog" },
            React.createElement("div", { className: "gd-scheduled-email-management-dialog-title" },
                React.createElement(Typography, { tagName: "h3", className: "gd-dialog-header" },
                    React.createElement(FormattedMessage, { id: "dialogs.schedule.management.title" }))),
            !isFirstLoaded && canManageScheduledMail ? (React.createElement(Tabs, { className: "gd-scheduled-email-management-dialog-tabs", tabs: [messages.scheduleManagementTabUser, messages.scheduleManagementTabAll], selectedTabId: selectedTabId, onTabSelect: handleTabChange })) : null,
            React.createElement("div", { className: "gd-scheduled-emails-content" },
                React.createElement(ScheduledEmails, { onDelete: handleScheduleDelete, onEdit: handleScheduleEdit, isLoading: isLoading, scheduledEmails: selectedTabId === messages.scheduleManagementTabAll.id
                        ? scheduledEmails
                        : scheduledEmailsByUser, currentUserEmail: currentUser === null || currentUser === void 0 ? void 0 : currentUser.email, noSchedulesMessageId: noSchedulesMessageId, canManageScheduledMail: canManageScheduledMail, users: users })),
            React.createElement("div", { className: "gd-content-divider" }),
            React.createElement("div", { className: "gd-buttons" },
                React.createElement(Button, { onClick: onAdd, className: "gd-button-secondary gd-add-button s-add-button", iconLeft: "gd-icon-plus", value: intl.formatMessage({ id: "dialogs.schedule.management.addSchedule" }) }),
                React.createElement(Button, { onClick: onClose, className: "gd-button-secondary s-close-button", value: intl.formatMessage({ id: "close" }) }))),
        scheduledEmailToDelete ? (React.createElement(DeleteScheduleConfirmDialog, { scheduledEmail: scheduledEmailToDelete, onCancel: () => setScheduledEmailToDelete(null), onSuccess: handleScheduleDeleteSuccess, onError: onDeleteError })) : null));
};
//# sourceMappingURL=ScheduledEmailManagementDialog.js.map