import { IScheduledMail, IWorkspaceUser, ObjRef } from "@gooddata/sdk-model";
/**
 * Hook that handles schedule emailing dialogs.
 *
 * @alpha
 */
export declare const useDashboardScheduledEmails: () => {
    isScheduledEmailingVisible: boolean;
    enableInsightExportScheduling: boolean;
    defaultOnScheduleEmailing: () => void;
    isScheduleEmailingDialogOpen: boolean;
    isScheduleEmailingManagementDialogOpen: boolean;
    onScheduleEmailingOpen: (attachmentRef?: ObjRef) => void;
    onScheduleEmailingManagementEdit: (schedule: IScheduledMail, users: IWorkspaceUser[]) => void;
    scheduledEmailToEdit: IScheduledMail | undefined;
    users: IWorkspaceUser[];
    onScheduleEmailingCancel: () => void;
    onScheduleEmailingCreateError: () => void;
    onScheduleEmailingCreateSuccess: () => void;
    onScheduleEmailingSaveError: () => void;
    onScheduleEmailingSaveSuccess: () => void;
    onScheduleEmailingManagementAdd: () => void;
    onScheduleEmailingManagementClose: () => void;
    onScheduleEmailingManagementLoadingError: () => void;
    onScheduleEmailingManagementDeleteSuccess: () => void;
    onScheduleEmailingManagementDeleteError: () => void;
};
