import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { ActionOptions } from "../_base/types.js";
import { WorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
export type RemovePluginParamsCmdConfig = WorkspaceTargetConfig & {
    /**
     * Plugin _metadata object_ identifier.
     */
    identifier: string;
    dashboard: string;
    dryRun: boolean;
    backendInstance: IAnalyticalBackend;
};
export declare function getRemovePluginParamsCmdConfig(identifier: string, options: ActionOptions): Promise<RemovePluginParamsCmdConfig>;
//# sourceMappingURL=actionConfig.d.ts.map