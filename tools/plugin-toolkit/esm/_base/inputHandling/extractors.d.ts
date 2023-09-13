import { ActionOptions, TargetBackendType } from "../types.js";
/**
 * Gets a valid hostname from CLI options or dies with validation error.
 *
 * @param backend - type of backend for which user is entering hostname
 * @param options - program & command options
 * @returns undefined if no hostname specified.
 */
export declare function getHostnameFromOptions(backend: TargetBackendType | undefined, options: ActionOptions): string | undefined;
/**
 * Gets a valid backend type from CLI options or dies with validation error.
 *
 * @param options - program & command options
 * @returns undefined if no backend type specified.
 */
export declare function getBackendFromOptions(options: ActionOptions): TargetBackendType | undefined;
/**
 * Gets a valid workspace from CLI options or dies with validation error.
 *
 * Note: does not validate that workspace actually exists. Just that it is in the options.
 *
 * @param options - program & command options
 * @returns undefined if no workspace specified.
 */
export declare function getWorkspaceFromOptions(options: ActionOptions): string | undefined;
/**
 * Gets a valid dashboard from CLI options or dies with validation error.
 *
 * Note: does not validate that dashboard actually exists. Just that it is in the options.
 *
 * @param options - program & command options
 * @returns undefined if no dashboard specified.
 */
export declare function getDashboardFromOptions(options: ActionOptions): string | undefined;
//# sourceMappingURL=extractors.d.ts.map