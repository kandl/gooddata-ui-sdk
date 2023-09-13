// (C) 2020-2021 GoodData Corporation
import { drillDown, useDashboardCommandProcessing, } from "../../../model/index.js";
/**
 * @internal
 */
export const useDrillDown = ({ onSuccess, onError, onBeforeRun } = {}) => {
    return useDashboardCommandProcessing({
        commandCreator: drillDown,
        successEvent: "GDC.DASH/EVT.DRILL.DRILL_DOWN.RESOLVED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
//# sourceMappingURL=useDrillDown.js.map