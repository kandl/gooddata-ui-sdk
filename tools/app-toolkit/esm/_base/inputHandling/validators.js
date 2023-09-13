// (C) 2007-2022 GoodData Corporation
import validateNpmPackageName from "validate-npm-package-name";
import isEmpty from "lodash/isEmpty.js";
import capitalize from "lodash/capitalize.js";
import { InputValidationError } from "../types.js";
//
// Simple validators compatible with inquirer API
//
/**
 * Validates that application name matches required regex.
 */
export function applicationNameValidator(value) {
    var _a;
    if (isEmpty(value) || (value && isEmpty(value.trim()))) {
        return "Please enter non-empty application name.";
    }
    const result = validateNpmPackageName(value);
    if ((_a = result.errors) === null || _a === void 0 ? void 0 : _a.length) {
        return `Invalid application name. ${result.errors
            .map((e) => {
            return `${capitalize(e)}.`;
        })
            .join(" ")}`;
    }
    return true;
}
/**
 * Validates that value is either 'js' or 'ts'.
 */
export function languageValidator(value) {
    if (value === "js" || value === "ts") {
        return true;
    }
    return "Invalid language. Specify 'ts' for TypeScript or 'js' for JavaScript.";
}
/**
 * Validates that the value is supported template.
 */
export function templateValidator(value) {
    if (value === "react-app") {
        return true;
    }
    return "Invalid template. Specify a supported template. (e.g. react-app)";
}
/**
 * Validates that value is either 'npm' or 'yarn'.
 */
export function packageManagerValidator(value) {
    if (value === "npm" || value === "yarn") {
        return true;
    }
    return "Invalid package manager. Specify 'npm' or 'yarn'.";
}
//
// Functions to trigger validation outside of inquirer.
//
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
export function validOrDie(inputName, value, validator) {
    const result = validator(value);
    if (typeof result === "string") {
        throw new InputValidationError(inputName, value, result);
    }
    if (!result) {
        throw new InputValidationError(inputName, value, `Invalid value provided: ${value}`);
    }
}
/**
 * This is same as {@link validOrDie} except that the validator function returns Promise of the validation
 * result.
 *
 * See {@link validOrDie} for more detail.
 */
export function asyncValidOrDie(inputName, value, validator) {
    return validator(value).then((result) => {
        if (typeof result === "string") {
            throw new InputValidationError(inputName, value, result);
        }
        if (!result) {
            throw new InputValidationError(inputName, value, `Invalid value provided: ${value}`);
        }
    });
}
//# sourceMappingURL=validators.js.map