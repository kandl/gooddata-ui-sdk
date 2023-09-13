// (C) 2020-2021 GoodData Corporation
import { drillToLegacyDashboard, useDashboardCommandProcessing, } from "../../../model/index.js";
/**
 * @internal
 */
export const useDrillToLegacyDashboard = ({ onSuccess, onError, onBeforeRun, } = {}) => {
    return useDashboardCommandProcessing({
        commandCreator: drillToLegacyDashboard,
        successEvent: "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.RESOLVED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
//# sourceMappingURL=useDrillToLegacyDashboard.js.map