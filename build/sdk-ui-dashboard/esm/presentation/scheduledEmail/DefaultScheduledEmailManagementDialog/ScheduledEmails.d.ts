import React from "react";
import { IScheduledMail, IWorkspaceUser } from "@gooddata/sdk-model";
interface IScheduledEmailsProps {
    onDelete: (scheduledEmail: IScheduledMail) => void;
    onEdit: (scheduledEmail: IScheduledMail, users: IWorkspaceUser[]) => void;
    isLoading: boolean;
    scheduledEmails: IScheduledMail[];
    currentUserEmail?: string;
    noSchedulesMessageId: string;
    canManageScheduledMail: boolean;
    users: IWorkspaceUser[];
}
export declare const ScheduledEmails: React.FC<IScheduledEmailsProps>;
export {};
