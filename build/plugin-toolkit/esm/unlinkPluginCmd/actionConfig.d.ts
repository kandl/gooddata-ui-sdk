import { WorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { ActionOptions } from "../_base/types.js";
export type UnlinkCmdActionConfig = WorkspaceTargetConfig & {
    /**
     * Plugin _metadata object_ identifier.
     */
    identifier: string;
    /**
     * Plugin identifier (as used in module naming, entry point naming etc)
     */
    pluginIdentifier: string;
    dashboard: string;
    dryRun: boolean;
    backendInstance: IAnalyticalBackend;
};
export declare function getUnlinkCmdActionConfig(identifier: string, options: ActionOptions): Promise<UnlinkCmdActionConfig>;
//# sourceMappingURL=actionConfig.d.ts.map