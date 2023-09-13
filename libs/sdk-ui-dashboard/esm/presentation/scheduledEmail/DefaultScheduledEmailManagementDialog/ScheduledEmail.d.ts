import React from "react";
import { IScheduledMail, IWorkspaceUser } from "@gooddata/sdk-model";
interface IScheduledEmailProps {
    onDelete: (scheduledEmail: IScheduledMail) => void;
    onEdit: (scheduledEmail: IScheduledMail, users: IWorkspaceUser[]) => void;
    scheduledEmail: IScheduledMail;
    currentUserEmail?: string;
    canManageScheduledMail: boolean;
    users: IWorkspaceUser[];
}
export declare const ScheduledEmail: React.FC<IScheduledEmailProps>;
export {};
