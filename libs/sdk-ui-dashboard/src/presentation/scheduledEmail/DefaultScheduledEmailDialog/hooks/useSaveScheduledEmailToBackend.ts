// (C) 2019-2024 GoodData Corporation
import { useCallback } from "react";
import { ObjRef, IAutomationMetadataObject, IAutomationMetadataObjectDefinition } from "@gooddata/sdk-model";
import { useCreateScheduledEmail } from "./useCreateScheduledEmail.js";
import { useUpdateScheduledEmail } from "./useUpdateScheduledEmail.js";
import { IScheduledEmailDialogProps } from "../../types.js";

export function useSaveScheduledEmailToBackend(
    automation: IAutomationMetadataObject | IAutomationMetadataObjectDefinition,
    { onSuccess, onError, onSubmit, onSaveSuccess, onSaveError, onSave }: IScheduledEmailDialogProps,
) {
    const scheduledEmailCreator = useCreateScheduledEmail({
        onSuccess,
        onError,
        onBeforeRun: onSubmit,
    });
    const handleCreateScheduledEmail = useCallback(
        (scheduledEmail: IAutomationMetadataObject | IAutomationMetadataObjectDefinition) => {
            scheduledEmailCreator.create(scheduledEmail as IAutomationMetadataObjectDefinition);
        },
        [scheduledEmailCreator],
    );

    const scheduledEmailUpdater = useUpdateScheduledEmail({
        onSuccess: onSaveSuccess,
        onError: onSaveError,
        onBeforeRun: onSave,
    });

    const handleUpdateScheduledEmail = useCallback(
        (
            scheduledEmail: IAutomationMetadataObject | IAutomationMetadataObjectDefinition,
            filterContextRef?: ObjRef,
        ) => {
            scheduledEmailUpdater.save(scheduledEmail as IAutomationMetadataObject, filterContextRef);
        },
        [scheduledEmailUpdater],
    );

    const handleSaveScheduledEmail = (): void => {
        if (automation.id) {
            handleUpdateScheduledEmail(automation);
        } else {
            const sanitizedAutomation = sanitizeAutomation(automation);
            handleCreateScheduledEmail(sanitizedAutomation);
        }
    };

    const isSavingScheduledEmail =
        scheduledEmailCreator.creationStatus === "running" ||
        scheduledEmailUpdater.savingStatus === "running";

    return { handleSaveScheduledEmail, isSavingScheduledEmail };
}

// Todo what about rather than just setting the title to "Untitled schedule", always fallback to "Untitled schedule" in UI if title is missing?
function sanitizeAutomation(automation: IAutomationMetadataObject | IAutomationMetadataObjectDefinition) {
    if (!automation.title) {
        automation.title = "Untitled schedule";
    }
    return automation;
}
