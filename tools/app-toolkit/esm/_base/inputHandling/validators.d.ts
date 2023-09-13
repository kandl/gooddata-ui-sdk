export type InputValidator<T = string> = (value: T) => boolean | string;
export type AsyncInputValidator = (value: string) => Promise<boolean | string>;
/**
 * Validates that application name matches required regex.
 */
export declare function applicationNameValidator(value: string): boolean | string;
/**
 * Validates that value is either 'js' or 'ts'.
 */
export declare function languageValidator(value: string): boolean | string;
/**
 * Validates that the value is supported template.
 */
export declare function templateValidator(value: string): boolean | string;
/**
 * Validates that value is either 'npm' or 'yarn'.
 */
export declare function packageManagerValidator(value: string): boolean | string;
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