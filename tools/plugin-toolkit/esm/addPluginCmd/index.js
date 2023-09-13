import { logInfo, logSuccess, logWarn } from "../_base/terminal/loggers.js";
import { getAddCmdActionConfig } from "./actionConfig.js";
import { genericErrorReporter } from "../_base/utils.js";
import isEmpty from "lodash/isEmpty.js";
function printAddConfigSummary(config) {
    const { backend, hostname, workspace, pluginUrl, credentials: { username }, pluginName, pluginDescription, } = config;
    logInfo("Everything looks valid. Going to add new plugin object to workspace metadata.");
    logInfo(`  Hostname    : ${hostname}   (${backend === "bear" ? "GoodData platform" : "GoodData.CN"})`);
    if (backend === "bear") {
        logInfo(`  Username    : ${username}`);
    }
    logInfo(`  Workspace   : ${workspace}`);
    logInfo(`  Plugin URL  : ${pluginUrl}`);
    logInfo(`  Plugin name : ${pluginName}`);
    const description = isEmpty(pluginDescription) ? "(empty)" : pluginDescription;
    logInfo(`  Plugin desc : ${description}   (see package.json)`);
}
function createPluginObject(config) {
    const { backendInstance, workspace, pluginUrl: validUrl, pluginName, pluginDescription } = config;
    return backendInstance.workspace(workspace).dashboards().createDashboardPlugin({
        type: "IDashboardPlugin",
        url: validUrl,
        name: pluginName,
        description: pluginDescription,
        tags: [],
    });
}
export async function addPluginCmdAction(pluginUrl, options) {
    try {
        const config = await getAddCmdActionConfig(pluginUrl, options);
        printAddConfigSummary(config);
        if (config.dryRun) {
            logWarn("Dry run has finished. Workspace was not updated. Remove '--dry-run' to perform the actual update.");
            process.exit(0);
        }
        const newPluginObject = await createPluginObject(config);
        logSuccess(`Created new plugin object with ID: ${newPluginObject.identifier}`);
    }
    catch (e) {
        genericErrorReporter(e);
        process.exit(1);
    }
}
//# sourceMappingURL=index.js.map