import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { ActionOptions } from "../_base/types.js";
import { WorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
export type UpdatePluginParamsCmdConfig = WorkspaceTargetConfig & {
    /**
     * Plugin _metadata object_ identifier.
     */
    identifier: string;
    dashboard: string;
    dryRun: boolean;
    parameters: string | undefined;
    backendInstance: IAnalyticalBackend;
};
export declare function getUpdatePluginParamsCmdConfig(identifier: string, options: ActionOptions): Promise<UpdatePluginParamsCmdConfig>;
//# sourceMappingURL=actionConfig.d.ts.map