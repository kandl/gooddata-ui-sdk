// (C) 2020-2022 GoodData Corporation
import { useCallback } from "react";
import { createScheduledEmail, useDashboardCommandProcessing, } from "../../../model/index.js";
import { ensureAllTimeFilterForExport } from "../../../_staging/exportUtils/filterUtils.js";
export const useCreateScheduledEmail = ({ onBeforeRun, onSuccess, onError, } = {}) => {
    const scheduledEmailCommandProcessing = useDashboardCommandProcessing({
        commandCreator: createScheduledEmail,
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        successEvent: "GDC.DASH/EVT.SCHEDULED_EMAIL.CREATED",
        onError: (event) => {
            onError === null || onError === void 0 ? void 0 : onError(event.payload.error);
        },
        onSuccess: (event) => {
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(event.payload.scheduledEmail);
        },
        onBeforeRun: (cmd) => {
            var _a;
            onBeforeRun === null || onBeforeRun === void 0 ? void 0 : onBeforeRun(cmd.payload.scheduledEmail, (_a = cmd.payload.filterContext) === null || _a === void 0 ? void 0 : _a.filters);
        },
    });
    const create = useCallback((scheduledEmailToCreate, filters) => {
        const filterContext = filters && {
            title: "filterContext",
            description: "",
            filters: ensureAllTimeFilterForExport(filters),
        };
        scheduledEmailCommandProcessing.run(scheduledEmailToCreate, filterContext);
    }, []);
    return {
        create,
        creationStatus: scheduledEmailCommandProcessing.status,
    };
};
//# sourceMappingURL=useCreateScheduledEmail.js.map