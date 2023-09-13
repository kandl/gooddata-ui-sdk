// (C) 2020-2021 GoodData Corporation
import { drill, useDashboardCommandProcessing, } from "../../../model/index.js";
/**
 * @internal
 */
export const useDrill = ({ onSuccess, onError, onBeforeRun } = {}) => {
    return useDashboardCommandProcessing({
        commandCreator: drill,
        successEvent: "GDC.DASH/EVT.DRILL.RESOLVED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
//# sourceMappingURL=useDrill.js.map