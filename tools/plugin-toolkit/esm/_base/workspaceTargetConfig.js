// (C) 2021-2022 GoodData Corporation
import ora from "ora";
import { createCredentialsFromEnv, completeCredentialsOrDie, validateCredentialsComplete, promptCredentials, } from "./credentials.js";
import { discoverBackendType, readPackageJsonIfExists } from "./utils.js";
import { getBackendFromOptions, getHostnameFromOptions, getWorkspaceFromOptions, } from "./inputHandling/extractors.js";
import { loadEnv } from "./env.js";
import { createHostnameValidator, validOrDie } from "./inputHandling/validators.js";
import { createBackend } from "./backend.js";
import { promptBackend, promptHostname, promptWorkspaceId } from "./terminal/prompts.js";
function createOrPromptCredentials(backend, env) {
    const credentialsFromEnv = createCredentialsFromEnv(env);
    const areCredentialsValid = !validateCredentialsComplete(backend, credentialsFromEnv);
    if (areCredentialsValid) {
        return Promise.resolve(credentialsFromEnv);
    }
    return promptCredentials(backend);
}
async function promptWorkspace(backend, hostname, credentials) {
    var _a;
    const backendInstance = createBackend({
        hostname,
        backend,
        credentials,
    });
    const workspaceLoadingProgress = ora({
        text: "Loading workspaces.",
    });
    try {
        workspaceLoadingProgress.start();
        const workspacesFirstPage = await backendInstance.workspaces().forCurrentUser().query();
        const allWorkspaces = await workspacesFirstPage.all();
        const descriptors = await Promise.all(allWorkspaces.map((ws) => ws.getDescriptor()));
        workspaceLoadingProgress.stop();
        return promptWorkspaceId(descriptors.map((ws) => {
            var _a;
            return ({
                name: (_a = ws.title) !== null && _a !== void 0 ? _a : ws.id,
                value: ws.id,
            });
        }));
    }
    catch (e) {
        workspaceLoadingProgress.fail((_a = e.message) !== null && _a !== void 0 ? _a : "Error loading workspaces");
        throw e;
    }
}
/**
 * Creates common config for commands that target a workspace.
 */
export async function createWorkspaceTargetConfig(options) {
    var _a, _b, _c;
    const packageJson = readPackageJsonIfExists();
    const backendFromOptions = getBackendFromOptions(options);
    const backend = (_a = backendFromOptions !== null && backendFromOptions !== void 0 ? backendFromOptions : discoverBackendType(packageJson)) !== null && _a !== void 0 ? _a : (await promptBackend());
    const env = loadEnv(backend);
    const credentials = await createOrPromptCredentials(backend, env);
    completeCredentialsOrDie(backend, credentials);
    const hostnameFromOptions = getHostnameFromOptions(backendFromOptions, options);
    const hostname = (_b = hostnameFromOptions !== null && hostnameFromOptions !== void 0 ? hostnameFromOptions : env.BACKEND_URL) !== null && _b !== void 0 ? _b : (await promptHostname(backend));
    validOrDie("hostname", hostname, createHostnameValidator(backend));
    const workspaceFromOptions = getWorkspaceFromOptions(options);
    const workspace = (_c = workspaceFromOptions !== null && workspaceFromOptions !== void 0 ? workspaceFromOptions : env.WORKSPACE) !== null && _c !== void 0 ? _c : (await promptWorkspace(backend, hostname, credentials));
    return {
        backend,
        hostname,
        workspace,
        credentials,
        env,
        packageJson,
    };
}
//# sourceMappingURL=workspaceTargetConfig.js.map