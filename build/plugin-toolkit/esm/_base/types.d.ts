import { OptionValues } from "commander";
/**
 * Program & command level options are grabbed from the commander and sent together to the action.
 */
export type ActionOptions = {
    /**
     * Program-level options. These are the top level options defined directly using `program.option(...)`
     */
    programOpts: OptionValues;
    /**
     * Command-level options. These are options defined via `program.command(..).option(..)`
     */
    commandOpts: OptionValues;
};
/**
 * Supported backend types that the tool can target.
 */
export type TargetBackendType = "bear" | "tiger";
/**
 * Supported languages to use in plugin projects bootstrapped by the app.
 */
export type TargetAppLanguage = "ts" | "js";
/**
 * Supported package managers that the tool can use to auto-install dependencies for the boostrapped projects.
 */
export type SupportedPackageManager = "npm" | "yarn";
/**
 * This error is thrown when input validation fails.
 */
export declare class InputValidationError extends Error {
    readonly inputName: string;
    readonly value: string;
    readonly type = "IVE";
    constructor(inputName: string, value: string, message: string);
}
/**
 * Type guard testing whether object is a type of {@link InputValidationError}.
 */
export declare function isInputValidationError(obj: Error): obj is InputValidationError;
//# sourceMappingURL=types.d.ts.map