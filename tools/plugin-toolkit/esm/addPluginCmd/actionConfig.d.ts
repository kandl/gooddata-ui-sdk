import { ActionOptions } from "../_base/types.js";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { WorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
export type AddCmdActionConfig = WorkspaceTargetConfig & {
    pluginUrl: string;
    pluginIdentifier: string;
    pluginName: string;
    pluginDescription: string | undefined;
    dryRun: boolean;
    backendInstance: IAnalyticalBackend;
};
export declare function getAddCmdActionConfig(pluginUrl: string, options: ActionOptions): Promise<AddCmdActionConfig>;
//# sourceMappingURL=actionConfig.d.ts.map