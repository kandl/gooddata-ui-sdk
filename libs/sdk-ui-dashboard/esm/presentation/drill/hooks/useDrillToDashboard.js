// (C) 2020-2021 GoodData Corporation
import { drillToDashboard, useDashboardCommandProcessing, } from "../../../model/index.js";
/**
 * @internal
 */
export const useDrillToDashboard = ({ onSuccess, onError, onBeforeRun } = {}) => {
    return useDashboardCommandProcessing({
        commandCreator: drillToDashboard,
        successEvent: "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.RESOLVED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
//# sourceMappingURL=useDrillToDashboard.js.map