// (C) 2022 GoodData Corporation
import { areObjRefsEqual, idRef } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
import ora from "ora";
import { createBackend } from "../_base/backend.js";
import { getDashboardFromOptions } from "../_base/inputHandling/extractors.js";
import { asyncValidOrDie, createDashboardPluginValidator, createDashboardValidator, createWorkspaceValidator, } from "../_base/inputHandling/validators.js";
import { logError } from "../_base/terminal/loggers.js";
import { promptDashboardIdWithoutChoice, promptPluginParameters } from "../_base/terminal/prompts.js";
import { createWorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
function createPluginExistsValidator(identifier) {
    return (dashboardWithReferences) => {
        const { references: { plugins }, } = dashboardWithReferences;
        if (isEmpty(plugins)) {
            return false;
        }
        return plugins.some((plugin) => plugin.identifier === identifier);
    };
}
async function getOriginalParameters(config) {
    var _a;
    const { backendInstance, workspace, dashboard, identifier } = config;
    const fetchOriginalParametersProgress = ora({
        text: "Fetching original parameters.",
    });
    try {
        fetchOriginalParametersProgress.start();
        const dashboardObject = await backendInstance
            .workspace(workspace)
            .dashboards()
            .getDashboard(idRef(dashboard));
        const referencedObjects = await backendInstance
            .workspace(workspace)
            .dashboards()
            .getDashboardReferencedObjects(dashboardObject, ["dashboardPlugin"]);
        const referencedPlugin = referencedObjects.plugins.find((plugin) => plugin.identifier === identifier);
        const plugin = (_a = dashboardObject.plugins) === null || _a === void 0 ? void 0 : _a.find((plugin) => areObjRefsEqual(plugin.plugin, referencedPlugin === null || referencedPlugin === void 0 ? void 0 : referencedPlugin.ref));
        return plugin === null || plugin === void 0 ? void 0 : plugin.parameters;
    }
    finally {
        fetchOriginalParametersProgress.stop();
    }
}
async function doAsyncValidations(config) {
    const { backendInstance, workspace, dashboard, identifier } = config;
    const asyncValidationProgress = ora({
        text: "Performing server-side validations.",
    });
    try {
        asyncValidationProgress.start();
        await backendInstance.authenticate(true);
        await asyncValidOrDie("workspace", workspace, createWorkspaceValidator(backendInstance));
        await asyncValidOrDie("dashboardPlugin", identifier, createDashboardPluginValidator(backendInstance, workspace));
        await asyncValidOrDie("dashboard", dashboard, createDashboardValidator(backendInstance, workspace, createPluginExistsValidator(identifier)));
    }
    finally {
        asyncValidationProgress.stop();
    }
}
export async function getUpdatePluginParamsCmdConfig(identifier, options) {
    var _a, _b, _c;
    const workspaceTargetConfig = await createWorkspaceTargetConfig(options);
    const { hostname, backend, credentials, env } = workspaceTargetConfig;
    const dashboard = (_b = (_a = getDashboardFromOptions(options)) !== null && _a !== void 0 ? _a : env.DASHBOARD_ID) !== null && _b !== void 0 ? _b : (await promptDashboardIdWithoutChoice("Enter identifier of the dashboard to link the plugin to:"));
    const backendInstance = createBackend({
        hostname,
        backend,
        credentials,
    });
    const config = Object.assign(Object.assign({}, workspaceTargetConfig), { identifier,
        dashboard, dryRun: (_c = options.commandOpts.dryRun) !== null && _c !== void 0 ? _c : false, parameters: undefined, backendInstance });
    await doAsyncValidations(config);
    const originalParameters = await getOriginalParameters(config);
    const parameters = await promptPluginParameters(originalParameters);
    if (isEmpty(parameters.trim())) {
        logError("You did not specify any parameters to be updated on the plugin.");
        process.exit(1);
    }
    else {
        config.parameters = parameters;
    }
    return config;
}
//# sourceMappingURL=actionConfig.js.map