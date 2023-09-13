import { convertToPluginIdentifier } from "../_base/utils.js";
import { asyncValidOrDie, createPluginUrlValidator, createWorkspaceValidator, } from "../_base/inputHandling/validators.js";
import { createBackend } from "../_base/backend.js";
import ora from "ora";
import { createWorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
/**
 * Perform asynchronous validations:
 *
 * -  backend & authentication against it
 * -  workspace exists
 * -  plugin is valid and entry point exists at the provided location
 */
async function doAsyncValidations(config) {
    const { backendInstance, workspace, pluginUrl, pluginIdentifier } = config;
    const asyncValidationProgress = ora({
        text: "Performing server-side validations.",
    });
    try {
        asyncValidationProgress.start();
        await backendInstance.authenticate(true);
        await asyncValidOrDie("workspace", workspace, createWorkspaceValidator(backendInstance));
        await asyncValidOrDie("pluginUrl", pluginUrl, createPluginUrlValidator(pluginIdentifier));
    }
    finally {
        asyncValidationProgress.stop();
    }
}
/**
 * Get the best guess of the original plugin name from ints entry point URL.
 *
 * @param url - the URL of the plugin being added
 */
function pluginUrlToPluginName(url) {
    var _a;
    const match = /dp_([^/]+).mjs$/i.exec(url);
    return (_a = match === null || match === void 0 ? void 0 : match[1]) !== null && _a !== void 0 ? _a : "";
}
export async function getAddCmdActionConfig(pluginUrl, options) {
    var _a, _b;
    const workspaceTargetConfig = await createWorkspaceTargetConfig(options);
    const { hostname, backend, credentials, packageJson } = workspaceTargetConfig;
    const backendInstance = createBackend({
        hostname,
        backend,
        credentials,
    });
    /*
     * In case we are not running this from the original plugin directory, derive a best-guess name from
     * the plugin URL. This is good enough for most cases and is easier than asking the user to provide
     * a valid name that would match the URL and pass subsequent validations.
     */
    const pluginName = (_a = packageJson.name) !== null && _a !== void 0 ? _a : pluginUrlToPluginName(pluginUrl);
    const config = Object.assign(Object.assign({}, workspaceTargetConfig), { pluginUrl,
        pluginName, pluginIdentifier: convertToPluginIdentifier(pluginName), pluginDescription: packageJson.description, dryRun: (_b = options.commandOpts.dryRun) !== null && _b !== void 0 ? _b : false, backendInstance });
    await doAsyncValidations(config);
    return config;
}
//# sourceMappingURL=actionConfig.js.map