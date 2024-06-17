// (C) 2020-2024 GoodData Corporation
import { useCallback } from "react";
import { IAutomationMdObject, ObjRef } from "@gooddata/sdk-model";
import {
    CommandProcessingStatus,
    saveScheduledEmail,
    useDashboardCommandProcessing,
} from "../../../model/index.js";

export const useSaveScheduledEmail = ({
    onBeforeRun,
    onSuccess,
    onError,
}: {
    onBeforeRun?: (scheduledEmailToSave: IAutomationMdObject) => void;
    onSuccess?: () => void;
    onError?: (error: any) => void;
} = {}): {
    save: (scheduledEmailToSave: IAutomationMdObject, filterContextRef?: ObjRef) => void;
    savingStatus?: CommandProcessingStatus;
} => {
    const scheduledEmailCommandProcessing = useDashboardCommandProcessing({
        commandCreator: saveScheduledEmail,
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        successEvent: "GDC.DASH/EVT.SCHEDULED_EMAIL.SAVED",
        onError: (event) => {
            onError?.(event.payload.error);
        },
        onSuccess: () => {
            onSuccess?.();
        },
        onBeforeRun: (cmd) => {
            onBeforeRun?.(cmd.payload.scheduledEmail);
        },
    });

    const save = useCallback((scheduledEmailToSave: IAutomationMdObject, filterContextRef?: ObjRef) => {
        scheduledEmailCommandProcessing.run(scheduledEmailToSave, filterContextRef);
    }, []);

    return {
        save,
        savingStatus: scheduledEmailCommandProcessing.status,
    };
};
