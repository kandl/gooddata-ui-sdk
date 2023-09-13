import { TargetBackendType } from "./types.js";
export declare function toJsonString(obj: any): string;
export declare function writeAsJsonSync(file: string, obj: object): void;
export declare function readJsonSync(file: string): any;
/**
 * Reads package.json file if it exists in current dir. Otherwise returns empty object.
 */
export declare function readPackageJsonIfExists(): Record<string, any>;
/**
 * Safely joins two path parts together.
 *
 * Path on windows will contain backslashes which can cause problems with Globby. This function makes sure
 * only forward slashes are used so that Globby and node fs works properly on all platforms.
 *
 * @param initialPath - the first part
 * @param relativePath - the second part
 * @returns joined path
 */
export declare function safeJoin(initialPath: string, relativePath: string): string;
/**
 * Converts plugin name to an identifier that can be used for module federation identifier, directory names,
 * asset file names etc.
 *
 * @param name - plugin name as entered by the user
 */
export declare function convertToPluginIdentifier(name: string): string;
/**
 * Converts plugin name to directory name for the plugin. This will ensure that if the plugin name
 * contains organization (`@something/plugin`) then only the `plugin` will be used.
 */
export declare function convertToPluginDirectory(name: string): string;
/**
 * Converts plugin identifier to entry point file name
 */
export declare function convertToPluginEntrypoint(pluginIdentifier: string): string;
/**
 * Given package JSON contents, this function tries to discover the backend type that action should
 * target. The idea is: if the person develops plugin against particular backend then its likely
 * that they will also want to deploy it there.
 *
 * @param packageJson - package json object
 */
export declare function discoverBackendType(packageJson: Record<string, any>): TargetBackendType | undefined;
export declare function extractRootCause(error: any): any;
/**
 * This function will attempt to categorize the provided error and print something meaningful into the console.
 *
 * @param error - error message to report on
 */
export declare function genericErrorReporter(error: any): void;
//# sourceMappingURL=utils.d.ts.map