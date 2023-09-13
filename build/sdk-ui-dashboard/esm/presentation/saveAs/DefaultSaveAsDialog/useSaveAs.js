// (C) 2019-2022 GoodData Corporation
import { useCallback } from "react";
import { saveDashboardAs, selectBackendCapabilities, selectDashboardTitle, selectEnableKPIDashboardSchedule, selectIsDashboardSaving, selectIsInEditMode, selectLocale, useDashboardCommandProcessing, useDashboardSelector, } from "../../../model/index.js";
export const useSaveAs = (props) => {
    var _a;
    const { onSubmit, onSubmitSuccess, onSubmitError } = props;
    const locale = useDashboardSelector(selectLocale);
    const dashboardTitle = useDashboardSelector(selectDashboardTitle);
    const isScheduleEmailsEnabled = useDashboardSelector(selectEnableKPIDashboardSchedule);
    const capabilities = useDashboardSelector(selectBackendCapabilities);
    const isDashboardSaving = useDashboardSelector(selectIsDashboardSaving);
    const isInEditMode = useDashboardSelector(selectIsInEditMode);
    const saveAsCommandProcessing = useDashboardCommandProcessing({
        commandCreator: saveDashboardAs,
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        successEvent: "GDC.DASH/EVT.COPY_SAVED",
        onError: (event) => {
            onSubmitError === null || onSubmitError === void 0 ? void 0 : onSubmitError(event.payload.error);
        },
        onSuccess: (event) => {
            onSubmitSuccess === null || onSubmitSuccess === void 0 ? void 0 : onSubmitSuccess(event.payload.dashboard);
        },
        onBeforeRun: (cmd) => {
            onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(cmd.payload.title, cmd.payload.switchToCopy);
        },
    });
    const handleSaveAs = useCallback((title, switchToDashboard = false, useOriginalFilterContext = true) => {
        saveAsCommandProcessing.run(title, switchToDashboard, useOriginalFilterContext);
    }, []);
    return {
        locale,
        dashboardTitle,
        isScheduleEmailsEnabled,
        isKpiWidgetEnabled: (_a = capabilities.supportsKpiWidget) !== null && _a !== void 0 ? _a : false,
        isDashboardLoaded: true,
        isDashboardSaving,
        isInEditMode,
        handleSaveAs,
        saveAsStatus: saveAsCommandProcessing.status,
    };
};
//# sourceMappingURL=useSaveAs.js.map