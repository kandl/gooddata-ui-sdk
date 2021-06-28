// (C) 2020-2021 GoodData Corporation

import { useDashboardCommandProcessing } from "../../dashboard/useDashboardCommandProcessing";
import { DashboardDrillToCustomUrlTriggered, DashboardCommandFailed, drillToCustomUrl } from "../../model";

/**
 * @internal
 */
export const useDrillToCustomUrl = (
    onSuccess?: (event: DashboardDrillToCustomUrlTriggered) => void,
    onError?: (event: DashboardCommandFailed) => void,
    onBeforeRun?: () => void,
) => {
    return useDashboardCommandProcessing({
        commandCreator: drillToCustomUrl,
        successEvent: "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.TRIGGERED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
