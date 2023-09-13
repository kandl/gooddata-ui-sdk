import { logInfo } from "../_base/terminal/loggers.js";
import { genericErrorReporter } from "../_base/utils.js";
import { getInspectCmdActionConfig } from "./actionConfig.js";
function printInspectConfigSummary(config) {
    const { identifier, backend, hostname, workspace, credentials: { username }, } = config;
    logInfo("Everything looks valid. Going to inspect object.");
    logInfo(`  Hostname    : ${hostname}   (${backend === "bear" ? "GoodData platform" : "GoodData.CN"})`);
    if (backend === "bear") {
        logInfo(`  Username    : ${username}`);
    }
    logInfo(`  Workspace   : ${workspace}`);
    logInfo(`  Identifier  : ${identifier}`);
}
export async function inspectCmdAction(identifier, inspectObjFn, options) {
    try {
        const config = await getInspectCmdActionConfig(identifier, options);
        printInspectConfigSummary(config);
        await inspectObjFn(config, options);
    }
    catch (e) {
        genericErrorReporter(e);
        process.exit(1);
    }
}
//# sourceMappingURL=inspectCmdAction.js.map