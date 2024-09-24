// (C) 2022-2024 GoodData Corporation

import React from "react";

import { ScheduledEmailDialog, ScheduledEmailManagementDialog } from "../../scheduledEmail/index.js";

import { useDashboardScheduledEmails, useDashboardScheduledEmailsFilters } from "../../../model/index.js";

export const ScheduledEmailDialogProvider = () => {
    const {
        // Shared Local State
        scheduledExportToEdit,
        // Data
        automations,
        notificationChannels,
        users,
        widget,
        insight,
        webhooksError,
        webhooksLoading,
        automationsLoading,
        automationsError,
        // Single Schedule Dialog
        isScheduleEmailingDialogOpen,
        onScheduleEmailingCancel,
        onScheduleEmailingCreateSuccess,
        onScheduleEmailingCreateError,
        onScheduleEmailingSaveSuccess,
        onScheduleEmailingSaveError,
        // Management / List Dialog
        isScheduleEmailingManagementDialogOpen,
        onScheduleEmailingManagementClose,
        onScheduleEmailingManagementAdd,
        onScheduleEmailingManagementEdit,
        onScheduleEmailingManagementDeleteSuccess,
        onScheduleEmailingManagementDeleteError,
    } = useDashboardScheduledEmails();

    const { widgetFilters, dashboardFilters, widgetFiltersError, widgetFiltersLoading } =
        useDashboardScheduledEmailsFilters({
            scheduledExportToEdit,
            widget,
            insight,
        });

    const isLoading = [widgetFiltersLoading, webhooksLoading, automationsLoading].some(Boolean);
    const loadingError = [widgetFiltersError, webhooksError, automationsError].find(Boolean);

    return (
        <>
            {isScheduleEmailingManagementDialogOpen ? (
                <ScheduledEmailManagementDialog
                    isVisible={isScheduleEmailingManagementDialogOpen}
                    automations={automations}
                    notificationChannels={notificationChannels}
                    scheduleDataError={loadingError}
                    isLoadingScheduleData={isLoading}
                    onAdd={onScheduleEmailingManagementAdd}
                    onEdit={onScheduleEmailingManagementEdit}
                    onClose={onScheduleEmailingManagementClose}
                    onDeleteSuccess={onScheduleEmailingManagementDeleteSuccess}
                    onDeleteError={onScheduleEmailingManagementDeleteError}
                />
            ) : null}
            {isScheduleEmailingDialogOpen ? (
                <ScheduledEmailDialog
                    isVisible={isScheduleEmailingDialogOpen}
                    scheduledExportToEdit={scheduledExportToEdit}
                    users={users}
                    notificationChannels={notificationChannels}
                    widget={widget}
                    insight={insight}
                    widgetFilters={widgetFilters}
                    dashboardFilters={dashboardFilters}
                    isLoading={isLoading}
                    onCancel={onScheduleEmailingCancel}
                    onError={onScheduleEmailingCreateError}
                    onSuccess={onScheduleEmailingCreateSuccess}
                    onSaveError={onScheduleEmailingSaveError}
                    onSaveSuccess={onScheduleEmailingSaveSuccess}
                    onDeleteSuccess={onScheduleEmailingManagementDeleteSuccess}
                    onDeleteError={onScheduleEmailingManagementDeleteError}
                />
            ) : null}
        </>
    );
};
