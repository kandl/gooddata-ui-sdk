import { ActionOptions, SupportedPackageManager, TargetAppLanguage, TargetBackendType } from "../_base/types.js";
export type InitCmdActionConfig = {
    name: string;
    pluginIdentifier: string;
    packageManager: SupportedPackageManager;
    backend: TargetBackendType;
    hostname: string;
    workspace: string;
    dashboard: string;
    language: TargetAppLanguage;
    targetDir: string | undefined;
    skipInstall: boolean;
};
/**
 * This function will obtain configuration for the plugin init command. It will do so from the argument
 * and option values passed via CLI and in case vital input is missing by using interactive prompts.
 *
 * The function will first verify all the available options and only then start prompting the user - this
 * is intentional as the CLI should fail fast and not at some arbitrary point after user prompting.
 *
 * @param pluginName - plugin name (if any) as passed by the user, undefined means no plugin name on CLI
 * @param options - program & command level options provided by the user via CLI
 */
export declare function getInitCmdActionConfig(pluginName: string | undefined, options: ActionOptions): Promise<InitCmdActionConfig>;
//# sourceMappingURL=actionConfig.d.ts.map