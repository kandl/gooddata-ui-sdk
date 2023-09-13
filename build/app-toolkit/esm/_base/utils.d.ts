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
 * Converts application name to directory name for the application. This will ensure that if the application name
 * contains organization (`@something/application`) then only the `application` will be used.
 */
export declare function convertToApplicationDirectory(name: string): string;
export declare function extractRootCause(error: any): any;
/**
 * This function will attempt to categorize the provided error and print something meaningful into the console.
 *
 * @param error - error message to report on
 */
export declare function genericErrorReporter(error: any): void;
//# sourceMappingURL=utils.d.ts.map