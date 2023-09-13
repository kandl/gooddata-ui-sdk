// (C) 2022 GoodData Corporation
import { areObjRefsEqual, idRef } from "@gooddata/sdk-model";
import isEqual from "lodash/isEqual.js";
import ora from "ora";
import { logInfo, logSuccess, logWarn } from "../_base/terminal/loggers.js";
import { genericErrorReporter } from "../_base/utils.js";
import { getUpdatePluginParamsCmdConfig } from "./actionConfig.js";
function printUsedUpdatePluginParamsSummary(config) {
    const { backend, hostname, workspace, dashboard, identifier, parameters, credentials: { username }, } = config;
    logInfo("Everything looks valid. Going to update plugin parameters on the dashboard.");
    logInfo(`  Hostname    : ${hostname}   (${backend === "bear" ? "GoodData platform" : "GoodData.CN"})`);
    if (backend === "bear") {
        logInfo(`  Username    : ${username}`);
    }
    logInfo(`  Workspace   : ${workspace}`);
    logInfo(`  Dashboard   : ${dashboard}`);
    logInfo(`  Plugin obj  : ${identifier}`);
    logInfo(`  Parameters  : ${parameters}`);
}
async function updateDashboardWithNewParams(config) {
    var _a;
    const { backendInstance, workspace, dashboard, identifier: validIdentifier, parameters } = config;
    const dashboardRef = idRef(dashboard);
    const dashboardObj = await backendInstance
        .workspace(workspace)
        .dashboards()
        .getDashboard(dashboardRef);
    const dashboardReferencedObjects = await backendInstance
        .workspace(workspace)
        .dashboards()
        .getDashboardReferencedObjects(dashboardObj, ["dashboardPlugin"]);
    const touchedPlugin = dashboardReferencedObjects.plugins.find((plugin) => isEqual(plugin.identifier, validIdentifier));
    const plugins = (_a = dashboardObj.plugins) === null || _a === void 0 ? void 0 : _a.map((plugin) => {
        if (areObjRefsEqual(plugin.plugin, touchedPlugin === null || touchedPlugin === void 0 ? void 0 : touchedPlugin.ref)) {
            return Object.assign(Object.assign({}, plugin), { parameters });
        }
        return plugin;
    });
    // note: need the cast here as IDashboard filterContext may contain ITempFilter context in some cases...
    // but that's not going to happen here (because code never asked for export-specific temp filters)
    const updatedDashboard = Object.assign(Object.assign({}, dashboardObj), { plugins });
    await backendInstance.workspace(workspace).dashboards().updateDashboard(dashboardObj, updatedDashboard);
}
export async function updatePluginParamCmdAction(identifier, options) {
    try {
        const config = await getUpdatePluginParamsCmdConfig(identifier, options);
        printUsedUpdatePluginParamsSummary(config);
        if (config.dryRun) {
            logWarn("Dry run has finished. Dashboard was not updated. Remove '--dry-run' to perform the actual update.");
            process.exit(0);
        }
        const updateProgress = ora({
            text: "Updating parameters on the linked plugin.",
        });
        let success = false;
        try {
            updateProgress.start();
            await updateDashboardWithNewParams(config);
            success = true;
        }
        finally {
            updateProgress.stop();
        }
        if (success) {
            logSuccess(`Parameters on linked plugin ${config.identifier} on dashboard ${config.dashboard} has been updated with ${config.parameters}.`);
        }
    }
    catch (e) {
        genericErrorReporter(e);
        process.exit(1);
    }
}
//# sourceMappingURL=index.js.map