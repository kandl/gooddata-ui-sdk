import { WorkspaceTargetConfig } from "../_base/workspaceTargetConfig.js";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { ActionOptions } from "../_base/types.js";
export type ListCmdActionConfig = WorkspaceTargetConfig & {
    backendInstance: IAnalyticalBackend;
};
export declare function getListCmdActionConfig(options: ActionOptions): Promise<ListCmdActionConfig>;
//# sourceMappingURL=actionConfig.d.ts.map