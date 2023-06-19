// (C) 2019-2022 GoodData Corporation
import React from "react";
import { invariant } from "ts-invariant";

import { ScheduledMailDialogRenderer } from "./ScheduledMailDialogRenderer/ScheduledMailDialogRenderer.js";
import { useScheduledEmail } from "./useScheduledEmail.js";

import { IScheduledEmailDialogProps } from "../types.js";

/**
 * @alpha
 */
export const DefaultScheduledEmailDialog = (props: IScheduledEmailDialogProps): JSX.Element | null => {
    const {
        onSubmit,
        onSuccess,
        onError,
        onSave,
        onSaveSuccess,
        onSaveError,
        onCancel,
        isVisible,
        editSchedule,
        users,
    } = props;

    const {
        currentUser,
        dashboardRef,
        dashboardTitle,
        dashboardInsightWidgets,
        hasDefaultFilters,
        handleCreateScheduledEmail,
        handleSaveScheduledEmail,
        locale,
        canListUsersInWorkspace,
        canExportTabular,
        dateFormat,
        enableKPIDashboardSchedule,
        enableKPIDashboardScheduleRecipients,
        enableWidgetExportScheduling,
        defaultAttachment,
    } = useScheduledEmail({
        onSubmit,
        onSubmitSuccess: onSuccess,
        onSubmitError: onError,
        onSave,
        onSaveSuccess: onSaveSuccess,
        onSaveError: onSaveError,
    });

    // trigger the invariant only if the user tries to open the dialog
    if (isVisible) {
        invariant(
            enableKPIDashboardSchedule,
            "Feature flag enableKPIDashboardSchedule must be enabled to make ScheduledMailDialog work properly.",
        );
    }

    if (!isVisible) {
        return null;
    }

    return (
        <ScheduledMailDialogRenderer
            editSchedule={editSchedule}
            locale={locale}
            canListUsersInProject={canListUsersInWorkspace}
            canExportTabular={canExportTabular}
            enableKPIDashboardScheduleRecipients={enableKPIDashboardScheduleRecipients}
            enableWidgetExportScheduling={enableWidgetExportScheduling}
            dateFormat={dateFormat}
            currentUser={currentUser}
            dashboard={dashboardRef}
            dashboardTitle={dashboardTitle}
            dashboardInsightWidgets={dashboardInsightWidgets}
            hasDefaultFilters={hasDefaultFilters}
            onSubmit={handleCreateScheduledEmail}
            onSave={handleSaveScheduledEmail}
            onCancel={onCancel}
            onError={onError}
            defaultAttachment={defaultAttachment}
            users={users}
        />
    );
};
