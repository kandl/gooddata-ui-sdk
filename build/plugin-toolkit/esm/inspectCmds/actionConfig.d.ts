import { WorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { ActionOptions } from "../_base/types.js";
export type InspectCmdActionConfig = WorkspaceTargetConfig & {
    identifier: string;
    backendInstance: IAnalyticalBackend;
};
export declare function getInspectCmdActionConfig(identifier: string, options: ActionOptions): Promise<InspectCmdActionConfig>;
//# sourceMappingURL=actionConfig.d.ts.map