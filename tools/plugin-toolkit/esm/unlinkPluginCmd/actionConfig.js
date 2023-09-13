// (C) 2021-2022 GoodData Corporation
import { createWorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
import { createBackend } from "../_base/backend.js";
import { getDashboardFromOptions } from "../_base/inputHandling/extractors.js";
import ora from "ora";
import { asyncValidOrDie, createDashboardValidator, createWorkspaceValidator, } from "../_base/inputHandling/validators.js";
import isEmpty from "lodash/isEmpty.js";
import { convertToPluginEntrypoint, convertToPluginIdentifier } from "../_base/utils.js";
import { promptDashboardIdWithoutChoice } from "../_base/terminal/prompts.js";
function createLinkedPluginValidator(identifier, pluginIdentifier) {
    return (dashboardWithReferences) => {
        const { dashboard, references: { plugins }, } = dashboardWithReferences;
        if (isEmpty(plugins)) {
            return `Dashboard ${dashboard.identifier} does not use any plugins.`;
        }
        const linkedPlugin = plugins.find((plugin) => plugin.identifier === identifier);
        if (!linkedPlugin) {
            return `Dashboard ${dashboard.identifier} is not linked with plugin ${identifier}.`;
        }
        // if the pluginIdentifier is not available, we are running the tool outside of the original plugin
        // directory so the entry point validation is impossible
        const entryPoint = convertToPluginEntrypoint(pluginIdentifier);
        if (pluginIdentifier && !linkedPlugin.url.endsWith(entryPoint)) {
            return (`You are trying to unlink a plugin (${linkedPlugin.name}) whose entry point differs from the ` +
                "entry point of the plugin in your current directory.");
        }
        return true;
    };
}
async function doAsyncValidations(config) {
    const { backendInstance, workspace, dashboard, identifier, pluginIdentifier } = config;
    const asyncValidationProgress = ora({
        text: "Performing server-side validations.",
    });
    try {
        asyncValidationProgress.start();
        await backendInstance.authenticate(true);
        await asyncValidOrDie("workspace", workspace, createWorkspaceValidator(backendInstance));
        await asyncValidOrDie("dashboard", dashboard, createDashboardValidator(backendInstance, workspace, createLinkedPluginValidator(identifier, pluginIdentifier)));
    }
    finally {
        asyncValidationProgress.stop();
    }
}
export async function getUnlinkCmdActionConfig(identifier, options) {
    var _a, _b, _c;
    const workspaceTargetConfig = await createWorkspaceTargetConfig(options);
    const { hostname, backend, credentials, env, packageJson } = workspaceTargetConfig;
    const dashboard = (_b = (_a = getDashboardFromOptions(options)) !== null && _a !== void 0 ? _a : env.DASHBOARD_ID) !== null && _b !== void 0 ? _b : (await promptDashboardIdWithoutChoice("Enter identifier of the dashboard to unlink the plugin from:"));
    const backendInstance = createBackend({
        hostname,
        backend,
        credentials,
    });
    const config = Object.assign(Object.assign({}, workspaceTargetConfig), { identifier, pluginIdentifier: packageJson.name && convertToPluginIdentifier(packageJson.name), dashboard, dryRun: (_c = options.commandOpts.dryRun) !== null && _c !== void 0 ? _c : false, backendInstance });
    await doAsyncValidations(config);
    return config;
}
//# sourceMappingURL=actionConfig.js.map