// (C) 2020-2021 GoodData Corporation
import { drillToCustomUrl, useDashboardCommandProcessing, } from "../../../model/index.js";
/**
 * @internal
 */
export const useDrillToCustomUrl = ({ onSuccess, onError, onBeforeRun } = {}) => {
    return useDashboardCommandProcessing({
        commandCreator: drillToCustomUrl,
        successEvent: "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.RESOLVED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
//# sourceMappingURL=useDrillToCustomUrl.js.map