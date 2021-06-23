// (C) 2020-2021 GoodData Corporation

import { useDashboardCommandProcessing } from "../dashboard/useDashboardCommandProcessing";
import { DashboardDrillPerformed, DashboardCommandFailed, performDrill } from "../model";

/**
 * @internal
 */
export const useDrill = (
    onSuccess?: (event: DashboardDrillPerformed) => void,
    onError?: (event: DashboardCommandFailed) => void,
    onBeforeRun?: () => void,
) => {
    return useDashboardCommandProcessing({
        commandCreator: performDrill,
        successEvent: "GDC.DASH/EVT.DRILL.PERFORMED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
