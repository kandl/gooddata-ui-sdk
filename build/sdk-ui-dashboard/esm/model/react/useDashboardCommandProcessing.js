// (C) 2020-2021 GoodData Corporation
import { useState } from "react";
import { useDashboardCommand } from "./useDashboardCommand.js";
/**
 * @internal
 */
export const useDashboardCommandProcessing = ({ commandCreator, successEvent, errorEvent, onSuccess, onError, onBeforeRun, }) => {
    const [status, setStatus] = useState();
    const run = useDashboardCommand(commandCreator, {
        [successEvent]: (event) => {
            setStatus("success");
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(event);
        },
        [errorEvent]: (event) => {
            setStatus("error");
            onError === null || onError === void 0 ? void 0 : onError(event);
        },
    }, (cmd) => {
        setStatus("running");
        onBeforeRun === null || onBeforeRun === void 0 ? void 0 : onBeforeRun(cmd);
    });
    return {
        run,
        status,
    };
};
//# sourceMappingURL=useDashboardCommandProcessing.js.map