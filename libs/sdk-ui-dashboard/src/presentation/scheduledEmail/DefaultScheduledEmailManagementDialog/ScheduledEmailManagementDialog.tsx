// (C) 2022-2024 GoodData Corporation

import React, { useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Dialog, Hyperlink, Typography } from "@gooddata/sdk-ui-kit";
import { IOrganizationUser, IAutomationMetadataObject } from "@gooddata/sdk-model";

import { ScheduledEmails } from "./ScheduledEmails.js";
import { IScheduledEmailManagement, useScheduledEmailManagement } from "./useScheduledEmailManagement.js";
import { DeleteScheduleConfirmDialog } from "./DeleteScheduleConfirmDialog.js";

import { IScheduledEmailManagementDialogProps } from "../types.js";
import {
    selectCurrentUser,
    useDashboardSelector,
    selectCanManageScheduledMail,
} from "../../../model/index.js";
import { messages } from "../../../locales.js";
import { CreateButton } from "./CreateButton.js";

/**
 * @alpha
 */
export const ScheduledEmailManagementDialog: React.FC<IScheduledEmailManagementDialogProps> = (props) => {
    const { onAdd, onEdit, onDeleteSuccess: onDelete, onClose, onLoadError, onDeleteError } = props;
    const [scheduledEmailToDelete, setScheduledEmailToDelete] = useState<IAutomationMetadataObject | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(true);
    const [scheduledEmails, setScheduledEmails] = useState<IAutomationMetadataObject[]>([]);
    const [users, setUsers] = useState<IOrganizationUser[]>([]);
    const canManageScheduledMail = useDashboardSelector(selectCanManageScheduledMail);
    const currentUser = useDashboardSelector(selectCurrentUser);
    const intl = useIntl();

    const onLoadSuccess = useCallback((emailManagement: IScheduledEmailManagement) => {
        const { scheduledEmails, users } = emailManagement;
        // TODO: correct filter
        // scheduledEmails.filter((scheduledEmail) =>
        //     areObjRefsEqual(currentUser.ref, scheduledEmail.createdBy?.ref),
        // );

        setIsLoading(false);
        setScheduledEmails(scheduledEmails);
        setUsers(users);
    }, []);

    const handleScheduleDelete = useCallback((scheduledEmail: IAutomationMetadataObject) => {
        setScheduledEmailToDelete(scheduledEmail);
    }, []);

    const handleScheduleEdit = useCallback(
        (scheduledEmail: IAutomationMetadataObject, users: IOrganizationUser[]) => {
            onEdit?.(scheduledEmail, users);
        },
        [onEdit],
    );

    const handleScheduleDeleteSuccess = useCallback(() => {
        onDelete?.();
        setScheduledEmailToDelete(null);
        setIsLoading(true);
    }, [onDelete]);

    useScheduledEmailManagement({
        loadScheduledMails: isLoading,
        onError: onLoadError,
        onSuccess: onLoadSuccess,
    });

    return (
        <>
            <Dialog
                displayCloseButton={true}
                onCancel={onClose}
                className="gd-scheduled-email-management-dialog s-scheduled-email-management-dialog"
            >
                <div className="gd-scheduled-email-management-dialog-title">
                    <Typography tagName="h3" className="gd-dialog-header">
                        <FormattedMessage id="dialogs.schedule.management.title" />
                    </Typography>
                    <span className="gd-icon-circle-question" />
                </div>
                <div className="gd-scheduled-emails-content">
                    <div className="gd-scheduled-emails-content-header">
                        <Typography tagName="h3">
                            <FormattedMessage id={messages.scheduleManagementListTitle.id!} />
                        </Typography>
                        <CreateButton
                            onClick={onAdd}
                            isDisabled={isLoading}
                            titleId={messages.scheduleManagementCreate.id!}
                        />
                    </div>
                    <ScheduledEmails
                        onDelete={handleScheduleDelete}
                        onEdit={handleScheduleEdit}
                        isLoading={isLoading}
                        scheduledEmails={scheduledEmails}
                        currentUserEmail={currentUser?.email}
                        noSchedulesMessageId={messages.scheduleManagementNoSchedules.id!}
                        canManageScheduledMail={canManageScheduledMail}
                        users={users}
                    />
                </div>
                <div className="gd-content-divider"></div>
                <div className="gd-buttons">
                    <Hyperlink
                        text={intl.formatMessage({ id: "dialogs.schedule.email.footer.title" })}
                        href=""
                        iconClass="gd-icon-circle-question"
                    />
                    <Button
                        onClick={onClose}
                        className="gd-button-secondary s-close-button"
                        value={intl.formatMessage({ id: "close" })}
                    />
                </div>
            </Dialog>
            {scheduledEmailToDelete ? (
                <DeleteScheduleConfirmDialog
                    scheduledEmail={scheduledEmailToDelete}
                    onCancel={() => setScheduledEmailToDelete(null)}
                    onSuccess={handleScheduleDeleteSuccess}
                    onError={onDeleteError}
                />
            ) : null}
        </>
    );
};
