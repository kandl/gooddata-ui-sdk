import { ActionOptions, TargetBackendType } from "./types.js";
import { BackendCredentials } from "./credentials.js";
/**
 * Config for commands that target a workspace.
 */
export type WorkspaceTargetConfig = {
    /**
     * Backend type
     */
    backend: TargetBackendType;
    /**
     * Hostname where analytical backend lives
     */
    hostname: string;
    /**
     * Workspace to target
     */
    workspace: string;
    /**
     * All available credentials.
     */
    credentials: BackendCredentials;
    /**
     * For completes includes the full env that was loaded from .env, .env.secrets and overlaid with
     * credential-specific env variables that were available on the session level
     */
    env: Record<string, string>;
    /**
     * For completeness includes package.json of the current project. May be an empty object in case CLI
     * is invoked from directory that does not contain package.json
     */
    packageJson: Record<string, any>;
};
/**
 * Creates common config for commands that target a workspace.
 */
export declare function createWorkspaceTargetConfig(options: ActionOptions): Promise<WorkspaceTargetConfig>;
//# sourceMappingURL=workspaceTargetConfig.d.ts.map