import { applicationNameValidator, languageValidator, packageManagerValidator, templateValidator, validOrDie, } from "../_base/inputHandling/validators.js";
import { promptLanguage, promptName, promptTemplate } from "../_base/terminal/prompts.js";
function getLanguageFromOptions(options) {
    const { language } = options.commandOpts;
    if (!language) {
        return undefined;
    }
    validOrDie("language", language, languageValidator);
    return language;
}
function getPackageManagerFromOptions(options) {
    const { packageManager } = options.commandOpts;
    if (!packageManager) {
        return "npm";
    }
    validOrDie("packageManager", packageManager, packageManagerValidator);
    return packageManager;
}
function getTemplateFromOptions(options) {
    const { template } = options.commandOpts;
    if (!template) {
        return undefined;
    }
    validOrDie("template", template, templateValidator);
    return template;
}
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
export async function getInitCmdActionConfig(applicationName, options) {
    var _a;
    if (applicationName) {
        validOrDie("app-name", applicationName, applicationNameValidator);
    }
    const languageFromOptions = getLanguageFromOptions(options);
    const packageManagerFromOptions = getPackageManagerFromOptions(options);
    const templateFromOptions = getTemplateFromOptions(options);
    const name = applicationName !== null && applicationName !== void 0 ? applicationName : (await promptName());
    const template = templateFromOptions !== null && templateFromOptions !== void 0 ? templateFromOptions : (await promptTemplate());
    const language = languageFromOptions !== null && languageFromOptions !== void 0 ? languageFromOptions : (await promptLanguage());
    return {
        name,
        language,
        packageManager: packageManagerFromOptions,
        targetDir: options.commandOpts.targetDir,
        skipInstall: (_a = options.commandOpts.skipInstall) !== null && _a !== void 0 ? _a : false,
        template,
    };
}
//# sourceMappingURL=actionConfig.js.map