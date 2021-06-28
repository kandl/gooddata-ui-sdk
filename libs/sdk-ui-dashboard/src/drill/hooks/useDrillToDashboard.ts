// (C) 2020-2021 GoodData Corporation

import { useDashboardCommandProcessing } from "../../dashboard/useDashboardCommandProcessing";
import { DashboardDrillToDashboardTriggered, DashboardCommandFailed, drillToDashboard } from "../../model";

/**
 * @internal
 */
export const useDrillToDashboard = (
    onSuccess?: (event: DashboardDrillToDashboardTriggered) => void,
    onError?: (event: DashboardCommandFailed) => void,
    onBeforeRun?: () => void,
) => {
    return useDashboardCommandProcessing({
        commandCreator: drillToDashboard,
        successEvent: "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.TRIGGERED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
