import { WorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { ActionOptions } from "../_base/types.js";
export type LinkCmdActionConfig = WorkspaceTargetConfig & {
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
    withParameters: boolean;
    parameters: string | undefined;
    backendInstance: IAnalyticalBackend;
};
export declare function getLinkCmdActionConfig(identifier: string, options: ActionOptions): Promise<LinkCmdActionConfig>;
//# sourceMappingURL=actionConfig.d.ts.map