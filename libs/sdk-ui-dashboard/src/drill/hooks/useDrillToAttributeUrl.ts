// (C) 2020-2021 GoodData Corporation

import { useDashboardCommandProcessing } from "../../dashboard/useDashboardCommandProcessing";
import {
    DashboardDrillToAttributeUrlTriggered,
    DashboardCommandFailed,
    drillToAttributeUrl,
} from "../../model";

/**
 * @internal
 */
export const useDrillToAttributeUrl = (
    onSuccess?: (event: DashboardDrillToAttributeUrlTriggered) => void,
    onError?: (event: DashboardCommandFailed) => void,
    onBeforeRun?: () => void,
) => {
    return useDashboardCommandProcessing({
        commandCreator: drillToAttributeUrl,
        successEvent: "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.TRIGGERED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
