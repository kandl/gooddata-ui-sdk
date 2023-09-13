// (C) 2022 GoodData Corporation
import React from "react";
import { ScheduledEmailDialog, ScheduledEmailManagementDialog } from "../../scheduledEmail/index.js";
import { useDashboardScheduledEmails } from "../../../model/index.js";
export const ScheduledEmailDialogProvider = () => {
    const { isScheduleEmailingDialogOpen, isScheduleEmailingManagementDialogOpen, onScheduleEmailingCancel, onScheduleEmailingCreateError, onScheduleEmailingCreateSuccess, onScheduleEmailingManagementAdd, onScheduleEmailingManagementEdit, scheduledEmailToEdit, users, onScheduleEmailingSaveError, onScheduleEmailingSaveSuccess, onScheduleEmailingManagementClose, onScheduleEmailingManagementLoadingError, onScheduleEmailingManagementDeleteSuccess, onScheduleEmailingManagementDeleteError, } = useDashboardScheduledEmails();
    return (React.createElement(React.Fragment, null,
        isScheduleEmailingManagementDialogOpen ? (React.createElement(ScheduledEmailManagementDialog, { isVisible: isScheduleEmailingManagementDialogOpen, onAdd: onScheduleEmailingManagementAdd, onEdit: onScheduleEmailingManagementEdit, onClose: onScheduleEmailingManagementClose, onDeleteSuccess: onScheduleEmailingManagementDeleteSuccess, onLoadError: onScheduleEmailingManagementLoadingError, onDeleteError: onScheduleEmailingManagementDeleteError })) : null,
        isScheduleEmailingDialogOpen ? (React.createElement(ScheduledEmailDialog, { isVisible: isScheduleEmailingDialogOpen, onCancel: onScheduleEmailingCancel, onError: onScheduleEmailingCreateError, onSuccess: onScheduleEmailingCreateSuccess, editSchedule: scheduledEmailToEdit, onSaveError: onScheduleEmailingSaveError, onSaveSuccess: onScheduleEmailingSaveSuccess, users: users })) : null));
};
//# sourceMappingURL=ScheduledEmailDialogProvider.js.map