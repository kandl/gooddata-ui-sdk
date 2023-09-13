import { IScheduledMail, IWorkspaceUser } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
export interface IScheduledEmailManagement {
    scheduledEmails: IScheduledMail[];
    users: IWorkspaceUser[];
}
interface IUseScheduledEmailManagementProps {
    /**
     * Flag to handle data refetching logic
     */
    loadScheduledMails: boolean;
    /**
     * Callback to be called, when emails fail to load.
     */
    onError?: (error: GoodDataSdkError) => void;
    /**
     * Callback to be called, when emails load.
     */
    onSuccess: (emailManagement: IScheduledEmailManagement) => void;
}
export declare const useScheduledEmailManagement: (props: IUseScheduledEmailManagementProps) => import("@gooddata/sdk-ui").UseCancelablePromiseState<IScheduledEmailManagement, GoodDataSdkError>;
export {};
