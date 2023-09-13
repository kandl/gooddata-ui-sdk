// (C) 2020-2021 GoodData Corporation
import { drillToInsight, useDashboardCommandProcessing, } from "../../../model/index.js";
/**
 * @internal
 */
export const useDrillToInsight = ({ onSuccess, onError, onBeforeRun } = {}) => {
    return useDashboardCommandProcessing({
        commandCreator: drillToInsight,
        successEvent: "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.RESOLVED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
//# sourceMappingURL=useDrillToInsight.js.map