import { logInfo, logSuccess, logWarn } from "../_base/terminal/loggers.js";
import { getUnlinkCmdActionConfig } from "./actionConfig.js";
import { areObjRefsEqual, idRef } from "@gooddata/sdk-model";
import ora from "ora";
import { genericErrorReporter } from "../_base/utils.js";
function printUnlinkConfigSummary(config) {
    const { backend, hostname, workspace, dashboard, identifier, credentials: { username }, } = config;
    logInfo("Everything looks valid. Going to unlink plugin from dashboard.");
    logInfo(`  Hostname    : ${hostname}   (${backend === "bear" ? "GoodData platform" : "GoodData.CN"})`);
    if (backend === "bear") {
        logInfo(`  Username    : ${username}`);
    }
    logInfo(`  Workspace   : ${workspace}`);
    logInfo(`  Dashboard   : ${dashboard}`);
    logInfo(`  Plugin obj  : ${identifier}`);
}
async function removeDashboardPluginLink(config) {
    const { backendInstance, workspace, dashboard, identifier: validIdentifier } = config;
    const dashboardRef = idRef(dashboard);
    const dashboardWithReferences = await backendInstance
        .workspace(workspace)
        .dashboards()
        .getDashboardWithReferences(dashboardRef, undefined, undefined, ["dashboardPlugin"]);
    const { dashboard: dashboardObj, references: { plugins: pluginObjects }, } = dashboardWithReferences;
    const pluginToRemove = pluginObjects.find((plugin) => plugin.identifier === validIdentifier);
    if (!pluginToRemove) {
        // the validation done before confirmed that the plugin is there. if the code cannot find the
        // plugin now then there must be a race as the plugin disappeared between validation and actual
        // removal
        logWarn(`Plugin with identifier ${validIdentifier} was not linked with the dashboard ${dashboard}.`);
        return false;
    }
    const plugins = dashboardObj.plugins ? [...dashboardObj.plugins] : [];
    const retainPlugins = plugins.filter((link) => {
        return !areObjRefsEqual(link.plugin, pluginToRemove.ref);
    });
    // note: need the cast here as IDashboard filterContext may contain ITempFilter context in some cases...
    // but that's not going to happen here (because code never asked for export-specific temp filters)
    const updatedDashboard = Object.assign(Object.assign({}, dashboardObj), { plugins: retainPlugins });
    await backendInstance.workspace(workspace).dashboards().updateDashboard(dashboardObj, updatedDashboard);
    return true;
}
export async function unlinkPluginCmdAction(identifier, options) {
    try {
        const config = await getUnlinkCmdActionConfig(identifier, options);
        printUnlinkConfigSummary(config);
        if (config.dryRun) {
            logWarn("Dry run has finished. Dashboard was not updated. Remove '--dry-run' to perform the actual update.");
            process.exit(0);
        }
        const updateProgress = ora({
            text: "Removing link between dashboard and plugin.",
        });
        let result = false;
        try {
            updateProgress.start();
            result = await removeDashboardPluginLink(config);
        }
        finally {
            updateProgress.stop();
        }
        if (result) {
            logSuccess(`Plugin ${config.identifier} was unlinked from dashboard ${config.dashboard}.`);
        }
    }
    catch (e) {
        genericErrorReporter(e);
        process.exit(1);
    }
}
//# sourceMappingURL=index.js.map