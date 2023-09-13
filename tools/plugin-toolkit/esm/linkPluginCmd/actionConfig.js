// (C) 2021-2022 GoodData Corporation
import { createWorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
import { createBackend } from "../_base/backend.js";
import { getDashboardFromOptions } from "../_base/inputHandling/extractors.js";
import ora from "ora";
import { asyncValidOrDie, createDashboardPluginValidator, createDashboardValidator, createWorkspaceValidator, } from "../_base/inputHandling/validators.js";
import isEmpty from "lodash/isEmpty.js";
import { promptDashboardIdWithoutChoice, promptPluginParameters } from "../_base/terminal/prompts.js";
import { logError } from "../_base/terminal/loggers.js";
import { convertToPluginEntrypoint, convertToPluginIdentifier } from "../_base/utils.js";
function createDuplicatePluginLinkValidator(identifier, pluginIdentifier) {
    const entryPoint = convertToPluginEntrypoint(pluginIdentifier);
    return (dashboardWithReferences) => {
        const { dashboard, references: { plugins }, } = dashboardWithReferences;
        if (isEmpty(plugins)) {
            return true;
        }
        if (plugins.some((plugin) => plugin.identifier === identifier)) {
            return (`Dashboard ${dashboard.identifier} already uses plugin ${identifier}. ` +
                "Dashboard can only link each plugin once. Consider using parameterization instead.");
        }
        const otherPluginWithSameEp = plugins.find((plugin) => plugin.url.endsWith(entryPoint));
        if (otherPluginWithSameEp) {
            const { identifier: otherIdentifier, name } = otherPluginWithSameEp;
            return (`Dashboard ${dashboard.identifier} is already linked with another plugin (${otherIdentifier} - ${name}) ` +
                "that has same entry point as the plugin that you want to link now. This is likely another version of " +
                "the same plugin. Adding two versions of the same plugin is not supported. Note: " +
                "renaming the entry point files will not help as you will then encounter load-time errors.");
        }
        return true;
    };
}
function createLinkedPluginUrlValidator(pluginIdentifier) {
    return (plugin) => {
        // if the pluginIdentifier is not available, we are running the tool outside of the original plugin
        // directory so the entry point validation is impossible
        const entryPoint = convertToPluginEntrypoint(pluginIdentifier);
        if (pluginIdentifier && !plugin.url.endsWith(entryPoint)) {
            return (`You are trying to link a plugin (${plugin.name}) whose entry point differs from the ` +
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
        await asyncValidOrDie("dashboardPlugin", identifier, createDashboardPluginValidator(backendInstance, workspace, createLinkedPluginUrlValidator(pluginIdentifier)));
        await asyncValidOrDie("dashboard", dashboard, createDashboardValidator(backendInstance, workspace, createDuplicatePluginLinkValidator(identifier, pluginIdentifier)));
    }
    finally {
        asyncValidationProgress.stop();
    }
}
export async function getLinkCmdActionConfig(identifier, options) {
    var _a, _b, _c, _d;
    const workspaceTargetConfig = await createWorkspaceTargetConfig(options);
    const { hostname, backend, credentials, env, packageJson } = workspaceTargetConfig;
    const dashboard = (_b = (_a = getDashboardFromOptions(options)) !== null && _a !== void 0 ? _a : env.DASHBOARD_ID) !== null && _b !== void 0 ? _b : (await promptDashboardIdWithoutChoice("Enter identifier of the dashboard to link the plugin to:"));
    const backendInstance = createBackend({
        hostname,
        backend,
        credentials,
    });
    const config = Object.assign(Object.assign({}, workspaceTargetConfig), { identifier,
        dashboard, pluginIdentifier: packageJson.name && convertToPluginIdentifier(packageJson.name), dryRun: (_c = options.commandOpts.dryRun) !== null && _c !== void 0 ? _c : false, withParameters: (_d = options.commandOpts.withParameters) !== null && _d !== void 0 ? _d : false, parameters: undefined, backendInstance });
    await doAsyncValidations(config);
    if (config.withParameters) {
        const parameters = await promptPluginParameters();
        if (isEmpty(parameters.trim())) {
            logError("You did not specify any parameters. If you do not want to use plugin parameterization, remove the --with-parameters option.");
            process.exit(1);
        }
        else {
            config.parameters = parameters;
        }
    }
    return config;
}
//# sourceMappingURL=actionConfig.js.map