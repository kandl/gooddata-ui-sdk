// (C) 2020-2021 GoodData Corporation
import { useCallback } from "react";
import { saveScheduledEmail, useDashboardCommandProcessing, } from "../../../model/index.js";
export const useSaveScheduledEmail = ({ onBeforeRun, onSuccess, onError, } = {}) => {
    const scheduledEmailCommandProcessing = useDashboardCommandProcessing({
        commandCreator: saveScheduledEmail,
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        successEvent: "GDC.DASH/EVT.SCHEDULED_EMAIL.SAVED",
        onError: (event) => {
            onError === null || onError === void 0 ? void 0 : onError(event.payload.error);
        },
        onSuccess: () => {
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        },
        onBeforeRun: (cmd) => {
            onBeforeRun === null || onBeforeRun === void 0 ? void 0 : onBeforeRun(cmd.payload.scheduledEmail);
        },
    });
    const save = useCallback((scheduledEmailToSave, filterContextRef) => {
        scheduledEmailCommandProcessing.run(scheduledEmailToSave, filterContextRef);
    }, []);
    return {
        save,
        savingStatus: scheduledEmailCommandProcessing.status,
    };
};
//# sourceMappingURL=useSaveScheduledEmail.js.map