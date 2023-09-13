// (C) 2020-2021 GoodData Corporation
import { drillToAttributeUrl, useDashboardCommandProcessing, } from "../../../model/index.js";
/**
 * @internal
 */
export const useDrillToAttributeUrl = ({ onSuccess, onError, onBeforeRun, } = {}) => {
    return useDashboardCommandProcessing({
        commandCreator: drillToAttributeUrl,
        successEvent: "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.RESOLVED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess,
        onError,
        onBeforeRun,
    });
};
//# sourceMappingURL=useDrillToAttributeUrl.js.map