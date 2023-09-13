import { IAnalyticalBackend, IDashboardWithReferences, IAnalyticalWorkspace } from "@gooddata/sdk-backend-spi";
import { IDashboardPlugin } from "@gooddata/sdk-model";
import { TargetBackendType } from "../types.js";
export type InputValidator<T = string> = (value: T) => boolean | string;
export type AsyncInputValidator = (value: string) => Promise<boolean | string>;
/**
 * Validates that plugin name matches required regex.
 */
export declare function pluginNameValidator(value: string): boolean | string;
/**
 * Validates that value is either 'bear' or 'tiger'.
 */
export declare function backendTypeValidator(value: string): boolean | string;
/**
 * Validates that value is either 'js' or 'ts'.
 */
export declare function languageValidator(value: string): boolean | string;
/**
 * Validates that value is either 'npm' or 'yarn'.
 */
export declare function packageManagerValidator(value: string): boolean | string;
/**
 * Factory for hostname validators. Only validates that URL is syntactically correct. Validation depends on
 * the backend type:
 *
 * -  bear backend: only allow https protocol
 * -  tiger backend: allows either http or https
 */
export declare function createHostnameValidator(backend: TargetBackendType): InputValidator;
/**
 * Factory for plugin URL validators. The created validator is async:
 *
 * -  verify that the hosting is https
 * -  verify that the URL ends with the plugin entry point file
 * -  verify that GET of the entry point works
 *    -  validator attempts to give some nicer messaging and where possible also provide hints
 */
export declare function createPluginUrlValidator(pluginIdentifier: string): AsyncInputValidator;
/**
 * Factory for workspace validators. The created validator is async and verifies that the workspace
 * actually exists on the backend. Optionally, you may specify additional validation to perform
 * in case the workspace actually exists.
 */
export declare function createWorkspaceValidator(backend: IAnalyticalBackend, additionalValidation?: InputValidator<IAnalyticalWorkspace>): AsyncInputValidator;
/**
 * Factory for dashboard validators. The created validator is async and verifies that a dashboard
 * actually exists in a workspace on a backend. Optionally, you may specify additional validation to perform
 * in case the dashboard actually exists.
 */
export declare function createDashboardValidator(backend: IAnalyticalBackend, workspace: string, additionalValidation?: InputValidator<IDashboardWithReferences>): AsyncInputValidator;
/**
 * Factory for dashboard plugin validators. The created validator is async and verifies that a plugin object
 * actually exists in a workspace on a backend. Optionally, you may specify additional validation to perform
 * in case the dashboard plugin actually exists.
 */
export declare function createDashboardPluginValidator(backend: IAnalyticalBackend, workspace: string, additionalValidation?: InputValidator<IDashboardPlugin>): AsyncInputValidator;
/**
 * Triggers validation of value for particular input, using the provided validator. If the validation
 * succeeds (validator returns true), then this function just returns.
 *
 * Otherwise the function throws an {@link InputValidationError}.
 *
 * @param inputName - name of input that is being validated - this is purely metadata, passed over to the exception
 *  so that whoever gets hold of it can determine what exactly failed validation.
 * @param value - value to validate; this will be sent to the validator function & in case of failure will also
 *  appear in the exception
 * @param validator - validator to use, this is function matching the contract set by the inquirer library
 */
export declare function validOrDie(inputName: string, value: string, validator: InputValidator): void;
/**
 * This is same as {@link validOrDie} except that the validator function returns Promise of the validation
 * result.
 *
 * See {@link validOrDie} for more detail.
 */
export declare function asyncValidOrDie(inputName: string, value: string, validator: AsyncInputValidator): Promise<void>;
//# sourceMappingURL=validators.d.ts.map