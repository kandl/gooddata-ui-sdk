import { ActionOptions, AppTemplate, SupportedPackageManager, TargetAppLanguage } from "../_base/types.js";
export type InitCmdActionConfig = {
    name: string;
    language: TargetAppLanguage;
    packageManager: SupportedPackageManager;
    targetDir: string | undefined;
    skipInstall: boolean;
    template: AppTemplate;
};
/**
 * This function will obtain configuration for the application init command. It will do so from the argument
 * and option values passed via CLI and in case vital input is missing by using interactive prompts.
 *
 * The function will first verify all the available options and only then start prompting the user - this
 * is intentional as the CLI should fail fast and not at some arbitrary point after user prompting.
 *
 * @param applicationName - application name (if any) as passed by the user, undefined means no application name on CLI
 * @param options - program & command level options provided by the user via CLI
 */
export declare function getInitCmdActionConfig(applicationName: string | undefined, options: ActionOptions): Promise<InitCmdActionConfig>;
//# sourceMappingURL=actionConfig.d.ts.map