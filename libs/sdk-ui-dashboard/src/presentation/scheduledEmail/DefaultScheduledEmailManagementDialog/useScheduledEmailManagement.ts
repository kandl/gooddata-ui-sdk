// (C) 2022-2024 GoodData Corporation

import { IAutomationMdObject, IOrganizationUser } from "@gooddata/sdk-model";
import {
    GoodDataSdkError,
    useBackendStrict,
    useCancelablePromise,
    useWorkspaceStrict,
} from "@gooddata/sdk-ui";

import {
    selectCanManageScheduledMail,
    selectDashboardRef,
    useDashboardSelector,
} from "../../../model/index.js";

export interface IScheduledEmailManagement {
    scheduledEmails: IAutomationMdObject[];
    users: IOrganizationUser[];
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

export const useScheduledEmailManagement = (props: IUseScheduledEmailManagementProps) => {
    const { onError, onSuccess, loadScheduledMails } = props;
    const dashboardRef = useDashboardSelector(selectDashboardRef);
    const canManageScheduledMail = useDashboardSelector(selectCanManageScheduledMail);
    const effectiveBackend = useBackendStrict();
    const effectiveWorkspace = useWorkspaceStrict();

    const loadResultPromise = loadScheduledMails
        ? async (): Promise<IScheduledEmailManagement> => {
              const scheduledEmails = await effectiveBackend
                  .workspace(effectiveWorkspace)
                  .automations()
                  .getAutomations();

              // TODO: include also this and load only relevant emails for the dashboard
              //   .getScheduledMailsForDashboard(dashboardRef!, {
              //       loadUserData: canManageScheduledMail,
              //       createdByCurrentUser: !canManageScheduledMail,
              //   });

              const currentOrg = canManageScheduledMail
                  ? await effectiveBackend.organizations().getCurrentOrganization()
                  : undefined;
              const orgUsers =
                  canManageScheduledMail && currentOrg
                      ? (
                            await currentOrg
                                .users()
                                .getUsersQuery()
                                .withFilter({ workspace: effectiveWorkspace })
                                .query()
                        )?.items
                      : [];

              //   const wsUsers = orgUsers.map((orgUser): IWorkspaceUser => {
              //       return {
              //           uri: orgUser.id,
              //           email: orgUser.email!,
              //           // id: orgUser.id,
              //           // name: orgUser.fullName,
              //           // email: orgUser.email,
              //       };
              //   });

              // TODO: replace with panther call
              // const users = canManageScheduledMail
              // ? await effectiveBackend.workspace(effectiveWorkspace).users().queryAll()
              // : [];

              return { scheduledEmails: scheduledEmails.reverse(), users: orgUsers };
          }
        : null;

    return useCancelablePromise({ promise: loadResultPromise, onError, onSuccess }, [
        effectiveBackend,
        effectiveWorkspace,
        canManageScheduledMail,
        dashboardRef,
        loadScheduledMails,
    ]);
};
