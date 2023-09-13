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
 * Supported languages to use in application projects bootstrapped by the CLI.
 */
export type TargetAppLanguage = "ts" | "js";
/**
 * Supported package managers that the tool can use to auto-install dependencies for the boostrapped projects.
 */
export type SupportedPackageManager = "npm" | "yarn";
/**
 * Supported templates that can be bootstrapped by the CLI.
 */
export type AppTemplate = "react-app";
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
export declare function isInputValidationError(obj: unknown): obj is InputValidationError;
//# sourceMappingURL=types.d.ts.map