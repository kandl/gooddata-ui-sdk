// (C) 2022 GoodData Corporation
import { useBackendStrict, useCancelablePromise, useWorkspaceStrict, } from "@gooddata/sdk-ui";
import { selectCanManageScheduledMail, selectDashboardRef, useDashboardSelector, } from "../../../model/index.js";
export const useScheduledEmailManagement = (props) => {
    const { onError, onSuccess, loadScheduledMails } = props;
    const dashboardRef = useDashboardSelector(selectDashboardRef);
    const canManageScheduledMail = useDashboardSelector(selectCanManageScheduledMail);
    const effectiveBackend = useBackendStrict();
    const effectiveWorkspace = useWorkspaceStrict();
    const loadResultPromise = loadScheduledMails
        ? async () => {
            const scheduledEmails = await effectiveBackend
                .workspace(effectiveWorkspace)
                .dashboards()
                .getScheduledMailsForDashboard(dashboardRef, {
                loadUserData: canManageScheduledMail,
                createdByCurrentUser: !canManageScheduledMail,
            });
            const users = canManageScheduledMail
                ? await effectiveBackend.workspace(effectiveWorkspace).users().queryAll()
                : [];
            return { scheduledEmails: scheduledEmails.reverse(), users };
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
//# sourceMappingURL=useScheduledEmailManagement.js.map