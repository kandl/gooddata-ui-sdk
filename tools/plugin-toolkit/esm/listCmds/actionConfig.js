// (C) 2021-2022 GoodData Corporation
import { createWorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
import { createBackend } from "../_base/backend.js";
import ora from "ora";
import { asyncValidOrDie, createWorkspaceValidator } from "../_base/inputHandling/validators.js";
async function doAsyncValidations(config) {
    const { backendInstance, workspace } = config;
    const asyncValidationProgress = ora({
        text: "Authenticating and checking workspace.",
    });
    try {
        asyncValidationProgress.start();
        await backendInstance.authenticate(true);
        await asyncValidOrDie("workspace", workspace, createWorkspaceValidator(backendInstance));
    }
    finally {
        asyncValidationProgress.stop();
    }
}
export async function getListCmdActionConfig(options) {
    const workspaceTargetConfig = await createWorkspaceTargetConfig(options);
    const { hostname, backend, credentials } = workspaceTargetConfig;
    const backendInstance = createBackend({
        hostname,
        backend,
        credentials,
    });
    const config = Object.assign(Object.assign({}, workspaceTargetConfig), { backendInstance });
    await doAsyncValidations(config);
    return config;
}
//# sourceMappingURL=actionConfig.js.map