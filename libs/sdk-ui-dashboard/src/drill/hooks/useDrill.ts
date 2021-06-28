// (C) 2020-2021 GoodData Corporation

import { useDashboardCommandProcessing } from "../../dashboard/useDashboardCommandProcessing";
import { DashboardDrillTriggered, DashboardCommandFailed, drill } from "../../model";

/**
 * @internal
 */
export const useDrill = (
    onSuccess?: (event: DashboardDrillTriggered) => void,
    onError?: (event: DashboardCommandFailed) => void,
    onBeforeRun?: () => void,
) => {
    return useDashboardCommandProcessing({
        commandCreator: drill,
        successEvent: "GDC.DASH/EVT.DRILL.TRIGGERED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
